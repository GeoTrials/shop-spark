import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Clock,
  Gavel,
  Heart,
  Share2,
  ShieldCheck,
  Star,
  Truck,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock product data
const productData = {
  id: "3",
  title: "Limited Edition Art Print - Abstract Expressionism Series",
  description: "This stunning abstract art print is part of our exclusive expressionism series. Each piece is printed on museum-quality paper with archival inks that resist fading for 100+ years. The vibrant colors and dynamic composition make this a perfect centerpiece for any modern space.",
  price: 45.00,
  images: [
    "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&h=800&fit=crop",
  ],
  vendor: {
    name: "Modern Gallery",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5.0,
    sales: 2341,
    verified: true,
  },
  // Stock & Availability
  stock: {
    total: 50,
    remaining: 12,
    sold: 38,
    status: "low" as "in_stock" | "low" | "out_of_stock" | "sold",
  },
  isAuction: true,
  currentBid: 78.50,
  startingBid: 45.00,
  bidCount: 12,
  auctionEndsAt: new Date(Date.now() + 2 * 60 * 60 * 1000 + 15 * 60 * 1000), // 2h 15m from now
  antiSnipeEnabled: true,
  antiSnipeMinutes: 5,
};

export default function Product() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [bidAmount, setBidAmount] = useState("");
  const [timeLeft, setTimeLeft] = useState("");
  const [isEnding, setIsEnding] = useState(false);

  // Countdown timer
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const end = productData.auctionEndsAt.getTime();
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft("Ended");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      setIsEnding(diff < 5 * 60 * 1000); // Less than 5 minutes
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const minBid = productData.currentBid + 1;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-6">
          {/* Back Button */}
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-secondary">
                <img
                  src={productData.images[selectedImage]}
                  alt={productData.title}
                  className="h-full w-full object-cover"
                />
                {productData.isAuction && (
                  <Badge className="absolute top-4 left-4 bg-warning text-warning-foreground gap-1">
                    <Gavel className="h-3 w-3" />
                    Live Auction
                  </Badge>
                )}
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {productData.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors",
                      selectedImage === index
                        ? "border-primary"
                        : "border-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    <img
                      src={image}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-6">
              {/* Vendor */}
              <div className="flex items-center gap-3">
                <img
                  src={productData.vendor.avatar}
                  alt={productData.vendor.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{productData.vendor.name}</span>
                    {productData.vendor.verified && (
                      <CheckCircle className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Star className="h-3 w-3 fill-warning text-warning" />
                    <span>{productData.vendor.rating}</span>
                    <span>•</span>
                    <span>{productData.vendor.sales.toLocaleString()} sales</span>
                  </div>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-bold">
                {productData.title}
              </h1>

              {/* Auction Section */}
              {productData.isAuction ? (
                <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
                  {/* Timer */}
                  <div className={cn(
                    "flex items-center gap-3 p-4 rounded-xl",
                    isEnding ? "bg-destructive/10" : "bg-warning/10"
                  )}>
                    <Clock className={cn("h-5 w-5", isEnding ? "text-destructive" : "text-warning")} />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Auction ends in</p>
                      <p className={cn("font-bold text-lg", isEnding && "text-destructive")}>
                        {timeLeft}
                      </p>
                    </div>
                  </div>

                  {/* Anti-Snipe Notice */}
                  {productData.antiSnipeEnabled && (
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 text-sm">
                      <ShieldCheck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-primary">Anti-Snipe Protection</span>
                        <p className="text-muted-foreground">
                          If a bid is placed in the last {productData.antiSnipeMinutes} minutes, the auction extends by {productData.antiSnipeMinutes} minutes.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Bid Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Current Bid</p>
                      <p className="text-2xl font-bold text-primary">
                        ${productData.currentBid.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Bids</p>
                      <p className="text-2xl font-bold">{productData.bidCount}</p>
                    </div>
                  </div>

                  {/* Place Bid */}
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        type="number"
                        placeholder={minBid.toFixed(2)}
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        className="pl-8 h-12"
                        min={minBid}
                        step="0.50"
                      />
                    </div>
                    <Button variant="auction" size="lg" className="gap-2">
                      <Gavel className="h-5 w-5" />
                      Place Bid
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    Minimum bid: ${minBid.toFixed(2)}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-3xl font-bold">${productData.price.toFixed(2)}</p>
                  <Button variant="hero" size="xl" className="w-full gap-2">
                    Buy Now
                  </Button>
                </div>
              )}

              {/* Stock Availability */}
              <div className="p-4 rounded-xl border border-border bg-card space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  {productData.stock.status === "out_of_stock" || productData.stock.status === "sold" ? (
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                  ) : productData.stock.status === "low" ? (
                    <AlertTriangle className="h-4 w-4 text-warning" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                  Availability
                </h3>
                
                {productData.stock.status === "sold" ? (
                  <Badge variant="destructive" className="text-sm">Sold Out</Badge>
                ) : productData.stock.status === "out_of_stock" ? (
                  <Badge variant="destructive" className="text-sm">Out of Stock</Badge>
                ) : (
                  <>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">In Stock</span>
                      <span className={cn(
                        "font-semibold",
                        productData.stock.status === "low" ? "text-warning" : "text-green-500"
                      )}>
                        {productData.stock.remaining} left
                      </span>
                    </div>
                    
                    {/* Stock progress bar */}
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full transition-all",
                          productData.stock.status === "low" ? "bg-warning" : "bg-green-500"
                        )}
                        style={{ width: `${(productData.stock.remaining / productData.stock.total) * 100}%` }}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{productData.stock.sold} sold</span>
                      <span>{productData.stock.total} total</span>
                    </div>
                    
                    {productData.stock.status === "low" && (
                      <p className="text-xs text-warning font-medium">
                        ⚡ Low stock - order soon!
                      </p>
                    )}
                  </>
                )}

              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 gap-2">
                  <Heart className="h-5 w-5" />
                  Save
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <Share2 className="h-5 w-5" />
                  Share
                </Button>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h3 className="font-semibold">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {productData.description}
                </p>
              </div>

              {/* Shipping */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary">
                <Truck className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Free Shipping</p>
                  <p className="text-sm text-muted-foreground">Estimated delivery: 5-7 business days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
