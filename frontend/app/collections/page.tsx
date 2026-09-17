"use client";

/**
 * Collections page — shows all products, styled as a curated collection view.
 * (Once seasonal/collection tagging exists on products, this can filter by collection.)
 */
import { useEffect, useState } from "react";
import Link from "next/link";
import { getProducts } from "@/lib/api";

export default function CollectionsPage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div className="bg-white text-neutral-900">
      <div className="text-center py-10 px-4">
        <h1 className="text-3xl font-serif font-semibold mb-2">Signature Collection</h1>
        <p className="text-neutral-500">Curated pieces for every occasion.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 px-4 md:px-6 pb-10">
        {products.map((product) => (
          <Link key={product.id} href={`/shop/${product.slug}`} className="group">
            <div className="aspect-[3/4] bg-neutral-100 overflow-hidden mb-2">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform"
              />
            </div>
            <p className="text-sm font-medium uppercase">{product.name}</p>
            <p className="text-sm text-neutral-500">Rs. {product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}