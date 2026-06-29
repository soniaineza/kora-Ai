import { api } from './client';
import type { DashboardMetrics, BusinessHealth, ActivityItem, CampaignSummary, Recommendation } from './types';

export const dashboardApi = {
  getMetrics: () => api.get<DashboardMetrics>('/dashboard/metrics'),
  getHealth: () => api.get<BusinessHealth>('/dashboard/health'),
  getActivity: () => api.get<ActivityItem[]>('/dashboard/activity'),
  getCampaigns: () => api.get<CampaignSummary[]>('/dashboard/campaigns'),
  getRecommendations: () => api.get<Recommendation[]>('/dashboard/recommendations'),
};
