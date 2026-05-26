import { UserResponseDto } from "./user.model";
import { UserRole } from "@/enum/role-user.enum";

export interface AuthSessionVitrineStatus {
  isRegistered: boolean;
  count: number;
}

export interface AuthResponse {
  user?: UserResponseDto;
  message?: string;
  token?: string;
  jwt?: string;
  access_token?: string;
  accessToken?: string;
  data?: {
    user?: UserResponseDto;
    token?: string;
    jwt?: string;
    access_token?: string;
    accessToken?: string;
  };
}

export interface AuthSessionResponse {
  user: UserResponseDto;
  vitrine: AuthSessionVitrineStatus;
  message?: string;
}

export type UserWithRole = UserResponseDto & {
  role?: UserRole | string;
};

export interface LoginForm {
  email: string;
  password: string;
}

export interface DecodedToken {
  email: string;
  name?: string;
}
