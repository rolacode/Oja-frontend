'use client';

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, User, Clock } from 'lucide-react';
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items } = useCart();
  const [isClient, setIsClient] = useState(false); // Track if it's client-side

  useEffect(() => {
    // This ensures that the state is only set after the client-side render
    setIsClient(true);
  }, []);

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  // Return early if the code is running on the server (prevents hydration error)
  if (!isClient) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary">OJA</span>
            </Link>
          </div>

          <div className="hidden flex-1 md:block max-w-md lg:max-w-xl">
            <form className="relative">
              <Input
                type="search"
                placeholder="Search Products..."
                className="w-full pr-12"
              />
              <Button type="submit" size="sm" className="absolute right-1 top-1/2 -translate-y-1/2">
                Search
              </Button>
            </form>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/profile">
              <Button variant="ghost" size="icon" className="hidden md:inline-flex">
                <User className="h-5 w-5" />
                <span className="sr-only">Profile</span>
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="hidden md:inline-flex">
              <Clock className="h-5 w-5" />
              <span className="sr-only">Orders</span>
            </Button>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
                <span className="sr-only">Cart</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t md:hidden">
          <div className="container mx-auto p-4">
            <nav className="grid gap-4">
              <Link href="/men" className="text-sm font-medium">Men Wears</Link>
              <Link href="/women" className="text-sm font-medium">Women Wears</Link>
              <Link href="/electronics" className="text-sm font-medium">Electronics</Link>
              <Link href="/smartphones" className="text-sm font-medium">Smartphones</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
