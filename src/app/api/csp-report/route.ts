import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 10 * 1024;

export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get("content-length") || 0);
    if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
      return new NextResponse(null, { status: 413 });
    }

    const rawBody = await request.text();
    if (!rawBody) {
      return new NextResponse(null, { status: 204 });
    }
    if (Buffer.byteLength(rawBody, "utf8") > MAX_BODY_BYTES) {
      return new NextResponse(null, { status: 413 });
    }

    if (process.env.NODE_ENV !== "production") {
      try {
        const parsed = JSON.parse(rawBody);
        console.warn("[csp] Report received:", {
          blockedUri: parsed?.["csp-report"]?.["blocked-uri"],
          violatedDirective: parsed?.["csp-report"]?.["violated-directive"],
          sourceFile: parsed?.["csp-report"]?.["source-file"],
        });
      } catch {
        console.warn("[csp] Report received (unparseable JSON).");
      }
    }
  } catch {
    return new NextResponse(null, { status: 204 });
  }

  return new NextResponse(null, { status: 204 });
}
