/**
 * Terms & Conditions page.
 */
export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 bg-white text-neutral-900">
      <h1 className="text-3xl font-serif font-semibold mb-6">Terms &amp; Conditions</h1>
      <div className="space-y-6 text-neutral-700 leading-relaxed text-sm">
        <section>
          <h2 className="font-semibold text-neutral-900 mb-2">Orders &amp; Payment</h2>
          <p>
            All orders placed on Femiora are currently processed via Cash on Delivery (COD).
            Prices are listed in PKR and are subject to change without prior notice.
          </p>
        </section>
        <section>
          <h2 className="font-semibold text-neutral-900 mb-2">Shipping</h2>
          <p>
            Orders are processed within 2-3 business days. Delivery timelines vary by
            location within Pakistan. A flat delivery charge of Rs. 200 applies to all orders.
          </p>
        </section>
        <section>
          <h2 className="font-semibold text-neutral-900 mb-2">Returns &amp; Exchanges</h2>
          <p>
            Items may be exchanged within 7 days of delivery if unused and in original
            packaging. Contact us via WhatsApp to initiate a return or exchange.
          </p>
        </section>
        <section>
          <h2 className="font-semibold text-neutral-900 mb-2">Product Accuracy</h2>
          <p>
            We try to display product colors and details as accurately as possible, but
            slight variations may occur due to screen settings and lighting during photography.
          </p>
        </section>
      </div>
    </div>
  );
}