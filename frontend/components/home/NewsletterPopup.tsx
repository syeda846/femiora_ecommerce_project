"use client";

/**
 * NewsletterPopup — one-time modal (Khaadi-style) offering email signup.
 * Shows once per session (dismissed = won't reappear until browser closes).
 */
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function NewsletterPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("femiora_popup_dismissed");
    if (!dismissed) {
      const timer = setTimeout(() => setShow(true), 1500); // slight delay after page load
      return () => clearTimeout(timer);
    }
  }, []);

  function dismiss() {
    setShow(false);
    sessionStorage.setItem("femiora_popup_dismissed", "true");
  }

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-[60]"
            onClick={dismiss}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-8 max-w-sm w-[90%] z-[70] text-center"
          >
            <button onClick={dismiss} className="absolute top-4 right-4 text-neutral-400">
              <X size={20} />
            </button>
            <h3 className="text-xl font-serif font-semibold mb-2">Be the first to know</h3>
            <p className="text-sm text-neutral-600 mb-5">
              Get updates on new arrivals, top picks, sales, and more.
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="border rounded-lg px-4 py-2.5 text-sm"
              />
              <button
                onClick={dismiss}
                className="bg-neutral-900 text-white rounded-lg py-2.5 text-sm font-medium"
              >
                Allow
              </button>
              <button onClick={dismiss} className="text-sm text-neutral-500 mt-1">
                No Thanks
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}