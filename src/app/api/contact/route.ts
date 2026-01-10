import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { getResendApiKey } from "@/lib/secrets";

const submissionTracking = new Map<
  string,
  {
    count: number;
    lastSubmission: number;
    cooldownUntil?: number;
  }
>();

let redis: Redis | null = null;
let upstashLimiter: Ratelimit | null = null;

try {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });

    upstashLimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "10 m"),
      analytics: true,
      prefix: "sc:contact",
    });
  }
} catch (error) {
  console.error("[contact] Failed to initialize Upstash Redis/Ratelimit:", error);
  redis = null;
  upstashLimiter = null;
}

const DISPOSABLE_EMAIL_DOMAINS = [
  "tempmail.com",
  "throwaway.email",
  "guerrillamail.com",
  "10minutemail.com",
  "mailinator.com",
  "trashmail.com",
  "yopmail.com",
  "getnada.com",
  "temp-mail.org",
];

const SPAM_KEYWORDS = [
  "viagra",
  "casino",
  "lottery",
  "bitcoin",
  "crypto",
  "investment opportunity",
  "click here",
  "buy now",
  "limited time",
  "act now",
];

const MAX_BODY_BYTES = 10 * 1024;

const optionalText = (max: number) =>
  z.preprocess(
    (value) => {
      if (typeof value === "string") {
        const trimmed = value.trim();
        return trimmed === "" ? undefined : trimmed;
      }
      return value;
    },
    z.string().max(max).optional()
  );

const contactSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().email().max(254),
    institution: z.string().trim().min(2).max(200),
    role: optionalText(100),
    students: optionalText(50),
    message: optionalText(2000),
    website: optionalText(200),
  })
  .strict();

function getClientIdentifier(email: string, request: NextRequest): string {
  try {
    const cfConnectingIp = request.headers.get("cf-connecting-ip");
    const forwarded = request.headers.get("x-forwarded-for");
    const ip =
      cfConnectingIp || forwarded ? forwarded?.split(",")[0]?.trim() : request.headers.get("x-real-ip");
    return ip ? `${email}:${ip}` : email;
  } catch (error) {
    console.warn("[contact] Failed to get client identifier:", error);
    return email;
  }
}

function isDisposableEmail(email: string): boolean {
  try {
    const domain = email.split("@")[1]?.toLowerCase();
    if (!domain) return false;
    return DISPOSABLE_EMAIL_DOMAINS.some((disposable) => domain.includes(disposable));
  } catch (error) {
    console.warn("[contact] Error checking disposable email:", error);
    return false;
  }
}

function containsSpam(text: string): boolean {
  try {
    const lowerText = text.toLowerCase();
    return SPAM_KEYWORDS.some((keyword) => lowerText.includes(keyword));
  } catch (error) {
    console.warn("[contact] Error checking spam content:", error);
    return false;
  }
}

function validateTextLength(text: string, min: number, max: number): boolean {
  return text.length >= min && text.length <= max;
}

