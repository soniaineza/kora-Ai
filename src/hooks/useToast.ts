import { createContext, useContext } from 'react';

interface ToastCtx {
  toast: (message: string, type?: 'success' | 'error') => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const ToastContext = createContext<ToastCtx>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}
