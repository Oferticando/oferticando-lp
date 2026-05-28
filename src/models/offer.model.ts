import { z } from "zod";
import { Store } from "./store.model";
import { UserResponseDto } from "./user.model";
import { Vitrine } from "./vitrine.model";

export interface OfferModel {
  title: string;
  description: string;
  image: string;
  url: string;
  store: string;
  storeLocked: boolean;
}

export interface OfferResponseDto {
  id: string | number;
  active: boolean;
  title: string;
  description: string;
  affiliateLink: string;
  resolvedLink: string;
  imageUrl: string;
  slug: string;
  store: Store;
  vitrine: Vitrine;
  updatedAt: string;
  createdAt: string;
  user: UserResponseDto;
  coupon: string | null;
  oldPrice?: number;
  price: number;
  regex?: string | null;
  whatsappTemplate?: string;
  discountPercentage?: number | null;
}
export interface CreateOfferDto {
  title: string;
  description: string;
  affiliateLink: string;
  resolvedLink: string;
  imageUrl: string;
  image?: File | null;
  storeId: string | number | "";
  vitrineId: string | number | "";
  coupon?: string;
  oldPrice?: number;
  price: number | null;
  regex?: string;
}

export interface UpdateOfferDto {
  active?: boolean;
  title?: string;
  description?: string;
  price?: number;
  oldPrice?: number;
  coupon?: string;
  affiliateLink?: string;
  resolvedLink?: string;
  imageUrl?: string;
  storeId?: string | number;
  vitrineId?: string | number;
  regex?: string;
}

export const OfferResponseSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  // Protege o frontend de quebrar se o backend (ou n8n) mandar preços num formato de string ou quebrado
  price: z.preprocess((val) => (typeof val === "string" ? parseFloat(val.replace(/[^\d.-]/g, "")) : Number(val)), z.number()),
  oldPrice: z.preprocess((val) => (val && val !== "null" ? (typeof val === "string" ? parseFloat(val.replace(/[^\d.-]/g, "")) : Number(val)) : undefined), z.number().optional()),
  discountPercentage: z.preprocess((val) => (val && val !== "null" ? Number(val) : null), z.number().nullable().optional()),
}).passthrough();

