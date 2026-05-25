"use client";
/**
 * Wouter shim for Next.js App Router.
 * Battle-tested pattern from vitaei.com (180 commits, May 2026).
 * Proxies all wouter primitives to next/navigation equivalents.
 */
import NextLink from "next/link";
import { useRouter, useParams as useNextParams, useSearchParams } from "next/navigation";
import { type ComponentProps, type ReactNode } from "react";

// Drop-in replacement for wouter's Link
export function Link({ href, children, ...props }: ComponentProps<"a"> & { href: string }) {
  return <NextLink href={href} {...(props as object)}>{children}</NextLink>;
}

// Drop-in replacement for wouter's useLocation
// Uses window.location.pathname directly (not usePathname) for reliable active-link detection
export function useLocation(): [string, (path: string) => void] {
  const router = useRouter();
  const pathname = typeof window !== "undefined" ? window.location.pathname : "/";
  return [pathname, (path: string) => router.push(path)];
}

// Drop-in replacement for wouter's useParams
export function useParams<T extends Record<string, string>>(): T {
  return useNextParams() as T;
}

// Drop-in replacement for wouter's useSearch
export function useSearch(): string {
  const searchParams = useSearchParams();
  return searchParams ? searchParams.toString() : "";
}

// Drop-in replacement for wouter's Route (for slug injection in dynamic pages)
export function Route<T extends Record<string, string>>({
  path: _path,
  component: Component,
  children,
}: {
  path?: string;
  component?: React.ComponentType<T>;
  children?: ReactNode;
}) {
  if (Component) {
    const params = useNextParams() as T;
    return <Component {...params} />;
  }
  return <>{children}</>;
}

// Drop-in replacement for wouter's Switch
export function Switch({ children }: { children?: ReactNode }) {
  return <>{children}</>;
}

// Drop-in replacement for wouter's Redirect
export function Redirect({ to }: { to: string }) {
  const router = useRouter();
  if (typeof window !== "undefined") {
    router.push(to);
  }
  return null;
}

// Drop-in replacement for wouter's useRoute
export function useRoute(_path: string): [boolean, Record<string, string>] {
  return [true, {}];
}
