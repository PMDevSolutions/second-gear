"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./Logo";

const links = [
  { href: "/bikes", label: "Bikes for sale" },
  { href: "/services", label: "Repairs and service" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  const linkClass = (href: string) =>
    `rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
      path === href || path.startsWith(href + "/") ? "bg-forest text-white" : "text-ink hover:bg-sand-2"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-sand/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <Logo />
          <span>Second Gear</span>
          <span className="sr-only">, used e-bikes and repairs in Baltimore</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass(l.href)}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href="/contact?topic=test-ride" className="btn btn-accent">
            Book a test ride
          </Link>
        </div>

        <button
          type="button"
          className="btn btn-secondary md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Primary mobile" className="border-t border-line bg-sand md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setOpen(false)} className={`block ${linkClass(l.href)} py-2.5 text-base`}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link href="/contact?topic=test-ride" onClick={() => setOpen(false)} className="btn btn-accent w-full">
                Book a test ride
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
