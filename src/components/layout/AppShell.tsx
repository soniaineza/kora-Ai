import { useEffect, useState } from 'react';
import {
  useLocation, Link, useNavigate
} from 'react-router-dom';
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
      { name: 'Growth Center', path: '/growth', icon: Sparkles, highlight: true },
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
  const [expandedSections, setExpandedSections] = useState<string[]>([navSections[0]?.label ?? '']);

  const initials = company?.name
    ?.split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'K';
  const toggleSection = (label: string) => {
    setExpandedSections((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-10 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      <aside
        className={`bg-slate-900 h-screen flex flex-col transition-all duration-300 fixed lg:relative z-20 ${isOpen ? 'w-60 left-0' : 'w-16 -left-16 lg:left-0'}`}
      >
      <div className="h-14 flex items-center justify-between px-3 border-b border-slate-800">
        {isOpen ? (
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-kora-400 to-kora-600 flex items-center justify-center text-white text-xs font-bold">
              K
            </div>
            <span className="text-white font-bold text-sm tracking-tight">Kora AI</span>
          </div>
        ) : (
          <div className="w-7 h-7 mx-auto rounded-lg bg-gradient-to-br from-kora-400 to-kora-600 flex items-center justify-center text-white text-xs font-bold">
            K
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {navSections.map((section) => {
          return (
            <div key={section.label}>
              {isOpen && (
                <button
                  onClick={() => toggleSection(section.label)}
                  className="flex items-center justify-between w-full px-2 mb-1 group"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                    {section.label}
                  </span>
                  <ChevronDown
                    className={`w-3 h-3 text-slate-600 transition-transform ${expandedSections.includes(section.label) ? 'rotate-0' : '-rotate-90'}`}
                  />
                </button>
              )}
              <div className="space-y-0.5">
                {(isOpen ? (expandedSections.includes(section.label) ? section.items : []) : section.items).map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-all duration-150 text-sm ${isActive
                        ? 'bg-kora-500/15 text-kora-400 font-medium'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                        }`}
                      title={!isOpen ? item.name : undefined}
                    >
                      <item.icon className={`w-4.5 h-4.5 shrink-0 ${item.highlight ? 'text-kora-400' : ''}`} style={{ width: 18, height: 18 }} />
                      {isOpen && <span className="truncate">{item.name}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-2 border-t border-slate-800 space-y-0.5">
        {bottomItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-all duration-150 text-sm ${isActive
                ? 'bg-kora-500/15 text-kora-400 font-medium'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              title={!isOpen ? item.name : undefined}
            >
              <item.icon className="w-[18px] h-[18px] shrink-0" />
              {isOpen && <span className="truncate">{item.name}</span>}
            </Link>
          );
        })}

        {isOpen && (
          <div className="mt-4 mx-1 p-3 bg-slate-800 rounded-xl">
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-kora-400 to-kora-600 flex items-center justify-center text-white text-[10px] font-bold">
                {initials}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-white truncate">{company?.name || 'My Business'}</p>
                <p className="text-[10px] text-slate-500 truncate">{company?.address || company?.type || ''}</p>
              </div>
            </div>
            <button
              onClick={() => { logout(); navigate('/login'); }}
              className="w-full py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <LogOut className="w-3 h-3" /> Sign Out
            </button>
          </div>
        )}
      </div>

      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-14 bg-slate-900 border border-slate-700 rounded-full p-1 shadow-sm text-slate-400 hover:text-white transition-colors hidden lg:block"
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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/40 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-slate-700"
      >
        <div className="flex items-center px-4 py-3 border-b border-gray-100 dark:border-slate-700">
          <Search className="w-4 h-4 text-gray-400 mr-3" />
          <input
            type="text"
            autoFocus
            placeholder="Search pages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400"
          />
          <span className="text-[11px] text-gray-400 border border-gray-200 dark:border-slate-600 rounded px-1.5 py-0.5 font-medium">ESC</span>
        </div>
        <div className="max-h-72 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">No results found.</div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.path}
                onClick={() => { navigate(item.path); onClose(); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors text-left"
              >
                <item.icon className="w-[18px] h-[18px] text-gray-400" />
                <span className="text-sm text-gray-900 dark:text-gray-100">{item.name}</span>
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
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-slate-800 shadow-xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-slate-700">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-kora-400 to-kora-600 flex items-center justify-center text-white">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <h2 className="font-semibold text-sm text-gray-900 dark:text-white">AI Assistant</h2>
              </div>
              <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${msg.role === 'user'
                    ? 'bg-kora-500 text-white rounded-tr-sm'
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-tl-sm'
                    }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-slate-700 rounded-xl px-3.5 py-2.5 flex gap-1 items-center">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-100 dark:border-slate-700">
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-slate-700 rounded-xl p-1.5 border border-gray-200 dark:border-slate-600 focus-within:ring-2 focus-within:ring-kora-500/20">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask Kora anything..."
                  className="flex-1 bg-transparent border-none outline-none px-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="p-1.5 bg-kora-500 text-white rounded-lg hover:bg-kora-600 disabled:opacity-50 transition-colors"
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
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-slate-900">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <header className="h-14 bg-white dark:bg-slate-800 border-b border-gray-100 dark:border-slate-700 flex items-center justify-between px-4 lg:px-5 sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
            >
              <Menu className="w-[18px] h-[18px]" />
            </button>
            <div className="flex items-center gap-2.5">
              <span className="font-semibold text-sm text-gray-900 dark:text-white truncate">{company?.name || 'Dashboard'}</span>
              {company?.type && (
                <span className="px-1.5 py-0.5 bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-400 text-[10px] rounded-full font-medium">{company.type}</span>
              )}
            </div>
            <button
              onClick={() => setCmdOpen(true)}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-slate-700 rounded-lg text-xs text-gray-400 w-56 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors border border-gray-100 dark:border-slate-600"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="flex-1">Search anything...</span>
              <span className="text-[10px] border border-gray-200 dark:border-slate-600 rounded px-1 py-0.5 font-medium">⌘K</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setAiOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-kora-500 to-kora-600 text-white text-xs font-medium rounded-lg hover:from-kora-600 hover:to-kora-700 transition-all shadow-glow"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">AI Assistant</span>
            </button>

            <button
              onClick={() => setIsDark(!isDark)}
              className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
            >
              {isDark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
            </button>

            <button className="relative p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
              <Bell className="w-[18px] h-[18px]" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full ring-1 ring-white dark:ring-slate-800" />
            </button>

            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-kora-400 to-kora-600 flex items-center justify-center text-white text-[10px] font-bold ml-1.5">
              {initials}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 text-gray-900 dark:text-gray-100">
            {children}
          </div>
        </main>
      </div>

      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />
      <AIAssistantDrawer isOpen={aiOpen} onClose={() => setAiOpen(false)} />
    </div>
  );
}
