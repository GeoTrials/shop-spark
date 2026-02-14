import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ChevronDown } from "lucide-react";

interface SubCategory {
  name: string;
  href: string;
}

interface Category {
  name: string;
  href: string;
  icon: string;
  subcategories: SubCategory[];
}

const megaCategories: Category[] = [
  {
    name: "Art & Collectibles",
    href: "/products?category=Art",
    icon: "🎨",
    subcategories: [
      { name: "Paintings", href: "/products?category=Art&sub=Paintings" },
      { name: "Sculptures", href: "/products?category=Art&sub=Sculptures" },
      { name: "Photography", href: "/products?category=Art&sub=Photography" },
      { name: "Digital Art", href: "/products?category=Art&sub=Digital" },
      { name: "Prints & Posters", href: "/products?category=Art&sub=Prints" },
      { name: "Antiques", href: "/products?category=Art&sub=Antiques" },
    ],
  },
  {
    name: "Fashion",
    href: "/products?category=Fashion",
    icon: "👗",
    subcategories: [
      { name: "Women's Clothing", href: "/products?category=Fashion&sub=Womens" },
      { name: "Men's Clothing", href: "/products?category=Fashion&sub=Mens" },
      { name: "Shoes", href: "/products?category=Fashion&sub=Shoes" },
      { name: "Bags & Accessories", href: "/products?category=Fashion&sub=Bags" },
      { name: "Watches", href: "/products?category=Fashion&sub=Watches" },
      { name: "Vintage Fashion", href: "/products?category=Fashion&sub=Vintage" },
    ],
  },
  {
    name: "Home & Living",
    href: "/products?category=Home",
    icon: "🏠",
    subcategories: [
      { name: "Furniture", href: "/products?category=Home&sub=Furniture" },
      { name: "Décor", href: "/products?category=Home&sub=Decor" },
      { name: "Kitchen & Dining", href: "/products?category=Home&sub=Kitchen" },
      { name: "Bedding & Bath", href: "/products?category=Home&sub=Bedding" },
      { name: "Lighting", href: "/products?category=Home&sub=Lighting" },
      { name: "Storage & Organization", href: "/products?category=Home&sub=Storage" },
    ],
  },
  {
    name: "Electronics",
    href: "/products?category=Electronics",
    icon: "💻",
    subcategories: [
      { name: "Phones & Tablets", href: "/products?category=Electronics&sub=Phones" },
      { name: "Computers & Laptops", href: "/products?category=Electronics&sub=Computers" },
      { name: "Audio & Headphones", href: "/products?category=Electronics&sub=Audio" },
      { name: "Cameras", href: "/products?category=Electronics&sub=Cameras" },
      { name: "Smart Home", href: "/products?category=Electronics&sub=SmartHome" },
      { name: "Gaming", href: "/products?category=Electronics&sub=Gaming" },
    ],
  },
  {
    name: "Jewelry",
    href: "/products?category=Jewelry",
    icon: "💎",
    subcategories: [
      { name: "Necklaces", href: "/products?category=Jewelry&sub=Necklaces" },
      { name: "Rings", href: "/products?category=Jewelry&sub=Rings" },
      { name: "Earrings", href: "/products?category=Jewelry&sub=Earrings" },
      { name: "Bracelets", href: "/products?category=Jewelry&sub=Bracelets" },
      { name: "Fine Jewelry", href: "/products?category=Jewelry&sub=Fine" },
      { name: "Handmade", href: "/products?category=Jewelry&sub=Handmade" },
    ],
  },
  {
    name: "Sports & Outdoors",
    href: "/products?category=Sports",
    icon: "⚽",
    subcategories: [
      { name: "Exercise Equipment", href: "/products?category=Sports&sub=Equipment" },
      { name: "Outdoor Recreation", href: "/products?category=Sports&sub=Outdoor" },
      { name: "Sportswear", href: "/products?category=Sports&sub=Sportswear" },
      { name: "Camping & Hiking", href: "/products?category=Sports&sub=Camping" },
      { name: "Cycling", href: "/products?category=Sports&sub=Cycling" },
      { name: "Water Sports", href: "/products?category=Sports&sub=Water" },
    ],
  },
  {
    name: "Books & Media",
    href: "/products?category=Books",
    icon: "📚",
    subcategories: [
      { name: "Fiction", href: "/products?category=Books&sub=Fiction" },
      { name: "Non-Fiction", href: "/products?category=Books&sub=NonFiction" },
      { name: "Vinyl & Records", href: "/products?category=Books&sub=Vinyl" },
      { name: "Comics & Manga", href: "/products?category=Books&sub=Comics" },
      { name: "Rare & Collectible", href: "/products?category=Books&sub=Rare" },
      { name: "Audiobooks", href: "/products?category=Books&sub=Audiobooks" },
    ],
  },
  {
    name: "Handmade Crafts",
    href: "/products?category=Crafts",
    icon: "✂️",
    subcategories: [
      { name: "Pottery & Ceramics", href: "/products?category=Crafts&sub=Pottery" },
      { name: "Woodworking", href: "/products?category=Crafts&sub=Wood" },
      { name: "Textiles & Fiber", href: "/products?category=Crafts&sub=Textiles" },
      { name: "Candles & Soaps", href: "/products?category=Crafts&sub=Candles" },
      { name: "Paper Crafts", href: "/products?category=Crafts&sub=Paper" },
      { name: "Leatherwork", href: "/products?category=Crafts&sub=Leather" },
    ],
  },
];

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(megaCategories[0].name);

  const activeCat = megaCategories.find((c) => c.name === activeCategory);

  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 right-0 z-50 border-b shadow-xl bg-popover">
      <div className="container">
        <div className="flex min-h-[340px]">
          {/* Left: Category List */}
          <div className="w-64 border-r bg-muted/30 py-2 shrink-0">
            {megaCategories.map((cat) => (
              <button
                key={cat.name}
                onMouseEnter={() => setActiveCategory(cat.name)}
                onClick={() => {
                  onClose();
                  // navigation handled by Link below if needed
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                  activeCategory === cat.name
                    ? "bg-background text-foreground font-medium shadow-sm"
                    : "text-muted-foreground hover:bg-background/60 hover:text-foreground"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="text-base">{cat.icon}</span>
                  {cat.name}
                </span>
                <ChevronRight className="h-4 w-4 opacity-50" />
              </button>
            ))}
          </div>

          {/* Right: Subcategories Panel */}
          {activeCat && (
            <div className="flex-1 p-6">
              <div className="mb-4">
                <Link
                  to={activeCat.href}
                  onClick={onClose}
                  className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                >
                  {activeCat.name}
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  Browse all in {activeCat.name}
                </p>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-1">
                {activeCat.subcategories.map((sub) => (
                  <Link
                    key={sub.name}
                    to={sub.href}
                    onClick={onClose}
                    className="py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t">
                <Link
                  to={activeCat.href}
                  onClick={onClose}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  See all {activeCat.name} →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Export categories for mobile menu use
export { megaCategories };
export type { Category };
