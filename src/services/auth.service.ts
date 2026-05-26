import { BaseService } from "./core/base.service";
import { API_ROUTES } from "@/shared/api";
import { UserResponseDto } from "@/models/user.model";
import { UserRole } from "@/enum/role-user.enum";
import {
  AuthResponse,
  AuthSessionResponse,
  UserWithRole,
} from "@/models/auth.model";

function normalizeRole(role?: string): UserRole | null {
  if (!role) return null;
  const lowerRole = role.toLowerCase();
  if (lowerRole === UserRole.ADMIN) return UserRole.ADMIN;
  if (lowerRole === UserRole.USER) return UserRole.USER;
  return null;
}

function extractUser(data: AuthResponse | AuthSessionResponse): UserResponseDto | null {
  return (
    data.user ??
    (data as AuthResponse).data?.user ??
    null
  );
}

class AuthService extends BaseService {
  private syncPromise: Promise<UserResponseDto | null> | null = null;

  private persistUserSession(user: UserResponseDto | null) {
    if (!user || typeof window === "undefined") return;

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("name", user.name || user.email || "");

    const userRole = normalizeRole((user as UserWithRole).role);
    if (userRole) {
      localStorage.setItem("role", userRole);
    } else {
      localStorage.removeItem("role");
    }
  }

  private clearLocalSession() {
    if (typeof window === "undefined") return;
    localStorage.removeItem("user");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
  }

  async login(identifier: string, password: string): Promise<AuthResponse> {
    const data = await this.post<AuthResponse>(API_ROUTES.AUTH.LOGIN, {
      identifier,
      password,
    });

    this.persistUserSession(extractUser(data));

    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("auth-change"));
    }

    return data;
  }

  async register(
    name: string,
    email: string,
    password: string,
  ): Promise<{ access_token?: string }> {
    return this.post<{ access_token?: string }>(API_ROUTES.USERS.REGISTER, {
      name,
      email,
      password,
    });
  }

  async infoUser(): Promise<AuthSessionResponse> {
    return this.get<AuthSessionResponse>(API_ROUTES.AUTH.ME, {
      suppressGlobalLoader: true,
    });
  }

  async syncSession(emitEvent = false): Promise<UserResponseDto | null> {
    if (this.syncPromise) {
      return this.syncPromise;
    }

    this.syncPromise = (async () => {
      try {
        const response = await this.infoUser();
        const user = extractUser(response);

        this.persistUserSession(user);

        if (emitEvent && typeof window !== "undefined") {
          window.dispatchEvent(new Event("auth-change"));
        }

        return user;
      } catch (error: unknown) {
        const authError = error as { status?: number };
        if (authError?.status === 401) {
          this.clearLocalSession();
        }
        return null;
      } finally {
        this.syncPromise = null;
      }
    })();

    return this.syncPromise;
  }

  async logout(): Promise<void> {
    try {
      await this.post(API_ROUTES.AUTH.LOGOUT);
    } catch (error) {
      console.error("Erro ao deslogar no servidor:", error);
    } finally {
      this.clearLocalSession();

      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("auth-change"));
        window.location.href = "/login";
      }
    }
  }
}

export const authService = new AuthService();
