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
  affiliate_link: string;
  resolved_link: string;
  image_url: string;
  slug: string;
  store: Store;
  vitrine: Vitrine;
  updated_at: string;
  created_at: string;
  user: UserResponseDto;
  coupon: string | null;
  old_price?: number;
  price: number;
  regex?: string | null;
  whatsapp_template?: string;
  discount_percentage?: number | null;
}
export interface CreateOfferDto {
  title: string;
  description: string;
  affiliate_link: string;
  resolved_link: string;
  image_url: string;
  image?: File | null;
  storeId: string | number | "";
  vitrineId: string | number | "";
  coupon?: string;
  old_price?: number;
  price: number | null;
  regex?: string;
}

export interface UpdateOfferDto {
  active?: boolean;
  title?: string;
  description?: string;
  price?: number;
  old_price?: number;
  coupon?: string;
  affiliate_link?: string;
  resolved_link?: string;
  image_url?: string;
  storeId?: string | number;
  vitrineId?: string | number;
  regex?: string;
}

export const OfferResponseSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  // Protege o frontend de quebrar se o backend (ou n8n) mandar preços num formato de string ou quebrado
  price: z.preprocess((val) => (typeof val === "string" ? parseFloat(val.replace(/[^\d.-]/g, "")) : Number(val)), z.number()),
  old_price: z.preprocess((val) => (val && val !== "null" ? (typeof val === "string" ? parseFloat(val.replace(/[^\d.-]/g, "")) : Number(val)) : undefined), z.number().optional()),
  discount_percentage: z.preprocess((val) => (val && val !== "null" ? Number(val) : null), z.number().nullable().optional()),
}).passthrough();

