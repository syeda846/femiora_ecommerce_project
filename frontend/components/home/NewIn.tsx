"use client";

/**
 * NewIn — homepage product grid: 2 per row mobile, 4 per row desktop,
 * with hover "Add to Bag", matching the shop page.
 */
import { useEffect, useState } from "react";
import Link from "next/link";
import { getProducts } from "@/lib/api";
import { useCart } from "@/lib/CartContext";

export default function NewIn() {
  const [products, setProducts] = useState<any[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-serif font-semibold">New In</h2>
          <Link href="/shop" className="text-sm text-pink-500 font-medium">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <Link href={`/shop/${product.slug}`}>
                <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover  object-top group-hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image_url: product.image_url,
                      });
                    }}
                    className="absolute bottom-0 left-0 right-0 bg-white/95 text-neutral-900 text-xs md:text-sm font-medium tracking-wide py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    ADD TO BAG
                  </button>
                </div>
                <div className="pt-3">
                  <p className="text-sm font-medium uppercase">{product.name}</p>
                  <p className="text-sm text-neutral-500">Rs. {product.price}</p>
                  <span className="inline-block mt-1 text-[10px] tracking-wide text-pink-500 font-semibold">
                    NEW IN
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}