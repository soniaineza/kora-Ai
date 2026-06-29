import type {
  DashboardMetrics, BusinessHealth, ActivityItem, CampaignSummary, Recommendation,
  Customer, CustomerStats, Campaign, AnalyticsStats, TrafficDay, ConversionSource,
  Integration, Plan, Invoice, GrowthPlan,
} from '../api/types';
import {
  mockDashboardMetrics, mockBusinessHealth, mockActivity, mockCampaignSummaries, mockRecommendations,
  mockCustomers, mockCampaigns, mockAnalyticsStats, mockTraffic, mockConversionSources,
  mockIntegrations, mockPlans, mockInvoices, mockGrowthPlan,
} from './data';

function delay<T>(data: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

export const mockHandlers = {
  dashboard: {
    getMetrics: () => delay<DashboardMetrics>(mockDashboardMetrics),
    getHealth: () => delay<BusinessHealth>(mockBusinessHealth),
    getActivity: () => delay<ActivityItem[]>(mockActivity),
    getCampaigns: () => delay<CampaignSummary[]>(mockCampaignSummaries),
    getRecommendations: () => delay<Recommendation[]>(mockRecommendations),
  },
  customers: {
    list: () => delay<{ customers: Customer[]; total: number }>({ customers: mockCustomers, total: mockCustomers.length }),
    getStats: () => delay<CustomerStats>({
      total: mockCustomers.length,
      newThisWeek: 6,
      activeLeads: mockCustomers.filter(c => c.status === 'Lead').length,
      whatsappContacts: mockCustomers.filter(c => c.source === 'WhatsApp').length,
    }),
  },
  campaigns: {
    list: () => delay<Campaign[]>(mockCampaigns),
  },
  analytics: {
    getStats: () => delay<AnalyticsStats>(mockAnalyticsStats),
    getTraffic: () => delay<TrafficDay[]>(mockTraffic),
    getConversionSources: () => delay<ConversionSource[]>(mockConversionSources),
  },
  integrations: {
    list: () => delay<Integration[]>(mockIntegrations),
  },
  billing: {
    getPlans: () => delay<Plan[]>(mockPlans),
    getInvoices: () => delay<Invoice[]>(mockInvoices),
  },
  growth: {
    generatePlan: (data: { goal: string; budget: string; businessType: string }) =>
      delay<GrowthPlan>({ ...mockGrowthPlan, ...data }, 2000),
  },
};
