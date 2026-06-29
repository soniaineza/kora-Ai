import { api } from './client';
import type { AnalyticsStats, TrafficDay, ConversionSource } from './types';

export const analyticsApi = {
  getStats: (range?: string) => {
    const q = range ? `?range=${encodeURIComponent(range)}` : '';
    return api.get<AnalyticsStats>(`/analytics/stats${q}`);
  },
  getTraffic: (range?: string) => {
    const q = range ? `?range=${encodeURIComponent(range)}` : '';
    return api.get<TrafficDay[]>(`/analytics/traffic${q}`);
  },
  getConversionSources: () => api.get<ConversionSource[]>('/analytics/conversions'),
};
