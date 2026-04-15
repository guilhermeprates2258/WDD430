import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CartButton from "@/components/CartButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Handcrafted Haven",
  description: "Discover unique handmade creations from talented artisans.",
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
      <body className="min-h-screen bg-zinc-50 text-zinc-900">
        <CartButton />

        <div className="flex min-h-screen flex-col">
          <header className="border-b border-zinc-200 bg-white">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
              <Link href="/" className="text-xl font-bold tracking-tight">
                Handcrafted Haven
              </Link>

              <nav className="flex items-center gap-6 text-sm text-zinc-600">
                <Link href="/" className="transition hover:text-zinc-900">
                  Home
                </Link>
                <Link href="/cart" className="transition hover:text-zinc-900">
                  Cart
                </Link>
              </nav>
            </div>
          </header>

          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}