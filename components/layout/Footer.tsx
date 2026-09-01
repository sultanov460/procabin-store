import Link from "next/link";
import { siteConfig } from "@/content/site-config";
import { getSupportEmail } from "@/content/support-config";
import { MotionReveal } from "@/components/ui/motion/MotionReveal";

export function Footer() {
  const supportEmail = getSupportEmail();

  return (
    <footer className="bg-cabin text-ivory">
      <MotionReveal className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5 lg:gap-12 lg:py-16" y={12}>
        <div className="sm:col-span-2">
          <p className="font-display text-xl font-bold tracking-[-0.045em] text-ivory">PRO<span className="font-medium text-plum-light">CABIN</span></p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-lavender/75">Automotive technology and practical accessories for a smarter, more modern drive.</p>
          <div className="mt-5">
            {supportEmail ? (
              <a href={`mailto:${supportEmail}`} className="text-sm text-lavender/75 transition-colors hover:text-ivory">
                {supportEmail}
              </a>
            ) : (
              <Link href="/contact" className="text-sm text-lavender/75 hover:text-ivory">
                Contact customer support
              </Link>
            )}
          </div>
        </div>

        {siteConfig.footerGroups.map((group) => (
          <div key={group.title}>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-plum-light">{group.title}</p>
            <ul className="space-y-2.5">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-lavender/70 transition-colors hover:text-ivory">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </MotionReveal>

      <div className="border-t border-white/10 py-6">
        <p className="container-page text-xs text-lavender/55">
          © {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
