"use client";

/**
 * Shop listing page — grid of products, filtered by ?category= query param
 * (used by New In, Women, Bestsellers, Sale nav links).
 */
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getProducts } from "@/lib/api";
import { useCart } from "@/lib/CartContext";

export default function ShopPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const [products, setProducts] = useState<any[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    getProducts().then((all) => {
      if (category && category !== "new" && category !== "bestsellers" && category !== "sale") {
        setProducts(all.filter((p: any) => p.category.toLowerCase() === category.toLowerCase()));
      } else {
        setProducts(all); // "new", "bestsellers", "sale" show everything until those fields exist
      }
    });
  }, [category]);

  return (
    <div className="bg-white text-neutral-900">
      <div className="border-b px-6 py-4 flex items-center justify-between text-sm font-medium tracking-wide">
        <button>FILTER +</button>
        <button>SORT +</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 p-4 md:p-6">
        {products.map((product) => (
          <div key={product.id} className="group relative">
            <Link href={`/shop/${product.slug}`}>
              <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
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
                <p className="text-xs text-neutral-500 uppercase">{product.category}</p>
                <p className="text-sm mt-1">Rs. {product.price}</p>
                <span className="inline-block mt-1 text-[10px] tracking-wide text-pink-500 font-semibold">
                  NEW IN
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}