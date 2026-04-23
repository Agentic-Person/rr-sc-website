"use client";
// DESIGN: Coastal Heritage — Giraffe mascot widget with chat, text, and booking
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { COMPANY } from "@/lib/data";
import { Send, X, Bot, Minus, MessageCircle, CalendarCheck, Smartphone } from "lucide-react";
import { nanoid } from "nanoid";
import giraffeImgData from "@assets/giraffe_style_B_sporty (1).png";

function getSessionId(): string {
  const key = "rr_chat_session_id";
  if (typeof window === "undefined") return "ssr-placeholder";
  let id = localStorage.getItem(key);
  if (!id) {
    id = nanoid();
    localStorage.setItem(key, id);
  }
  return id;
}

const suggestedQuestions = [
  "I'd like an instant roof estimate",
  "What shingle options do you offer?",
  "Do you handle insurance claims?",
  "Do you offer emergency roof repair?",
];

export default function ChatWidget() {
  const [chatOpen, setChatOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (chatOpen) inputRef.current?.focus();
  }, [chatOpen]);


  const sessionId = useRef(getSessionId());

  const handleSend = useCallback(async (text?: string) => {
    const msg = text || input;
    if (!msg.trim() || isTyping) return;

    const userMessage = msg.trim();
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    setIsTyping(true);

    try {
      const history = messages.map(m => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.text,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          session_id: sessionId.current,
          conversation_history: history,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.error || `Request failed (${res.status})`);
      }

      const data = await res.json();
      setMessages(prev => [...prev, { role: "bot", text: data.response }]);
    } catch (err: any) {
      console.error("Chat error:", err);
      setMessages(prev => [...prev, {
        role: "bot",
        text: `I'm sorry, I'm having trouble right now. Please call our team directly at ${COMPANY.phone} for immediate assistance.`,
      }]);
    } finally {
      setIsTyping(false);
    }
  }, [input, messages, isTyping]);

  const openChat = () => {
    setChatOpen(true);
    setExpanded(false);
  };

  return (
    // clamp() scales left offset with viewport width — consistent inset on every screen size
    <div className="fixed bottom-6 z-50" style={{ left: 'clamp(1rem, 8vw, 10rem)' }}>
      {/* ───────── Chat Window ───────── */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-[600px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-border/50 overflow-hidden flex flex-col mb-3"
            style={{ height: "min(720px, calc(100vh - 120px))" }}
          >
            {/* Header */}
            <div className="bg-navy px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-amber bg-white">
                    <Image src={giraffeImgData} alt="Roofing Assistant" fill sizes="36px" className="object-cover object-top" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-navy" />
                </div>
                <div>
                  <h3 className="text-white text-sm font-semibold leading-tight">Roofing Assistant</h3>
                  <p className="text-white/50 text-xs">Online now</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setChatOpen(false)}
                  className="w-7 h-7 flex items-center justify-center text-white/60 hover:text-white rounded transition-colors"
                  aria-label="Minimize chat"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button
                  onClick={() => { setChatOpen(false); setMessages([]); setInput(""); }}
                  className="w-7 h-7 flex items-center justify-center text-white/60 hover:text-white rounded transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-linen/50">
              {/* Welcome message */}
              <div className="flex gap-2.5">
                <div className="relative w-7 h-7 rounded-full overflow-hidden bg-white border border-amber/30 shrink-0 mt-0.5">
                  <Image src={giraffeImgData} alt="" fill sizes="28px" className="object-cover object-top" />
                </div>
                <div className="space-y-2 max-w-[460px]">
                  <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm border border-border/30">
                    <p className="text-sm text-gray-800 leading-relaxed">
                      Hi! I'm the Restoration Roofing assistant. How can I help you today?
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {suggestedQuestions.map((q) => (
                      <button
                        key={q}
                        onClick={() => handleSend(q)}
                        className="text-xs bg-white border border-border/50 rounded-full px-2.5 py-1 text-gray-700 hover:text-amber hover:border-amber/30 transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Messages */}
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  {msg.role === "bot" && (
                    <div className="relative w-7 h-7 rounded-full overflow-hidden bg-white border border-amber/30 shrink-0 mt-0.5">
                      <Image src={giraffeImgData} alt="" fill sizes="28px" className="object-cover object-top" />
                    </div>
                  )}
                  <div className={`rounded-lg p-3 max-w-[460px] shadow-sm ${
                    msg.role === "user"
                      ? "bg-navy text-white rounded-tr-none"
                      : "bg-white border border-border/30 rounded-tl-none"
                  }`}>
                    <p className={`text-sm leading-relaxed ${
                      msg.role === "user" ? "text-white/90" : "text-gray-800"
                    }`}>
                      {msg.text}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2.5"
                >
                  <div className="relative w-7 h-7 rounded-full overflow-hidden bg-white border border-amber/30 shrink-0 mt-0.5">
                    <Image src={giraffeImgData} alt="" fill sizes="28px" className="object-cover object-top" />
                  </div>
                  <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm border border-border/30">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border/50 p-3 bg-white shrink-0">
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a roofing question..."
                  className="flex-1 px-3 py-2.5 rounded-lg border border-border bg-linen/30 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber transition-colors"
                />
                <button
                  type="submit"
                  className="btn-amber p-2.5 rounded-lg disabled:opacity-40"
                  disabled={!input.trim()}
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <p className="text-[10px] text-gray-600 mt-1.5 text-center">
                AI responses are informational only
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ───────── Giraffe Mascot Widget ───────── */}
      <AnimatePresence>
        {!chatOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="relative"
          >
            {/* Always flex-row: giraffe left, bubble right — height is always just the giraffe, no vertical stacking */}
            <div className="flex flex-row items-center gap-3">

              {/* Mascot + action buttons column */}
              <div className="flex flex-col items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setExpanded(!expanded)}
                  className="cursor-pointer drop-shadow-xl"
                  aria-label="Open contact options"
                >
                  <Image
                    src="/images/giraffe-chat-mascot-v5.webp"
                    alt="Restoration Roofing Mascot"
                    width={98}
                    height={215}
                    style={{ width: "98px", height: "auto" }}
                  />
                </motion.button>

                {/* Action buttons */}
                <AnimatePresence>
                  {expanded && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ type: "spring", damping: 20, stiffness: 300, delay: 0.05 }}
                      className="flex items-end gap-2 mt-2"
                    >
                      <motion.a
                        href={`sms:${COMPANY.phoneRaw}`}
                        initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                        transition={{ delay: 0.1 }} whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 rounded-full bg-navy shadow-lg flex items-center justify-center text-white hover:bg-navy-light transition-colors group/btn"
                        aria-label="Text us"
                      >
                        <Smartphone className="w-5 h-5 group-hover/btn:text-amber transition-colors" />
                      </motion.a>
                      <motion.button
                        onClick={openChat}
                        initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                        transition={{ delay: 0.05 }} whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.9 }}
                        className="w-14 h-14 rounded-full bg-gradient-to-br from-amber to-amber-dark shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-shadow"
                        aria-label="Chat with us"
                      >
                        <MessageCircle className="w-6 h-6" />
                      </motion.button>
                      <motion.a
                        href="/contact"
                        initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                        transition={{ delay: 0.1 }} whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 rounded-full bg-navy shadow-lg flex items-center justify-center text-white hover:bg-navy-light transition-colors group/btn"
                        aria-label="Book a service"
                      >
                        <CalendarCheck className="w-5 h-5 group-hover/btn:text-amber transition-colors" />
                      </motion.a>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Labels */}
                <AnimatePresence>
                  {expanded && (
                    <motion.div
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ delay: 0.15 }}
                      className="flex items-center gap-2 mt-1"
                    >
                      <span className="w-12 text-center text-[10px] font-semibold text-navy/70">Text</span>
                      <span className="w-14 text-center text-[10px] font-semibold text-amber-dark">Chat</span>
                      <span className="w-12 text-center text-[10px] font-semibold text-navy/70">Book</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Speech bubble — always to the right of the giraffe, tail points left toward mascot */}
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ type: "spring", damping: 20, stiffness: 300, delay: 0.3 }}
                className="relative"
              >
                <div className="bg-white rounded-xl px-4 py-3 shadow-lg border-2 border-amber w-[135px] text-center">
                  <p className="text-xs font-bold text-navy leading-snug">
                    I can answer<br />questions and<br />schedule inspections.
                  </p>
                </div>
                {/* Left-pointing tail toward the giraffe */}
                <div className="absolute top-1/2 -translate-y-1/2 -left-[11px] w-0 h-0 border-t-[9px] border-t-transparent border-b-[9px] border-b-transparent border-r-[11px] border-r-white z-10" />
                <div className="absolute top-1/2 -translate-y-1/2 -left-[14px] w-0 h-0 border-t-[11px] border-t-transparent border-b-[11px] border-b-transparent border-r-[13px] border-r-amber -z-10" />
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
