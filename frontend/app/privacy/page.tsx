/**
 * Privacy Policy page.
 */
export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 bg-white text-neutral-900">
      <h1 className="text-3xl font-serif font-semibold mb-6">Privacy Policy</h1>
      <div className="space-y-6 text-neutral-700 leading-relaxed text-sm">
        <section>
          <h2 className="font-semibold text-neutral-900 mb-2">Information We Collect</h2>
          <p>
            When you place an order, we collect your name, email, phone number, and
            shipping address to process and deliver your order.
          </p>
        </section>
        <section>
          <h2 className="font-semibold text-neutral-900 mb-2">How We Use Your Information</h2>
          <p>
            Your information is used solely to process orders, send order confirmations,
            and communicate with you about your purchase. We do not sell or share your
            data with third parties for marketing purposes.
          </p>
        </section>
        <section>
          <h2 className="font-semibold text-neutral-900 mb-2">Newsletter</h2>
          <p>
            If you subscribe to our newsletter, your email is used only to send you
            updates about new arrivals and promotions. You can unsubscribe at any time.
          </p>
        </section>
        <section>
          <h2 className="font-semibold text-neutral-900 mb-2">Contact</h2>
          <p>
            For any privacy-related questions, reach out to us via WhatsApp or email.
          </p>
        </section>
      </div>
    </div>
  );
}