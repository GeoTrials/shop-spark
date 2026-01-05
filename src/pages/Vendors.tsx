import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Star, MapPin, CheckCircle, Filter, ChevronDown } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const vendors = [
  {
    id: 1,
    name: "TechVault Pro",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    specialty: "Electronics & Gadgets",
    category: "electronics",
    description: "Premium electronics and cutting-edge gadgets from top brands worldwide.",
    rating: 4.9,
    reviews: 1247,
    products: 156,
    sales: 5200,
    location: "San Francisco, CA",
    verified: true,
    featured: true,
  },
  {
    id: 2,
    name: "StyleHouse",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    specialty: "Fashion & Apparel",
    category: "fashion",
    description: "Curated fashion collections featuring the latest trends and timeless classics.",
    rating: 4.8,
    reviews: 892,
    products: 324,
    sales: 3800,
    location: "New York, NY",
    verified: true,
    featured: true,
  },
  {
    id: 3,
    name: "HomeNest",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    specialty: "Home & Living",
    category: "home",
    description: "Beautiful home decor and furniture to transform your living spaces.",
    rating: 4.7,
    reviews: 567,
    products: 89,
    sales: 1500,
    location: "Austin, TX",
    verified: true,
    featured: false,
  },
  {
    id: 4,
    name: "GreenLeaf Naturals",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    specialty: "Health & Wellness",
    category: "health",
    description: "Organic and natural products for a healthier lifestyle.",
    rating: 4.9,
    reviews: 2103,
    products: 67,
    sales: 8900,
    location: "Portland, OR",
    verified: true,
    featured: true,
  },
  {
    id: 5,
    name: "GameZone Elite",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    specialty: "Gaming & Entertainment",
    category: "electronics",
    description: "Everything gaming - consoles, accessories, and collectibles.",
    rating: 4.6,
    reviews: 445,
    products: 234,
    sales: 2100,
    location: "Seattle, WA",
    verified: false,
    featured: false,
  },
  {
    id: 6,
    name: "Artisan Crafts Co",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    specialty: "Handmade & Crafts",
    category: "crafts",
    description: "Unique handcrafted items made with love and attention to detail.",
    rating: 4.8,
    reviews: 312,
    products: 178,
    sales: 890,
    location: "Nashville, TN",
    verified: true,
    featured: false,
  },
  {
    id: 7,
    name: "SportMax",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
    specialty: "Sports & Outdoors",
    category: "sports",
    description: "Quality sports equipment and outdoor gear for every adventure.",
    rating: 4.5,
    reviews: 678,
    products: 145,
    sales: 3200,
    location: "Denver, CO",
    verified: true,
    featured: false,
  },
  {
    id: 8,
    name: "BookWorm Haven",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
    specialty: "Books & Media",
    category: "books",
    description: "Rare finds and bestsellers for every book lover.",
    rating: 4.9,
    reviews: 1567,
    products: 5420,
    sales: 12000,
    location: "Boston, MA",
    verified: true,
    featured: true,
  },
];

const categories = [
  { value: "all", label: "All Categories" },
  { value: "electronics", label: "Electronics" },
  { value: "fashion", label: "Fashion" },
  { value: "home", label: "Home & Living" },
  { value: "health", label: "Health & Wellness" },
  { value: "sports", label: "Sports & Outdoors" },
  { value: "crafts", label: "Handmade & Crafts" },
  { value: "books", label: "Books & Media" },
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "rating", label: "Highest Rated" },
  { value: "sales", label: "Most Sales" },
  { value: "products", label: "Most Products" },
  { value: "newest", label: "Newest" },
];

export default function Vendors() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);

  const filteredVendors = vendors
    .filter((vendor) => {
      const matchesSearch =
        vendor.name.toLowerCase().includes(search.toLowerCase()) ||
        vendor.specialty.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "all" || vendor.category === category;
      const matchesVerified = !showVerifiedOnly || vendor.verified;
      return matchesSearch && matchesCategory && matchesVerified;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "sales":
          return b.sales - a.sales;
        case "products":
          return b.products - a.products;
        case "featured":
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Our Vendors</h1>
          <p className="text-muted-foreground text-lg">
            Discover trusted sellers from around the world
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 mb-8">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search vendors by name or specialty..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-12 rounded-2xl bg-secondary/50 border-0"
            />
          </div>

          {/* Filter Row */}
          <div className="flex flex-wrap gap-3">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full sm:w-48 h-11 rounded-xl bg-secondary/50 border-0">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-44 h-11 rounded-xl bg-secondary/50 border-0">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant={showVerifiedOnly ? "default" : "outline"}
              onClick={() => setShowVerifiedOnly(!showVerifiedOnly)}
              className="h-11 rounded-xl gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              Verified Only
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-muted-foreground mb-6">
          Showing {filteredVendors.length} vendor{filteredVendors.length !== 1 && "s"}
        </p>

        {/* Vendors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVendors.map((vendor) => (
            <Link
              key={vendor.id}
              to={`/vendor/${vendor.id}`}
              className="group bg-card rounded-3xl border border-border/50 p-6 hover:shadow-elegant hover:border-primary/20 transition-all duration-300"
            >
              {/* Vendor Header */}
              <div className="flex items-start gap-4 mb-4">
                <Avatar className="h-16 w-16 rounded-2xl ring-2 ring-primary/10">
                  <AvatarImage src={vendor.avatar} alt={vendor.name} />
                  <AvatarFallback className="rounded-2xl bg-primary/10 text-primary text-lg">
                    {vendor.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg truncate group-hover:text-primary transition-colors">
                      {vendor.name}
                    </h3>
                    {vendor.verified && (
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {vendor.specialty}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {vendor.description}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-4 mb-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{vendor.rating}</span>
                  <span className="text-muted-foreground">({vendor.reviews})</span>
                </div>
                <div className="text-muted-foreground">
                  {vendor.products} products
                </div>
              </div>

              {/* Location & Sales */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className="truncate">{vendor.location}</span>
                </div>
                <Badge variant="secondary" className="rounded-full">
                  {vendor.sales.toLocaleString()} sales
                </Badge>
              </div>

              {/* Featured Badge */}
              {vendor.featured && (
                <div className="mt-4 pt-4 border-t border-border/50">
                  <Badge className="bg-gradient-primary text-primary-foreground rounded-full">
                    Featured Seller
                  </Badge>
                </div>
              )}
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredVendors.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No vendors found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filters
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearch("");
                setCategory("all");
                setShowVerifiedOnly(false);
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
