"use client";

/**
 * Footer — site-wide bottom section: brand + socials, single "More From
 * Femiora" links column, working newsletter signup, copyright line.
 */
import { useState } from "react";
import { subscribeNewsletter } from "@/lib/api";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  async function handleSubscribe() {
    if (!email) return;
    setStatus("loading");
    try {
      await subscribeNewsletter(email);
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("idle");
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <footer className="bg-neutral-900 text-neutral-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white font-serif text-xl mb-2">Femiora</h3>
          <p className="text-sm mb-4">Feminine. Elegant. Effortless.</p>

          <div className="flex gap-4">
            <a href="https://www.instagram.com/femiora.pk/" target="_blank" rel="noopener noreferrer">
              <img src="/icons/instagram.svg" alt="Instagram" className="w-5 h-5" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61593929433213" target="_blank" rel="noopener noreferrer">
              <img src="/icons/facebook.svg" alt="Facebook" className="w-5 h-5" />
            </a>
            <a href="https://www.tiktok.com/@femiora.pk" target="_blank" rel="noopener noreferrer">
              <img src="/icons/tiktok.svg" alt="TikTok" className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-medium mb-3">More From Femiora</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/terms" className="hover:text-white">Terms &amp; Conditions</a></li>
            <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-medium mb-3">Join our newsletter</h4>
          {status === "done" ? (
            <p className="text-sm text-pink-400">Thanks for subscribing!</p>
          ) : (
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-neutral-800 rounded-lg px-3 py-2 text-sm flex-1"
              />
              <button
                onClick={handleSubscribe}
                disabled={status === "loading"}
                className="bg-pink-500 text-white rounded-lg px-4 py-2 text-sm disabled:opacity-50"
              >
                {status === "loading" ? "..." : "Join"}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-neutral-800 text-center text-xs text-neutral-500 py-4">
        Copyright © 2026 Femiora. All Rights Reserved.
      </div>
    </footer>
  );
}