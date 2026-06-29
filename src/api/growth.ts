import { api } from './client';
import type { GrowthPlan } from './types';

export const growthApi = {
  generatePlan: (data: { goal: string; budget: string; businessType: string }) =>
    api.post<GrowthPlan>('/growth/generate', data),
};
