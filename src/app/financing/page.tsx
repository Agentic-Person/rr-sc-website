import type { Metadata } from "next";
import FinancingContent from "./FinancingContent";

export const metadata: Metadata = {
  title: "Roofing Financing | Affordable Payment Plans",
  description: "Affordable roofing financing options in Charleston, SC. 0% APR available. Calculate your monthly payment with our free tool. Call (843) 306-2939.",
  openGraph: {
    title: "Roofing Financing | Restoration Roofing SC",
    description: "Affordable roofing financing options in Charleston, SC. 0% APR available. Calculate your monthly payment with our free tool.",
    url: "https://www.restorationroofingsc.com/financing",
  },
};

export default function FinancingPage() {
  return <FinancingContent />;
}
