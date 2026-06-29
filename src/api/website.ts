import { api } from './client';
import type { WebsiteData } from './types';

export const websiteApi = {
  get: () => api.get<WebsiteData>('/website'),
  save: (data: Partial<WebsiteData>) => api.put<WebsiteData>('/website', data),
  generate: () => api.post<WebsiteData>('/website/generate'),
  publish: () => api.post<{ url: string }>('/website/publish'),
};
