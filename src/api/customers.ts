import { api } from './client';
import type { Customer, CustomerStats } from './types';

export const customersApi = {
  list: (params?: { search?: string; source?: string; status?: string; limit?: number; offset?: number }) => {
    const q = new URLSearchParams();
    if (params?.search) q.set('search', params.search);
    if (params?.source) q.set('source', params.source);
    if (params?.status) q.set('status', params.status);
    if (params?.limit) q.set('limit', String(params.limit));
    if (params?.offset) q.set('offset', String(params.offset));
    return api.get<{ customers: Customer[]; total: number }>(`/customers?${q}`);
  },
  getStats: () => api.get<CustomerStats>('/customers/stats'),
  create: (data: Partial<Customer>) => api.post<Customer>('/customers', data),
  update: (id: number, data: Partial<Customer>) => api.put<Customer>(`/customers/${id}`, data),
  delete: (id: number) => api.delete<void>(`/customers/${id}`),
};
