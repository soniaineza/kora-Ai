import { api } from './client';
import type { WhatsAppProduct } from './types';

export const whatsappApi = {
  listProducts: () => api.get<WhatsAppProduct[]>('/whatsapp/products'),
  syncCatalog: () => api.post<{ success: boolean }>('/whatsapp/sync'),
  addProduct: (data: Partial<WhatsAppProduct>) => api.post<WhatsAppProduct>('/whatsapp/products', data),
};
