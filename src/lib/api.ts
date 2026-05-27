import axios, { AxiosError, AxiosHeaders, InternalAxiosRequestConfig } from "axios";
import { hideRequestLoader, RequestLoaderConfig, showRequestLoader } from "@/lib/request-loader";

export class ApiError extends Error {
  status?: number;
  code?: string;
  isNetworkError: boolean;
  payload?: unknown;

  constructor(
    message: string,
    status?: number,
    code?: string,
    isNetworkError: boolean = false,
    payload?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.isNetworkError = isNetworkError;
    this.payload = payload;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}

type RetriableRequestConfig = InternalAxiosRequestConfig &
  RequestLoaderConfig & {
    _retry?: boolean;
    _skipAuthRefresh?: boolean;
  };

const REFRESH_ROUTE = "/auth/refresh";

function isRefreshRoute(url: string | undefined): boolean {
  if (!url) return false;
  const cleanUrl = url.replace(/^\/?(api\/)?/, "");
  const cleanRefresh = REFRESH_ROUTE.replace(/^\/?(api\/)?/, "");
  return cleanUrl === cleanRefresh;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api` : undefined,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 90000,
});

let refreshPromise: Promise<void> | null = null;

function normalizeHeaders(config: RetriableRequestConfig) {
  if (!config.headers) {
    config.headers = new AxiosHeaders();
  } else if (!(config.headers instanceof AxiosHeaders)) {
    config.headers = AxiosHeaders.from(config.headers);
  }

  return config.headers;
}

function clearLocalSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("user");
  localStorage.removeItem("name");
  localStorage.removeItem("role");
}

async function refreshSession(): Promise<void> {
  if (!refreshPromise) {
    refreshPromise = api
      .post(
        REFRESH_ROUTE,
        undefined,
        {
          suppressGlobalLoader: true,
          _skipAuthRefresh: true,
        } as RequestLoaderConfig,
      )
      .then(() => undefined)
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

api.interceptors.request.use(
  (config) => {
    const requestConfig = config as RetriableRequestConfig;

    // Corrige caminhos com barra inicial para respeitar o prefixo /api do baseURL
    if (requestConfig.url && requestConfig.url.startsWith("/") && !requestConfig.url.startsWith("//")) {
      if (requestConfig.url.startsWith("/api/")) {
        requestConfig.url = requestConfig.url.substring(5);
      } else {
        requestConfig.url = requestConfig.url.substring(1);
      }
    }

    const headers = normalizeHeaders(requestConfig);

    // Deixa o browser definir o boundary automaticamente para uploads.
    if (requestConfig.data instanceof FormData) {
      headers.delete("Content-Type");
    }

    if (typeof window !== "undefined") {
      const method = requestConfig.method?.toLowerCase() ?? "get";
      const shouldShowLoader =
        !requestConfig.suppressGlobalLoader &&
        (requestConfig.forceGlobalLoader || method !== "get");

      if (shouldShowLoader) {
        requestConfig.__globalLoaderActive = true;
        showRequestLoader(requestConfig.globalLoaderMessage);
      }
    }

    return requestConfig;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => {
    const requestConfig = response.config as RetriableRequestConfig;
    if (requestConfig.__globalLoaderActive) {
      hideRequestLoader();
    }
    return response;
  },
  async (error: AxiosError) => {
    const requestConfig = error.config as RetriableRequestConfig | undefined;
    if (requestConfig?.__globalLoaderActive) {
      hideRequestLoader();
    }

    if (
      error.response?.status === 401 &&
      requestConfig &&
      !requestConfig._retry &&
      !requestConfig._skipAuthRefresh &&
      !isRefreshRoute(requestConfig.url)
    ) {
      requestConfig._retry = true;

      try {
        await refreshSession();
        return api(requestConfig);
      } catch (refreshError) {
        clearLocalSession();

        if (typeof window !== "undefined") {
          const isProtectedPath =
            window.location.pathname.startsWith("/perfil") ||
            window.location.pathname.startsWith("/admin");

          if (isProtectedPath) {
            window.location.href = "/login?expired=true";
          }
        }

        return Promise.reject(refreshError);
      }
    }

    let message = "Ocorreu um erro inesperado";

    if (error.response) {
      const data = error.response.data as
        | { message?: string; error?: string }
        | undefined;

      message = data?.message || data?.error || message;

      if (error.response.status === 401) {
        clearLocalSession();
      }
    } else if (error.request) {
      message =
        "Não foi possível conectar ao servidor. Verifique sua conexão ou CORS.";
      console.error("Network/CORS Error:", error.request);
    }

    return Promise.reject(
      new ApiError(
        message,
        error.response?.status,
        error.code,
        !error.response,
        error.response?.data,
      ),
    );
  },
);

export default api;
