'use client'

import { useState, useEffect } from 'react';

// Define the type for Toast properties
interface ToastProps {
  id: number;
  title: string;
  description?: string;
  duration?: number;
}

// Create the useToast hook to manage the toasts
export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  // This function is used to add a new toast
  const addToast = ({ title, description, duration = 3000 }: Omit<ToastProps, 'id'>) => {
    const id = Date.now(); // Use Date.now() to generate a unique id
    setToasts((prevToasts) => [...prevToasts, { id, title, description, duration }]);
  };

  // Automatically remove expired toasts after the given duration
  useEffect(() => {
    const timer = setInterval(() => {
      setToasts((prevToasts) =>
        prevToasts.filter((toast) => Date.now() - toast.id < toast.duration!)
      );
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return { addToast, toasts }; // Return both the addToast function and the toasts array
}
