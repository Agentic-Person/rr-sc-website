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
