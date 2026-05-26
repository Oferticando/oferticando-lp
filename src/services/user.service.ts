import { BaseService } from "./core/base.service";
import {
  CreateAndUpdateUserDto,
  CreateUserByAdminDto,
  UpdateUserDto,
  UpdateUserIntegrationsDto,
  UserIntegrationsStatus,
  UserResponseDto,
} from "@/models/user.model";
import { API_ROUTES } from "@/shared/api";

class UserService extends BaseService {
  /** GET /users — Admin only */
  async getAll(): Promise<UserResponseDto[]> {
    return this.get<UserResponseDto[]>(API_ROUTES.USERS.BASE);
  }

  /** GET /users/profile — usuário logado via JWT */
  async getProfile(): Promise<UserResponseDto> {
    return this.get<UserResponseDto>(API_ROUTES.USERS.PROFILE);
  }

  /** GET /users/profile/integrations — usuário logado via JWT */
  async getProfileIntegrations(): Promise<UserIntegrationsStatus> {
    return this.get<UserIntegrationsStatus>(API_ROUTES.USERS.PROFILE_INTEGRATIONS);
  }

  /** GET /users/:id — Admin only */
  async getById(id: string | number): Promise<UserResponseDto> {
    return this.get<UserResponseDto>(API_ROUTES.USERS.BY_ID(id));
  }

  /** DELETE /users/:id — Admin only (soft delete) */
  async remove(id: string | number): Promise<void> {
    return this.delete<void>(API_ROUTES.USERS.BY_ID(id));
  }

  /** POST /users — auto-cadastro com senha */
  async create(user: CreateAndUpdateUserDto): Promise<UserResponseDto> {
    return this.post<UserResponseDto>(API_ROUTES.USERS.REGISTER, user);
  }

  /** POST /users/admin/create — admin cria usuário sem senha */
  async createByAdmin(user: CreateUserByAdminDto): Promise<{ message: string }> {
    return this.post<{ message: string }>(API_ROUTES.USERS.ADMIN_CREATE, user);
  }

  /** PATCH /users/:id */
  async update(
    id: string | number,
    user: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.patch<UserResponseDto>(API_ROUTES.USERS.BY_ID(id), user);
  }

  /** PATCH /users/profile */
  async updateProfile(user: UpdateUserDto): Promise<UserResponseDto> {
    return this.patch<UserResponseDto>(API_ROUTES.USERS.PROFILE, user);
  }

  /** PATCH /users/profile/integrations */
  async updateProfileIntegrations(
    integrations: UpdateUserIntegrationsDto,
  ): Promise<UserResponseDto> {
    return this.patch<UserResponseDto>(
      API_ROUTES.USERS.PROFILE_INTEGRATIONS,
      integrations,
    );
  }

  /** PATCH /users/change-password */
  async changePassword(
    currentPassword: string,
    newPassword: string,
  ): Promise<void> {
    return this.patch<void>(API_ROUTES.USERS.CHANGE_PASSWORD, {
      currentPassword,
      newPassword,
    });
  }

  /** POST /users/reset-password-request (público) — retorna mensagem genérica */
  async requestPasswordReset(email: string): Promise<{ message: string }> {
    return this.post<{ message: string }>(
      API_ROUTES.USERS.RESET_PASSWORD_REQUEST,
      { email },
    );
  }

  /** POST /users/reset-password (público) */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    return this.post<void>(API_ROUTES.USERS.RESET_PASSWORD, {
      token,
      newPassword,
    });
  }

  /** POST /users/set-first-password (público) — primeiro acesso */
  async setFirstPassword(token: string, password: string): Promise<void> {
    return this.post<void>(API_ROUTES.USERS.SET_FIRST_PASSWORD, {
      token,
      password,
    });
  }

  /** POST /users/:id/set-password — admin define senha de outro usuário */
  async adminSetPassword(id: string | number, newPassword: string): Promise<void> {
    return this.post<void>(API_ROUTES.USERS.SET_PASSWORD(id), { newPassword });
  }
}

export const userService = new UserService();
