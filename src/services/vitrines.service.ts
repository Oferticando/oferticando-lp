import { BaseService } from "./core/base.service";
import {
  Vitrine,
  VitrineSelectOption,
  CreateVitrineDto,
  UpdateVitrineDto,
} from "@/models/vitrine.model";
import { API_ROUTES } from "@/shared/api";
import { OfferResponseDto } from "@/models/offer.model";
import { PaginatedResponse } from "@/models/paginated-response.model";

class VitrineService extends BaseService {
  async getAll(): Promise<Vitrine[]> {
    return this.get<Vitrine[]>(API_ROUTES.VITRINES.BASE);
  }

  async getById(id: string | number): Promise<Vitrine> {
    return this.get<Vitrine>(API_ROUTES.VITRINES.BY_ID(id));
  }

  async getBySlug(slug: string): Promise<Vitrine | null> {
    const result = await this.get<{
      data: { vitrine: Vitrine; ofertas: PaginatedResponse<OfferResponseDto> };
    }>(API_ROUTES.VITRINES.BY_SLUG(slug));
    return result?.data?.vitrine ?? null;
  }

  async getByUserId(): Promise<Vitrine[]> {
    return this.get<Vitrine[]>(API_ROUTES.VITRINES.BY_USER_ID);
  }

  /** Retorna lista simplificada { id, name } para uso em dropdowns */
  async getSelectOptions(): Promise<VitrineSelectOption[]> {
    return this.get<VitrineSelectOption[]>(API_ROUTES.VITRINES.SELECT);
  }

  async create(data: CreateVitrineDto): Promise<Vitrine> {
    return this.post<Vitrine>(API_ROUTES.VITRINES.BASE, data);
  }

  async update(id: string | number, data: UpdateVitrineDto): Promise<Vitrine> {
    return this.patch<Vitrine>(API_ROUTES.VITRINES.BY_ID(id), data);
  }

  async updateStatus(id: string | number, active: boolean): Promise<Vitrine> {
    return this.patch<Vitrine>(`${API_ROUTES.VITRINES.BY_ID(id)}/status`, {
      active,
    });
  }

  async deleteVitrine(id: string | number): Promise<void> {
    return this.delete<void>(API_ROUTES.VITRINES.BY_ID(id));
  }

  async uploadImage(id: number | string, file: File): Promise<Vitrine> {
    const formData = new FormData();
    formData.append("file", file);
    return this.post<Vitrine>(
      API_ROUTES.VITRINES.UPDATE_IMAGE(id),
      formData,
      {
        globalLoaderMessage: "Fazendo upload da foto...",
      },
    );
  }

  async upload(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("files", file);
    const response = await this.post<[{ url: string }]>(
      "/upload?type=vitrine",
      formData,
      {
        globalLoaderMessage: "Fazendo upload da foto...",
      },
    );
    return response[0].url;
  }
}

export const vitrineService = new VitrineService();
