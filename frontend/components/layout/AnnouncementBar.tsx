"use client";

/**
 * AnnouncementBar — thin promo ribbon above the navbar, linking to New In.
 */
import Link from "next/link";

export default function AnnouncementBar() {
  return (
    <div className="bg-pink-500 text-white text-center text-xs md:text-sm py-2 px-4">
      Explore what&apos;s new this season with our latest styles{" "}
      <Link href="/shop?category=new" className="underline font-medium">
        right here.
      </Link>
    </div>
  );
}