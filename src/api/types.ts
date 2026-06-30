export interface DashboardMetrics {
  todayVisitors: number;
  qrScans: number;
  whatsappLeads: number;
  revenueToday: number;
  revenueTrend: number;
  visitorsTrend: number;
  qrTrend: number;
  leadsTrend: number;
}

export interface BusinessHealthItem {
  label: string;
  status: 'good' | 'warning' | 'critical';
}

export interface BusinessHealth {
  score: number;
  items: BusinessHealthItem[];
  suggestions: string[];
}

export interface OnlineAsset {
  title: string;
  status: string;
  statusColor: string;
  icon: string;
  primaryAction: string;
  secondaryAction: string;
}

export interface ActivityItem {
  title: string;
  time: string;
  icon: string;
  color: string;
}

export interface CampaignSummary {
  name: string;
  reach: string;
  conversions: string;
  status: 'Active' | 'Completed' | 'Draft';
}

export interface Recommendation {
  title: string;
  description: string;
}

export interface Customer {
  id: number;
  name: string;
  phone: string;
  lastInteraction: string;
  source: 'WhatsApp' | 'QR' | 'Website' | 'Walk-in';
  status: 'Active' | 'Lead' | 'Inactive';
}

export interface CustomerStats {
  total: number;
  newThisWeek: number;
  activeLeads: number;
  whatsappContacts: number;
}

export interface Campaign {
  id: number;
  name: string;
  goal: string;
  reach: string;
  clicks: string;
  conversions: string;
  status: 'Active' | 'Completed' | 'Draft';
}

export interface AnalyticsStats {
  totalRevenue: number;
  websiteVisits: number;
  qrScans: number;
  newLeads: number;
}

export interface TrafficDay {
  day: string;
  visits: number;
}

export interface ConversionSource {
  label: string;
  value: number;
  color: string;
}

export interface Integration {
  name: string;
  description: string;
  icon: string;
  color: string;
  connected: boolean;
  category: string;
}

export interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlight?: boolean;
  current?: boolean;
}

export interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: string;
}

export interface QRMenuItem {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
}

export interface WhatsAppProduct {
  id: number;
  name: string;
  price: string;
  synced: boolean;
}

export interface SocialPost {
  id: number;
  date: string;
  time: string;
  platform: string[];
  content: string;
  image: string;
}

export interface ConnectedAccount {
  platform: string;
  handle: string;
  connected: boolean;
}

export interface TeamMember {
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  avatar: string;
}

export interface Poster {
  title: string;
  imageUrl: string;
}

export interface GrowthPlan {
  goal: string;
  budget: string;
  businessType: string;
  posters: Poster[];
  whatsappMessage: string;
  weeklyPlan: { day: string; title: string; description: string }[];
}

export interface WebsiteData {
  businessName: string;
  tagline: string;
  about: string;
  theme: string;
  brandColor: string;
  logo: string;
  gallery: string[];
}
