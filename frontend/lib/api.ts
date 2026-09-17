/**
 * api.ts — Central API client for talking to the FastAPI backend.
 * Keeps the backend URL in one place and wraps fetch calls used across the app.
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function getProducts() {
  const res = await fetch(`${API_URL}/products/`);
  return res.json();
}

export async function getProduct(slug: string) {
  const res = await fetch(`${API_URL}/products/${slug}`);
  return res.json();
}

/**
 * Starts a try-on job: sends the product id + uploaded photo file
 * as multipart form data. Returns { job_id, status }.
 */
export async function startTryOn(productId: number, photo: File) {
  const formData = new FormData();
  formData.append("product_id", String(productId));
  formData.append("photo", photo);

  const res = await fetch(`${API_URL}/tryon/`, {
    method: "POST",
    body: formData,
  });
  return res.json();
}


/**
 * Submits the cart to the backend and creates an order.
 * Returns { order_id, total, status }.
 */
export async function createOrder(items: { product_id: number; quantity: number }[], shipping: {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
}) {
  const res = await fetch(`${API_URL}/orders/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items, ...shipping }),
  });
  if (!res.ok) throw new Error("Failed to create order");
  return res.json();
}

export async function getOrder(orderId: string) {
  const res = await fetch(`${API_URL}/orders/${orderId}`);
  return res.json();
}

export async function updateOrderStatus(orderId: number, status: string) {
  const token = localStorage.getItem("admin_token");
  const res = await fetch(`${API_URL}/orders/${orderId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
  return res.json();
}

export async function subscribeNewsletter(email: string) {
  const res = await fetch(`${API_URL}/newsletter/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return res.json();
}

export async function submitContact(data: { name: string; email: string; message: string }) {
  const res = await fetch(`${API_URL}/contact/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}


