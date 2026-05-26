export interface Store {
  id: number;
  name: string;
  slug: string;
  logo: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateAndUpdateStoreDto {
  name: string;
  slug: string;
  logo: string;
}
