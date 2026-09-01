export function isNavigationItemActive(href: string, pathname: string): boolean {
  if (href === "/collections/all") {
    return pathname === href || pathname.startsWith("/collections/") || pathname.startsWith("/products/");
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
