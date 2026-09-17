"use client";

/**
 * WishlistContext — tracks which product IDs the user has saved.
 * Persists to localStorage.
 */
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface WishlistContextType {
  items: number[];
  toggleWishlist: (productId: number) => void;
  isWishlisted: (productId: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("femiora_wishlist");
    if (saved) setItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("femiora_wishlist", JSON.stringify(items));
  }, [items]);

  function toggleWishlist(productId: number) {
    setItems((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  }

  function isWishlisted(productId: number) {
    return items.includes(productId);
  }

  return (
    <WishlistContext.Provider value={{ items, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}