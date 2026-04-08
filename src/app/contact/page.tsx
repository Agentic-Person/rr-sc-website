import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Us | Free Estimates",
  description: "Contact Restoration Roofing SC for a free roof inspection and estimate. Call (843) 306-2939 or fill out our form. 24/7 emergency service available.",
  openGraph: {
    title: "Contact Us | Restoration Roofing SC",
    description: "Contact Restoration Roofing SC for a free roof inspection and estimate. Call (843) 306-2939 or fill out our form. 24/7 emergency service available.",
    url: "https://www.restorationroofingsc.com/contact",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
