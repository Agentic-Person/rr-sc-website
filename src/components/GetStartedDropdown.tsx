"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Users, Zap, ChevronDown } from "lucide-react";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { COMPANY } from "@/lib/data";
import { useQuoteWidget } from "@/contexts/QuoteWidgetContext";

// ─────────────────────────────────────────────────────────────
// Shared types
// ─────────────────────────────────────────────────────────────
interface CallbackFormState {
  name: string;
  phone: string;
  email: string;
  preferredTime: "morning" | "afternoon" | "evening" | "anytime";
}

const defaultForm: CallbackFormState = {
  name: "",
  phone: "",
  email: "",
  preferredTime: "anytime",
};

// localStorage keys for persisting opt-in consent across visits
const SMS_OPT_IN_KEY = "rr-sms-opted-in";
const CONTACT_OPT_IN_KEY = "rr-contact-opted-in";

function usePersistedOptIn(
  storageKey: string
): [boolean, (v: boolean) => void] {
  const [optedIn, setOptedInState] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(storageKey) === "1") setOptedInState(true);
    } catch {
      // localStorage blocked — fall back to in-memory only
    }
  }, [storageKey]);

  const setOptedIn = (v: boolean) => {
    setOptedInState(v);
    try {
      if (v) localStorage.setItem(storageKey, "1");
      else localStorage.removeItem(storageKey);
    } catch {
      // ignore
    }
  };

  return [optedIn, setOptedIn];
}

// ─────────────────────────────────────────────────────────────
// Inline callback form (desktop only)
// ─────────────────────────────────────────────────────────────
function CallbackForm({ onClose }: { onClose?: () => void }) {
  const [form, setForm] = useState<CallbackFormState>(defaultForm);
  const [optedIn, setOptedIn] = usePersistedOptIn(CONTACT_OPT_IN_KEY);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email || null,
          address: null,
          service: null,
          preferred_contact: "phone",
          message: `Requested callback — preferred time: ${form.preferredTime}`,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || `Request failed (${res.status})`);
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div
        role="status"
        className="py-3 px-1 text-sm text-green-400 font-medium text-center"
      >
        Got it — we&apos;ll reach out shortly.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-2 space-y-2">
      <div>
        <label
          htmlFor="gs-name"
          className="block text-xs font-medium text-gray-200 mb-0.5"
        >
          Name <span aria-hidden="true">*</span>
        </label>
        <input
          id="gs-name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          className="w-full px-2.5 py-1.5 rounded border border-border bg-linen/30 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber transition-colors"
        />
      </div>

      <div>
        <label
          htmlFor="gs-phone"
          className="block text-xs font-medium text-gray-200 mb-0.5"
        >
          Phone <span aria-hidden="true">*</span>
        </label>
        <input
          id="gs-phone"
          name="phone"
          type="tel"
          required
          value={form.phone}
          onChange={handleChange}
          placeholder="(843) 555-0100"
          className="w-full px-2.5 py-1.5 rounded border border-border bg-linen/30 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber transition-colors"
        />
      </div>

      <div>
        <label
          htmlFor="gs-email"
          className="block text-xs font-medium text-gray-200 mb-0.5"
        >
          Email <span className="text-gray-400 font-normal">(optional)</span>

        </label>
        <input
          id="gs-email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className="w-full px-2.5 py-1.5 rounded border border-border bg-linen/30 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber transition-colors"
        />
      </div>

      <div>
        <label
          htmlFor="gs-time"
          className="block text-xs font-medium text-gray-200 mb-0.5"
        >
          Preferred time
        </label>
        <select
          id="gs-time"
          name="preferredTime"
          value={form.preferredTime}
          onChange={handleChange}
          className="w-full px-2.5 py-1.5 rounded border border-border bg-linen/30 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber transition-colors"
        >
          <option value="morning">Morning</option>
          <option value="afternoon">Afternoon</option>
          <option value="evening">Evening</option>
          <option value="anytime">Anytime</option>
        </select>
      </div>

      {error && (
        <p className="text-xs text-red-600" role="alert">
          {error}
        </p>
      )}

      <label className="flex items-start gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={optedIn}
          onChange={(e) => setOptedIn(e.target.checked)}
          className="mt-0.5 h-4 w-4 accent-amber shrink-0"
        />
        <span
          className={`text-[10px] leading-snug transition-colors duration-200 ${
            optedIn ? "text-gray-300" : "text-red-400 font-medium"
          }`}
        >
          By checking this box, I consent to receive non-marketing calls and
          text messages from Restoration Roofing SC regarding appointment
          reminders, service updates, project notifications, and
          account-related information. Message frequency may vary. Message
          and data rates may apply. Text HELP for assistance, reply STOP to
          opt out.
        </span>
      </label>

      <button
        type="submit"
        disabled={submitting || !optedIn}
        className={`w-full py-1.5 rounded text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber/60 ${
          optedIn
            ? "btn-amber"
            : "bg-amber/25 text-gray-900/50 cursor-not-allowed"
        } disabled:opacity-60`}
      >
        {submitting ? "Sending…" : "Send Friend Request"}
      </button>
    </form>
  );
}

