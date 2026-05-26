export enum ShopeeOrderStatus {
  ALL = "ALL",
  UNPAID = "UNPAID",
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum ShopeeBuyerType {
  ALL = "ALL",
  NEW = "NEW",
  EXISTING = "EXISTING",
}

export enum ShopeeDevice {
  ALL = "ALL",
  APP = "APP",
  WEB = "WEB",
}

export enum ShopeeFraudStatus {
  ALL = "ALL",
  UNVERIFIED = "UNVERIFIED",
  VERIFIED = "VERIFIED",
  FRAUD = "FRAUD",
}

export interface ConversionReportOrderItem {
  itemName: string;
  itemPrice: string;
  actualAmount: string;
  qty: number;
  itemTotalCommission: string;
  itemShopeeCommissionRate: string;
  imageUrl: string;
  fraudStatus: string;
  refundAmount?: string; // Disponível no Validated Report
}

export interface ConversionReportOrder {
  orderId: string;
  orderStatus: ShopeeOrderStatus | string;
  shopType: string;
  items: ConversionReportOrderItem[];
}

export interface ConversionReport {
  purchaseTime: number;
  conversionId: string;
  totalCommission: string;
  sellerCommission: string;
  shopeeCommissionCapped: string;
  netCommission: string;
  buyerType: ShopeeBuyerType | string;
  utmContent: string;
  campaignType: string;
  orders: ConversionReportOrder[];
}

export interface ConversionReportPageInfo {
  limit: number;
  hasNextPage: boolean;
  scrollId: string | null;
}

export interface ConversionReportResult {
  nodes: ConversionReport[];
  pageInfo: ConversionReportPageInfo;
}

export interface ConversionReportFilters {
  purchaseTimeStart?: number;
  purchaseTimeEnd?: number;
  completeTimeStart?: number;
  completeTimeEnd?: number;
  orderStatus?: ShopeeOrderStatus;
  buyerType?: ShopeeBuyerType;
  device?: ShopeeDevice;
  fraudStatus?: ShopeeFraudStatus;
  shopType?: string[];
  shopId?: string;
  shopName?: string;
  orderId?: string;
  productId?: string;
  productName?: string;
  campaignType?: string;
  campaignPartnerName?: string;
  limit?: number;
  scrollId?: string;
}

export interface ValidatedReportFilters {
  validationId?: number;
  limit?: number;
  scrollId?: string;
}
