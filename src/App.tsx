import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { Dashboard } from './pages/Dashboard';
import { GrowthCenter } from './pages/GrowthCenter';
import { Customers } from './pages/Customers';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { WebsiteBuilder } from './pages/WebsiteBuilder';
import { QRMenus } from './pages/QRMenus';
import { WhatsAppCatalog } from './pages/WhatsAppCatalog';
import { PosterGenerator } from './pages/PosterGenerator';
import { VideoGenerator } from './pages/VideoGenerator';
import { SocialScheduler } from './pages/SocialScheduler';
import { Campaigns } from './pages/Campaigns';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';
import { Billing } from './pages/Billing';
import { Integrations } from './pages/Integrations';
export function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/growth" element={<GrowthCenter />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/website" element={<WebsiteBuilder />} />
          <Route path="/qr" element={<QRMenus />} />
          <Route path="/whatsapp" element={<WhatsAppCatalog />} />
          <Route path="/posters" element={<PosterGenerator />} />
          <Route path="/videos" element={<VideoGenerator />} />
          <Route path="/social" element={<SocialScheduler />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="*" element={<PlaceholderPage />} />
        </Routes>
      </AppShell>
    </BrowserRouter>);
}