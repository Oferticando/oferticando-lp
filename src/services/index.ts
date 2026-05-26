import { authService } from "./auth.service";
import { dashboardService } from "./dashboard.service";
import { offersService } from "./offers.service";
import { storeService } from "./stores.service";
import { retailStoresService } from "./retail-stores.service";
import { categoriesService } from "./categories.service";
import { userService } from "./user.service";
import { vitrineService } from "./vitrines.service";
import { whatsappService } from "./whatsapp.service";
import { shopeeService } from "./shopee.service";

export const ApiService = {
  auth: authService,
  dashboard: dashboardService,
  offers: offersService,
  stores: storeService,
  retailStores: retailStoresService,
  categories: categoriesService,
  users: userService,
  vitrines: vitrineService,
  whatsapp: whatsappService,
  shopee: shopeeService,
};
