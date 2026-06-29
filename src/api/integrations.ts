import { api } from './client';
import type { Integration } from './types';

export const integrationsApi = {
  list: () => api.get<Integration[]>('/integrations'),
  toggle: (name: string) => api.post<Integration>(`/integrations/${encodeURIComponent(name)}/toggle`),
};
