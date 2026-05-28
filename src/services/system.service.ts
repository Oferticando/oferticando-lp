import { BaseService } from "./core/base.service";

export interface SystemStatus {
  status: string;
  uptime: number;
  timestamp: string;
  version?: string;
}

class SystemService extends BaseService {
  /**
   * Health check simples para verificar se a API está online.
   */
  async ping(): Promise<{ message: string }> {
    return this.get<{ message: string }>("/ping");
  }

  /**
   * Obtém detalhes sobre o status de saúde e uptime do backend.
   */
  async getStatus(): Promise<SystemStatus> {
    return this.get<SystemStatus>("/status");
  }
}

export const systemService = new SystemService();
