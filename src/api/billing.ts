import { api } from './client';
import type { Plan, Invoice } from './types';

export const billingApi = {
  getPlans: () => api.get<Plan[]>('/billing/plans'),
  getCurrentPlan: () => api.get<{ name: string; price: string; renewsAt: string }>('/billing/current'),
  getInvoices: () => api.get<Invoice[]>('/billing/invoices'),
  updatePlan: (planName: string) => api.post<{ success: boolean }>('/billing/update', { plan: planName }),
};
