import { BaseService } from "./core/base.service";
import { API_ROUTES } from "@/shared/api";
import { RetailStore, RetailStorePayload } from "@/models/retail-store.model";

class RetailStoresService extends BaseService {
  async getAll(): Promise<RetailStore[]> {
    return this.get<RetailStore[]>(API_ROUTES.RETAIL_STORES.BASE);
  }

  async getById(id: number | string): Promise<RetailStore> {
    return this.get<RetailStore>(API_ROUTES.RETAIL_STORES.BY_ID(id));
  }

  async create(payload: RetailStorePayload): Promise<RetailStore> {
    return this.post<RetailStore>(API_ROUTES.RETAIL_STORES.BASE, payload);
  }
}

export const retailStoresService = new RetailStoresService();
