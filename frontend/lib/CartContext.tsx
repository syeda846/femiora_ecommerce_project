"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  total: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  clearCart: () => void;

}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("femiora_cart");
    if (saved) setItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("femiora_cart", JSON.stringify(items));
  }, [items]);


  function addToCart(newItem: Omit<CartItem, "quantity">, quantity: number = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === newItem.id);
      if (existing) {
        return prev.map((i) => (i.id === newItem.id ? { ...i, quantity: i.quantity + quantity } : i));
      }
      return [...prev, { ...newItem, quantity }];
    });
    setIsDrawerOpen(true); // auto-open drawer, Sapphire-style
  }

  function clearCart() {
    setItems([]);
  }

  function removeFromCart(id: number) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function updateQuantity(id: number, quantity: number) {
    if (quantity < 1) return removeFromCart(id);
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
  }

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        total,
        isDrawerOpen,
        openDrawer: () => setIsDrawerOpen(true),
        closeDrawer: () => setIsDrawerOpen(false),
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}