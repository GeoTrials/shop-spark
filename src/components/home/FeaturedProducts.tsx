import { ProductCard } from "./ProductCard";

const products = [
  {
    id: "1",
    title: "Handcrafted Ceramic Vase - Minimalist Design",
    price: 89.00,
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500&h=500&fit=crop",
    vendor: "Artisan Studio",
  },
  {
    id: "2",
    title: "Vintage Leather Messenger Bag",
    price: 159.00,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop",
    vendor: "Heritage Crafts",
  },
  {
    id: "3",
    title: "Limited Edition Art Print - Abstract",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=500&fit=crop",
    vendor: "Modern Gallery",
    isAuction: true,
    currentBid: 78.50,
    endsIn: "2h 15m",
  },
  {
    id: "4",
    title: "Organic Cotton Throw Blanket",
    price: 120.00,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop",
    vendor: "Eco Living",
  },
  {
    id: "5",
    title: "Handmade Silver Jewelry Set",
    price: 275.00,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop",
    vendor: "Silver Moon",
    isAuction: true,
    currentBid: 320.00,
    endsIn: "45m",
  },
  {
    id: "6",
    title: "Wooden Watch - Sustainable Oak",
    price: 195.00,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop",
    vendor: "TimberTime",
  },
  {
    id: "7",
    title: "Artisanal Candle Collection",
    price: 65.00,
    image: "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?w=500&h=500&fit=crop",
    vendor: "Scent Studio",
  },
  {
    id: "8",
    title: "Handwoven Basket Set",
    price: 85.00,
    image: "https://images.unsplash.com/photo-1595408076683-5d0c228cc359?w=500&h=500&fit=crop",
    vendor: "Weave Co.",
  },
];

export function FeaturedProducts() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="text-gradient">Products</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Discover our handpicked selection of unique items from top vendors
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
