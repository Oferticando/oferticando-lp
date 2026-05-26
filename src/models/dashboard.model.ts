import { UserResponseDto } from "./user.model";
import { Vitrine } from "./vitrine.model";

export interface DashboardAdminResponseDto {
  totalUsers: number;
  totalOffers: number;
  totalStores: number;
  totalVitrines: number;
}

export interface DashboardAdminLegacyErrorResponse {
  error: string;
}

export interface DashboardMeRequestDto {
  totalOffers: number;
  offers?: {
    count: number;
    views: number;
    cliques: number;
  };
  vitrine?: {
    isRegistered: boolean;
    count: number;
    [key: string]: unknown;
  };
  user: UserResponseDto;
  vitrines: Vitrine[];
}
