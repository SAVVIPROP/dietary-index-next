"use client";
import type { ReactNode } from "react";
import { ReadingListProvider } from "@/contexts/ReadingListContext";
import { CartProvider } from "@/contexts/CartContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ReadingListProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </ReadingListProvider>
    </ThemeProvider>
  );
}
