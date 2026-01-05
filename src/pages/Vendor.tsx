import { useParams, Link } from "react-router-dom";
import { Star, MapPin, Calendar, Package, ShoppingBag, MessageCircle, Share2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/home/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const vendorData = {
  id: "vintage-finds",
  name: "Vintage Finds Co.",
  tagline: "Curated vintage & antique treasures",
  description: "We specialize in hand-picked vintage clothing, accessories, and home décor from the 60s through 90s. Every item is carefully inspected and authenticated.",
  banner: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=400&fit=crop",
  logo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
  location: "Brooklyn, NY",
  joinedDate: "March 2022",
  rating: 4.9,
  reviewCount: 342,
  salesCount: 1250,
  productCount: 86,
  verified: true,
  categories: ["Vintage Clothing", "Accessories", "Home Décor"],
};

const vendorProducts = [
  { id: "v1", title: "Vintage Levi's 501 Jeans", price: 85, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop", vendor: "Vintage Finds Co." },
  { id: "v2", title: "70s Leather Messenger Bag", price: 120, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop", vendor: "Vintage Finds Co.", isAuction: true, currentBid: 95, endsIn: "2h 15m" },
  { id: "v3", title: "Retro Polaroid Camera", price: 150, image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop", vendor: "Vintage Finds Co." },
  { id: "v4", title: "Vintage Record Player", price: 280, image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop", vendor: "Vintage Finds Co.", isAuction: true, currentBid: 220, endsIn: "5h 30m" },
  { id: "v5", title: "80s Denim Jacket", price: 95, image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400&h=400&fit=crop", vendor: "Vintage Finds Co." },
  { id: "v6", title: "Antique Brass Lamp", price: 175, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", vendor: "Vintage Finds Co." },
];

export default function Vendor() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Banner */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img 
          src={vendorData.banner} 
          alt="Vendor banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>

      {/* Vendor Info */}
      <div className="container px-4 mx-auto">
        <div className="relative -mt-16 md:-mt-20 mb-6">
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            {/* Logo */}
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl border-4 border-background overflow-hidden bg-card shadow-lg">
              <img 
                src={vendorData.logo} 
                alt={vendorData.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Info */}
            <div className="flex-1 pb-2">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl md:text-3xl font-bold">{vendorData.name}</h1>
                {vendorData.verified && (
                  <Badge className="bg-primary text-primary-foreground">Verified</Badge>
                )}
              </div>
              <p className="text-muted-foreground">{vendorData.tagline}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-muted-foreground mb-6">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-warning text-warning" />
            <span className="font-semibold text-foreground">{vendorData.rating}</span>
            <span>({vendorData.reviewCount} reviews)</span>
          </div>
          <div className="flex items-center gap-1">
            <Package className="h-4 w-4" />
            <span>{vendorData.productCount} products</span>
          </div>
          <div className="flex items-center gap-1">
            <ShoppingBag className="h-4 w-4" />
            <span>{vendorData.salesCount} sales</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{vendorData.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Joined {vendorData.joinedDate}</span>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {vendorData.categories.map((cat) => (
            <Badge key={cat} variant="secondary">{cat}</Badge>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="products" className="mb-12">
          <TabsList className="mb-6">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {vendorProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="about">
            <div className="max-w-2xl">
              <h2 className="text-xl font-semibold mb-4">About {vendorData.name}</h2>
              <p className="text-muted-foreground leading-relaxed">{vendorData.description}</p>
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="text-center py-12 text-muted-foreground">
              <p>Reviews coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
