import React from 'react';
import {
  TrendingUp,
  Users,
  QrCode,
  MessageCircle,
  Sparkles,
  CheckCircle2,
  Globe,
  Image as ImageIcon,
  Video,
  ArrowRight,
  Activity,
  Calendar,
  Facebook,
  Instagram,
  Mail,
  Smartphone,
  MoreHorizontal,
  Play,
  Megaphone } from
'lucide-react';
export function Dashboard() {
  return (
    <div className="space-y-8 pb-12">
      {/* SECTION 1: WELCOME HERO */}
      <section className="bg-white rounded-2xl p-8 shadow-soft border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-kora-100 to-transparent rounded-full blur-3xl -mr-20 -mt-20 opacity-50 pointer-events-none"></div>

        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Good Morning, Sunny Cafe 👋
          </h1>
          <p className="text-gray-500 mb-8 text-lg">
            Your business is growing. Here's what's happening today.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard title="Today's Visitors" value="124" trend="+12%" />
            <MetricCard title="QR Scans" value="45" trend="+5%" />
            <MetricCard title="WhatsApp Leads" value="12" trend="+20%" />
            <MetricCard
              title="Sales Opportunities"
              value="450K RWF"
              trend="+8%" />
            
          </div>

          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-2.5 bg-kora-500 hover:bg-kora-600 text-white font-medium rounded-xl transition-colors shadow-glow flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Generate Campaign
            </button>
            <button className="px-6 py-2.5 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 font-medium rounded-xl transition-colors">
              Create Poster
            </button>
            <button className="px-6 py-2.5 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 font-medium rounded-xl transition-colors">
              View Analytics
            </button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* SECTION 2: AI BUSINESS ASSISTANT */}
        <section className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-soft-lg text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-kora-500/20 flex items-center justify-center text-kora-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold">AI Business Assistant</h2>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-2 flex items-center gap-3 mb-6 focus-within:bg-white/15 transition-colors">
              <input
                type="text"
                placeholder="What would you like to grow today? (e.g. Increase weekend sales)"
                className="bg-transparent border-none outline-none w-full text-white placeholder-gray-400 px-3 py-2" />
              
              <button className="p-2 bg-kora-500 hover:bg-kora-600 rounded-lg transition-colors">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div>
              <p className="text-sm text-gray-400 mb-3">AI Suggestions:</p>
              <div className="flex flex-wrap gap-2">
                <SuggestionPill text="Generate 30-Day Marketing Plan" />
                <SuggestionPill text="Create Posters" />
                <SuggestionPill text="Generate Social Content" />
                <SuggestionPill text="Create WhatsApp Campaign" />
                <SuggestionPill text="Generate Promotional Video" />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: BUSINESS HEALTH SCORE */}
        <section className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Business Health Score
          </h2>

          <div className="flex items-center justify-center mb-8">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 36 36">
                
                <path
                  className="text-gray-100"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                
                <path
                  className="text-kora-500"
                  strokeWidth="3"
                  strokeDasharray="85, 100"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-bold text-gray-900">85</span>
                <span className="text-xs text-gray-500">/100</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <HealthItem label="Website Status" status="good" />
            <HealthItem label="Google Presence" status="warning" />
            <HealthItem label="Social Activity" status="good" />
            <HealthItem label="QR Usage" status="good" />
          </div>

          <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
            <p className="text-sm font-medium text-orange-800 mb-2">
              Suggestions to improve:
            </p>
            <ul className="text-sm text-orange-700 space-y-1 list-disc list-inside">
              <li>Complete Google profile</li>
              <li>Post 3 times this week</li>
            </ul>
          </div>
        </section>
      </div>

      {/* SECTION 4: ONLINE ASSETS */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Your Online Assets
          </h2>
          <button className="text-sm text-kora-600 font-medium hover:text-kora-700">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AssetCard
            icon={Globe}
            title="Website"
            status="Live"
            statusColor="text-green-600 bg-green-50"
            primaryAction="Manage"
            secondaryAction="Preview" />
          
          <AssetCard
            icon={QrCode}
            title="QR Menu"
            status="35 Items"
            statusColor="text-blue-600 bg-blue-50"
            primaryAction="Manage"
            secondaryAction="Download" />
          
          <AssetCard
            icon={MessageCircle}
            title="WhatsApp Catalog"
            status="50 Products"
            statusColor="text-emerald-600 bg-emerald-50"
            primaryAction="Manage"
            secondaryAction="Share" />
          
          <AssetCard
            icon={ImageIcon}
            title="AI Posters"
            status="12 Generated"
            statusColor="text-purple-600 bg-purple-50"
            primaryAction="Manage"
            secondaryAction="Generate" />
          
          <AssetCard
            icon={Video}
            title="Promo Videos"
            status="3 Generated"
            statusColor="text-pink-600 bg-pink-50"
            primaryAction="Manage"
            secondaryAction="Generate" />
          
          <AssetCard
            icon={Globe}
            title="Landing Pages"
            status="2 Active"
            statusColor="text-indigo-600 bg-indigo-50"
            primaryAction="Manage"
            secondaryAction="Create New" />
          
        </div>
      </section>

      {/* SECTION 7: AI RECOMMENDATIONS */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-kora-500" /> Recommended for You
        </h2>
        <div className="flex overflow-x-auto kora-scroll pb-4 gap-4 snap-x">
          <RecommendationCard
            title="Launch Weekend Promotion"
            desc="Boost sales this Saturday" />
          
          <RecommendationCard
            title="Generate New Posters"
            desc="Refresh your storefront" />
          
          <RecommendationCard
            title="Improve Website SEO"
            desc="Get found on Google" />
          
          <RecommendationCard
            title="Create WhatsApp Broadcast"
            desc="Reach 150+ customers" />
          
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* SECTION 6: RECENT ACTIVITY */}
        <section className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Recent Activity
          </h2>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
            <ActivityItem
              title="Poster generated"
              time="2 hours ago"
              icon={ImageIcon}
              color="bg-purple-100 text-purple-600" />
            
            <ActivityItem
              title="QR menu updated"
              time="5 hours ago"
              icon={QrCode}
              color="bg-blue-100 text-blue-600" />
            
            <ActivityItem
              title="Campaign launched"
              time="Yesterday"
              icon={Megaphone}
              color="bg-kora-100 text-kora-600" />
            
            <ActivityItem
              title="Website published"
              time="2 days ago"
              icon={Globe}
              color="bg-green-100 text-green-600" />
            
          </div>
        </section>

        {/* SECTION 10: CAMPAIGNS */}
        <section className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Active Campaigns
            </h2>
            <button className="text-sm text-kora-600 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            <CampaignRow
              name="Weekend Special"
              reach="2.4k"
              conversions="124"
              status="Active" />
            
            <CampaignRow
              name="New Menu Launch"
              reach="1.1k"
              conversions="56"
              status="Active" />
            
            <CampaignRow
              name="Holiday Promo"
              reach="5.8k"
              conversions="312"
              status="Completed" />
            
          </div>
        </section>
      </div>
    </div>);

}
function MetricCard({
  title,
  value,
  trend




}: {title: string;value: string;trend: string;}) {
  const isPositive = trend.startsWith('+');
  return (
    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
      <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
      <div className="flex items-end gap-3">
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        <span
          className={`text-sm font-medium mb-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          
          {trend}
        </span>
      </div>
    </div>);

}
function SuggestionPill({ text }: {text: string;}) {
  return (
    <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm transition-colors whitespace-nowrap">
      {text}
    </button>);

}
function HealthItem({
  label,
  status



}: {label: string;status: 'good' | 'warning' | 'error';}) {
  const colors = {
    good: 'text-green-500',
    warning: 'text-orange-500',
    error: 'text-red-500'
  };
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600">{label}</span>
      <CheckCircle2 className={`w-4 h-4 ${colors[status]}`} />
    </div>);

}
function AssetCard({
  icon: Icon,
  title,
  status,
  statusColor,
  primaryAction,
  secondaryAction
}: any) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-soft border border-gray-100 hover:shadow-soft-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-600">
          <Icon className="w-5 h-5" />
        </div>
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColor}`}>
          
          {status}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="flex gap-2">
        <button className="flex-1 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium rounded-lg transition-colors">
          {primaryAction}
        </button>
        <button className="flex-1 py-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 text-sm font-medium rounded-lg transition-colors">
          {secondaryAction}
        </button>
      </div>
    </div>);

}
function RecommendationCard({ title, desc }: {title: string;desc: string;}) {
  return (
    <div className="min-w-[280px] snap-start bg-gradient-to-br from-kora-50 to-white border border-kora-100 rounded-2xl p-5 cursor-pointer hover:shadow-soft transition-shadow">
      <div className="w-8 h-8 rounded-full bg-kora-100 flex items-center justify-center text-kora-600 mb-3">
        <Sparkles className="w-4 h-4" />
      </div>
      <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>);

}
function ActivityItem({ title, time, icon: Icon, color }: any) {
  return (
    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${color}`}>
          
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-100 bg-gray-50 shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-semibold text-gray-900 text-sm">{title}</h4>
          <span className="text-xs text-gray-500">{time}</span>
        </div>
      </div>
    </div>);

}
function CampaignRow({ name, reach, conversions, status }: any) {
  const isActive = status === 'Active';
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
      <div>
        <h4 className="font-medium text-gray-900">{name}</h4>
        <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
          <span>Reach: {reach}</span>
          <span>•</span>
          <span>Conv: {conversions}</span>
        </div>
      </div>
      <span
        className={`text-xs font-medium px-2.5 py-1 rounded-full ${isActive ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
        
        {status}
      </span>
    </div>);

}