import { BaseService } from "./core/base.service";
import { CreateAndUpdateStoreDto, Store } from "@/models/store.model";
import { API_ROUTES } from "@/shared/api";

class StoreService extends BaseService {
  async getAll(): Promise<Store[]> {
    return this.get<Store[]>(API_ROUTES.STORES.BASE);
  }

  async create(payload: CreateAndUpdateStoreDto): Promise<Store> {
    return this.post<Store>(API_ROUTES.STORES.BASE, payload);
  }

  async getById(id: string | number): Promise<Store> {
    return this.get<Store>(API_ROUTES.STORES.BY_ID(id));
  }

  async update(
    id: string | number,
    payload: Partial<CreateAndUpdateStoreDto>,
  ): Promise<Store> {
    return this.put<Store>(API_ROUTES.STORES.BY_ID(id), payload);
  }
}

export const storeService = new StoreService();
