import { BaseService } from "./core/base.service";
import { API_ROUTES } from "@/shared/api";

export interface WhatsappInstanceStatus {
  connected: boolean;
  instanceName?: string;
  status?: string;
  autoPostActive?: boolean;
  defaultTemplate?: string;
  autoPostMinDelaySeconds?: number;
  autoPostMaxDelaySeconds?: number;
  autoPostMessagePrefixes?: string[] | string;
  autoPostCallToActions?: string[] | string;
  webhookActive?: boolean;
  qrcode?: string;
}

export interface WhatsappGroup {
  id: number;
  jid: string;
  name: string;
  isDonor: boolean;
  isReceptor: boolean;
  isAdmin: boolean;
  donorGroupIds?: number[];
  vitrineId: number | null;
}

export interface CloneQueueItem {
  id: number;
  originalText?: string;
  originalLink?: string;
  affiliateLink?: string;
  imageUrl?: string;
  formattedText?: string;
  previewText?: string;
  storeName?: string;
  ghostMention?: boolean;
  status: "PENDING" | "APPROVED" | "REJECTED" | "POSTED";
  createdAt: string;
}

export interface CloneQueueApproveInput {
  ghostMention?: boolean;
}

export interface CloneQueueApproveResponse {
  message: string;
  offer: {
    id: number;
    title: string;
    slug: string;
  };
  delivery?: {
    queued?: boolean;
    totalTargets?: number;
    sentCount?: number;
    failedCount?: number;
  };
}

export interface CloneQueueRejectResponse {
  message: string;
}

export interface PaginatedQueueResponse {
  data: CloneQueueItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface WhatsappSettingsInput {
  defaultTemplate?: string;
  autoPostActive?: boolean;
  autoPostMinDelaySeconds?: number;
  autoPostMaxDelaySeconds?: number;
  autoPostMessagePrefixes?: string[] | string;
  autoPostCallToActions?: string[] | string;
}

class WhatsappService extends BaseService {
  /** POST /api/whatsapp/connect — Criar/conectar instância */
  async connect(vitrineName?: string): Promise<WhatsappInstanceStatus> {
    return this.post<WhatsappInstanceStatus>(
      API_ROUTES.WHATSAPP.CONNECT,
      {
        ...(vitrineName ? { vitrineName } : {}),
      },
      {
        globalLoaderMessage:
          "Criando e conectando sua instancia do WhatsApp...",
      },
    );
  }

  /** GET /api/whatsapp/status — Status da instância */
  async getStatus(): Promise<WhatsappInstanceStatus> {
    return this.get<WhatsappInstanceStatus>(API_ROUTES.WHATSAPP.STATUS);
  }

  async disconnect(): Promise<{ message?: string }> {
    return this.delete<{ message?: string }>(API_ROUTES.WHATSAPP.DISCONNECT, {
      globalLoaderMessage: "Desconectando a instancia do WhatsApp...",
    });
  }

  /** POST /api/whatsapp/webhook/setup/:instanceName — Verificar/configurar webhook */
  async setupWebhook(instanceName: string): Promise<{ message: string }> {
    return this.post<{ message: string }>(
      API_ROUTES.WHATSAPP.SETUP_WEBHOOK(instanceName),
      undefined,
      {
        globalLoaderMessage: "Validando o webhook da sua instancia...",
      },
    );
  }

  /** GET /api/whatsapp/groups/:instanceName — Listar grupos */
  async getGroups(instanceName: string): Promise<WhatsappGroup[]> {
    return this.get<WhatsappGroup[]>(API_ROUTES.WHATSAPP.GROUPS(instanceName));
  }

  /** POST /api/whatsapp/groups/:instanceName/sync — Forçar sync */
  async syncGroups(instanceName: string): Promise<WhatsappGroup[]> {
    return this.post<WhatsappGroup[]>(
      API_ROUTES.WHATSAPP.SYNC_GROUPS(instanceName),
      undefined,
      {
        globalLoaderMessage: "Sincronizando grupos do WhatsApp...",
        timeout: 60000,
      },
    );
  }

  async checkCapacity(instanceName: string): Promise<{
    expanded: number;
    groups: WhatsappGroup[];
  }> {
    return this.post<{
      expanded: number;
      groups: WhatsappGroup[];
    }>(API_ROUTES.WHATSAPP.CHECK_CAPACITY(instanceName), undefined, {
      globalLoaderMessage: "Verificando capacidade dos grupos...",
    });
  }

  async expandGroup(id: number): Promise<WhatsappGroup> {
    return this.post<WhatsappGroup>(
      API_ROUTES.WHATSAPP.EXPAND_GROUP(id),
      undefined,
      {
        globalLoaderMessage: "Expandindo familia do grupo...",
      },
    );
  }

