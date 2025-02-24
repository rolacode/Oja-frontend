'use client'

import { useToast } from './use-toast'
import { useEffect, useState } from 'react'

// Ensure the Toast interface is defined properly
interface Toast {
  id: string;
  title: string;
  description?: string;
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensure this only runs on the client-side
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Avoid rendering toasts on the server-side

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast: Toast) => {  // Explicitly typing the toast object
        // Ensure each toast has a unique key
        const toastKey = toast.id || `${toast.title}-${Math.random()}`;

        return (
          <div
            key={toastKey} // Use a unique key
            className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm"
          >
            <h3 className="font-semibold">{toast.title}</h3>
            {toast.description && <p className="text-sm text-gray-600">{toast.description}</p>}
          </div>
        );
      })}
    </div>
  );
}
