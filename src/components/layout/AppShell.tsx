import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Link,
  useNavigate } from
'react-router-dom';
import {
  LayoutDashboard,
  Sparkles,
  Globe,
  QrCode,
  MessageCircle,
  Image as ImageIcon,
  Video,
  Calendar,
  Users,
  Megaphone,
  BarChart3,
  Puzzle,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  Search,
  Bell,
  User,
  Moon,
  Sun,
  X,
  Send } from
'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
const navItems = [
{
  name: 'Dashboard',
  path: '/',
  icon: LayoutDashboard
},
{
  name: 'Growth Center',
  path: '/growth',
  icon: Sparkles,
  highlight: true
},
{
  name: 'Website Builder',
  path: '/website',
  icon: Globe
},
{
  name: 'QR Menus',
  path: '/qr',
  icon: QrCode
},
{
  name: 'WhatsApp Catalog',
  path: '/whatsapp',
  icon: MessageCircle
},
{
  name: 'Poster Generator',
  path: '/posters',
  icon: ImageIcon
},
{
  name: 'Video Generator',
  path: '/videos',
  icon: Video
},
{
  name: 'Social Scheduler',
  path: '/social',
  icon: Calendar
},
{
  name: 'Customers',
  path: '/customers',
  icon: Users
},
{
  name: 'Campaigns',
  path: '/campaigns',
  icon: Megaphone
},
{
  name: 'Analytics',
  path: '/analytics',
  icon: BarChart3
}];

const bottomItems = [
{
  name: 'Integrations',
  path: '/integrations',
  icon: Puzzle
},
{
  name: 'Billing',
  path: '/billing',
  icon: CreditCard
},
{
  name: 'Settings',
  path: '/settings',
  icon: Settings
}];

