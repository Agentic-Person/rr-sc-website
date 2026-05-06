"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

// Roofle RoofQuote PRO injects elements matching these selectors
const ROOFLE_SELECTORS = [
  '[class*="rfq-pro"]',
  '[class*="roofle"]',
  '[id*="rfq"]',
  '[id*="roofle"]',
];

// Match Roofle's desktop panel width — adjust if their panel is wider/narrower
const PANEL_WIDTH_PX = 420;

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

export default function RoofleGiraffeOverlay() {
  const [panelOpen, setPanelOpen] = useState(false);

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
      // Roofle script loads async — wait for it to inject its DOM
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

    // Click-based fallback: poll state 150ms after any click on a Roofle element
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
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        right: 20,
        top: "50%",
        // Slide left with the Roofle panel when it opens
        transform: panelOpen
          ? `translate(-${PANEL_WIDTH_PX}px, -50%)`
          : "translateY(-50%)",
        transition: "transform 0.4s ease",
        // Sit just below Roofle's tab so the giraffe peeks from behind it.
        // If Roofle's z-index differs from 9999, tune this value.
        zIndex: 9998,
        pointerEvents: "none",
      }}
    >
      <Image
        src="/images/giraffe-quote-tab-v5b.webp"
        alt=""
        width={160}
        height={213}
        style={{ width: "160px", height: "auto" }}
        priority
      />
    </div>
  );
}
