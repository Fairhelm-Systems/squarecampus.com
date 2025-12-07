"use server";

import { Resend } from "resend";
import { headers } from "next/headers";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

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

// Clean up old entries every 10 minutes
setInterval(() => {
  try {
    const now = Date.now();
    for (const [key, value] of submissionTracking.entries()) {
      if (now - value.lastSubmission > 10 * 60 * 1000) {
        submissionTracking.delete(key);
      }
    }
  } catch (error) {
    console.error("[contact] Error during submission tracking cleanup:", error);
  }
}, 10 * 60 * 1000);

export type ContactFormData = {
  name: string;
  email: string;
  institution: string;
  role?: string;
  students?: string;
  message?: string;
  website?: string;
};

export type ContactFormResponse = {
  success: boolean;
  message: string;
  cooldownSeconds?: number;
};

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

function getClientIdentifier(email: string, headersList: Headers): string {
  try {
    const forwarded = headersList.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0]?.trim() : headersList.get("x-real-ip");
    return ip ? `${email}:${ip}` : email;
  } catch (error) {
    console.warn("[contact] Failed to get client identifier:", error);
    return email; // Fallback to email only
  }
}

function isDisposableEmail(email: string): boolean {
  try {
    const domain = email.split("@")[1]?.toLowerCase();
    if (!domain) return false;
    return DISPOSABLE_EMAIL_DOMAINS.some((disposable) =>
      domain.includes(disposable),
    );
  } catch (error) {
    console.warn("[contact] Error checking disposable email:", error);
    return false; // Fail open - allow the email through
  }
}

function containsSpam(text: string): boolean {
  try {
    const lowerText = text.toLowerCase();
    return SPAM_KEYWORDS.some((keyword) => lowerText.includes(keyword));
  } catch (error) {
    console.warn("[contact] Error checking spam content:", error);
    return false; // Fail open - allow the content through
  }
}

function validateTextLength(text: string, min: number, max: number): boolean {
  return text.length >= min && text.length <= max;
}

