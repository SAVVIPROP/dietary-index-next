"use client";
// CartContext — site-wide supplement shopping cart
// Persisted to localStorage under "di_cart"
// CartItem maps to a SupplementEntry from affiliateLinks.ts
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { SupplementEntry } from "@/lib/affiliateLinks";

export interface CartItem {
  key: string;         // unique key from SUPPLEMENT_PRODUCTS
  product: SupplementEntry;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  addItem: (key: string, product: SupplementEntry) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  hasItem: (key: string) => boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "di_cart";

function loadCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CartItem[];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch { /* noop */ }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => loadCart());
  const [isOpen, setIsOpen] = useState(false);

  // Persist on every change
  useEffect(() => {
    saveCart(items);
  }, [items]);

  const addItem = useCallback((key: string, product: SupplementEntry) => {
    setItems(prev => {
      if (prev.some(i => i.key === key)) return prev;
      return [...prev, { key, product }];
    });
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems(prev => prev.filter(i => i.key !== key));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const hasItem = useCallback((key: string) => {
    return items.some(i => i.key === key);
  }, [items]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen(p => !p), []);

  return (
    <CartContext.Provider value={{
      items,
      count: items.length,
      addItem,
      removeItem,
      clearCart,
      hasItem,
      isOpen,
      openCart,
      closeCart,
      toggleCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
