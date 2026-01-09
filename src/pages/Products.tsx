import { useState, useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/home/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const allProducts = [
  { id: "1", title: "Handcrafted Ceramic Vase - Minimalist Design", price: 89.00, image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500&h=500&fit=crop", vendor: "Artisan Studio", category: "Home" },
  { id: "2", title: "Vintage Leather Messenger Bag", price: 159.00, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop", vendor: "Heritage Crafts", category: "Fashion" },
  { id: "3", title: "Limited Edition Art Print - Abstract", price: 45.00, image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=500&fit=crop", vendor: "Modern Gallery", category: "Art", isAuction: true, currentBid: 78.50, endsIn: "2h 15m" },
  { id: "4", title: "Organic Cotton Throw Blanket", price: 120.00, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop", vendor: "Eco Living", category: "Home" },
  { id: "5", title: "Handmade Silver Jewelry Set", price: 275.00, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop", vendor: "Silver Moon", category: "Jewelry", isAuction: true, currentBid: 320.00, endsIn: "45m" },
  { id: "6", title: "Wooden Watch - Sustainable Oak", price: 195.00, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop", vendor: "TimberTime", category: "Fashion" },
  { id: "7", title: "Artisanal Candle Collection", price: 65.00, image: "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?w=500&h=500&fit=crop", vendor: "Scent Studio", category: "Home" },
  { id: "8", title: "Handwoven Basket Set", price: 85.00, image: "https://images.unsplash.com/photo-1595408076683-5d0c228cc359?w=500&h=500&fit=crop", vendor: "Weave Co.", category: "Home" },
  { id: "9", title: "Vintage Camera Replica", price: 299.00, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&h=500&fit=crop", vendor: "Retro Tech", category: "Electronics" },
  { id: "10", title: "Handmade Pottery Bowl Set", price: 145.00, image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=500&h=500&fit=crop", vendor: "Clay Works", category: "Home" },
  { id: "11", title: "Macrame Wall Hanging", price: 78.00, image: "https://images.unsplash.com/photo-1622396636133-8ead08c20c40?w=500&h=500&fit=crop", vendor: "Knot Studio", category: "Art" },
  { id: "12", title: "Vintage Record Player", price: 450.00, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop", vendor: "Audio Classics", category: "Electronics", isAuction: true, currentBid: 520.00, endsIn: "1d 3h" },
];

const categories = ["Art", "Fashion", "Home", "Electronics", "Jewelry"];

type SortOption = "name-asc" | "name-desc" | "price-asc" | "price-desc" | "newest";

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [listingType, setListingType] = useState<"all" | "buy-now" | "auction">("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  
  // Collapsible sections state
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    categories: true,
    listingType: true,
    sorting: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredProducts = useMemo(() => {
    let result = allProducts.filter((product) => {
      // Search filter
      if (searchQuery && !product.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Price filter
      const productPrice = product.isAuction ? product.currentBid || product.price : product.price;
      if (productPrice < priceRange[0] || productPrice > priceRange[1]) {
        return false;
      }
      
      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false;
      }
      
      // Listing type filter
      if (listingType === "buy-now" && product.isAuction) {
        return false;
      }
      if (listingType === "auction" && !product.isAuction) {
        return false;
      }
      
      return true;
    });

    // Sorting
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.title.localeCompare(b.title);
        case "name-desc":
          return b.title.localeCompare(a.title);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "newest":
        default:
          return 0;
      }
    });

    return result;
  }, [searchQuery, priceRange, selectedCategories, listingType, sortBy]);

  const clearAllFilters = () => {
    setSearchQuery("");
    setPriceRange([0, 500]);
    setSelectedCategories([]);
    setListingType("all");
    setSortBy("newest");
  };

  const hasActiveFilters = searchQuery || priceRange[0] > 0 || priceRange[1] < 500 || 
    selectedCategories.length > 0 || listingType !== "all";

  const FilterSidebar = ({ className }: { className?: string }) => (
    <aside className={cn("space-y-6", className)}>
      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={clearAllFilters} className="w-full justify-start text-muted-foreground">
          <X className="h-4 w-4 mr-2" />
          Clear all filters
        </Button>
      )}

      {/* Price Range */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full text-sm font-semibold"
        >
          Price Range
          {expandedSections.price ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {expandedSections.price && (
          <div className="space-y-4 pt-2">
            <Slider
              value={priceRange}
              onValueChange={(value) => setPriceRange(value as [number, number])}
              min={0}
              max={500}
              step={10}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        )}
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection("categories")}
          className="flex items-center justify-between w-full text-sm font-semibold"
        >
          Categories
          {expandedSections.categories ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {expandedSections.categories && (
          <div className="space-y-2 pt-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => toggleCategory(category)}
                />
                <Label htmlFor={`category-${category}`} className="text-sm font-normal cursor-pointer">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Listing Type */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection("listingType")}
          className="flex items-center justify-between w-full text-sm font-semibold"
        >
          Listing Type
          {expandedSections.listingType ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {expandedSections.listingType && (
          <div className="space-y-2 pt-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="type-all"
                checked={listingType === "all"}
                onCheckedChange={() => setListingType("all")}
              />
              <Label htmlFor="type-all" className="text-sm font-normal cursor-pointer">
                All Listings
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="type-buy-now"
                checked={listingType === "buy-now"}
                onCheckedChange={() => setListingType("buy-now")}
              />
              <Label htmlFor="type-buy-now" className="text-sm font-normal cursor-pointer">
                Buy Now
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="type-auction"
                checked={listingType === "auction"}
                onCheckedChange={() => setListingType("auction")}
              />
              <Label htmlFor="type-auction" className="text-sm font-normal cursor-pointer">
                Auctions
              </Label>
            </div>
          </div>
        )}
      </div>

      {/* Sorting */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection("sorting")}
          className="flex items-center justify-between w-full text-sm font-semibold"
        >
          Sort By
          {expandedSections.sorting ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {expandedSections.sorting && (
          <div className="pt-2">
            <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="name-asc">Name: A to Z</SelectItem>
                <SelectItem value="name-desc">Name: Z to A</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-gradient-hero py-12">
          <div className="container">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Browse <span className="text-gradient">Products</span>
            </h1>
            <p className="text-muted-foreground max-w-xl">
              Explore our curated collection from verified vendors
            </p>
          </div>
        </div>

        <div className="container py-8">
          {/* Search Bar */}
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
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <SlidersHorizontal className="h-5 w-5" />
              Filters
            </Button>
          </div>

          {/* Mobile Filters */}
          {showMobileFilters && (
            <div className="md:hidden mb-8 p-4 bg-card border rounded-lg">
              <FilterSidebar />
            </div>
          )}

          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <FilterSidebar className="hidden md:block w-64 shrink-0 sticky top-4 h-fit" />

            {/* Product Grid */}
            <div className="flex-1">
              {/* Results Count */}
              <p className="text-sm text-muted-foreground mb-6">
                Showing {filteredProducts.length} products
              </p>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-muted-foreground mb-4">No products found matching your criteria</p>
                  <Button variant="outline" onClick={clearAllFilters}>
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              )}

              {/* Load More */}
              {filteredProducts.length > 0 && (
                <div className="text-center mt-12">
                  <Button variant="outline" size="lg">
                    Load More Products
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
