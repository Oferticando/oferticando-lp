import { BaseService } from "./core/base.service";
import { API_ROUTES } from "@/shared/api";
import { 
  ConversionReportFilters, 
  ConversionReportResult, 
  ValidatedReportFilters 
} from "@/types/shopee";

class ShopeeService extends BaseService {
  /** 
   * GET /shopee/reports/conversions
   * Busca relatório de conversão de afiliados da Shopee
   */
  async getConversionReport(params: ConversionReportFilters): Promise<ConversionReportResult> {
    return this.get<ConversionReportResult>(API_ROUTES.SHOPEE.REPORTS.CONVERSIONS, { params });
  }

  /**
   * GET /shopee/reports/validated
   * Busca relatório de conversões validadas (comissões confirmadas)
   */
  async getValidatedReport(params: ValidatedReportFilters): Promise<ConversionReportResult> {
    return this.get<ConversionReportResult>(API_ROUTES.SHOPEE.REPORTS.VALIDATED, { params });
  }
}

export const shopeeService = new ShopeeService();
