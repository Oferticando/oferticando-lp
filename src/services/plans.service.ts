import { BaseService } from "./core/base.service";

export interface Plan {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  maxVitrines: number;
  maxOfertas: number;
  maxGrupos: number;
  maxWhatsappInstances: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

class PlansService extends BaseService {
  /**
   * Obtém a lista de planos públicos e ativos cadastrados no backend.
   */
  async getPublicPlans(): Promise<Plan[]> {
    return this.get<Plan[]>("/public/plans");
  }
}

export const plansService = new PlansService();