function Sidebar({
  isOpen,
  toggleSidebar



}: {isOpen: boolean;toggleSidebar: () => void;}) {
  const location = useLocation();
  return (
    <aside
      className={`bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 h-screen flex flex-col transition-all duration-300 relative z-20 ${isOpen ? 'w-64' : 'w-20'}`}>
      
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100 dark:border-gray-800">
        {isOpen &&
        <div className="flex items-center gap-2 text-kora-500 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-kora-400 to-kora-600 flex items-center justify-center text-white">
              K
            </div>
            Kora AI
          </div>
        }
        {!isOpen &&
        <div className="w-8 h-8 mx-auto rounded-lg bg-gradient-to-br from-kora-400 to-kora-600 flex items-center justify-center text-white font-bold">
            K
          </div>
        }
      </div>

      <div className="flex-1 overflow-y-auto kora-scroll py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${isActive ? 'bg-kora-50 dark:bg-kora-500/10 text-kora-600 dark:text-kora-500 font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'}`}>
              
              <item.icon
                className={`w-5 h-5 flex-shrink-0 ${item.highlight ? 'text-kora-500' : ''}`} />
              
              {isOpen && <span className="truncate">{item.name}</span>}
            </Link>);

        })}
      </div>

      <div className="p-3 border-t border-gray-100 dark:border-gray-800 space-y-1">
        {bottomItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${isActive ? 'bg-kora-50 dark:bg-kora-500/10 text-kora-600 dark:text-kora-500 font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'}`}>
              
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span className="truncate">{item.name}</span>}
            </Link>);

        })}

        {isOpen &&
        <div className="mt-4 p-4 bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-700 rounded-2xl text-white">
            <p className="text-sm font-medium mb-1">Upgrade Plan</p>
            <p className="text-xs text-gray-400 mb-3">
              Get unlimited AI generations
            </p>
            <button className="w-full py-2 bg-kora-500 hover:bg-kora-600 text-white text-sm font-medium rounded-lg transition-colors">
              Upgrade Now
            </button>
          </div>
        }
      </div>

      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-1 shadow-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
        
        {isOpen ?
        <ChevronLeft className="w-4 h-4" /> :

        <ChevronRight className="w-4 h-4" />
        }
      </button>
    </aside>);

}
function CommandPalette({
  isOpen,
  onClose



}: {isOpen: boolean;onClose: () => void;}) {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) onClose();else
        {

          // Open logic handled in parent
        }}
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);
  const allItems = [...navItems, ...bottomItems];
  const filtered = allItems.filter((item) =>
  item.name.toLowerCase().includes(search.toLowerCase())
  );
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-gray-900/50 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose}></div>
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95
        }}
        animate={{
          opacity: 1,
          scale: 1
        }}
        exit={{
          opacity: 0,
          scale: 0.95
        }}
        className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-soft-lg overflow-hidden border border-gray-100 dark:border-gray-800">
        
        <div className="flex items-center px-4 py-3 border-b border-gray-100 dark:border-gray-800">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input
            type="text"
            autoFocus
            placeholder="Search pages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400" />
          
          <span className="text-xs text-gray-400 border border-gray-200 dark:border-gray-700 rounded px-1.5 py-0.5">
            ESC
          </span>
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 ?
          <div className="p-4 text-center text-gray-500">
              No results found.
            </div> :

          filtered.map((item) =>
          <button
            key={item.path}
            onClick={() => {
              navigate(item.path);
              onClose();
            }}
            className="w-full flex items-center px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left">
            
                <item.icon className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-900 dark:text-gray-100">
                  {item.name}
                </span>
              </button>
          )
          }
        </div>
      </motion.div>
    </div>);

}
function AIAssistantDrawer({
  isOpen,
  onClose



}: {isOpen: boolean;onClose: () => void;}) {
  const [messages, setMessages] = useState([
  {
    role: 'assistant',
    content:
    'Hi! I am Kora, your AI business assistant. How can I help you grow today?'
  }]
  );
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages((prev) => [
    ...prev,
    {
      role: 'user',
      content: userMsg
    }]
    );
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
      ...prev,
      {
        role: 'assistant',
        content: `I can certainly help with "${userMsg}". I've analyzed your business profile and suggest we start by creating a new promotional poster. Would you like me to generate some options?`
      }]
      );
    }, 1500);
  };
  return (
    <AnimatePresence>
      {isOpen &&
      <>
          <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          onClick={onClose}
          className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-40" />
        
          <motion.div
          initial={{
            x: '100%'
          }}
          animate={{
            x: 0
          }}
          exit={{
            x: '100%'
          }}
          transition={{
            type: 'spring',
            damping: 25,
            stiffness: 20
          }}
          className="fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-gray-900 shadow-soft-lg z-50 flex flex-col border-l border-gray-100 dark:border-gray-800">
          
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-kora-100 dark:bg-kora-500/20 flex items-center justify-center text-kora-600 dark:text-kora-500">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h2 className="font-semibold text-gray-900 dark:text-gray-100">
                  AI Assistant
                </h2>
              </div>
              <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg, i) =>
            <div
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              
                  <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${msg.role === 'user' ? 'bg-kora-500 text-white rounded-tr-sm' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-tl-sm'}`}>
                
                    {msg.content}
                  </div>
                </div>
            )}
              {isTyping &&
            <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{
                    animationDelay: '0.2s'
                  }} />
                
                    <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{
                    animationDelay: '0.4s'
                  }} />
                
                  </div>
                </div>
            }
            </div>

            <div className="p-4 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-xl p-2 border border-gray-200 dark:border-gray-700 focus-within:ring-2 focus-within:ring-kora-500/20">
                <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask Kora anything..."
                className="flex-1 bg-transparent border-none outline-none px-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500" />
              
                <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="p-2 bg-kora-500 text-white rounded-lg hover:bg-kora-600 disabled:opacity-50 transition-colors">
                
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      }
    </AnimatePresence>);

}
export function AppShell({ children }: {children: React.ReactNode;}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
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
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden font-sans text-gray-900 dark:text-gray-100 transition-colors">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-6 sticky top-0 z-10 transition-colors">
          <div className="flex items-center gap-4 flex-1">
            <div className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              Sunny Cafe
              <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs rounded-full font-medium">
                Cafe
              </span>
            </div>
            <div
              onClick={() => setCmdOpen(true)}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-500 dark:text-gray-400 w-64 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border border-transparent">
              
              <Search className="w-4 h-4" />
              <span className="flex-1">Search anything...</span>
              <span className="text-xs border border-gray-300 dark:border-gray-600 rounded px-1.5 py-0.5">
                ⌘K
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setAiOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-kora-50 dark:bg-kora-500/10 text-kora-600 dark:text-kora-500 hover:bg-kora-100 dark:hover:bg-kora-500/20 rounded-full text-sm font-medium transition-colors">
              
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">AI Assistant</span>
            </button>

            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
              
              {isDark ?
              <Sun className="w-5 h-5" /> :

              <Moon className="w-5 h-5" />
              }
            </button>

            <button className="relative p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
            </button>

            <button className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors ml-1">
              <User className="w-5 h-5" />
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto kora-scroll p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>

      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />
      <AIAssistantDrawer isOpen={aiOpen} onClose={() => setAiOpen(false)} />
    </div>);

}