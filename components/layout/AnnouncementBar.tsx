import { siteConfig } from "@/content/site-config";

export function AnnouncementBar() {
  return (
    <div className="border-b border-white/10 bg-cabin py-2 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-lavender">
      <span className="container-page block">{siteConfig.announcement}</span>
    </div>
  );
}
