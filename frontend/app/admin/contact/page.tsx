"use client";

/**
 * Admin contact messages dashboard — lists all customer queries submitted
 * via the Contact Us page. Requires admin login (JWT token) —
 * redirects to login if missing/invalid.
 */
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminContactPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchMessages();
  }, []);

  function fetchMessages() {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) {
          router.push("/admin/login");
          return [];
        }
        return res.json();
      })
      .then(setMessages);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 bg-white text-neutral-900">
      <h1 className="text-2xl font-semibold mb-6">Customer Queries</h1>

      <div className="space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-medium">{msg.name}</p>
                <p className="text-sm text-neutral-500">{msg.email}</p>
              </div>
              <p className="text-xs text-neutral-400">
                {new Date(msg.created_at).toLocaleString()}
              </p>
            </div>
            <p className="text-sm text-neutral-700">{msg.message}</p>
          </div>
        ))}
        {messages.length === 0 && (
          <p className="text-neutral-400 text-sm">No queries yet.</p>
        )}
      </div>
    </div>
  );
}