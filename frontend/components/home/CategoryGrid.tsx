/**
 * CategoryGrid — Limelight-style category cards: image + bold caption below.
 */
import Link from "next/link";

const categories = [
  { name: "Eastern", slug: "eastern", image: "/category/eastern.jpg" },
  { name: "Western", slug: "western", image: "/category/western.jpg" },
  { name: "Co-ords", slug: "coords", image: "/category/coords.jpg" },
];

export default function CategoryGrid() {
  return (
    <section className="bg-pink-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-serif font-semibold mb-15 text-center">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/shop?category=${cat.slug}`} className="group">
              <div className="aspect-[4/5] bg-neutral-100 overflow-hidden mb-3">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <p className="text-center font-semibold tracking-wide uppercase">{cat.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}