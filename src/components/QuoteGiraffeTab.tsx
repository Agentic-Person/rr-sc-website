"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useQuoteWidget, ROOFLE_SELECTORS } from "@/contexts/QuoteWidgetContext";

function findRoofleRoot(): Element | null {
  for (const sel of ROOFLE_SELECTORS) {
    const el = document.querySelector(sel);
    if (el) return el;
  }
  return null;
}

function detectOpen(root: Element): boolean {
  const cls = root.className ?? "";
  const style = (root as HTMLElement).style ?? {};
  return (
    /\bopen\b|\bactive\b|\bshow\b|\bis-open\b/.test(cls) ||
    root.getAttribute("aria-expanded") === "true" ||
    style.transform === "translateX(0px)" ||
    style.transform === "translateX(0)"
  );
}

export default function QuoteGiraffeTab() {
  const { openRoofleWidget } = useQuoteWidget();
  const [panelOpen, setPanelOpen] = useState(false);
  const firstEntry = useRef(true);

  useEffect(() => {
    let panelObserver: MutationObserver | null = null;
    let domObserver: MutationObserver | null = null;

    function attachPanelObserver(root: Element) {
      panelObserver = new MutationObserver(() => {
        setPanelOpen(detectOpen(root));
      });
      panelObserver.observe(root, {
        attributes: true,
        attributeFilter: ["class", "style", "aria-expanded"],
        subtree: true,
      });
    }

    const root = findRoofleRoot();
    if (root) {
      attachPanelObserver(root);
    } else {
      domObserver = new MutationObserver(() => {
        const found = findRoofleRoot();
        if (found) {
          domObserver?.disconnect();
          domObserver = null;
          attachPanelObserver(found);
        }
      });
      domObserver.observe(document.body, { childList: true, subtree: true });
    }

    // Click-based fallback: poll 150ms after any click on a Roofle element
    function handleClick(e: MouseEvent) {
      const target = e.target as Element;
      const isRoofleEl = ROOFLE_SELECTORS.some((sel) => target.closest(sel));
      if (!isRoofleEl) return;
      setTimeout(() => {
        const r = findRoofleRoot();
        if (r) setPanelOpen(detectOpen(r));
      }, 150);
    }
    document.addEventListener("click", handleClick);

    return () => {
      panelObserver?.disconnect();
      domObserver?.disconnect();
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="hidden md:block">
      <AnimatePresence>
        {!panelOpen && (
          <motion.div
            key="tab"
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 80, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 28,
              stiffness: 180,
              delay: firstEntry.current ? 1.2 : 0,
            }}
            onAnimationComplete={() => { firstEntry.current = false; }}
            className="fixed right-5 z-40 -translate-y-1/2"
            style={{ top: "calc(50% - 20px)" }}
          >
            <motion.button
              onClick={openRoofleWidget}
              whileHover={{ x: -10 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="cursor-pointer drop-shadow-2xl"
              aria-label="Get an instant roof quote"
            >
              <Image
                src="/images/giraffe-quote-tab-v4.webp"
                alt="Get Instant Roof Quote"
                width={216}
                height={282}
                style={{ width: "216px", height: "auto" }}
              />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
