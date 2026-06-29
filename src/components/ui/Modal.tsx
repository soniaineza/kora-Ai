import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/40 z-40" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
                <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"><X className="w-4 h-4" /></button>
              </div>
              <div className="p-4">{children}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