  /** PUT /api/whatsapp/groups/:id/config — Atualizar doador/receptor/vitrine */
  async updateGroupConfig(
    id: number,
    config: {
      isDonor?: boolean;
      isReceptor?: boolean;
      vitrineId?: number | null;
    },
  ): Promise<WhatsappGroup> {
    return this.put<WhatsappGroup>(
      API_ROUTES.WHATSAPP.GROUP_CONFIG(id),
      config,
      {
        globalLoaderMessage: "Salvando configuracao do grupo...",
      },
    );
  }

  /** POST /api/whatsapp/groups/pair — Vincular receptor a doador */
  async pairGroups(
    donorId: number,
    receptorId: number,
  ): Promise<{ receptor: WhatsappGroup; donors: WhatsappGroup[] }> {
    return this.post(
      API_ROUTES.WHATSAPP.PAIR_GROUPS,
      { donorId, receptorId },
      {
        globalLoaderMessage: "Vinculando grupo receptor...",
      },
    );
  }

  /** DELETE /api/whatsapp/groups/:id/unpair — Desvincular receptor */
  async unpairGroup(
    receptorId: number,
    donorId?: number,
  ): Promise<{
    receptorId: number;
    donorId: number | null;
    remainingDonors: number;
  }> {
    const url = donorId
      ? `${API_ROUTES.WHATSAPP.UNPAIR_GROUP(receptorId)}?donorId=${donorId}`
      : API_ROUTES.WHATSAPP.UNPAIR_GROUP(receptorId);
    return this.delete<{
      receptorId: number;
      donorId: number | null;
      remainingDonors: number;
    }>(url, {
      globalLoaderMessage: "Removendo vinculacao do grupo...",
    });
  }

  /** PUT /api/whatsapp/settings/:instanceName — Atualizar settings */
  async updateSettings(
    instanceName: string,
    settings: WhatsappSettingsInput,
  ): Promise<void> {
    return this.put<void>(
      API_ROUTES.WHATSAPP.SETTINGS(instanceName),
      settings,
      {
        globalLoaderMessage: "Salvando configuracoes do WhatsApp...",
      },
    );
  }

  /** GET /api/whatsapp/queue/:instanceName — Listar fila paginada */
  async getQueue(
    instanceName: string,
    status?: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedQueueResponse> {
    const params = new URLSearchParams();
    if (status) params.append("status", status);
    params.append("page", page.toString());
    params.append("limit", limit.toString());

    return this.get<PaginatedQueueResponse>(
      `${API_ROUTES.WHATSAPP.QUEUE(instanceName)}?${params.toString()}`,
    );
  }

  /** POST /api/whatsapp/queue/:id/approve — Aprovar */
  async approveItem(
    id: number,
    input?: CloneQueueApproveInput,
  ): Promise<CloneQueueApproveResponse> {
    return this.post<CloneQueueApproveResponse>(
      API_ROUTES.WHATSAPP.QUEUE_APPROVE(id),
      input,
      {
        globalLoaderMessage: "Aprovando e enviando oferta...",
      },
    );
  }

  /** POST /api/whatsapp/queue/:id/reject — Rejeitar */
  async rejectItem(id: number): Promise<CloneQueueRejectResponse> {
    return this.post<CloneQueueRejectResponse>(
      API_ROUTES.WHATSAPP.QUEUE_REJECT(id),
      undefined,
      {
        globalLoaderMessage: "Rejeitando item da fila...",
      },
    );
  }

  /** PUT /api/whatsapp/queue/:id — Editar texto */
  async editItem(id: number, formattedText: string): Promise<void> {
    return this.put<void>(
      API_ROUTES.WHATSAPP.QUEUE_EDIT(id),
      { formattedText },
      {
        globalLoaderMessage: "Salvando texto da oferta...",
      },
    );
  }

  async getGroupInviteLink(id: number): Promise<{ inviteLink: string }> {
    return this.get<{ inviteLink: string }>(
      API_ROUTES.WHATSAPP.INVITE_LINK(id),
    );
  }

  async getGroupFamily(
    id: number,
  ): Promise<{ isFamily: boolean; childrenCount: number; parentId?: number }> {
    return this.get<{
      isFamily: boolean;
      childrenCount: number;
      parentId?: number;
    }>(API_ROUTES.WHATSAPP.FAMILY(id));
  }

  async getGroupDonors(id: number): Promise<WhatsappGroup[]> {
    return this.get<WhatsappGroup[]>(API_ROUTES.WHATSAPP.GROUP_DONORS(id));
  }
}

export const whatsappService = new WhatsappService();
