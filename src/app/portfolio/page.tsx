import type { Metadata } from "next";
import PortfolioContent from "./PortfolioContent";

export const metadata: Metadata = {
  title: "Our Work | Project Portfolio",
  description: "View our portfolio of completed roofing projects across Charleston, SC. Roof replacements, storm damage repairs, metal roofing, and more.",
  openGraph: {
    title: "Our Work | Restoration Roofing SC",
    description: "View our portfolio of completed roofing projects across Charleston, SC. Roof replacements, storm damage repairs, metal roofing, and more.",
    url: "https://www.restorationroofingsc.com/portfolio",
  },
};

export default function PortfolioPage() {
  return <PortfolioContent />;
}
