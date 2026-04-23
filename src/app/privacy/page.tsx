import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Restoration Roofing SC",
  description: "Privacy Policy for Restoration Roofing SC. Learn how we collect, use, and protect your personal information, including SMS opt-in data.",
  openGraph: {
    title: "Privacy Policy | Restoration Roofing SC",
    description: "Privacy Policy for Restoration Roofing SC.",
    url: "https://www.restorationroofingsc.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-16 md:py-20">
        <div className="container">
          <nav className="text-sm text-white/50 mb-4">
            <Link href="/" className="hover:text-amber transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white/80">Privacy Policy</span>
          </nav>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
            Privacy Policy
          </h1>
          <p className="text-white/60 text-sm">Effective Date: January 1, 2025</p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-12 md:py-16">
        <div className="container max-w-4xl">
          <div className="prose prose-slate max-w-none">

            {/* SMS Data Notice */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 mb-8">
              <p className="text-sm font-semibold text-navy mb-1">Important Notice Regarding SMS Data</p>
              <p className="text-sm text-slate-600 leading-relaxed m-0">
                Restoration Roofing SC does <strong>not</strong> share customer SMS opt-in data — including phone
                numbers and consent records — with any third parties or affiliates for marketing or promotional
                purposes. All text messaging originator opt-in data is kept strictly confidential.
              </p>
            </div>

            <p className="text-slate-600 leading-relaxed">
              Restoration Roofing SC ("we," "us," or "our") is committed to protecting the privacy of our
              customers and website visitors. This Privacy Policy explains what information we collect, how we use
              it, and your rights regarding that information. By using our website or services, you agree to the
              practices described here.
            </p>

            {/* Section 1 */}
            <h2 className="font-display text-xl font-bold text-navy mt-10 mb-4">1. Information We Collect</h2>

            <h3 className="font-semibold text-navy text-base mt-5 mb-2">Personal Information</h3>
            <ul className="text-slate-600 space-y-1">
              <li>Name, email address, phone number, and physical address</li>
              <li>Payment or financing information when requesting a quote or making a purchase</li>
              <li>Opt-in records and timestamps for SMS and email communications</li>
            </ul>

            <h3 className="font-semibold text-navy text-base mt-5 mb-2">Technical &amp; Usage Information</h3>
            <ul className="text-slate-600 space-y-1">
              <li>IP address, browser type, and device information</li>
              <li>Pages visited, time on site, and referring URLs</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h3 className="font-semibold text-navy text-base mt-5 mb-2">Service &amp; Communication Records</h3>
            <ul className="text-slate-600 space-y-1">
              <li>Inquiries, inspection requests, and job details</li>
              <li>Appointment history and scheduling preferences</li>
              <li>Customer feedback and reviews</li>
            </ul>

            {/* Section 2 */}
            <h2 className="font-display text-xl font-bold text-navy mt-10 mb-4">2. How We Use Your Information</h2>
            <p className="text-slate-600 leading-relaxed">We use the information we collect to:</p>
            <ul className="text-slate-600 space-y-1">
              <li>Schedule and deliver roofing services</li>
              <li>Respond to inquiries and provide customer support</li>
              <li>Send appointment confirmations, reminders, and follow-ups</li>
              <li>Process transactions and financing applications</li>
              <li>Improve our website and service offerings</li>
              <li>Comply with legal obligations and protect our business interests</li>
            </ul>
            <p className="text-slate-600 leading-relaxed mt-3">
              We will not use your information for purposes materially different from those listed above without
              obtaining your consent.
            </p>

            {/* Section 3 */}
            <h2 className="font-display text-xl font-bold text-navy mt-10 mb-4">3. SMS Messaging &amp; Compliance</h2>

            <h3 className="font-semibold text-navy text-base mt-5 mb-2">Consent &amp; Opt-In</h3>
            <p className="text-slate-600 leading-relaxed">
              You will only receive SMS messages from us if you have explicitly opted in through our website or
              scheduling forms. We maintain timestamped records of all opt-in actions and comply with the Telephone
              Consumer Protection Act (TCPA) and CTIA guidelines.
            </p>

            <h3 className="font-semibold text-navy text-base mt-5 mb-2">Message Content &amp; Frequency</h3>
            <p className="text-slate-600 leading-relaxed">
              Messages are limited to appointment-related communications, service updates, and customer support
              responses. Frequency varies based on your interactions with us. We do not send unsolicited
              promotional messages.
            </p>

            <h3 className="font-semibold text-navy text-base mt-5 mb-2">Opt-Out</h3>
            <p className="text-slate-600 leading-relaxed">
              Reply <strong>STOP</strong> at any time to unsubscribe. You will receive one final confirmation and
              no further messages will be sent unless you re-enroll. All opt-out requests are processed immediately.
            </p>

            <h3 className="font-semibold text-navy text-base mt-5 mb-2">Help &amp; Support</h3>
            <p className="text-slate-600 leading-relaxed">
              Reply <strong>HELP</strong> or contact us at{" "}
              <a href="mailto:info@restorationroofingsc.com" className="text-amber hover:underline">
                info@restorationroofingsc.com
              </a>{" "}
              or{" "}
              <a href="tel:8433062939" className="text-amber hover:underline">(843) 306-2939</a>.
            </p>

            <h3 className="font-semibold text-navy text-base mt-5 mb-2">SMS Data Protection</h3>
            <p className="text-slate-600 leading-relaxed">
              No mobile information will be shared with third parties or affiliates for marketing or promotional
              purposes. Sharing with subcontractors for direct service support (e.g., scheduling software) is
              permitted, but SMS originator opt-in data and consent records are explicitly excluded from all such
              sharing. Standard message and data rates may apply; carriers are not liable for delayed or
              undelivered messages.
            </p>

            {/* Section 4 */}
            <h2 className="font-display text-xl font-bold text-navy mt-10 mb-4">4. Information Sharing &amp; Disclosure</h2>
            <p className="text-slate-600 leading-relaxed">
              We do not sell, rent, or trade your personal information. We may share information only in the
              following limited circumstances:
            </p>
            <ul className="text-slate-600 space-y-1">
              <li>
                <strong>Service providers:</strong> Vendors who support our operations (e.g., payment processing,
                scheduling platforms, SMS delivery). All providers are contractually required to maintain
                confidentiality and may not use your data for their own purposes.
              </li>
              <li>
                <strong>Legal compliance:</strong> When required by law, court order, or to protect our legal rights.
              </li>
              <li>
                <strong>Business transfers:</strong> In the event of a merger, acquisition, or sale of assets,
                your data remains subject to this policy.
              </li>
            </ul>
            <p className="text-slate-600 leading-relaxed mt-3">
              All of the above categories exclude SMS originator opt-in data and consent records; this information
              will not be shared with any third parties, excluding SMS aggregators and providers necessary to
              deliver the messages you have consented to receive.
            </p>

            {/* Section 5 */}
            <h2 className="font-display text-xl font-bold text-navy mt-10 mb-4">5. Data Security</h2>
            <p className="text-slate-600 leading-relaxed">
              We implement commercially reasonable security measures to protect your information, including
              encryption of data in transit and at rest, access controls, and regular security reviews. No method
              of internet transmission is 100% secure. In the event of a data breach affecting your information,
              we will notify you as required by applicable law.
            </p>

            {/* Section 6 */}
            <h2 className="font-display text-xl font-bold text-navy mt-10 mb-4">6. Cookies &amp; Tracking</h2>
            <p className="text-slate-600 leading-relaxed">
              We use cookies and similar technologies to analyze site traffic, remember preferences, and improve
              your experience. You can control cookies through your browser settings; disabling them may limit
              certain site functionality.
            </p>

            {/* Section 7 */}
            <h2 className="font-display text-xl font-bold text-navy mt-10 mb-4">7. Your Rights</h2>
            <p className="text-slate-600 leading-relaxed">You have the right to:</p>
            <ul className="text-slate-600 space-y-1">
              <li>Access, correct, or request deletion of your personal information</li>
              <li>Opt out of marketing emails via the unsubscribe link in any message</li>
              <li>Opt out of SMS messages by replying STOP</li>
              <li>Request information about how your data is processed</li>
              <li>Withdraw consent for future communications at any time</li>
            </ul>
            <p className="text-slate-600 leading-relaxed mt-3">
              To exercise any of these rights, contact us using the information in Section 9 below.
            </p>

            {/* Section 8 */}
            <h2 className="font-display text-xl font-bold text-navy mt-10 mb-4">8. Third-Party Links</h2>
            <p className="text-slate-600 leading-relaxed">
              Our website may contain links to third-party sites such as financing partners or review platforms.
              We are not responsible for their privacy practices. This policy applies only to information collected
              directly by Restoration Roofing SC.
            </p>

            {/* Section 9 */}
            <h2 className="font-display text-xl font-bold text-navy mt-10 mb-4">9. Changes to This Policy</h2>
            <p className="text-slate-600 leading-relaxed">
              We may update this Privacy Policy from time to time. The current version will always be available on
              our website with the effective date. For material changes, we will notify you by email or via a
              notice on our site.
            </p>

            {/* Section 10 */}
            <h2 className="font-display text-xl font-bold text-navy mt-10 mb-4">10. Contact Us</h2>
            <p className="text-slate-600 leading-relaxed">
              Questions or concerns about this Privacy Policy? Reach us at:
            </p>
            <address className="not-italic text-slate-600 leading-relaxed mt-3 space-y-1">
              <div><strong className="text-navy">Restoration Roofing SC</strong></div>
              <div>1261 Pearwood Ct, Mount Pleasant, SC 29464</div>
              <div>
                Phone:{" "}
                <a href="tel:8433062939" className="text-amber hover:underline">(843) 306-2939</a>
              </div>
              <div>
                Email:{" "}
                <a href="mailto:info@restorationroofingsc.com" className="text-amber hover:underline">
                  info@restorationroofingsc.com
                </a>
              </div>
              <div>
                Website:{" "}
                <a href="https://www.restorationroofingsc.com" className="text-amber hover:underline">
                  www.restorationroofingsc.com
                </a>
              </div>
            </address>
            <p className="text-slate-500 text-sm mt-6">
              By using our website and services, you consent to this Privacy Policy.
            </p>

          </div>
        </div>
      </section>
    </>
  );
}
