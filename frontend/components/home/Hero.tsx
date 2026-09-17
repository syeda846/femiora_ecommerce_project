"use client";

/**
 * Hero — homepage banner carousel. Auto-slides through multiple banners
 * every few seconds with a smooth crossfade, no dark overlay.
 */
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

const banners = [
  "/hero_banner.webp",
  "/banner2.webp",
  "/banner3.webp",
  "/banner3.webp",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 3500); // faster transition — was 5000ms
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[80vh] flex items-end justify-start overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${banners[current]}')` }}
        />
      </AnimatePresence>

      {/* dark overlay removed */}

      {/* <motion.div
        key={`text-${current}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 p-10 text-white"
      >
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-2 drop-shadow-lg">Made for Her.</h1>
        <p className="mb-4 drop-shadow-lg">Feminine. Elegant. Effortless.</p>
        <Link
          href="/shop"
          className="inline-block underline underline-offset-4 font-medium tracking-wide drop-shadow-lg"
        >
          SHOP NOW
        </Link>
      </motion.div> */}

      <div className="absolute bottom-6 right-6 z-10 flex gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? "bg-white w-6" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}