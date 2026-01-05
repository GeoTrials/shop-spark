import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="container py-16 md:py-24 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
            <Sparkles className="h-4 w-4" />
            <span>Multi-Vendor Marketplace</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 animate-slide-up">
            Shop from{" "}
            <span className="text-gradient">Thousands</span>
            {" "}of Trusted Vendors
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Discover unique products, bid on exclusive auctions, and connect directly with sellers. Your next favorite find is just a click away.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Button variant="hero" size="lg" asChild>
              <Link to="/shop">
                Start Shopping
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/about">
                Become a Vendor
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-border/50 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-gradient">10K+</p>
              <p className="text-sm text-muted-foreground">Products</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-gradient">500+</p>
              <p className="text-sm text-muted-foreground">Vendors</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-gradient">50K+</p>
              <p className="text-sm text-muted-foreground">Happy Buyers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
    </section>
  );
}
