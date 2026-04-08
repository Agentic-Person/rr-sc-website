import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us | Family-Owned Charleston Roofers",
  description: "Family-owned roofing contractor based in Mount Pleasant, SC. Learn about our team, values, and commitment to protecting Charleston-area homes.",
  openGraph: {
    title: "About Us | Restoration Roofing SC",
    description: "Family-owned roofing contractor based in Mount Pleasant, SC. Learn about our team, values, and commitment to protecting Charleston-area homes.",
    url: "https://www.restorationroofingsc.com/about",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
