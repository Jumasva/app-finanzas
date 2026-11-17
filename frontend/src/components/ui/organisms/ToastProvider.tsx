'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Toast, type ToastProps } from '@/components/ui/molecules/Toast';

type ToastInput = Omit<ToastProps, 'onClose' | 'className'>;
type ToastItem = ToastInput & { id: number };

const ToastContext = createContext<((toast: ToastInput) => void) | null>(null);

// Máximo 3 a la vez; 5 s, u 8 s si trae una acción (Figma: 4 a 6 s; con acción, 8 s)
const MAX_TOASTS = 3;
const DURATION = 5000;
const DURATION_WITH_ACTION = 8000;

/* ══ TOASTPROVIDER · muestra los Toast de cualquier pantalla ══ */
/* Abajo a la izquierda en desktop y arriba en móvil, el más nuevo abajo. Las regiones aria-live
   existen desde el principio (vacías) para que el lector anuncie lo que entra después */

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const show = useCallback((toast: ToastInput) => {
    const id = nextId.current++;
    setToasts((current) => [...current, { ...toast, id }].slice(-MAX_TOASTS));
  }, []);

  const polite = toasts.filter((toast) => toast.tone !== 'danger');
  const urgent = toasts.filter((toast) => toast.tone === 'danger');

  return (
    <ToastContext.Provider value={show}>
      {children}

      <div className="pointer-events-none fixed inset-x-4 top-4 z-50 flex flex-col gap-2 sm:top-auto sm:right-auto sm:bottom-6 sm:left-6">
        <div role="status" aria-live="polite" className="flex flex-col gap-2">
          {polite.map((toast) => (
            <TimedToast key={toast.id} toast={toast} onDismiss={dismiss} />
          ))}
        </div>
        <div role="alert" aria-live="assertive" className="flex flex-col gap-2">
          {urgent.map((toast) => (
            <TimedToast key={toast.id} toast={toast} onDismiss={dismiss} />
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
}

function TimedToast({ toast, onDismiss }: { toast: ToastItem; onDismiss: (id: number) => void }) {
  const [paused, setPaused] = useState(false);

  // El tiempo se detiene con el mouse encima o con el foco dentro, para alcanzar a leer y usar la acción
  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(() => onDismiss(toast.id), toast.action ? DURATION_WITH_ACTION : DURATION);
    return () => clearTimeout(timer);
  }, [paused, toast.id, toast.action, onDismiss]);

  return (
    <div
      className="pointer-events-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <Toast
        message={toast.message}
        tone={toast.tone}
        action={
          toast.action && {
            label: toast.action.label,
            onClick: () => {
              toast.action?.onClick();
              onDismiss(toast.id);
            },
          }
        }
        onClose={() => onDismiss(toast.id)}
      />
    </div>
  );
}

// const toast = useToast(); toast({ message: 'Movimiento guardado', tone: 'success' })
export function useToast() {
  const show = useContext(ToastContext);
  if (!show) throw new Error('useToast necesita un <ToastProvider> más arriba');
  return show;
}
