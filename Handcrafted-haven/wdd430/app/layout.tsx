import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CartButton from "@/components/CartButton";
import UserActions from "@/components/UserActions";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Handcrafted Haven",
    template: "%s | Handcrafted Haven",
  },
  description:
    "Handcrafted Haven is a marketplace for artisan-made products, connecting talented sellers with customers who value handmade creations.",
  keywords: [
    "handcrafted products",
    "artisan marketplace",
    "handmade gifts",
    "home decor",
    "religious art",
    "figurines",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <CartButton />

        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-40 border-b border-[var(--border-soft)] bg-[color:var(--surface-header)]/90 backdrop-blur">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center justify-between gap-6">
                <Link
                  href="/"
                  className="text-xl font-semibold tracking-[0.02em] text-[var(--foreground)]"
                >
                  Handcrafted Haven
                </Link>

                <nav className="flex items-center gap-6 text-sm text-[var(--muted-foreground)]">
                  <Link href="/" className="transition hover:text-[var(--foreground)]">
                    Home
                  </Link>
                </nav>
              </div>

              <UserActions />
            </div>
          </header>

          <main className="flex-1">{children}</main>

          <Footer />
        </div>
      </body>
    </html>
  );
}