export async function POST(request: NextRequest) {
  try {
    // Get API key from Secrets Manager (or environment for local dev)
    const apiKey = await getResendApiKey();

    if (!apiKey) {
      console.error(
        "[contact] Failed to retrieve RESEND_API_KEY from Secrets Manager or environment"
      );
      return NextResponse.json(
        {
          success: false,
          message:
            "Email service is not configured. Please contact us directly at contact@squarecampus.com",
        },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const contentLength = Number(request.headers.get("content-length") || 0);
    if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
      return NextResponse.json(
        { success: false, message: "Payload too large." },
        { status: 413 }
      );
    }

    const rawBody = await request.text();
    if (!rawBody) {
      return NextResponse.json(
        { success: false, message: "Invalid request body." },
        { status: 400 }
      );
    }
    if (Buffer.byteLength(rawBody, "utf8") > MAX_BODY_BYTES) {
      return NextResponse.json(
        { success: false, message: "Payload too large." },
        { status: 413 }
      );
    }

    let parsedBody: unknown;
    try {
      parsedBody = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON payload." },
        { status: 400 }
      );
    }

    const parsed = contactSchema.safeParse(parsedBody);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Please check the submitted fields." },
        { status: 400 }
      );
    }
    const formData = parsed.data;

    // 1. Honeypot
    if (formData.website && formData.website.trim() !== "") {
      console.warn("[contact] Honeypot triggered");
      return NextResponse.json({
        success: true,
        message: "Thank you! We'll get back to you soon with next steps.",
      });
    }

    // 2. Disposable email
    if (isDisposableEmail(formData.email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please use a valid business or institutional email address.",
        },
        { status: 400 }
      );
    }

    // 3. Spam content
    const allText = `${formData.name} ${formData.institution} ${formData.message || ""} ${formData.role || ""}`;
    if (containsSpam(allText)) {
      console.warn("[contact] Spam keywords detected");
      return NextResponse.json(
        {
          success: false,
          message: "Your message contains prohibited content. Please revise and try again.",
        },
        { status: 400 }
      );
    }

    // 4. Rate limiting
    const identifier = getClientIdentifier(formData.email, request);

    if (upstashLimiter) {
      try {
        const rate = await upstashLimiter.limit(identifier);
        if (!rate.success) {
          const retryAfterSeconds = Math.max(
            1,
            Math.ceil(((rate.reset ?? 0) * 1000 - Date.now()) / 1000)
          );
          return NextResponse.json(
            {
              success: false,
              message: "Too many attempts. Please try again in a few minutes.",
              cooldownSeconds: retryAfterSeconds,
            },
            { status: 429 }
          );
        }
      } catch (error) {
        console.error("[contact] Upstash rate limiter error", error);
      }
    }

    const now = Date.now();
    const tracking = submissionTracking.get(identifier);

    if (tracking) {
      if (tracking.cooldownUntil && now < tracking.cooldownUntil) {
        const remainingSeconds = Math.ceil((tracking.cooldownUntil - now) / 1000);
        return NextResponse.json(
          {
            success: false,
            message: `Please wait ${remainingSeconds} seconds before submitting again.`,
            cooldownSeconds: remainingSeconds,
          },
          { status: 429 }
        );
      }

      const oneHourAgo = now - 60 * 60 * 1000;

      if (tracking.lastSubmission > oneHourAgo) {
        tracking.count += 1;

        if (tracking.count > 3) {
          tracking.cooldownUntil = now + 60 * 60 * 1000;
          return NextResponse.json(
            {
              success: false,
              message:
                "Too many submission attempts. Please try again in 1 hour or email us directly at contact@squarecampus.com",
              cooldownSeconds: 3600,
            },
            { status: 429 }
          );
        }

        tracking.cooldownUntil = now + 5 * 60 * 1000;
        tracking.lastSubmission = now;
      } else {
        tracking.count = 1;
        tracking.lastSubmission = now;
        tracking.cooldownUntil = now + 5 * 60 * 1000;
      }
    } else {
      submissionTracking.set(identifier, {
        count: 1,
        lastSubmission: now,
        cooldownUntil: now + 5 * 60 * 1000,
      });
    }

    const sanitize = (text: string) =>
      text
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;");

    const sanitizedData = {
      name: sanitize(formData.name),
      email: sanitize(formData.email),
      institution: sanitize(formData.institution),
      role: formData.role ? sanitize(formData.role) : undefined,
      students: formData.students ? sanitize(formData.students) : undefined,
      message: formData.message ? sanitize(formData.message) : undefined,
    };

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              background: #0a0a0a;
              padding: 40px 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: #171717;
              border-radius: 16px;
              overflow: hidden;
              border: 1px solid rgba(255, 255, 255, 0.08);
              box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
            }
            .header {
              background: linear-gradient(135deg, #171717 0%, #262626 100%);
              padding: 40px 32px;
              border-bottom: 1px solid rgba(56, 189, 248, 0.15);
              position: relative;
              overflow: hidden;
            }
            .header::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 2px;
              background: linear-gradient(90deg, rgba(56, 189, 248, 0) 0%, rgba(56, 189, 248, 0.6) 50%, rgba(56, 189, 248, 0) 100%);
            }
            .logo-section {
              display: flex;
              align-items: center;
              gap: 12px;
              margin-bottom: 16px;
            }
            .logo-icon {
              width: 32px;
              height: 32px;
              background: linear-gradient(135deg, #38bdf8 0%, #10b981 100%);
              border-radius: 8px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              color: white;
              font-size: 18px;
            }
            .logo-text {
              color: #ffffff;
              font-size: 18px;
              font-weight: 600;
              letter-spacing: -0.025em;
            }
            .header h1 {
              color: #ffffff;
              font-size: 24px;
              font-weight: 600;
              margin: 0 0 8px 0;
              letter-spacing: -0.025em;
            }
            .header p {
              color: rgba(255, 255, 255, 0.6);
              font-size: 14px;
              margin: 0;
            }
            .content {
              background: #171717;
              padding: 32px;
            }
            .field {
              margin-bottom: 24px;
              background: rgba(38, 38, 38, 0.5);
              padding: 16px;
              border-radius: 12px;
              border: 1px solid rgba(255, 255, 255, 0.05);
            }
            .label {
              font-weight: 600;
              color: rgba(56, 189, 248, 0.9);
              text-transform: uppercase;
              font-size: 11px;
              letter-spacing: 1px;
              margin-bottom: 8px;
              display: block;
            }
            .value {
              color: #f5f5f5;
              font-size: 15px;
              line-height: 1.6;
            }
            .value a {
              color: #38bdf8;
              text-decoration: none;
              border-bottom: 1px solid rgba(56, 189, 248, 0.3);
              transition: border-color 0.2s;
            }
            .value a:hover {
              border-bottom-color: #38bdf8;
            }
            .message-field {
              background: rgba(38, 38, 38, 0.7);
              border-left: 3px solid rgba(16, 185, 129, 0.5);
            }
            .footer {
              margin-top: 32px;
              padding-top: 24px;
              border-top: 1px solid rgba(255, 255, 255, 0.08);
              text-align: center;
            }
            .footer p {
              font-size: 12px;
              color: rgba(255, 255, 255, 0.4);
              line-height: 1.5;
            }
            .badge {
              display: inline-block;
              background: rgba(56, 189, 248, 0.1);
              color: #38bdf8;
              padding: 4px 12px;
              border-radius: 20px;
              font-size: 11px;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-top: 8px;
              border: 1px solid rgba(56, 189, 248, 0.2);
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo-section">
                <div class="logo-icon">S</div>
                <div class="logo-text">SquareCampus</div>
              </div>
              <h1>New Contact Submission</h1>
              <p>A new inquiry has been received from the marketing website</p>
            </div>

            <div class="content">
              <div class="field">
                <span class="label">Full Name</span>
                <div class="value">${sanitizedData.name}</div>
              </div>

              <div class="field">
                <span class="label">Email Address</span>
                <div class="value"><a href="mailto:${sanitizedData.email}">${sanitizedData.email}</a></div>
              </div>

              <div class="field">
                <span class="label">Institution</span>
                <div class="value">${sanitizedData.institution}</div>
              </div>

              ${
                sanitizedData.role
                  ? `
              <div class="field">
                <span class="label">Role / Position</span>
                <div class="value">${sanitizedData.role}</div>
              </div>
              `
                  : ""
              }

              ${
                sanitizedData.students
                  ? `
              <div class="field">
                <span class="label">Number of Students</span>
                <div class="value">${sanitizedData.students}</div>
              </div>
              `
                  : ""
              }

              ${
                sanitizedData.message
                  ? `
              <div class="field message-field">
                <span class="label">Message</span>
                <div class="value" style="white-space: pre-wrap;">${sanitizedData.message}</div>
              </div>
              `
                  : ""
              }

              <div class="footer">
                <span class="badge">New Lead</span>
                <p style="margin-top: 16px;">
                  Received at ${new Date().toLocaleString("en-US", {
                    timeZone: "Asia/Kolkata",
                    dateStyle: "full",
                    timeStyle: "short",
                  })} IST
                </p>
                <p style="margin-top: 8px;">
                  SquareCampus Contact Form · Marketing Website
                </p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailResult = await resend.emails.send({
      from: "admin@squarecampus.com",
      to: ["contact@squarecampus.com"],
      replyTo: formData.email,
      subject: `New Contact: ${sanitizedData.name} from ${sanitizedData.institution}`,
      html: emailHtml,
    });

    if (emailResult.error) {
      console.error("[contact] Resend API error:", emailResult.error);
      return NextResponse.json(
        {
          success: false,
          message:
            "Failed to send message. Please try again or email us directly at contact@squarecampus.com",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Thank you! We'll get back to you soon. You can submit another inquiry in 5 minutes if needed.",
    });
  } catch (error) {
    console.error("[contact] Contact form error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
