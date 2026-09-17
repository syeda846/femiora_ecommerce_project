import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/lib/CartContext";
import { Toaster } from "sonner";
import { WishlistProvider } from "@/lib/WishListContext";
import NewsletterPopup from "@/components/home/NewsletterPopup";
import ScrollToTop from "@/components/layout/ScrollTop";




export const metadata = {
  title: "Femiora — Feminine. Elegant. Effortless.",
  description: "Online-first women's fashion ecommerce.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WishlistProvider>
        <CartProvider>
          <NewsletterPopup />
          <ScrollToTop />
          <Navbar />
          <main>{children}</main>
          <Toaster position="top-center" />

          <Footer />
        </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}