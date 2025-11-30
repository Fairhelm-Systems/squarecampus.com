"use server";

import { Resend } from "resend";
import { headers } from "next/headers";

// Validate API key exists
if (!process.env.RESEND_API_KEY) {
  console.error(
    "RESEND_API_KEY is not set. Please add it to your environment variables."
  );
}

const resend = new Resend(process.env.RESEND_API_KEY || "");

// In-memory rate limiting (use Redis/Upstash in production for multi-instance deployments)
const submissionTracking = new Map<
  string,
  { 
    count: number; 
    lastSubmission: number; 
    cooldownUntil?: number 
  }
>();

// Clean up old entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of submissionTracking.entries()) {
    if (now - value.lastSubmission > 10 * 60 * 1000) {
      submissionTracking.delete(key);
    }
  }
}, 10 * 60 * 1000);

export type ContactFormData = {
  name: string;
  email: string;
  institution: string;
  role?: string;
  students?: string;
  message?: string;
  // Honeypot field - should always be empty
  website?: string;
};

export type ContactFormResponse = {
  success: boolean;
  message: string;
  cooldownSeconds?: number;
};

// List of disposable email domains to block
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

// Spam keywords to detect
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
  // Use email + IP for tracking (fallback to email only if no IP)
  const forwarded = headersList.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0] : headersList.get("x-real-ip");
  return ip ? `${email}:${ip}` : email;
}

function isDisposableEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase();
  return DISPOSABLE_EMAIL_DOMAINS.some((disposable) =>
    domain?.includes(disposable)
  );
}

function containsSpam(text: string): boolean {
  const lowerText = text.toLowerCase();
  return SPAM_KEYWORDS.some((keyword) => lowerText.includes(keyword));
}

function validateTextLength(
  text: string,
  min: number,
  max: number
): boolean {
  return text.length >= min && text.length <= max;
}

export async function sendContactEmail(
  formData: ContactFormData
): Promise<ContactFormResponse> {
  try {
    // 0. VALIDATE API KEY EXISTS
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY environment variable is not set");
      return {
        success: false,
        message:
          "Email service is not configured. Please contact us directly at contact@squarecampus.com",
      };
    }

    const headersList = await headers();

    // 1. HONEYPOT CHECK - If website field is filled, it's a bot
    if (formData.website && formData.website.trim() !== "") {
      console.warn("Honeypot triggered - potential bot submission");
      // Return success to not alert the bot
      return {
        success: true,
        message: "Thank you! We'll get back to you within 24 hours.",
      };
    }

    // 2. VALIDATE REQUIRED FIELDS
    if (!formData.name || !formData.email || !formData.institution) {
      return {
        success: false,
        message: "Please fill in all required fields.",
      };
    }

    // 3. VALIDATE EMAIL FORMAT
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return {
        success: false,
        message: "Please enter a valid email address.",
      };
    }

    // 4. CHECK FOR DISPOSABLE EMAIL
    if (isDisposableEmail(formData.email)) {
      return {
        success: false,
        message:
          "Please use a valid business or institutional email address.",
      };
    }

    // 5. VALIDATE TEXT LENGTHS
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

    // 6. CHECK FOR SPAM CONTENT
    const allText = `${formData.name} ${formData.institution} ${formData.message || ""} ${formData.role || ""}`;
    if (containsSpam(allText)) {
      console.warn("Spam keywords detected in submission");
      return {
        success: false,
        message:
          "Your message contains prohibited content. Please revise and try again.",
      };
    }

    // 7. RATE LIMITING
    const identifier = getClientIdentifier(formData.email, headersList);
    const now = Date.now();
    const tracking = submissionTracking.get(identifier);

    if (tracking) {
      // Check if in cooldown period
      if (tracking.cooldownUntil && now < tracking.cooldownUntil) {
        const remainingSeconds = Math.ceil(
          (tracking.cooldownUntil - now) / 1000
        );
        return {
          success: false,
          message: `Please wait ${remainingSeconds} seconds before submitting again.`,
          cooldownSeconds: remainingSeconds,
        };
      }

      // Check rate limits within 1 hour window
      const oneHourAgo = now - 60 * 60 * 1000;
      if (tracking.lastSubmission > oneHourAgo) {
        tracking.count += 1;

        // More than 3 submissions in 1 hour = apply 1 hour cooldown
        if (tracking.count > 3) {
          tracking.cooldownUntil = now + 60 * 60 * 1000; // 1 hour
          return {
            success: false,
            message:
              "Too many submission attempts. Please try again in 1 hour or email us directly at contact@squarecampus.com",
            cooldownSeconds: 3600,
          };
        }

        // Apply 5-minute cooldown after each submission
        tracking.cooldownUntil = now + 5 * 60 * 1000;
        tracking.lastSubmission = now;
      } else {
        // Reset count if outside 1-hour window
        tracking.count = 1;
        tracking.lastSubmission = now;
        tracking.cooldownUntil = now + 5 * 60 * 1000;
      }
    } else {
      // First submission from this identifier
      submissionTracking.set(identifier, {
        count: 1,
        lastSubmission: now,
        cooldownUntil: now + 5 * 60 * 1000, // 5-minute cooldown
      });
    }

    // 8. SANITIZE INPUTS (prevent XSS in email)
    const sanitize = (text: string) => {
      return text
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;");
    };

    const sanitizedData = {
      name: sanitize(formData.name),
      email: sanitize(formData.email),
      institution: sanitize(formData.institution),
      role: formData.role ? sanitize(formData.role) : undefined,
      students: formData.students ? sanitize(formData.students) : undefined,
      message: formData.message ? sanitize(formData.message) : undefined,
    };

    // 9. CREATE EMAIL HTML CONTENT
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: 600; color: #4b5563; text-transform: uppercase; font-size: 12px; letter-spacing: 0.5px; margin-bottom: 5px; }
            .value { color: #111827; font-size: 15px; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">SquareCampus Marketing Website</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Full Name</div>
                <div class="value">${sanitizedData.name}</div>
              </div>

              <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${sanitizedData.email}" style="color: #2563eb;">${sanitizedData.email}</a></div>
              </div>

              <div class="field">
                <div class="label">Institution</div>
                <div class="value">${sanitizedData.institution}</div>
              </div>

              ${
                sanitizedData.role
                  ? `
              <div class="field">
                <div class="label">Role</div>
                <div class="value">${sanitizedData.role}</div>
              </div>
              `
                  : ""
              }

              ${
                sanitizedData.students
                  ? `
              <div class="field">
                <div class="label">Number of Students</div>
                <div class="value">${sanitizedData.students}</div>
              </div>
              `
                  : ""
              }

              ${
                sanitizedData.message
                  ? `
              <div class="field">
                <div class="label">Message</div>
                <div class="value" style="white-space: pre-wrap;">${sanitizedData.message}</div>
              </div>
              `
                  : ""
              }

              <div class="footer">
                <p>This email was sent from the SquareCampus contact form at ${new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata", dateStyle: "full", timeStyle: "short" })} IST</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // 10. SEND EMAIL USING RESEND
    const { error } = await resend.emails.send({
      from: "SquareCampus Contact <onboarding@resend.dev>",
      to: ["contact@squarecampus.com"],
      replyTo: formData.email,
      subject: `New Contact: ${sanitizedData.name} from ${sanitizedData.institution}`,
      html: emailHtml,
    });

    if (error) {
      console.error("Resend error:", error);
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
    console.error("Contact form error:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}
