import { Star, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const vendors = [
  {
    name: "Artisan Studio",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    specialty: "Ceramics & Pottery",
    rating: 4.9,
    sales: 1234,
    verified: true,
  },
  {
    name: "Heritage Crafts",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    specialty: "Leather Goods",
    rating: 4.8,
    sales: 892,
    verified: true,
  },
  {
    name: "Modern Gallery",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    specialty: "Art & Prints",
    rating: 5.0,
    sales: 2341,
    verified: true,
  },
  {
    name: "Eco Living",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    specialty: "Sustainable Home",
    rating: 4.7,
    sales: 567,
    verified: false,
  },
];

export function VendorSpotlight() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Top <span className="text-gradient">Vendors</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Meet the passionate creators behind our best products
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {vendors.map((vendor) => (
            <div
              key={vendor.name}
              className="text-center p-6 rounded-2xl border border-border/50 bg-card card-hover"
            >
              <div className="relative inline-block mb-4">
                <img
                  src={vendor.avatar}
                  alt={vendor.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto"
                />
                {vendor.verified && (
                  <CheckCircle className="absolute -bottom-1 -right-1 h-6 w-6 text-primary fill-background" />
                )}
              </div>
              <h3 className="font-semibold mb-1">{vendor.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{vendor.specialty}</p>
              <div className="flex items-center justify-center gap-1 mb-2">
                <Star className="h-4 w-4 fill-warning text-warning" />
                <span className="text-sm font-medium">{vendor.rating}</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {vendor.sales.toLocaleString()} sales
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
