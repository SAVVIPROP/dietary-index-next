import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/geo
 *
 * Returns the visitor's country code using Vercel's built-in edge geolocation.
 * Vercel automatically injects `x-vercel-ip-country` on every request — no API
 * key or third-party service required.
 *
 * Falls back to a free public IP geolocation API (ip-api.com) when running
 * locally in development or on non-Vercel hosts.
 *
 * Response: { country: "GB" }  (ISO 3166-1 alpha-2)
 */
export async function GET(req: NextRequest) {
  // 1. Vercel edge header (production — always present on Vercel)
  const vercelCountry = req.headers.get("x-vercel-ip-country");
  if (vercelCountry) {
    return NextResponse.json({ country: vercelCountry });
  }

  // 2. CF-IPCountry header (Cloudflare, some other proxies)
  const cfCountry = req.headers.get("cf-ipcountry");
  if (cfCountry && cfCountry !== "XX") {
    return NextResponse.json({ country: cfCountry });
  }

  // 3. Development fallback — use ip-api.com (free, no key needed)
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "";
    // ip-api.com returns 'XX' for private/local IPs — that's fine for dev
    const geoRes = await fetch(
      `http://ip-api.com/json/${ip}?fields=countryCode`,
      { signal: AbortSignal.timeout(2000) }
    );
    if (geoRes.ok) {
      const data = await geoRes.json();
      if (data?.countryCode) {
        return NextResponse.json({ country: data.countryCode });
      }
    }
  } catch {
    // Silently fall through to default
  }

  // 4. Ultimate fallback
  return NextResponse.json({ country: "US" });
}
