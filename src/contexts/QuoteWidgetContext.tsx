"use client";

import React, { createContext, useCallback, useContext } from "react";

export const ROOFLE_SELECTORS = [
  '[class*="rfq-pro"]',
  '[class*="roofle"]',
  '[id*="rfq"]',
  '[id*="roofle"]',
];

interface QuoteWidgetContextType {
  openRoofleWidget: () => void;
}

const QuoteWidgetContext = createContext<QuoteWidgetContextType>({
  openRoofleWidget: () => {
    console.warn("openRoofleWidget called outside QuoteWidgetProvider");
  },
});

interface QuoteWidgetProviderProps {
  children: React.ReactNode;
}

export function QuoteWidgetProvider({ children }: QuoteWidgetProviderProps) {
  const openRoofleWidget = useCallback(() => {
    // Try window-level API first (most reliable, works before DOM settles)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;
    if (typeof win.RoofQuotePro?.open === "function") { win.RoofQuotePro.open(); return; }
    if (typeof win.rfqPro?.open === "function") { win.rfqPro.open(); return; }
    if (typeof win.roofle?.open === "function") { win.roofle.open(); return; }

    // Fall back to clicking the widget's own trigger element
    for (const sel of ROOFLE_SELECTORS) {
      const el = document.querySelector(sel) as HTMLElement | null;
      if (el) { el.click(); return; }
    }
  }, []);

  return (
    <QuoteWidgetContext.Provider value={{ openRoofleWidget }}>
      {children}
    </QuoteWidgetContext.Provider>
  );
}

export function useQuoteWidget(): QuoteWidgetContextType {
  return useContext(QuoteWidgetContext);
}
