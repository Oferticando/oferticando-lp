import { ROUTES } from "./routes";
import { UserRole } from "@/enum/role-user.enum";

export interface NavMenuItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  sectionHeader?: string; // Título da seção se este item iniciar uma nova
}

export const ADMIN_MENU: NavMenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "pi-chart-bar",
    href: ROUTES.ADMIN.BASE,
  },
  {
    id: "offers",
    label: "Ofertas",
    icon: "pi-tag",
    href: ROUTES.ADMIN.OFFERS.LIST,
  },
  {
    id: "vitrines",
    label: "Páginas de Ofertas",
    icon: "pi-shop",
    href: ROUTES.ADMIN.VITRINE.LIST,
  },
  {
    id: "stores",
    label: "Lojas",
    icon: "pi-building",
    href: ROUTES.ADMIN.STORE.LIST,
  },
  {
    id: "users",
    label: "Membros",
    icon: "pi-users",
    href: ROUTES.ADMIN.USER.LIST,
  },
  {
    id: "clone",
    label: "WhatsApp",
    icon: "pi-whatsapp",
    href: ROUTES.ADMIN.CLONE.WHATSAPP,
    sectionHeader: "Ferramentas",
  },
  {
    id: "queue",
    label: "Fila de Moderação",
    icon: "pi-list",
    href: ROUTES.ADMIN.CLONE.QUEUE,
  },
  {
    id: "shopee",
    label: "Shopee",
    icon: "pi-shopping-bag",
    href: ROUTES.ADMIN.SHOPEE,
    sectionHeader: "Marketplaces",
  },
  {
    id: "settings",
    label: "Configurações",
    icon: "pi-cog",
    href: ROUTES.ADMIN.SETTINGS,
  },
];

export const PROFILE_MENU: NavMenuItem[] = [
  {
    id: "dashboard",
    label: "Meu Perfil",
    icon: "pi-th-large",
    href: ROUTES.PROFILE.BASE,
  },
  {
    id: "offers",
    label: "Minhas Ofertas",
    icon: "pi-tag",
    href: ROUTES.PROFILE.OFFERS.LIST,
  },
  {
    id: "vitrines",
    label: "Minhas Vitrines",
    icon: "pi-shop",
    href: ROUTES.PROFILE.VITRINE.EDIT,
  },
  {
    id: "clone",
    label: "WhatsApp",
    icon: "pi-whatsapp",
    href: ROUTES.PROFILE.CLONE.WHATSAPP,
  },
  {
    id: "queue",
    label: "Fila de Moderação",
    icon: "pi-list",
    href: ROUTES.PROFILE.CLONE.QUEUE,
  },
  {
    id: "shopee",
    label: "Shopee",
    icon: "pi-shopping-bag",
    href: ROUTES.PROFILE.SHOPEE,
    sectionHeader: "Marketplaces",
  },
  {
    id: "settings",
    label: "Configurações",
    icon: "pi-cog",
    href: ROUTES.PROFILE.DATA,
  },
];

/**
 * Retorna os itens de menu baseados na role do usuário
 */
export const getNavigationByRole = (role?: string | null): NavMenuItem[] => {
  const normalizedRole = role?.toLowerCase();
  
  if (normalizedRole === UserRole.ADMIN) {
    return ADMIN_MENU;
  }
  
  return PROFILE_MENU;
};
