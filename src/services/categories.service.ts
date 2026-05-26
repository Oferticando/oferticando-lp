import { BaseService } from "./core/base.service";
import { API_ROUTES } from "@/shared/api";
import { Category, CategoryPayload } from "@/models/category.model";

class CategoriesService extends BaseService {
  async getAll(): Promise<Category[]> {
    return this.get<Category[]>(API_ROUTES.CATEGORIES.BASE);
  }

  async getById(id: number | string): Promise<Category> {
    return this.get<Category>(API_ROUTES.CATEGORIES.BY_ID(id));
  }

  async create(payload: CategoryPayload): Promise<Category> {
    return this.post<Category>(API_ROUTES.CATEGORIES.BASE, payload);
  }
}

export const categoriesService = new CategoriesService();
