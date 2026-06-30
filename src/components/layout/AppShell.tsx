import { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Sparkles, Globe, QrCode, MessageCircle,
  Image as ImageIcon, Video, Calendar, Users, Megaphone,
  BarChart3, Puzzle, CreditCard, Settings,
  ChevronLeft, ChevronRight, Search, Bell,
  Moon, Sun, X, Send, ChevronDown, Menu, LogOut,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const navSections = [
  {
    label: 'Main',
    items: [
      { name: 'Dashboard', path: '/', icon: LayoutDashboard },
      { name: 'Growth Center', path: '/growth', icon: Sparkles },
    ],
  },
  {
    label: 'Content',
    items: [
      { name: 'Website Builder', path: '/website', icon: Globe },
      { name: 'QR Menus', path: '/qr', icon: QrCode },
      { name: 'WhatsApp Catalog', path: '/whatsapp', icon: MessageCircle },
      { name: 'Poster Generator', path: '/posters', icon: ImageIcon },
      { name: 'Video Generator', path: '/videos', icon: Video },
    ],
  },
  {
    label: 'Marketing',
    items: [
      { name: 'Social Scheduler', path: '/social', icon: Calendar },
      { name: 'Campaigns', path: '/campaigns', icon: Megaphone },
      { name: 'Customers', path: '/customers', icon: Users },
      { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    ],
  },
];

const bottomItems = [
  { name: 'Integrations', path: '/integrations', icon: Puzzle },
  { name: 'Billing', path: '/billing', icon: CreditCard },
  { name: 'Settings', path: '/settings', icon: Settings },
];

function Sidebar({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) {
  const location = useLocation();
  const { company, logout } = useAuth();
  const navigate = useNavigate();

  const initials = company?.name
    ?.split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'K';

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 z-10 lg:hidden backdrop-blur-sm" onClick={toggleSidebar} />
      )}
      <aside
        className={`bg-white h-screen flex flex-col transition-all duration-300 fixed lg:relative z-20 border-r border-border
          ${isOpen ? 'w-64 left-0 shadow-premium' : 'w-[72px] -left-16 lg:left-0'}`}
      >
        <div className="h-16 flex items-center px-4 border-b border-border">
          {isOpen ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-2xl bg-charcoal flex items-center justify-center">
                <span className="text-white text-sm font-bold">K</span>
              </div>
              <span className="text-charcoal font-semibold text-sm tracking-tight">Kora AI</span>
            </div>
          ) : (
            <div className="w-8 h-8 mx-auto rounded-2xl bg-charcoal flex items-center justify-center">
              <span className="text-white text-sm font-bold">K</span>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-2.5 space-y-5">
          {navSections.map((section) => (
            <div key={section.label}>
              {isOpen && (
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted px-2.5 mb-2">
                  {section.label}
                </p>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`flex items-center gap-3 px-2.5 py-2.5 rounded-2xl transition-all duration-200 text-sm ${
                        isActive
                          ? 'bg-charcoal text-white font-medium'
                          : 'text-silver hover:bg-hover hover:text-charcoal'
                      }`}
                      title={!isOpen ? item.name : undefined}
                    >
                      <item.icon className="w-[18px] h-[18px] shrink-0" />
                      {isOpen && <span className="truncate">{item.name}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="p-2.5 border-t border-border space-y-0.5">
          {bottomItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-2.5 py-2.5 rounded-2xl transition-all duration-200 text-sm ${
                  isActive
                    ? 'bg-charcoal text-white font-medium'
                    : 'text-silver hover:bg-hover hover:text-charcoal'
                }`}
                title={!isOpen ? item.name : undefined}
              >
                <item.icon className="w-[18px] h-[18px] shrink-0" />
                {isOpen && <span className="truncate">{item.name}</span>}
              </Link>
            );
          })}

          {isOpen && (
            <div className="mt-5 mx-0.5 p-4 rounded-3xl bg-cream border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-2xl bg-charcoal flex items-center justify-center text-white text-xs font-bold">
                  {initials}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-charcoal truncate">{company?.name || 'My Business'}</p>
                  <p className="text-[10px] text-silver truncate">{company?.address || company?.type || ''}</p>
                </div>
              </div>
              <button
                onClick={() => { logout(); navigate('/login'); }}
                className="w-full py-2 text-xs font-medium text-silver hover:text-charcoal rounded-2xl hover:bg-white transition-all flex items-center justify-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" /> Sign Out
              </button>
            </div>
          )}
        </div>

        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-[22px] bg-white border border-border rounded-full p-1 shadow-premium-sm text-silver hover:text-charcoal transition-colors hidden lg:flex"
        >
          {isOpen ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        </button>
      </aside>
    </>
  );
}

function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const allItems = [...navSections.flatMap(s => s.items), ...bottomItems];
  const filtered = allItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/20 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="relative w-full max-w-lg bg-white rounded-4xl shadow-premium-lg overflow-hidden border border-border"
      >
        <div className="flex items-center px-5 py-4 border-b border-border">
          <Search className="w-4 h-4 text-muted mr-3" />
          <input
            type="text"
            autoFocus
            placeholder="Search pages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-sm text-charcoal placeholder-muted"
          />
          <span className="text-[10px] text-muted border border-border rounded-xl px-1.5 py-0.5 font-medium">ESC</span>
        </div>
        <div className="max-h-72 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="p-5 text-center text-sm text-muted">No results found.</div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.path}
                onClick={() => { navigate(item.path); onClose(); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-hover transition-colors text-left"
              >
                <item.icon className="w-[18px] h-[18px] text-silver" />
                <span className="text-sm text-charcoal">{item.name}</span>
              </button>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}

function AIAssistantDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I am Kora, your AI business assistant. How can I help you grow today?' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: `I can certainly help with "${userMsg}". I've analyzed your business profile and suggest we start by creating a new promotional poster. Would you like me to generate some options?`
      }]);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-premium-lg z-50 flex flex-col border-l border-border"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-2xl bg-charcoal flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-gold-500" />
                </div>
                <h2 className="font-semibold text-sm text-charcoal">AI Assistant</h2>
              </div>
              <button onClick={onClose} className="p-1.5 text-muted hover:text-charcoal rounded-xl hover:bg-hover transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-charcoal text-white'
                      : 'bg-cream text-charcoal'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-cream rounded-2xl px-4 py-3 flex gap-1 items-center">
                    <div className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                    <div className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-border">
              <div className="flex items-center gap-2 bg-cream rounded-2xl p-1.5 border border-border">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask Kora anything..."
                  className="flex-1 bg-transparent border-none outline-none px-2 text-sm text-charcoal placeholder-muted"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="p-2 bg-charcoal text-white rounded-xl hover:bg-charcoal/80 disabled:opacity-40 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const { company } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const initials = company?.name
    ?.split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'K';

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-cream">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <header className="h-16 bg-white border-b border-border flex items-center justify-between px-5 lg:px-6 sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-silver hover:text-charcoal rounded-2xl hover:bg-hover transition-colors"
            >
              <Menu className="w-[18px] h-[18px]" />
            </button>
            <div className="flex items-center gap-2.5">
              <span className="font-semibold text-sm text-charcoal truncate">{company?.name || 'Dashboard'}</span>
              {company?.type && (
                <span className="badge bg-cream text-silver">{company.type}</span>
              )}
            </div>
            <button
              onClick={() => setCmdOpen(true)}
              className="hidden md:flex items-center gap-2 px-3.5 py-2 bg-cream rounded-2xl text-xs text-muted w-56 cursor-pointer hover:bg-hover transition-colors border border-border"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="flex-1">Search anything...</span>
              <span className="text-[10px] border border-border rounded-xl px-1.5 py-0.5 font-medium">⌘K</span>
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setAiOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-charcoal text-white text-xs font-medium rounded-2xl hover:bg-charcoal/80 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">AI Assistant</span>
            </button>

            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 text-silver hover:text-charcoal rounded-2xl hover:bg-hover transition-colors"
            >
              {isDark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
            </button>

            <button className="relative p-2 text-silver hover:text-charcoal rounded-2xl hover:bg-hover transition-colors">
              <Bell className="w-[18px] h-[18px]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full ring-2 ring-white" />
            </button>

            <div className="w-8 h-8 rounded-2xl bg-charcoal flex items-center justify-center text-white text-[10px] font-bold ml-2">
              {initials}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 py-6 sm:py-8">
            {children}
          </div>
        </main>
      </div>

      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />
      <AIAssistantDrawer isOpen={aiOpen} onClose={() => setAiOpen(false)} />
    </div>
  );
}
