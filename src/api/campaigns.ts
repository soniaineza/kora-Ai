import { api } from './client';
import type { Campaign } from './types';

export const campaignsApi = {
  list: (params?: { search?: string }) => {
    const q = new URLSearchParams();
    if (params?.search) q.set('search', params.search);
    return api.get<Campaign[]>(`/campaigns?${q}`);
  },
  create: (data: Partial<Campaign>) => api.post<Campaign>('/campaigns', data),
  update: (id: number, data: Partial<Campaign>) => api.put<Campaign>(`/campaigns/${id}`, data),
};
