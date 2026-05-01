import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Restoration Roofing SC",
  description: "Terms of Service for Restoration Roofing SC. Learn about our website terms, SMS messaging program, and your rights as a customer.",
  openGraph: {
    title: "Terms of Service | Restoration Roofing SC",
    description: "Terms of Service for Restoration Roofing SC.",
    url: "https://www.restorationroofingsc.com/terms",
  },
};

export default function TermsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-16 md:py-20">
        <div className="container">
          <nav className="text-sm text-white/50 mb-4">
            <Link href="/" className="hover:text-amber transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white/80">Terms of Service</span>
          </nav>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
            Terms of Service
          </h1>
          <p className="text-white/60 text-sm">Effective Date: January 1, 2025</p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-12 md:py-16">
        <div className="container max-w-4xl">
          <div className="prose prose-slate max-w-none">

            <p className="text-slate-600 leading-relaxed">
              This website (the "Site") is owned and operated by Restoration Roofing SC ("we," "us," or "our"), a
              licensed roofing contractor operating in South Carolina. By accessing or using the Site, you agree to
              be bound by these Terms of Service. If you do not agree, please discontinue use of the Site.
            </p>
            <p className="text-slate-600 leading-relaxed">
              We reserve the right to update these Terms at any time. Continued use of the Site after changes are
              posted constitutes your acceptance of the revised Terms.
            </p>

            {/* SMS */}
            <h2 className="font-display text-xl font-bold text-navy mt-10 mb-4">SMS Messaging Terms &amp; Compliance</h2>

            <h3 className="font-semibold text-navy text-base mt-6 mb-2">1. Program Description</h3>
            <p className="text-slate-600 leading-relaxed">
              Our SMS messaging program sends appointment confirmations, reminders, rescheduling notifications,
              and customer support communications to customers who have explicitly opted in through our website
              forms or scheduling tools. Consent is collected via a dedicated checkbox at the point of sign-up and
              is never implied or assumed.
            </p>

            <h3 className="font-semibold text-navy text-base mt-6 mb-2">2. How to Cancel</h3>
            <p className="text-slate-600 leading-relaxed">
              You may opt out of SMS messages at any time by replying <strong>STOP</strong> to any message we send.
              You will receive a one-time confirmation, and no further messages will be sent. To re-enroll, simply
              opt in again through our website.
            </p>

            <h3 className="font-semibold text-navy text-base mt-6 mb-2">3. Support</h3>
            <p className="text-slate-600 leading-relaxed">
              For help with our messaging program, reply <strong>HELP</strong> to any message, email us at{" "}
              <a href="mailto:info@restorationroofingsc.com" className="text-amber hover:underline">
                info@restorationroofingsc.com
              </a>
              , or call{" "}
              <a href="tel:8433062939" className="text-amber hover:underline">
                (843) 306-2939
              </a>{" "}
              during business hours.
            </p>

            <h3 className="font-semibold text-navy text-base mt-6 mb-2">4. Message &amp; Data Rates</h3>
            <p className="text-slate-600 leading-relaxed">
              Standard message and data rates may apply. Message frequency varies based on your scheduled appointments
              and service requests. For questions about your plan, contact your wireless provider.
            </p>

            <h3 className="font-semibold text-navy text-base mt-6 mb-2">5. Carrier Liability</h3>
            <p className="text-slate-600 leading-relaxed">
              Carriers are not liable for delayed or undelivered messages. Our SMS program is compatible with all
              major U.S. carriers including AT&amp;T, Verizon, T-Mobile, and most regional providers.
            </p>

            <h3 className="font-semibold text-navy text-base mt-6 mb-2">6. Age Requirement</h3>
            <p className="text-slate-600 leading-relaxed">
              You must be 18 years of age or older to participate in our SMS messaging program.
            </p>

            <h3 className="font-semibold text-navy text-base mt-6 mb-2">7. Compliance</h3>
            <p className="text-slate-600 leading-relaxed">
              We comply with the Telephone Consumer Protection Act (TCPA) and applicable CTIA guidelines governing
              commercial SMS communications.
            </p>

            {/* General Terms */}
            <h2 className="font-display text-xl font-bold text-navy mt-10 mb-4">General Website Terms</h2>

            <h3 className="font-semibold text-navy text-base mt-6 mb-2">Use of the Site</h3>
            <p className="text-slate-600 leading-relaxed">
              The Site is provided for your personal, non-commercial use. You agree not to misuse the Site, attempt
              unauthorized access to any part of it, or use it in any manner that could damage, disable, or impair
              the Site or interfere with others' use of it.
            </p>

            <h3 className="font-semibold text-navy text-base mt-6 mb-2">Intellectual Property</h3>
            <p className="text-slate-600 leading-relaxed">
              All content on this Site — including text, images, logos, graphics, and code — is the property of
              Restoration Roofing SC or its licensors and is protected by copyright and other intellectual property
              laws. You may not reproduce, distribute, or create derivative works from any Site content without our
              express written permission. Personal, non-commercial printing of individual pages is permitted
              provided all copyright notices remain intact.
            </p>

            <h3 className="font-semibold text-navy text-base mt-6 mb-2">Submitted Content</h3>
            <p className="text-slate-600 leading-relaxed">
              If you submit reviews, photos, or other content to us, you represent that you own or have rights to
              that content and grant us a perpetual, royalty-free license to use, display, and distribute it in
              connection with our business.
            </p>

            <h3 className="font-semibold text-navy text-base mt-6 mb-2">Disclaimers</h3>
            <p className="text-slate-600 leading-relaxed">
              The Site and all content are provided "as is" without warranties of any kind, express or implied,
              including warranties of merchantability or fitness for a particular purpose. Links to third-party
              sites are provided for convenience and do not constitute our endorsement of those sites or their
              content. We are not responsible for the accuracy or availability of any third-party site.
            </p>

            <h3 className="font-semibold text-navy text-base mt-6 mb-2">Indemnification</h3>
            <p className="text-slate-600 leading-relaxed">
              You agree to indemnify and hold harmless Restoration Roofing SC, its officers, employees, and agents
              from any claims, damages, or expenses arising from your use of the Site or violation of these Terms.
            </p>

            <h3 className="font-semibold text-navy text-base mt-6 mb-2">Governing Law</h3>
            <p className="text-slate-600 leading-relaxed">
              These Terms are governed by the laws of the State of South Carolina. Any disputes arising under
              these Terms shall be resolved exclusively in the courts of South Carolina, or through binding
              arbitration if mutually agreed upon.
            </p>

            <h3 className="font-semibold text-navy text-base mt-6 mb-2">Termination</h3>
            <p className="text-slate-600 leading-relaxed">
              We reserve the right to suspend or terminate access to the Site at any time and without notice for
              conduct that we determine, in our sole discretion, violates these Terms or is harmful to other users,
              us, or third parties.
            </p>

            {/* Contact */}
            <h2 className="font-display text-xl font-bold text-navy mt-10 mb-4">Contact Us</h2>
            <p className="text-slate-600 leading-relaxed">
              Questions about these Terms? Reach us at:
            </p>
            <address className="not-italic text-slate-600 leading-relaxed mt-3 space-y-1">
              <div><strong className="text-navy">Restoration Roofing SC</strong></div>
              <div>75 Port City Landing, Suite 110, Mount Pleasant, SC 29464</div>
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
              By using our website and services, you consent to these Terms of Service.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
