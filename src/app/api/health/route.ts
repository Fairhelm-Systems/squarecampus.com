// Health check endpoint for container orchestration and monitoring
// Used by: Docker HEALTHCHECK, load balancers, uptime monitors

import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Health check endpoint
 * Returns 200 OK if the application is healthy
 * Used by Docker HEALTHCHECK and monitoring systems
 */
export async function GET() {
  try {
    const health = {
      status: "ok",
      timestamp: new Date().toISOString(),
    };

    // Optional: Add database connectivity check
    // try {
    //   await prisma.$queryRaw`SELECT 1`;
    //   health.checks.database = { status: 'ok' };
    // } catch (error) {
    //   health.checks.database = { status: 'error' };
    //   health.status = 'degraded';
    // }

    return NextResponse.json(health, {
      status: 200,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 503,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
          "Content-Type": "application/json",
        },
      }
    );
  }
}
