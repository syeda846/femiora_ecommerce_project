"use client";

/**
 * ScrollToTop — floating button that appears after scrolling down,
 * scrolls smoothly back to top when clicked (Khaadi-style).
 */
import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 400);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white rounded-full p-3 shadow-lg hover:bg-neutral-800 transition-colors"
      aria-label="Scroll to top"
    >
      <ChevronUp size={20} />
    </button>
  );
}