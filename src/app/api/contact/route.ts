// Next.js Route Handler — POST /api/contact
// Validates input, inserts into Supabase, sends webhook notification

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const supabase = createClient(

  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-key",
);

// In-memory rate limiter (resets per cold start)
const ipHits = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60_000;
const RATE_LIMIT_MAX = 5; // stricter than chat — contact form shouldn't be spammed

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipHits.get(ip);
  if (!entry || now > entry.resetAt) {
    ipHits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(20, "Phone number is too long"),
  address: z.string().max(200, "Address is too long").optional().or(z.literal("")),
  service: z.string().optional().or(z.literal("")),
  message: z.string().max(5000, "Message is too long").optional().or(z.literal("")),
  preferred_contact: z.enum(["phone", "email", "text"]).default("phone"),
});

async function sendWebhookNotification(data: z.infer<typeof contactSchema>) {
  const webhookUrl = process.env.NOTIFICATION_WEBHOOK_URL;
  if (!webhookUrl) {
    console.log("NOTIFICATION_WEBHOOK_URL not set — skipping notification");
    return;
  }

  try {
    const payload = {
      text: `New Contact Form Submission`,
      name: data.name,
      phone: data.phone,
      email: data.email || "Not provided",
      address: data.address || "Not provided",
      service: data.service || "Not specified",
      message: data.message || "No message",
      preferred_contact: data.preferred_contact,
      submitted_at: new Date().toISOString(),
      // Slack-compatible fallback text
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: [
              `*New Contact Form Submission*`,
              `*Name:* ${data.name}`,
              `*Phone:* ${data.phone}`,
              `*Email:* ${data.email || "Not provided"}`,
              `*Address:* ${data.address || "Not provided"}`,
              `*Service:* ${data.service || "Not specified"}`,
              `*Preferred Contact:* ${data.preferred_contact}`,
              data.message ? `*Message:* ${data.message}` : "",
            ]
              .filter(Boolean)
              .join("\n"),
          },
        },
      ],
    };

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error(`Webhook notification failed: ${res.status} ${res.statusText}`);
    } else {
      console.log("Webhook notification sent successfully");
    }
  } catch (err) {
    console.error("Webhook notification error:", err);
    // Don't throw — notification failure shouldn't break the form submission
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment and try again." },
        { status: 429 },
      );
    }

    // Validate input
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      return NextResponse.json(
        { error: firstError?.message || "Invalid form data." },
        { status: 400 },
      );
    }

    const data = parsed.data;

    // Insert into Supabase
    const { error: dbError } = await supabase.from("contact_submissions").insert({
      name: data.name,
      email: data.email || null,
      phone: data.phone,
      address: data.address || null,
      service: data.service || null,
      message: data.message || null,
      preferred_contact: data.preferred_contact,
    });

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return NextResponse.json(
        { error: "Something went wrong. Please call us directly at (843) 306-2939." },
        { status: 500 },
      );
    }

    // Send webhook notification (fire-and-forget, don't block response)
    sendWebhookNotification(data).catch((err) =>
      console.error("Webhook notification failed:", err),
    );

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Contact endpoint error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please call us directly at (843) 306-2939." },
      { status: 500 },
    );
  }
}
