import type { Metadata } from "next";
import MaterialsCompareContent from "./materials-compare-content";

export const metadata: Metadata = {
  title: "Roofing Materials Comparison | Prices & Ratings",
  description:
    "Compare roofing materials side by side — see real prices, lifespan, hurricane ratings, and how each performs in Charleston's coastal climate. Full transparency, no surprises.",
  openGraph: {
    title: "Roofing Materials Comparison | Restoration Roofing SC",
    description: "Compare roofing materials with real Charleston-area pricing and climate performance ratings.",
  },
};

export default function MaterialsComparePage() {
  return <MaterialsCompareContent />;
}
