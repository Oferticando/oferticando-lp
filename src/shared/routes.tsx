export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/cadastro",
  VITRINES_PUBLIC: "/vitrines",
  OFFERS: {
    LIST: "/ofertas",
    VIEW: (slug: string) => `/oferta/${slug}`,
    VITRINE: (slug: string) => `/v/${slug}`,
  },
  PROFILE: {
    BASE: "/perfil",
    DATA: "/perfil/data",
    SETTINGS: "/perfil/settings",
    OFFERS: {
      LIST: "/perfil/offers",
      NEW: "/perfil/offers/new",
      IMPORT: "/perfil/offers/import",
      VIEW: (id: string | number) => `/perfil/offers/${id}/view`,
      EDIT: (id: string | number) => `/perfil/offers/${id}/edit`,
    },
    VITRINE: {
      EDIT: "/perfil/vitrine/edit",
    },
    CLONE: {
      WHATSAPP: "/perfil/clone/whatsapp",
      GROUPS: "/perfil/clone/groups",
      QUEUE: "/perfil/clone/queue",
    },
    SHOPEE: "/perfil/shopee",
  },
  ADMIN: {
    BASE: "/admin",
    CLONE: {
      WHATSAPP: "/admin/clone/whatsapp",
      GROUPS: "/admin/clone/groups",
      QUEUE: "/admin/clone/queue",
    },
    OFFERS: {
      LIST: "/admin/offers/list",
      CREATE: "/admin/offers/new",
      IMPORT: "/admin/offers/import",
      EDIT: (id: string | number) => `/admin/offers/edit/${id}`,
    },
    VITRINE: {
      LIST: "/admin/vitrine/list",
      NEW: "/admin/vitrine/new",
      EDIT: (id: string | number) => `/admin/vitrine/${id}/edit`,
      VIEW: (id: string | number) => `/admin/vitrine/${id}/view`,
    },
    USER: {
      LIST: "/admin/user/list",
      NEW: "/admin/user/new",
      EDIT: (id: string | number) => `/admin/user/${id}/edit`,
      VIEW: (id: string | number) => `/admin/user/${id}/view`,
    },
    STORE: {
      LIST: "/admin/store/list",
      NEW: "/admin/store/new",
      EDIT: (id: string | number) => `/admin/store/${id}/edit`,
      VIEW: (id: string | number) => `/admin/store/${id}/view`,
    },
    SETTINGS: "/admin/settings",
    SHOPEE: "/admin/shopee",
  },
};
