"use client";
/**
 * ClientLayout — wraps NavBar and Footer for client-side rendering.
 * These components use React hooks (useState, useEffect, useLocation)
 * and must be rendered on the client side only.
 */
import dynamic from "next/dynamic";
import type { ReactNode } from "react";

const NavBar = dynamic(() => import("@/components/NavBar"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}
