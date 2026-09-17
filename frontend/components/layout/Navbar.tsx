"use client";

/**
 * Navbar — site-wide top navigation.
 * Desktop: logo, nav links (with hover dropdown submenus, Khaadi-style),
 * search/wishlist/bag/WhatsApp icons.
 * Mobile: simplified — menu, logo, wishlist, bag.
 */
import Link from "next/link";
import { ShoppingBag, Heart, Search, Menu } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import Image from "next/image";
import AnnouncementBar from "@/components/layout/AnnouncementBar";

const links = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "New In",
    href: "/shop?category=new",
  },
  {
    label: "Ready To Wear",
    href: "/shop",
    submenu: [
      { label: "Eastern", href: "/shop?category=eastern", image: "/category/eastern.jpg" },
      { label: "Western", href: "/shop?category=western", image: "/category/western.jpg" },
      { label: "Co-ords", href: "/shop?category=coords", image: "/category/coords.jpg" },
    ],
  },
  { label: "Collections", href: "/collections" },
  { label: "Bestsellers", href: "/shop?category=bestsellers" },
  { label: "Sale", href: "/shop?category=sale" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const { items, openDrawer } = useCart();
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <>
      <AnnouncementBar />
      <header className="border-b border-pink-100 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button className="md:hidden text-neutral-900" onClick={() => setMenuOpen(!menuOpen)}>
            <Menu size={22} />
          </button>

          <Link href="/">
            <Image
              src="/logo.png"
              alt="Femiora"
              width={150}
              height={70}
              style={{ width: "auto", height: "58px" }}
              priority
            />
          </Link>

          <nav className="hidden md:flex gap-6 text-sm font-medium text-neutral-700">
            {links.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <Link href={link.href} className="hover:text-pink-500 transition-colors py-2 inline-block">
                  {link.label}
                </Link>

                {/* Dropdown submenu — Khaadi style, image cards */}
                {link.submenu && hoveredLink === link.label && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white shadow-lg border-t rounded-b-lg p-6 flex gap-6 z-50">
                    {link.submenu.map((sub) => (
                      <Link key={sub.href} href={sub.href} className="text-center group">
                        <div className="w-32 h-40 overflow-hidden mb-2 bg-neutral-100">
                          <img
                            src={sub.image}
                            alt={sub.label}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <p className="text-xs font-semibold uppercase tracking-wide">{sub.label}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-4 text-neutral-900">
            <Search size={20} className="cursor-pointer" />
            <Link href="/account/wishlist">
              <Heart size={20} />
            </Link>
            <button onClick={openDrawer} className="relative">
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
            
              <a href="https://wa.me/923184228849"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 rounded-full p-2 hover:bg-green-600 transition-colors"
            >
              <img src="/icons/whatsapp.svg" alt="WhatsApp" className="w-5 h-5" />
            </a>
          </div>
        </div>

        {menuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/20 z-30 md:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <nav className="md:hidden relative z-40 flex flex-col gap-3 px-4 pb-4 text-sm font-medium text-neutral-900 bg-white">
              {links.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </>
        )}
        <CartDrawer />
      </header>
    </>
  );
}