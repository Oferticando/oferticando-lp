import type { AxiosRequestConfig } from "axios";

export interface RequestLoaderConfig extends AxiosRequestConfig {
  suppressGlobalLoader?: boolean;
  forceGlobalLoader?: boolean;
  globalLoaderMessage?: string;
  __globalLoaderActive?: boolean;
}

type RequestLoaderState = {
  active: boolean;
  message: string;
};

type Listener = (state: RequestLoaderState) => void;

const listeners = new Set<Listener>();

let activeRequests = 0;
let currentMessage = "Processando sua solicitacao...";

function emit() {
  const state: RequestLoaderState = {
    active: activeRequests > 0,
    message: currentMessage,
  };

  listeners.forEach((listener) => listener(state));
}

export function showRequestLoader(message?: string) {
  activeRequests += 1;
  if (message) {
    currentMessage = message;
  }
  emit();
}

export function hideRequestLoader() {
  activeRequests = Math.max(0, activeRequests - 1);
  if (activeRequests === 0) {
    currentMessage = "Processando sua solicitacao...";
  }
  emit();
}

export function subscribeToRequestLoader(listener: Listener) {
  listeners.add(listener);
  listener({
    active: activeRequests > 0,
    message: currentMessage,
  });

  return () => {
    listeners.delete(listener);
  };
}
