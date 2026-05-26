export interface RetailStore {
  id: number;
  name: string;
  slug: string;
  logo?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface RetailStorePayload {
  name: string;
  slug?: string;
  logo?: string;
}
