"use client";

/**
 * CartDrawer — slide-in shopping bag panel (Sapphire-style).
 * Opens automatically when an item is added, or via the bag icon.
 */
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { useRouter } from "next/navigation";


export default function CartDrawer() {
  const { items, removeFromCart, updateQuantity, total, isDrawerOpen, closeDrawer } = useCart();
  const router = useRouter();

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50"
            onClick={closeDrawer}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 flex flex-col shadow-xl"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b">
              <h2 className="text-lg font-semibold tracking-wide">SHOPPING BAG</h2>
              <button onClick={closeDrawer}><X size={22} /></button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <p className="text-neutral-400 text-sm">Your bag is empty.</p>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 py-4 border-b">
                    <img src={item.image_url} alt={item.name} className="w-20 h-24 object-cover rounded" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-sm text-neutral-500 mb-2">Rs. {item.price}</p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 border rounded flex items-center justify-center"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm w-5 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 border rounded flex items-center justify-center"
                        >
                          <Plus size={12} />
                        </button>
                        <button onClick={() => removeFromCart(item.id)} className="ml-auto text-neutral-400">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t px-6 py-5">
                <div className="flex justify-between mb-4 text-base font-semibold">
                  <span>SUBTOTAL</span>
                  <span>Rs. {total}</span>
                </div>
                <Link
                  href="/cart"
                  onClick={closeDrawer}
                  className="block text-center border border-neutral-900 rounded-lg py-3 mb-2 font-medium"
                >
                  View Bag
                </Link>
                <button
                  onClick={() => {
                    closeDrawer();
                    router.push("/checkout");
                  }}
                  className="w-full bg-neutral-900 text-white rounded-lg py-3 font-medium"
                >
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}