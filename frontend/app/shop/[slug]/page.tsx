"use client";

/**
 * Product detail page — Limelight-style layout:
 * breadcrumb, 2-col thumbnail grid + main image, right-side price/cart,
 * collapsible Description/Care Instructions sections, related products.
 */
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getProduct, getProducts } from "@/lib/api";
import { useCart } from "@/lib/CartContext";
import { ChevronDown } from "lucide-react";
import { useWishlist } from "@/lib/WishListContext";
import { Heart } from "lucide-react";

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<"description" | "care" | null>("description");
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();


  useEffect(() => {
    getProduct(slug).then((data) => {
      setProduct(data);
      setActiveImage(data.image_url);
    });
  }, [slug]);

  useEffect(() => {
    if (product) {
      getProducts().then((all) =>
        setRelated(all.filter((p: any) => p.category === product.category && p.id !== product.id))
      );
    }
  }, [product]);

  if (!product) {
    return <div className="max-w-7xl mx-auto px-4 py-20 text-center text-neutral-400">Loading...</div>;
  }

  const thumbnails = product.image_urls
    ? [product.image_url, ...product.image_urls.split(",")]
    : [product.image_url];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
      {/* Breadcrumb */}
      <div className="text-sm text-neutral-500 mb-6 font-sans">
        <Link href="/" className="hover:text-neutral-900">Home</Link>
        <span className="mx-2">›</span>
        <Link href="/shop" className="hover:text-neutral-900">{product.category}</Link>
        <span className="mx-2">›</span>
        <span className="text-neutral-900">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-[100px_1fr_420px] gap-6">
        {/* Thumbnail grid — 2 columns, Limelight style */}
        <div className="grid grid-cols-4 md:grid-cols-2 gap-2 order-2 md:order-1 h-fit">
          {thumbnails.map((thumb, i) => (
            <button
              key={i}
              onMouseEnter={() => setActiveImage(thumb)}
              className={`aspect-[3/4] overflow-hidden border-2 ${activeImage === thumb ? "border-neutral-900" : "border-transparent"
                }`}
            >
              <img src={thumb} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover object-top" />
            </button>
          ))}
        </div>

        {/* Main image — object-top so the model's head isn't cropped */}
        <div className="order-1 md:order-2 aspect-[3/4] md:aspect-auto md:h-[600px] bg-neutral-50 overflow-hidden">
          <img
            src={activeImage ?? product.image_url}
            alt={product.name}
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Details panel */}
        <div className="order-3">
          <h1 className="text-2xl font-semibold font-sans mb-2 leading-snug">{product.name}</h1>

          <div className="flex items-center gap-3 mb-1">
            <p className="text-2xl font-semibold">Rs. {product.price}</p>
          </div>
          <p className="text-sm text-green-600 font-medium mb-6">FREE DELIVERY</p>

          <p className="text-sm font-medium mb-2">Quantity</p>
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-9 h-9 border rounded flex items-center justify-center">-</button>
            <input readOnly value={qty} className="w-14 h-9 border rounded text-center" />
            <button onClick={() => setQty((q) => q + 1)} className="w-9 h-9 border rounded flex items-center justify-center">+</button>


            <button
              onClick={() => toggleWishlist(product.id)}
              className="flex items-center gap-2 text-sm text-neutral-600"
            >
              <Heart size={18} fill={isWishlisted(product.id) ? "currentColor" : "none"} />
              {isWishlisted(product.id) ? "Saved" : "Add to Wishlist"}
            </button>
          </div>

          <button
            onClick={() =>
              addToCart(
                { id: product.id, name: product.name, price: product.price, image_url: product.image_url },
                qty
              )
            }
            className="w-full bg-neutral-900 text-white rounded-lg py-3.5 font-medium tracking-wide mb-6 hover:bg-neutral-800 transition-colors"
          >
            ADD TO CART
          </button>

          {/* Collapsible sections — Limelight style accordion */}
          <div className="border-t">
            <button
              onClick={() => setOpenSection(openSection === "description" ? null : "description")}
              className="w-full flex items-center justify-between py-4 font-medium text-sm"
            >
              Description
              <ChevronDown size={18} className={`transition-transform ${openSection === "description" ? "rotate-180" : ""}`} />
            </button>
            {openSection === "description" && (
              <div className="pb-4 text-sm text-neutral-600 space-y-1">
                {product.description.split("\n").map((line: string, i: number) => {
                  const trimmed = line.trim();
                  if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
                    return (
                      <p key={i} className="font-semibold text-neutral-900 mt-2">
                        {trimmed.replace(/\*\*/g, "")}
                      </p>
                    );
                  }
                  if (trimmed === "") return null;
                  return <p key={i}>{trimmed}</p>;
                })}
                <p className="pt-2"><strong>Category:</strong> {product.category}</p>
                <p><strong>In stock:</strong> {product.stock}</p>
              </div>
            )}
          </div>

          <div className="border-t">
            <button
              onClick={() => setOpenSection(openSection === "care" ? null : "care")}
              className="w-full flex items-center justify-between py-4 font-medium text-sm"
            >
              Care Instructions
              <ChevronDown size={18} className={`transition-transform ${openSection === "care" ? "rotate-180" : ""}`} />
            </button>
            {openSection === "care" && (
              <div className="pb-4 text-sm text-neutral-600 space-y-1">
                <p>Wash separately in cold water. Do not bleach. Iron on low heat. Dry in shade.</p>
              </div>
            )}
          </div>
          <div className="border-t border-b" />
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="mt-16 pt-8 border-t">
          <h2 className="text-xl font-semibold mb-6">Complete The Look</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((p) => (
              <Link key={p.id} href={`/shop/${p.slug}`} className="group">
                <div className="aspect-[3/4] bg-neutral-100 overflow-hidden mb-2">
                  <img
                    src={p.image_url}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <p className="text-sm font-medium">{p.name}</p>
                <p className="text-sm text-neutral-500">Rs. {p.price}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}