import { Link } from "react-router-dom";
import { Twitter, Instagram, Youtube } from "lucide-react";
import logoImg from "@/assets/logo.png";

const footerLinks = {
  product: [
    { label: "Shop", href: "/shop" },
    { label: "Vendors", href: "/shop" },
    { label: "Auctions", href: "/shop" },
    { label: "New Arrivals", href: "/shop" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/about" },
    { label: "Careers", href: "/about" },
  ],
  legal: [
    { label: "Privacy", href: "/legal" },
    { label: "Terms", href: "/legal" },
    { label: "Cookies", href: "/legal" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-1">
              <img src={logoImg} alt="iMall logo" className="h-9 w-9 rounded-full" />
              <span className="text-xl font-bold tracking-tight">
                <span className="text-gradient">Mall</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              The trusted multi-vendor marketplace for unique products. Buy, sell, and auction with confidence.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 iMall. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Made with ❤️ for vendors worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
