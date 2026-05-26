import { UserResponseDto } from "./user.model";

export interface Vitrine {
  id: number;
  name: string;
  instagram?: string;
  slug: string;
  description: string;
  imageUrl: string;
  primary_color: string;
  secondary_color: string;
  active: boolean;
  user?: UserResponseDto;
  created_at: string;
  updated_at: string;
}

export interface CreateVitrineDto {
  name: string;
  description?: string;
  imageUrl?: string;
  instagram?: string;
}

export interface UpdateVitrineDto {
  name?: string;
  description?: string;
  imageUrl?: string;
  instagram?: string;
}

export interface UpdateVitrineStatusDto {
  active: boolean;
}

/** Resposta simplificada retornada por GET /vitrines/select */
export interface VitrineSelectOption {
  id: number;
  name: string;
}
