import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, X } from 'lucide-react';
import { ToastContext } from '../../hooks/useToast';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error';
}

let nextId = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    const id = nextId++;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-50 space-y-2">
        <AnimatePresence>
          {toasts.map(t => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-premium border text-sm font-medium min-w-[280px] ${
                t.type === 'success'
                  ? 'bg-white border-green-200 text-green-800'
                  : 'bg-white border-red-200 text-red-800'
              }`}
            >
              {t.type === 'success'
                ? <CheckCircle2 className="w-4 h-4 shrink-0 text-success" />
                : <XCircle className="w-4 h-4 shrink-0 text-error" />
              }
              {t.message}
              <button onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))} className="ml-auto p-0.5 opacity-40 hover:opacity-100 transition-opacity">
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
