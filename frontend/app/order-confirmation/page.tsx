"use client";

/**
 * Order confirmation page — shown right after checkout succeeds.
 */
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function OrderConfirmationPage() {
  const params = useSearchParams();
  const orderId = params.get("order_id");

  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <h1 className="text-2xl font-serif font-semibold mb-2">Thank You!</h1>
      <p className="text-neutral-600 mb-1">Your order has been placed.</p>
      {orderId && <p className="text-neutral-500 text-sm mb-6">Order #{orderId}</p>}
      <Link href="/shop" className="inline-block bg-neutral-900 text-white rounded-lg px-6 py-3">
        Continue Shopping
      </Link>
    </div>
  );
}