"use client";

/**
 * Checkout page — collects shipping info, then submits the cart
 * as an order (COD only for now).
 */
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/CartContext";
import { createOrder } from "@/lib/api";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    shipping_address: "",
  });
  const [placing, setPlacing] = useState(false);
  const router = useRouter();
  const DELIVERY_CHARGE = 200;


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPlacing(true);
    try {
      const order = await createOrder(
        items.map((i) => ({ product_id: i.id, quantity: i.quantity })),
        form
      );
      localStorage.removeItem("femiora_cart");
      clearCart(); // ye state aur localStorage dono clear karega
      router.push(`/order-confirmation?order_id=${order.order_id}`);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setPlacing(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10 bg-white text-neutral-900">
      <h1 className="text-2xl font-semibold tracking-wide mb-6">CHECKOUT</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required
          placeholder="Full Name"
          className="w-full border rounded-lg px-4 py-3"
          value={form.customer_name}
          onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
        />
        <input
          required
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg px-4 py-3"
          value={form.customer_email}
          onChange={(e) => setForm({ ...form, customer_email: e.target.value })}
        />
        <input
          required
          placeholder="Phone Number"
          className="w-full border rounded-lg px-4 py-3"
          value={form.customer_phone}
          onChange={(e) => setForm({ ...form, customer_phone: e.target.value })}
        />
        <textarea
          required
          placeholder="Shipping Address"
          className="w-full border rounded-lg px-4 py-3"
          rows={3}
          value={form.shipping_address}
          onChange={(e) => setForm({ ...form, shipping_address: e.target.value })}
        />

        <div className="border rounded-lg p-4 bg-neutral-50">
          <p className="font-medium text-sm mb-1">Payment Method</p>
          <p className="text-sm text-neutral-600">Cash on Delivery (COD)</p>
        </div>



        <div className="flex justify-between text-sm text-neutral-600">
          <span>Subtotal</span>
          <span>Rs. {total}</span>
        </div>
        <div className="flex justify-between text-sm text-neutral-600">
          <span>Delivery</span>
          <span>Rs. {DELIVERY_CHARGE}</span>
        </div>
        <div className="flex justify-between text-lg font-semibold pt-2 border-t">
          <span>Total</span>
          <span>Rs. {total + DELIVERY_CHARGE}</span>
        </div>

        <button
          type="submit"
          disabled={placing}
          className="w-full bg-neutral-900 text-white rounded-lg py-3 font-medium tracking-wide disabled:opacity-50"
        >
          {placing ? "PLACING ORDER..." : "PLACE ORDER"}
        </button>
      </form>
    </div>
  );
}