export async function sendContactEmail(
  formData: ContactFormData,
): Promise<ContactFormResponse> {
  try {
    // 🔐 0. Get API key at runtime, inside the operation
    const apiKey = process.env.RESEND_API_KEY;

    // Enhanced logging for debugging AWS Amplify environment
    console.log("[contact] Environment check:", {
      hasResendKey: !!apiKey,
      resendKeyLength: apiKey?.length || 0,
      nodeEnv: process.env.NODE_ENV,
      // Log all env var keys (not values) for debugging
      availableEnvVars: Object.keys(process.env).filter(key =>
        key.includes('RESEND') || key.includes('UPSTASH')
      ),
    });

    if (!apiKey) {
      console.error(
        "[contact] RESEND_API_KEY environment variable is not set at runtime",
      );
      console.error(
        "[contact] Available environment variables:",
        Object.keys(process.env).slice(0, 20), // Log first 20 env var names
      );
      return {
        success: false,
        message:
          "Email service is not configured. Please contact us directly at contact@squarecampus.com",
      };
    }

    // Create client with the key that actually exists *here*
    const resend = new Resend(apiKey);

    let headersList: Headers;
    try {
      headersList = await headers();
    } catch (error) {
      console.error("[contact] Failed to get request headers:", error);
      return {
        success: false,
        message: "Unable to process request. Please try again.",
      };
    }

    // 1. Honeypot
    if (formData.website && formData.website.trim() !== "") {
      console.warn("[contact] Honeypot triggered - potential bot");
      return {
        success: true,
        message: "Thank you! We'll get back to you within 24 hours.",
      };
    }

    // 2. Required fields
    if (!formData.name || !formData.email || !formData.institution) {
      return {
        success: false,
        message: "Please fill in all required fields.",
      };
    }

    // 3. Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return {
        success: false,
        message: "Please enter a valid email address.",
      };
    }

    // 4. Disposable email
    if (isDisposableEmail(formData.email)) {
      return {
        success: false,
        message:
          "Please use a valid business or institutional email address.",
      };
    }

    // 5. Text lengths
    if (!validateTextLength(formData.name, 2, 100)) {
      return {
        success: false,
        message: "Name must be between 2 and 100 characters.",
      };
    }

    if (!validateTextLength(formData.institution, 2, 200)) {
      return {
        success: false,
        message: "Institution name must be between 2 and 200 characters.",
      };
    }

    if (formData.message && !validateTextLength(formData.message, 0, 2000)) {
      return {
        success: false,
        message: "Message must not exceed 2000 characters.",
      };
    }

    // 6. Spam content
    const allText = `${formData.name} ${formData.institution} ${
      formData.message || ""
    } ${formData.role || ""}`;
    if (containsSpam(allText)) {
      console.warn("[contact] Spam keywords detected in submission");
      return {
        success: false,
        message:
          "Your message contains prohibited content. Please revise and try again.",
      };
    }

    // 7. Rate limiting
    const identifier = getClientIdentifier(formData.email, headersList);

    if (upstashLimiter) {
      try {
        const rate = await upstashLimiter.limit(identifier);
        if (!rate.success) {
          const retryAfterSeconds = Math.max(
            1,
            Math.ceil(((rate.reset ?? 0) * 1000 - Date.now()) / 1000),
          );
          return {
            success: false,
            message: "Too many attempts. Please try again in a few minutes.",
            cooldownSeconds: retryAfterSeconds,
          };
        }
      } catch (error) {
        console.error("[contact] Upstash rate limiter error", error);
        // Fall back to in-memory limiter below
      }
    }

    const now = Date.now();
    const tracking = submissionTracking.get(identifier);

    if (tracking) {
      if (tracking.cooldownUntil && now < tracking.cooldownUntil) {
        const remainingSeconds = Math.ceil(
          (tracking.cooldownUntil - now) / 1000,
        );
        return {
          success: false,
          message: `Please wait ${remainingSeconds} seconds before submitting again.`,
          cooldownSeconds: remainingSeconds,
        };
      }

      const oneHourAgo = now - 60 * 60 * 1000;

      if (tracking.lastSubmission > oneHourAgo) {
        tracking.count += 1;

        if (tracking.count > 3) {
          tracking.cooldownUntil = now + 60 * 60 * 1000;
          return {
            success: false,
            message:
              "Too many submission attempts. Please try again in 1 hour or email us directly at contact@squarecampus.com",
            cooldownSeconds: 3600,
          };
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
                  Received at ${(() => {
                    try {
                      return new Date().toLocaleString("en-US", {
                        timeZone: "Asia/Kolkata",
                        dateStyle: "full",
                        timeStyle: "short"
                      }) + " IST";
                    } catch (error) {
                      console.warn("[contact] Date formatting error:", error);
                      return new Date().toISOString();
                    }
                  })()}
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

    let emailResult;
    try {
      emailResult = await resend.emails.send({
        from: "admin@squarecampus.com",
        to: ["contact@squarecampus.com"],
        replyTo: formData.email,
        subject: `New Contact: ${sanitizedData.name} from ${sanitizedData.institution}`,
        html: emailHtml,
      });
    } catch (sendError) {
      console.error("[contact] Resend send exception:", sendError);
      return {
        success: false,
        message:
          "Failed to send message. Please try again or email us directly at contact@squarecampus.com",
      };
    }

    if (emailResult.error) {
      console.error("[contact] Resend API error:", emailResult.error);
      return {
        success: false,
        message:
          "Failed to send message. Please try again or email us directly at contact@squarecampus.com",
      };
    }

    return {
      success: true,
      message:
        "Thank you! We'll get back to you within 24 hours. You can submit another inquiry in 5 minutes if needed.",
    };
  } catch (error) {
    console.error("[contact] Contact form error:", error);

    // Provide more specific error messages based on error type
    let errorMessage = "An unexpected error occurred. Please try again later.";

    if (error instanceof Error) {
      // Network errors
      if (error.message.includes("fetch") || error.message.includes("network")) {
        errorMessage = "Network error. Please check your connection and try again.";
      }
      // Timeout errors
      else if (error.message.includes("timeout")) {
        errorMessage = "Request timed out. Please try again.";
      }
      // Log the specific error for debugging
      console.error("[contact] Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
}
