'use client'

import { useToast } from './ui/use-toast';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm"
        >
          <h3 className="font-semibold">{toast.title}</h3>
          {toast.description && <p className="text-sm text-gray-600">{toast.description}</p>}
        </div>
      ))}
    </div>
  );
}
