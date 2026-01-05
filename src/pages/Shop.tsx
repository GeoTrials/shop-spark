import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/home/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";

const allProducts = [
  { id: "1", title: "Handcrafted Ceramic Vase - Minimalist Design", price: 89.00, image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500&h=500&fit=crop", vendor: "Artisan Studio" },
  { id: "2", title: "Vintage Leather Messenger Bag", price: 159.00, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop", vendor: "Heritage Crafts" },
  { id: "3", title: "Limited Edition Art Print - Abstract", price: 45.00, image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=500&fit=crop", vendor: "Modern Gallery", isAuction: true, currentBid: 78.50, endsIn: "2h 15m" },
  { id: "4", title: "Organic Cotton Throw Blanket", price: 120.00, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop", vendor: "Eco Living" },
  { id: "5", title: "Handmade Silver Jewelry Set", price: 275.00, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop", vendor: "Silver Moon", isAuction: true, currentBid: 320.00, endsIn: "45m" },
  { id: "6", title: "Wooden Watch - Sustainable Oak", price: 195.00, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop", vendor: "TimberTime" },
  { id: "7", title: "Artisanal Candle Collection", price: 65.00, image: "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?w=500&h=500&fit=crop", vendor: "Scent Studio" },
  { id: "8", title: "Handwoven Basket Set", price: 85.00, image: "https://images.unsplash.com/photo-1595408076683-5d0c228cc359?w=500&h=500&fit=crop", vendor: "Weave Co." },
  { id: "9", title: "Vintage Camera Replica", price: 299.00, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&h=500&fit=crop", vendor: "Retro Tech" },
  { id: "10", title: "Handmade Pottery Bowl Set", price: 145.00, image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=500&h=500&fit=crop", vendor: "Clay Works" },
  { id: "11", title: "Macrame Wall Hanging", price: 78.00, image: "https://images.unsplash.com/photo-1622396636133-8ead08c20c40?w=500&h=500&fit=crop", vendor: "Knot Studio" },
  { id: "12", title: "Vintage Record Player", price: 450.00, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop", vendor: "Audio Classics", isAuction: true, currentBid: 520.00, endsIn: "1d 3h" },
];

const categories = ["All", "Art", "Fashion", "Home", "Electronics", "Jewelry"];

export default function Shop() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-gradient-hero py-12">
          <div className="container">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Shop <span className="text-gradient">All Products</span>
            </h1>
            <p className="text-muted-foreground max-w-xl">
              Explore our curated collection from verified vendors
            </p>
          </div>
        </div>

        <div className="container py-8">
          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 rounded-full"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <X className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>
            <Button
              variant="outline"
              className="h-12 gap-2 md:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-5 w-5" />
              Filters
            </Button>
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <p className="text-sm text-muted-foreground mb-6">
            Showing {filteredProducts.length} products
          </p>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Products
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
