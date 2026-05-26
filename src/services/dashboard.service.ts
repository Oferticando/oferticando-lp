import { BaseService } from "./core/base.service";
import { API_ROUTES } from "@/shared/api";
import {
  DashboardAdminLegacyErrorResponse,
  DashboardAdminResponseDto,
  DashboardMeRequestDto,
} from "@/models/dashboard.model";

class DashboardService extends BaseService {
  async getAdminData(): Promise<
    DashboardAdminResponseDto | DashboardAdminLegacyErrorResponse
  > {
    return this.get<DashboardAdminResponseDto | DashboardAdminLegacyErrorResponse>(
      API_ROUTES.DASHBOARD.ADMIN,
    );
  }

  async getMeData(): Promise<DashboardMeRequestDto> {
    return this.get<DashboardMeRequestDto>(API_ROUTES.DASHBOARD.ME);
  }
}

export const dashboardService = new DashboardService();
