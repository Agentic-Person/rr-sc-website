import type { Metadata } from "next";
import ReviewsContent from "./ReviewsContent";

export const metadata: Metadata = {
  title: "Customer Reviews | 5-Star Google Rating",
  description: "Read what Charleston-area homeowners say about Restoration Roofing SC. 5-star Google rating with 186+ verified reviews.",
  openGraph: {
    title: "Customer Reviews | Restoration Roofing SC",
    description: "Read what Charleston-area homeowners say about Restoration Roofing SC. 5-star Google rating with 186+ verified reviews.",
    url: "https://www.restorationroofingsc.com/reviews",
  },
};

export default function ReviewsPage() {
  return <ReviewsContent />;
}
