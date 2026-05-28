import { BaseService } from "./core/base.service";
import { API_ROUTES } from "@/shared/api";
import { FindAllQueryDto } from "@/models/find-all-query.model";
import { LinkPreviewResponse } from "@/models/link-preview.model";
import {
  CreateOfferDto,
  OfferResponseDto,
  UpdateOfferDto,
  OfferResponseSchema,
} from "@/models/offer.model";
import { Vitrine } from "@/models/vitrine.model";
import { PaginatedResponse } from "@/models/paginated-response.model";

class OfferService extends BaseService {
  async create(data: unknown): Promise<OfferResponseDto> {
    const res = await this.post<Exclude<unknown, void>>(
      API_ROUTES.OFFERS.BASE,
      data,
    );
    return OfferResponseSchema.parse(res) as unknown as OfferResponseDto;
  }

  async update(
    id: number | string,
    data: UpdateOfferDto,
  ): Promise<OfferResponseDto> {
    const res = await this.put<Exclude<unknown, void>>(
      API_ROUTES.OFFERS.BY_ID(id),
      data,
    );
    return OfferResponseSchema.parse(res) as unknown as OfferResponseDto;
  }

  async deleteOffer(id: number | string): Promise<void> {
    return this.delete(API_ROUTES.OFFERS.BY_ID(id));
  }

  private parsePaginated(
    res: PaginatedResponse<Exclude<unknown, void>>,
  ): PaginatedResponse<OfferResponseDto> {
    return {
      ...res,
      data: res.data.map(
        (item) =>
          OfferResponseSchema.parse(item) as unknown as OfferResponseDto,
      ),
    };
  }

  async getAll(
    options: FindAllQueryDto,
  ): Promise<PaginatedResponse<OfferResponseDto>> {
    const params = this.buildQueryParams(options);
    const res = await this.get<PaginatedResponse<Exclude<unknown, void>>>(
      API_ROUTES.OFFERS.BASE,
      { params },
    );
    return this.parsePaginated(res);
  }

  async getAllAdmin(
    options: FindAllQueryDto,
  ): Promise<PaginatedResponse<OfferResponseDto>> {
    const params = this.buildQueryParams(options);
    const res = await this.get<PaginatedResponse<Exclude<unknown, void>>>(
      API_ROUTES.OFFERS.ALL,
      { params },
    );
    return this.parsePaginated(res);
  }

  async getAllMyOffers(
    options: FindAllQueryDto,
  ): Promise<PaginatedResponse<OfferResponseDto>> {
    const params = this.buildQueryParams(options);
    const res = await this.get<PaginatedResponse<Exclude<unknown, void>>>(
      API_ROUTES.OFFERS.MY_OFFERS,
      { params },
    );
    return this.parsePaginated(res);
  }

  async getAllExceptId(
    id: string | number,
    options: FindAllQueryDto,
  ): Promise<PaginatedResponse<OfferResponseDto>> {
    const params = this.buildQueryParams(options);
    const res = await this.get<PaginatedResponse<Exclude<unknown, void>>>(
      API_ROUTES.OFFERS.EXCEPT_ID(id),
      { params },
    );
    return this.parsePaginated(res);
  }

  async getByVitrineSlug(
    slug: string,
    options: FindAllQueryDto,
  ): Promise<{
    data: { vitrine: Vitrine; ofertas: PaginatedResponse<OfferResponseDto> };
  }> {
    const params = this.buildQueryParams(options);
    const res = await this.get<{
      data: {
        vitrine: Vitrine;
        ofertas: PaginatedResponse<Exclude<unknown, void>>;
      };
    }>(API_ROUTES.OFFERS.BY_VITRINE_SLUG(slug), { params });

    return {
      data: {
        vitrine: res.data.vitrine,
        ofertas: this.parsePaginated(res.data.ofertas),
      },
    };
  }

  async getByVitrineSlugExceptId(
    slug: string,
    id: string | number,
    options: FindAllQueryDto,
  ): Promise<PaginatedResponse<OfferResponseDto>> {
    const params = this.buildQueryParams(options);
    const res = await this.get<PaginatedResponse<Exclude<unknown, void>>>(
      API_ROUTES.OFFERS.BY_VITRINE_SLUG_EXCEPT_ID(slug, id),
      { params },
    );
    return this.parsePaginated(res);
  }

  async getById(id: string | number): Promise<OfferResponseDto> {
    const res = await this.get<Exclude<unknown, void>>(
      API_ROUTES.OFFERS.BY_ID(id),
    );
    return OfferResponseSchema.parse(res) as unknown as OfferResponseDto;
  }

  async getBySlug(slug: string): Promise<OfferResponseDto> {
    const res = await this.get<Exclude<unknown, void>>(
      API_ROUTES.OFFERS.BY_SLUG(slug),
    );
    return OfferResponseSchema.parse(res) as unknown as OfferResponseDto;
  }

  async getLinkPreviewData(shortUrl: string): Promise<LinkPreviewResponse> {
    return this.post<LinkPreviewResponse>(API_ROUTES.JINA.LINK_PREVIEW, {
      url: shortUrl,
    });
  }

  async createBatch(
    offers: CreateOfferDto[],
    pricesInCents?: boolean,
  ): Promise<{
    saved: OfferResponseDto[];
    errors: { title: string; affiliate_link?: string; error: string }[];
  }> {
    const response = await this.post<{
      saved: Exclude<unknown, void>[];
      errors: { title: string; affiliate_link?: string; error: string }[];
    }>(API_ROUTES.OFFERS.BATCH, {
      offers,
      ...(pricesInCents !== undefined ? { pricesInCents } : {}),
    });

    return {
      saved: response.saved.map(
        (item) =>
          OfferResponseSchema.parse(item) as unknown as OfferResponseDto,
      ),
      errors: response.errors,
    };
  }

  private buildQueryParams(options: FindAllQueryDto) {
    const { page = 1, limit = 10, search } = options;
    const queryParams: Record<string, string | number> = { page, limit };
    if (search) queryParams.search = search;
    return queryParams;
  }
}

export const offersService = new OfferService();
