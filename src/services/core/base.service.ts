import { AxiosInstance, AxiosResponse } from "axios";
import api from "@/lib/api";
import { RequestLoaderConfig } from "@/lib/request-loader";

export abstract class BaseService {
  protected readonly http: AxiosInstance = api;

  /**
   * Extrai os dados da resposta do Axios.
   */
  protected handleResponse<T>(response: AxiosResponse<T>): T {
    return response.data;
  }

  protected async get<T>(url: string, config?: RequestLoaderConfig): Promise<T> {
    const response = await this.http.get<T>(url, config);
    return this.handleResponse(response);
  }

  protected async post<T>(
    url: string,
    data?: unknown,
    config?: RequestLoaderConfig,
  ): Promise<T> {
    const response = await this.http.post<T>(url, data, config);
    return this.handleResponse(response);
  }

  protected async put<T>(
    url: string,
    data?: unknown,
    config?: RequestLoaderConfig,
  ): Promise<T> {
    const response = await this.http.put<T>(url, data, config);
    return this.handleResponse(response);
  }

  protected async patch<T>(
    url: string,
    data?: unknown,
    config?: RequestLoaderConfig,
  ): Promise<T> {
    const response = await this.http.patch<T>(url, data, config);
    return this.handleResponse(response);
  }

  protected async delete<T>(
    url: string,
    config?: RequestLoaderConfig,
  ): Promise<T> {
    const response = await this.http.delete<T>(url, config);
    return this.handleResponse(response);
  }
}