// ─────────────────────────────────────────────────────────────
// Shared row components
// ─────────────────────────────────────────────────────────────

/** Row 1 — Text us (desktop: inline opt-in + click-to-copy) */
function TextUsRowDesktop() {
  const [expanded, setExpanded] = useState(false);
  const [optedIn, setOptedIn] = usePersistedOptIn(SMS_OPT_IN_KEY);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(COMPANY.phone);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // no-op; the number is visible on the button so users can copy manually
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="w-full flex items-center gap-3 px-3 py-3 rounded-md hover:bg-amber/20 transition-colors duration-200 group text-left focus:outline-none focus:ring-2 focus:ring-amber/60"
      >
        <MessageSquare className="w-5 h-5 text-amber shrink-0" />
        <span className="text-sm font-semibold text-white group-hover:text-amber transition-colors">
          Text us
        </span>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            key="text-opt-in"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden px-3 pb-3"
          >
            <label className="flex items-start gap-2 py-2 cursor-pointer">
              <input
                type="checkbox"
                checked={optedIn}
                onChange={(e) => setOptedIn(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-amber shrink-0"
              />
              <span
                className={`text-[11px] leading-snug transition-colors duration-200 ${
                  optedIn ? "text-gray-300" : "text-red-400 font-medium"
                }`}
              >
                By checking this box, I consent to receive non-marketing text
                messages from Restoration Roofing SC regarding appointment
                reminders, service updates, project notifications, and
                account-related information. Message frequency may vary.
                Message and data rates may apply. Text HELP for assistance,
                reply STOP to opt out.
              </span>
            </label>

            <button
              type="button"
              onClick={handleCopy}
              disabled={!optedIn}
              className={`w-full mt-1 px-3 py-2 rounded-md border text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber/60 ${
                optedIn
                  ? "bg-amber/15 hover:bg-amber/30 border-amber/50 text-amber"
                  : "bg-white/5 border-white/10 text-gray-500 cursor-not-allowed"
              }`}
            >
              {copied ? "Copied!" : `Copy ${COMPANY.phone}`}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Row 2 — Have our friendly non-commissioned team contact you (desktop variant with inline form) */
function ContactRowDesktop() {
  const [callbackOpen, setCallbackOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setCallbackOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-3 py-3 rounded-md hover:bg-amber/20 transition-colors duration-200 group text-left focus:outline-none focus:ring-2 focus:ring-amber/60"
      >
        <Users className="w-5 h-5 text-amber shrink-0 mt-0.5" />
        <span className="text-sm font-semibold text-white group-hover:text-amber transition-colors">
          Have our friendly non-commissioned team contact you
        </span>
      </button>

      <AnimatePresence>
        {callbackOpen && (
          <motion.div
            key="callback-form"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden px-3 pb-2"
          >
            <CallbackForm />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Row 3 — Get a quick estimate (shared logic, different wrapper per variant) */
function EstimateRowDesktop() {
  const { openRoofleWidget } = useQuoteWidget();

  return (
    <button
      type="button"
      onClick={openRoofleWidget}
      className="w-full flex items-start gap-3 px-3 py-3 rounded-md hover:bg-amber/20 transition-colors duration-200 group text-left focus:outline-none focus:ring-2 focus:ring-amber/60"
    >
      <Zap className="w-5 h-5 text-amber shrink-0 mt-0.5" />
      <div>
        <span className="block text-sm font-semibold text-white group-hover:text-amber transition-colors">
          Get a quick estimate
        </span>
        <span className="block text-xs text-gray-300">
          Talk to Jerry — our instant roof estimator.
        </span>
      </div>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// Export 1 — Desktop HoverCard dropdown
// ─────────────────────────────────────────────────────────────
export function GetStartedDropdownDesktop() {
  return (
    <HoverCard openDelay={80} closeDelay={150}>
      <HoverCardTrigger asChild>
        <button
          type="button"
          className="btn-amber px-5 py-2.5 rounded-md text-base inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-amber/60"
        >
          Get Started — No Obligations
          <ChevronDown className="w-4 h-4" />
        </button>
      </HoverCardTrigger>

      <HoverCardContent
        className="w-[320px] p-2 bg-gray-900 border border-gray-800 text-white shadow-2xl"
        align="end"
        sideOffset={8}
      >
        <div className="space-y-0.5">
          <TextUsRowDesktop />
          <ContactRowDesktop />
          <EstimateRowDesktop />
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

// ─────────────────────────────────────────────────────────────
// Export 2 — Mobile accordion expander
// ─────────────────────────────────────────────────────────────
export function GetStartedDropdownMobile({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const { openRoofleWidget } = useQuoteWidget();

  return (
    <div>
      {/* Accordion trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="btn-amber w-full px-5 py-3 rounded-md text-base font-semibold flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-amber/60"
        aria-expanded={open}
      >
        Get Started — No Obligations
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="inline-flex"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.span>
      </button>

      {/* Accordion body */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-dropdown"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="mt-1 space-y-1 px-1">
              {/* Row 1 — Text us */}
              <a
                href={`sms:+1${COMPANY.phoneRaw}?body=${encodeURIComponent(
                  "Hi Restoration Roofing, I'd like to talk about my roof."
                )}`}
                aria-label={`Text us at ${COMPANY.phone}`}
                className="flex items-center gap-3 px-4 min-h-[56px] rounded-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-amber/60"
              >
                <MessageSquare className="w-5 h-5 text-amber shrink-0" />
                <div>
                  <span className="block text-sm font-semibold text-gray-900">
                    Text us
                  </span>
                  <span className="block text-xs text-gray-500">
                    {COMPANY.phone}
                  </span>
                </div>
              </a>

              {/* Row 2 — Contact (mobile: link to /contact) */}
              <a
                href="/contact"
                className="flex items-center gap-3 px-4 min-h-[56px] rounded-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-amber/60"
              >
                <Users className="w-5 h-5 text-amber shrink-0" />
                <span className="block text-sm font-semibold text-gray-900">
                  Have our friendly non-commissioned team contact you
                </span>
              </a>

              {/* Row 3 — Estimate */}
              <button
                type="button"
                onClick={() => {
                  openRoofleWidget();
                  onNavigate?.();
                }}
                className="w-full flex items-start gap-3 px-4 min-h-[56px] rounded-md hover:bg-gray-100 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-amber/60"
              >
                <Zap className="w-5 h-5 text-amber shrink-0 mt-0.5" />
                <div>
                  <span className="block text-sm font-semibold text-gray-900">
                    Get a quick estimate
                  </span>
                  <span className="block text-xs text-gray-500">
                    Talk to Jerry — our instant roof estimator.
                  </span>
                </div>
              </button>

              <p className="px-4 pt-2 pb-1 text-[10px] leading-snug text-gray-500">
                By texting or contacting us, you agree to receive
                communications from Restoration Roofing. Msg &amp; data rates
                may apply. Reply STOP to opt out. See our{" "}
                <a href="/privacy" className="underline hover:text-amber">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
