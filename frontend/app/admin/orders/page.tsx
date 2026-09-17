"use client";

/**
 * Admin orders dashboard — lists all placed orders with status,
 * and lets admin update status via dropdown.
 * Requires admin login (JWT token) — redirects to login if missing/invalid.
 */
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { updateOrderStatus } from "@/lib/api";

const STATUS_OPTIONS = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchOrders();
  }, []);

  function fetchOrders() {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) {
          router.push("/admin/login");
          return [];
        }
        return res.json();
      })
      .then(setOrders);
  }

  async function handleStatusChange(orderId: number, status: string) {
    await updateOrderStatus(orderId, status);
    fetchOrders();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 bg-white text-neutral-900">
      <h1 className="text-2xl font-semibold mb-6">Orders</h1>

      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Order #</th>
            <th>Customer</th>
            <th>Phone</th>
            <th>Total</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b">
              <td className="py-2">#{order.id}</td>
              <td>{order.customer_name}<br /><span className="text-neutral-500">{order.customer_email}</span></td>
              <td>{order.customer_phone}</td>
              <td>Rs. {order.total}</td>
              <td className="uppercase">{order.payment_method}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </td>
              <td>{new Date(order.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}