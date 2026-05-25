"use client";
/**
 * Wouter shim for Next.js App Router.
 * Intercepts all `from "wouter"` imports transparently.
 * Replace imports in page-components with `from "@/lib/wouter-shim"`.
 */
import NextLink from "next/link";
import { usePathname, useRouter, useSearchParams, useParams as useNextParams } from "next/navigation";
import type { ComponentProps, ReactNode } from "react";

// Link — wraps next/link
export function Link({
  href,
  children,
  ...props
}: ComponentProps<typeof NextLink>) {
  return (
    <NextLink href={href} {...props}>
      {children}
    </NextLink>
  );
}

// useLocation — returns [pathname, navigate]
export function useLocation(): [string, (to: string) => void] {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  return [pathname, (to: string) => router.push(to)];
}

// useParams — wraps next/navigation useParams
export function useParams<T extends Record<string, string> = Record<string, string>>(): T {
  const params = useNextParams();
  return (params ?? {}) as T;
}

// useSearch — returns search string
export function useSearch(): string {
  const searchParams = useSearchParams();
  return searchParams?.toString() ?? "";
}

// Route — renders children, ignores path prop (routing handled by Next.js file system)
export function Route({
  children,
}: {
  path?: string;
  component?: React.ComponentType;
  children?: ReactNode;
}) {
  return <>{children}</>;
}

// Switch — renders children as-is
export function Switch({ children }: { children?: ReactNode }) {
  return <>{children}</>;
}

// Redirect — uses router.push
export function Redirect({ to }: { to: string }) {
  const router = useRouter();
  router.push(to);
  return null;
}

// useRoute — simplified, always returns [true, {}]
export function useRoute(_path: string): [boolean, Record<string, string>] {
  return [true, {}];
}
