import { ShieldCheck, Truck, Store, CreditCard, HeadphonesIcon, Award } from "lucide-react";

const reasons = [
  {
    icon: Store,
    title: "Thousands of Sellers",
    description: "Browse products from verified independent sellers all in one place.",
  },
  {
    icon: ShieldCheck,
    title: "Buyer Protection",
    description: "Every purchase is backed by our money-back guarantee for peace of mind.",
  },
  {
    icon: CreditCard,
    title: "One Cart, One Checkout",
    description: "Shop from multiple vendors and pay once with a seamless unified checkout.",
  },
  {
    icon: Truck,
    title: "Fast & Tracked Delivery",
    description: "Real-time order tracking from dispatch to your doorstep.",
  },
  {
    icon: Award,
    title: "Quality Guaranteed",
    description: "Curated sellers and product reviews ensure top-notch quality every time.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Our dedicated team is always here to help with any questions or issues.",
  },
];

export function WhyImall() {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why <span className="text-gradient">iMall</span>?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            The smarter way to shop online — here's what sets us apart
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {reasons.map((reason, i) => (
            <div
              key={reason.title}
              className="group relative p-8 rounded-2xl border border-border/50 bg-card card-hover text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-5 group-hover:bg-primary/20 transition-colors">
                <reason.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{reason.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
