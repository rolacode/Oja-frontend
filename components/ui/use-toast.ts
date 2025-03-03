"use client";

import { useState, useEffect } from 'react';

// Define the type for Toast properties
interface ToastProps {
  id: number;
  title: string;
  description?: string;
  duration?: number;
}

// Create the useToast hook to manage toasts
export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  // Function to add a new toast
  const addToast = ({ title, description, duration = 3000 }: Omit<ToastProps, "id">) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, title, description, duration }]);

    // Remove toast after duration
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, duration);
  };

  return { addToast, toasts };
}
