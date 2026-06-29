import { mockHandlers } from '../mocks/handlers';

type HandlerFn = (...args: unknown[]) => unknown;
type HandlerModule = {
  [key: string]: {
    [key: string]: HandlerFn | undefined;
  };
};

const handlers = mockHandlers as unknown as HandlerModule;

function delay<T>(data: T, ms = 200): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

function matchMock(endpoint: string, method: string): { handler: (...args: unknown[]) => unknown; params: unknown[] } | null {
  const path = endpoint.split('?')[0];
  const m = method.toLowerCase();

  const routes: [string, string, string, ...unknown[]][] = [
    ['get', '/dashboard/metrics', 'dashboard.getMetrics'],
    ['get', '/dashboard/health', 'dashboard.getHealth'],
    ['get', '/dashboard/activity', 'dashboard.getActivity'],
    ['get', '/dashboard/campaigns', 'dashboard.getCampaigns'],
    ['get', '/dashboard/recommendations', 'dashboard.getRecommendations'],
    ['get', '/customers', 'customers.list'],
    ['get', '/customers/stats', 'customers.getStats'],
    ['get', '/campaigns', 'campaigns.list'],
    ['get', '/analytics/stats', 'analytics.getStats'],
    ['get', '/analytics/traffic', 'analytics.getTraffic'],
    ['get', '/analytics/conversions', 'analytics.getConversionSources'],
    ['get', '/integrations', 'integrations.list'],
    ['get', '/billing/plans', 'billing.getPlans'],
    ['get', '/billing/invoices', 'billing.getInvoices'],
  ];

  for (const [routeMethod, routePath, handlerPath] of routes) {
    if (routeMethod === m && routePath === path) {
      const parts = handlerPath.split('.');
      const h = handlers[parts[0]]?.[parts[1]];
      if (h) return { handler: h, params: [] };
    }
  }

  if (m === 'post' && path === '/growth/generate') {
    const h = handlers.growth?.generatePlan;
    if (h) return { handler: h, params: [] };
  }

  return null;
}

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const mock = matchMock(endpoint, options?.method || 'GET');
  if (mock) {
    const result = await mock.handler(...mock.params);
    return delay(result as T);
  }

  const BASE_URL = import.meta.env.VITE_API_URL || '/api';
  const url = `${BASE_URL}${endpoint}`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(body || res.statusText);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

export const api = {
  get: <T>(endpoint: string) => request<T>(endpoint),
  post: <T>(endpoint: string, data?: unknown) =>
    request<T>(endpoint, { method: 'POST', body: data ? JSON.stringify(data) : undefined }),
  put: <T>(endpoint: string, data: unknown) =>
    request<T>(endpoint, { method: 'PUT', body: JSON.stringify(data) }),
  delete: <T>(endpoint: string) => request<T>(endpoint, { method: 'DELETE' }),
};
