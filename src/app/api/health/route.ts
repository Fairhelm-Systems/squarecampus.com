// Health check endpoint for container orchestration and monitoring
// Used by: Docker HEALTHCHECK, load balancers, uptime monitors

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Health check endpoint
 * Returns 200 OK if the application is healthy
 * Used by Docker HEALTHCHECK and monitoring systems
 */
export async function GET() {
  try {
    // Basic health checks
    const health = {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
      version: process.env.npm_package_version || "unknown",
      // Add additional checks as needed
      checks: {
        memory: {
          used: process.memoryUsage().heapUsed,
          total: process.memoryUsage().heapTotal,
          percentage: Math.round(
            (process.memoryUsage().heapUsed / process.memoryUsage().heapTotal) * 100
          ),
        },
      },
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
