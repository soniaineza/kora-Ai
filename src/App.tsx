import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppShell } from './components/layout/AppShell';
import { ToastProvider } from './components/ui/Toast';
import { ProtectedRoute } from './components/ProtectedRoute';
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
import { LoginPage } from './pages/LoginPage';
import { CompanyRegistration } from './pages/CompanyRegistration';
export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <ToastProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/onboarding" element={
            <ProtectedRoute requireCompany={false}>
              <CompanyRegistration />
            </ProtectedRoute>
          } />
          <Route path="/*" element={
            <ProtectedRoute>
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
            </ProtectedRoute>
          } />
        </Routes>
      </ToastProvider>
      </AuthProvider>
    </BrowserRouter>);
}