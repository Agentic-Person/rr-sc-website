"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function QuoteGiraffeTab() {
  return (
    <div className="hidden md:block">
    <motion.div
      initial={{ x: 80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", damping: 28, stiffness: 180, delay: 1.2 }}
      className="fixed right-5 z-40 -translate-y-1/2"
      style={{ top: "calc(50% - 20px)" }}
    >
      <Link href="/roof-quote" aria-label="Get an instant roof quote">
        <motion.div
          whileHover={{ x: -10 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="cursor-pointer drop-shadow-2xl"
        >
          <Image
            src="/images/giraffe-quote-tab-v4.webp"
            alt="Get Instant Roof Quote"
            width={216}
            height={289}
            style={{ width: "216px", height: "auto" }}
          />
        </motion.div>
      </Link>
    </motion.div>
    </div>
  );
}
