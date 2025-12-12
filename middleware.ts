import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const suspiciousUserAgents = [
  /sqlmap/i,
  /nikto/i,
  /nessus/i,
  /acunetix/i,
  /metasploit/i,
  /nmap/i,
  /curl/i,
  /wget/i,
  /python-requests/i,
  /libwww-perl/i,
  /scrapy/i,
  /headless/i,
];

const suspiciousUrlFragments = [
  /<script/i,
  /%3Cscript/i,
  /union(\s+all)?\s+select/i,
  /(\bor\b|\band\b).+?=/i,
  /(%27)|(')|(--)|(%23)|(#)/i,
  /\.\.\/\.\.\//,
  /\/etc\/passwd/i,
];

export function middleware(request: NextRequest) {
  const pathAndSearch = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  const userAgent = request.headers.get("user-agent") || "";

  const looksSuspicious =
    suspiciousUserAgents.some((pattern) => pattern.test(userAgent)) ||
    suspiciousUrlFragments.some((pattern) => pattern.test(pathAndSearch));

  if (looksSuspicious) {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest).*)",
  ],
};
