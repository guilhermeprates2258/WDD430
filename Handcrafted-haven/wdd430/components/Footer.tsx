import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--border-soft)] bg-[var(--surface-2)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-3">
        <div>
          <h3 className="text-xl font-semibold text-[var(--foreground)]">
            Handcrafted Haven
          </h3>
          <p className="mt-3 max-w-sm text-sm leading-6 text-[var(--muted-foreground)]">
            A warm marketplace for handmade treasures, meaningful craftsmanship,
            and thoughtful shopping.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-[var(--foreground)]">
            Explore
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-[var(--muted-foreground)]">
            <li>
              <Link href="/" className="transition hover:text-[var(--foreground)]">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/signup"
                className="transition hover:text-[var(--foreground)]"
              >
                Sign Up
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="transition hover:text-[var(--foreground)]"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/profile"
                className="transition hover:text-[var(--foreground)]"
              >
                Profile
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-[var(--foreground)]">
            Categories
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-[var(--muted-foreground)]">
            <li>Religious Art</li>
            <li>Home Decor</li>
            <li>Figurines</li>
            <li>Gifts</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--border-soft)] px-6 py-4 text-center text-sm text-[var(--muted-foreground)]">
        © 2026 Handcrafted Haven. Crafted with care.
      </div>
    </footer>
  );
}