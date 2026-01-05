import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Shield, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const values = [
  {
    icon: Shield,
    title: "Trust & Safety",
    description: "Every transaction is protected. We verify vendors and secure all payments.",
  },
  {
    icon: Users,
    title: "Community First",
    description: "We're building a marketplace where creators and buyers thrive together.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "From auctions to instant checkout, we're always improving the experience.",
  },
  {
    icon: Heart,
    title: "Passion for Craft",
    description: "We celebrate unique, handmade, and thoughtfully curated products.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-hero py-16 md:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                We're Building the Future of{" "}
                <span className="text-gradient">Online Shopping</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                MarketHub connects passionate vendors with buyers who appreciate quality, craftsmanship, and unique finds. We're more than a marketplace—we're a community.
              </p>
              <Button variant="hero" size="lg" asChild>
                <Link to="/shop">
                  Explore Products
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 border-b border-border">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl md:text-5xl font-bold text-gradient mb-2">500+</p>
                <p className="text-muted-foreground">Verified Vendors</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-bold text-gradient mb-2">10K+</p>
                <p className="text-muted-foreground">Products Listed</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-bold text-gradient mb-2">50K+</p>
                <p className="text-muted-foreground">Happy Customers</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-bold text-gradient mb-2">98%</p>
                <p className="text-muted-foreground">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Our <span className="text-gradient">Mission</span>
                </h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  We believe that everyone deserves access to unique, high-quality products from passionate creators around the world. Our platform empowers small businesses and independent artisans to reach customers who truly value their craft.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  With features like secure auctions with anti-snipe protection, verified vendor profiles, and buyer protection programs, we've created a marketplace where trust comes first.
                </p>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
                  alt="Team collaboration"
                  className="rounded-2xl shadow-floating"
                />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-2xl -z-10" />
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-warning/10 rounded-full -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our <span className="text-gradient">Values</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="p-6 rounded-2xl bg-card border border-border/50 card-hover"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Selling?
              </h2>
              <p className="text-muted-foreground mb-8">
                Join thousands of vendors who trust MarketHub to grow their business
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg">
                  Become a Vendor
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/faq">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
