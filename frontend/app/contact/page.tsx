"use client";

/**
 * Contact Us page — form for customers to submit queries.
 */
import { useState } from "react";
import { submitContact } from "@/lib/api";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      await submitContact(form);
      setStatus("done");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("idle");
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-16 bg-white text-neutral-900">
      <h1 className="text-3xl font-serif font-semibold mb-2">Contact Us</h1>
      <p className="text-neutral-500 mb-8">Have a question? We&apos;d love to hear from you.</p>

      {status === "done" ? (
        <p className="text-pink-500 font-medium">
          Thank you! We&apos;ve received your message and will get back to you soon.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            placeholder="Your Name"
            className="w-full border rounded-lg px-4 py-3"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            required
            type="email"
            placeholder="Your Email"
            className="w-full border rounded-lg px-4 py-3"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <textarea
            required
            placeholder="Your Message"
            rows={5}
            className="w-full border rounded-lg px-4 py-3"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-neutral-900 text-white rounded-lg py-3 font-medium disabled:opacity-50"
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}

      <div className="mt-10 pt-6 border-t text-sm text-neutral-600">
        <p>Or reach us directly on WhatsApp:</p>
        <a href="https://wa.me/923XXXXXXXXX" className="text-pink-500 font-medium">
          Chat with us
        </a>
      </div>
    </div>
  );
}