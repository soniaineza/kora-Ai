import { api } from './client';
import type { QRMenuItem } from './types';

export const qrMenusApi = {
  list: (category?: string) => {
    const q = category ? `?category=${encodeURIComponent(category)}` : '';
    return api.get<QRMenuItem[]>(`/qr-menus${q}`);
  },
  create: (data: Partial<QRMenuItem>) => api.post<QRMenuItem>('/qr-menus', data),
  update: (id: number, data: Partial<QRMenuItem>) => api.put<QRMenuItem>(`/qr-menus/${id}`, data),
  delete: (id: number) => api.delete<void>(`/qr-menus/${id}`),
  getQrCode: () => api.get<{ svg: string; link: string }>('/qr-menus/qr-code'),
};
