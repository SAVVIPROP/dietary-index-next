"use client";
/**
 * ClientLayout — wraps NavBar, Footer, and CartPanel for client-side rendering.
 * These components use React hooks (useState, useEffect, useLocation)
 * and must be rendered on the client side only.
 */
import dynamic from "next/dynamic";
import type { ReactNode } from "react";

const NavBar = dynamic(() => import("@/components/NavBar"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });
const CartPanel = dynamic(() => import("@/components/CartPanel"), { ssr: false });

export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
      <CartPanel />
    </>
  );
}
