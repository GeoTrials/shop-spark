import { ArrowRight, Sparkles, ShieldCheck, Truck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero min-h-[600px] flex items-center">
      {/* Animated SVG gradient blobs */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="blob1Grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(160 84% 39% / 0.3)" />
            <stop offset="100%" stopColor="hsl(160 84% 39% / 0)" />
          </radialGradient>
          <radialGradient id="blob2Grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(170 84% 35% / 0.25)" />
            <stop offset="100%" stopColor="hsl(170 84% 35% / 0)" />
          </radialGradient>
          <radialGradient id="blob3Grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(150 60% 45% / 0.2)" />
            <stop offset="100%" stopColor="hsl(150 60% 45% / 0)" />
          </radialGradient>
          <filter id="blobBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="40" />
          </filter>
        </defs>

        {/* Blob 1 - top left, slow drift */}
        <g filter="url(#blobBlur)">
          <path fill="url(#blob1Grad)">
            <animate
              attributeName="d"
              dur="12s"
              repeatCount="indefinite"
              values="
                M150,250 Q300,100 450,200 T600,350 Q500,500 300,450 T150,250;
                M180,220 Q350,80 480,230 T580,380 Q460,520 270,470 T180,220;
                M150,250 Q300,100 450,200 T600,350 Q500,500 300,450 T150,250
              "
            />
          </path>
        </g>

        {/* Blob 2 - right side, floating */}
        <g filter="url(#blobBlur)">
          <path fill="url(#blob2Grad)">
            <animate
              attributeName="d"
              dur="15s"
              repeatCount="indefinite"
              values="
                M700,150 Q900,80 1050,200 T1100,400 Q950,550 800,480 T700,150;
                M730,180 Q880,50 1020,170 T1080,430 Q980,530 830,450 T730,180;
                M700,150 Q900,80 1050,200 T1100,400 Q950,550 800,480 T700,150
              "
            />
          </path>
        </g>

        {/* Blob 3 - center bottom, pulsing */}
        <g filter="url(#blobBlur)">
          <path fill="url(#blob3Grad)">
            <animate
              attributeName="d"
              dur="10s"
              repeatCount="indefinite"
              values="
                M400,400 Q550,300 650,420 T700,550 Q600,650 450,600 T400,400;
                M420,380 Q580,280 680,400 T720,530 Q620,670 430,620 T420,380;
                M400,400 Q550,300 650,420 T700,550 Q600,650 450,600 T400,400
              "
            />
          </path>
        </g>
      </svg>

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

          {/* Trust signals */}
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
