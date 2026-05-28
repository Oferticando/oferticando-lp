import { VitrineSummary } from "./vitrine-summary.model";
import { Vitrine } from "./vitrine.model";

export interface UserResponseDto extends UserEntity {
  id: string | number;
  created_at?: string;
  updated_at?: string;
  isActive?: boolean;
  vitrines?: Vitrine[];
  vitrine?: VitrineSummary;
  integrations?: UserIntegrationsStatus;
}

export interface CreateAndUpdateUserDto {
  name: string;
  email: string;
  password: string;
}

/** Admin cria usuário sem senha — link de primeiro acesso enviado por email */
export interface CreateUserByAdminDto {
  name: string;
  email: string;
}

/** Todos os campos opcionais para PATCH /users/:id */
export interface UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
}

export interface UpdateUserIntegrationsDto {
  mlCookie?: string;
  mlSocialName?: string;
  shopeeAppId?: string;
  shopeeSecret?: string;
  amazonTag?: string;
}

interface UserEntity {
  name: string;
  email: string;
  password?: string;
  role?: string;
}

export interface UserIntegrationsStatus {
  hasMlCookie: boolean;
  hasShopeeAppId: boolean;
  hasShopeeSecret: boolean;
  hasAmazonTag: boolean;
  maskedShopeeAppId: string | null;
  maskedAmazonTag: string | null;
  mlSocialName?: string | null;
  hasMlSocialName: boolean;
  maskedMlSocialName: string | null;
}
