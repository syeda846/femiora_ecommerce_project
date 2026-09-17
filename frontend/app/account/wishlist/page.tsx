"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProducts } from "@/lib/api";
import { useWishlist } from "@/lib/WishListContext";

export default function WishlistPage() {
  const { items } = useWishlist();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    getProducts().then((all) => setProducts(all.filter((p: any) => items.includes(p.id))));
  }, [items]);

  if (products.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center bg-white text-neutral-900">
        <h1 className="text-2xl font-serif font-semibold mb-2">Your Wishlist is Empty</h1>
        <p className="text-neutral-500">Save items you love for later.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 bg-white text-neutral-900">
      <h1 className="text-2xl font-semibold mb-8">My Wishlist</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((p) => (
          <Link key={p.id} href={`/shop/${p.slug}`} className="group">
            <div className="aspect-[3/4] bg-neutral-100 overflow-hidden mb-2">
              <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
            </div>
            <p className="text-sm font-medium">{p.name}</p>
            <p className="text-sm text-neutral-500">Rs. {p.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}