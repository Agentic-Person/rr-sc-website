"use client";

import { usePathname } from "next/navigation";
import ChatWidget from "@/components/ChatWidget";

const HIDDEN_PREFIXES = ["/about"];

export default function ChatWidgetMount() {
  const pathname = usePathname() ?? "/";
  if (HIDDEN_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return null;
  }
  return <ChatWidget />;
}
