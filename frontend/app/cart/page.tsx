"use client";

/**
 * Cart page — shows items in the bag, lets user adjust quantities,
 * and navigates to /checkout to enter shipping info and place the order.
 */
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center bg-white text-neutral-900">
        <h1 className="text-2xl font-serif font-semibold mb-2">Your Bag is Empty</h1>
        <p className="text-neutral-500">Add something you love from the shop.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 bg-white text-neutral-900">
      <h1 className="text-2xl font-semibold tracking-wide mb-8">SHOPPING BAG</h1>

      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 border-b pb-6">
            <img src={item.image_url} alt={item.name} className="w-24 h-28 object-cover" />
            <div className="flex-1">
              <p className="font-medium uppercase text-sm">{item.name}</p>
              <p className="text-neutral-500 text-sm mb-3">Rs. {item.price}</p>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 border rounded flex items-center justify-center">
                  <Minus size={12} />
                </button>
                <span className="w-5 text-center">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 border rounded flex items-center justify-center">
                  <Plus size={12} />
                </button>
                <button onClick={() => removeFromCart(item.id)} className="ml-4 text-neutral-400">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <p className="font-medium">Rs. {item.price * item.quantity}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between text-lg font-semibold">
        <span>SUBTOTAL</span>
        <span>Rs. {total}</span>
      </div>

      <Link
        href="/checkout"
        className="mt-6 block text-center bg-neutral-900 text-white rounded-lg py-3 font-medium tracking-wide"
      >
        CHECKOUT
      </Link>
    </div>
  );
}