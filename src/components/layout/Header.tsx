import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, X, ShoppingCart, User, Search, ChevronDown, ChevronRight } from "lucide-react";
import logoImg from "@/assets/logo.png";
import { MegaMenu, megaCategories } from "./MegaMenu";

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/faq", label: "FAQ" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [expandedMobileCat, setExpandedMobileCat] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const categoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target as Node)) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 flex-shrink-0">
          <img src={logoImg} alt="iMall logo" className="h-8 w-8 rounded-full" />
          <span className="font-bold text-xl hidden sm:inline -ml-1">Mall</span>
        </Link>

        {/* Center Search - Always Expanded */}
        <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 w-full"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>
        </form>

        {/* Desktop Navigation & Actions */}
        <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
          <nav className="flex items-center space-x-6">
            {/* Categories Dropdown Trigger */}
            <div ref={categoryRef} className="relative">
              <button
                onMouseEnter={() => setIsCategoryOpen(true)}
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Menu className="h-4 w-4" />
                All Categories
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-1">
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  3
                </span>
              </Button>
            </Link>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button>Sign In</Button>
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center space-x-1 flex-shrink-0">
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                3
              </span>
            </Button>
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Desktop Mega Menu */}
      <div
        ref={categoryRef}
        onMouseLeave={() => setIsCategoryOpen(false)}
      >
        <MegaMenu isOpen={isCategoryOpen} onClose={() => setIsCategoryOpen(false)} />
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background max-h-[80vh] overflow-y-auto">
          <nav className="container py-4 flex flex-col space-y-1">
            {/* Mobile Categories - Accordion Style */}
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-2 pb-2">
              Categories
            </span>
            {megaCategories.map((cat) => (
              <div key={cat.name}>
                <button
                  onClick={() =>
                    setExpandedMobileCat(expandedMobileCat === cat.name ? null : cat.name)
                  }
                  className="w-full flex items-center justify-between px-2 py-2.5 text-sm font-medium text-foreground hover:bg-muted/50 rounded-md transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span>{cat.icon}</span>
                    {cat.name}
                  </span>
                  <ChevronRight
                    className={`h-4 w-4 text-muted-foreground transition-transform ${
                      expandedMobileCat === cat.name ? "rotate-90" : ""
                    }`}
                  />
                </button>
                {expandedMobileCat === cat.name && (
                  <div className="pl-10 pb-2 space-y-1">
                    <Link
                      to={cat.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-1.5 text-sm font-medium text-primary"
                    >
                      All {cat.name}
                    </Link>
                    {cat.subcategories.map((sub) => (
                      <Link
                        key={sub.name}
                        to={sub.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="border-t my-2" />
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="px-2 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t flex flex-col space-y-2">
              <Button variant="outline" className="w-full">
                <User className="h-4 w-4 mr-2" />
                Account
              </Button>
              <Button className="w-full">Sign In</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
