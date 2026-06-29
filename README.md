# Kora AI — Business Growth Platform

A React + TypeScript dashboard for small businesses to manage their online presence, marketing campaigns, customer relationships, and AI-powered content generation.

## Tech Stack

- **React 18** with TypeScript
- **Vite 5** for build tooling
- **Tailwind CSS 3** for styling (custom `kora` theme)
- **Framer Motion** for animations
- **React Router DOM** for routing
- **Lucide React** for icons

## Getting Started

```bash
npm install
npm run dev
```

## Available Scripts

- `npm run dev` — Start development server with mock API
- `npm run build` — Production build to `dist/`
- `npm run preview` — Preview production build
- `npm run lint` — Run ESLint

## Project Structure

```
src/
  api/          # API services and types
    client.ts   # HTTP client with mock fallback
    types.ts    # Shared TypeScript interfaces
    dashboard.ts, customers.ts, campaigns.ts, ...
  hooks/
    useApi.ts   # Generic data fetching hook
  mocks/
    data.ts     # Mock data fixtures
    handlers.ts # Mock API handlers
  pages/        # Route page components (15 pages)
  components/
    layout/
      AppShell.tsx  # Sidebar, header, command palette, AI drawer
```

## Mock API

In development, all API calls are intercepted by a built-in mock layer (`src/api/client.ts`). It returns realistic mock data with simulated latency. To connect a real backend, set the `VITE_API_URL` environment variable and remove the mock handler logic from `client.ts`.

## Features

- Dashboard with metrics, health score, activity feed, and campaigns
- AI Growth Center (simulated campaign generation)
- Customer management with search, filter, and pagination
- Website builder with live preview
- QR menu manager with table tent cards
- WhatsApp catalog sync
- AI poster and video generators
- Social media content scheduler
- Marketing campaigns tracker
- Business analytics with traffic and conversion charts
- Settings (profile, branding, users, subscription, integrations, notifications, security)
- Billing with plan comparison and invoice history
- Third-party integrations marketplace
