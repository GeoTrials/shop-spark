import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, X, ShoppingCart, User, Search, ChevronDown } from "lucide-react";
import logoImg from "@/assets/logo.png";

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/faq", label: "FAQ" },
];

const categories = [
  { name: "Art & Collectibles", href: "/products?category=Art" },
  { name: "Fashion", href: "/products?category=Fashion" },
  { name: "Home & Living", href: "/products?category=Home" },
  { name: "Electronics", href: "/products?category=Electronics" },
  { name: "Jewelry", href: "/products?category=Jewelry" },
  { name: "Sports & Outdoors", href: "/products?category=Sports" },
  { name: "Books & Media", href: "/products?category=Books" },
  { name: "Handmade Crafts", href: "/products?category=Crafts" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
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
            {/* Categories Dropdown */}
            <div ref={categoryRef} className="relative">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Categories
                <ChevronDown className={`h-4 w-4 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
              </button>
              {isCategoryOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 rounded-lg border bg-popover p-2 shadow-lg z-50">
                  {categories.map((cat) => (
                    <Link
                      key={cat.name}
                      to={cat.href}
                      onClick={() => setIsCategoryOpen(false)}
                      className="block rounded-md px-3 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container py-4 flex flex-col space-y-4">
            {/* Mobile Categories */}
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Categories</span>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.name}
                    to={cat.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="border-t pt-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            </div>
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