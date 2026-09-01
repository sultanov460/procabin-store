"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/content/site-config";
import { CartIcon } from "@/components/ui/CartIcon";
import { useCart } from "@/components/cart/CartProvider";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { isNavigationItemActive } from "@/lib/utils/navigation";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { cart } = useCart();
  const itemCount = cart?.lines.reduce((sum, line) => sum + line.quantity, 0) ?? 0;
  const closeMenu = useCallback(() => setOpen(false), []);

  // A route change (e.g. tapping a nav link) should never leave the
  // drawer open on the destination page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-ivory/90 shadow-[0_10px_30px_-28px_rgba(20,18,24,.45)] backdrop-blur-xl">
      <div className="container-page flex h-[66px] items-center justify-between sm:h-[70px]">
        <Link href="/" className="group inline-flex items-center gap-2 text-cabin" aria-label={`${siteConfig.brandName} home`}>
          <span className="flex h-8 w-8 items-center justify-center rounded-[10px] border border-white/10 bg-cabin text-[10px] font-bold tracking-[-0.04em] text-ivory shadow-lift transition-transform group-hover:scale-[1.03] motion-reduce:transform-none" aria-hidden="true">PC</span>
          <span className="font-display text-[17px] font-bold tracking-[-0.05em]">PRO<span className="font-medium text-plum">CABIN</span></span>
        </Link>

        <nav className="hidden items-center gap-5 md:flex lg:gap-8">
          {siteConfig.nav.map((item) => {
            const isActive = isNavigationItemActive(item.href, pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative flex min-h-11 items-center px-1 text-[13px] font-medium transition-colors after:absolute after:inset-x-1 after:bottom-1 after:h-px after:origin-center after:bg-plum after:transition-transform after:duration-200 motion-reduce:after:transition-none ${
                  isActive
                    ? "text-cabin after:scale-x-100"
                    : "text-graphite-soft after:scale-x-0 hover:text-cabin hover:after:scale-x-50"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href="/cart"
            aria-label={itemCount > 0 ? `Shopping cart, ${itemCount} item${itemCount === 1 ? "" : "s"}` : "Shopping cart"}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-cabin transition-colors hover:bg-white/70 hover:text-plum"
          >
            <CartIcon size={22} />
            {itemCount > 0 && (
              <span
                aria-hidden="true"
                className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-pill bg-plum px-1 text-[9px] font-semibold text-ivory"
              >
                {itemCount}
              </span>
            )}
          </Link>

          <button
            ref={triggerRef}
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full text-cabin transition-colors hover:bg-mist md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-4 w-5">
              <span
                aria-hidden="true"
                className={`absolute left-0 top-0 block h-0.5 w-5 rounded-full bg-cabin transition-transform duration-[240ms] ease-out motion-reduce:transition-none ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                aria-hidden="true"
                className={`absolute bottom-0 left-0 block h-0.5 w-5 rounded-full bg-cabin transition-transform duration-[240ms] ease-out motion-reduce:transition-none ${
                  open ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <MobileMenu open={open} onClose={closeMenu} triggerRef={triggerRef} pathname={pathname} />
    </header>
  );
}
