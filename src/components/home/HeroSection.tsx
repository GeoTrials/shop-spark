import { ArrowRight, Sparkles, ShieldCheck, Truck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero min-h-[600px] flex items-center">
      {/* Animated gradient blobs */}
      <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] rounded-full bg-primary/15 blur-[100px] animate-float" />
      <div
        className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] animate-float"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-10 right-1/4 w-[300px] h-[300px] rounded-full bg-accent/10 blur-[80px] animate-float"
        style={{ animationDelay: "4s" }}
      />
      <div
        className="absolute -bottom-10 left-1/3 w-[350px] h-[350px] rounded-full bg-primary/8 blur-[90px] animate-pulse-soft"
      />

      <div className="container py-16 md:py-24 lg:py-32 relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in backdrop-blur-sm border border-primary/20">
            <Sparkles className="h-4 w-4" />
            <span>Multi-Vendor Marketplace</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 animate-slide-up">
            Discover & Shop from{" "}
            <span className="text-gradient">Trusted</span>
            {" "}Vendors
          </h1>

          {/* Subheading */}
          <p
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            Browse unique products, bid on exclusive auctions, and connect
            directly with sellers. Your next favorite find is just a click away.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <Button variant="hero" size="lg" asChild>
              <Link to="/shop">
                Start Shopping
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/about">Become a Vendor</Link>
            </Button>
          </div>

          {/* Trust signals instead of false stats */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-14 pt-8 border-t border-border/50 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex flex-col items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-semibold text-foreground">Verified Vendors</p>
              <p className="text-xs text-muted-foreground">Every seller is vetted</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Truck className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-semibold text-foreground">Fast Shipping</p>
              <p className="text-xs text-muted-foreground">Direct from sellers to you</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Star className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-semibold text-foreground">Buyer Protection</p>
              <p className="text-xs text-muted-foreground">Shop with confidence</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
