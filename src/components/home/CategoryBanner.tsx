import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    name: "Art & Collectibles",
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&h=400&fit=crop",
    count: 1240,
  },
  {
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop",
    count: 3420,
  },
  {
    name: "Home & Living",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&h=400&fit=crop",
    count: 2180,
  },
];

export function CategoryBanner() {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Browse by Category
            </h2>
            <p className="text-muted-foreground">
              Find exactly what you're looking for
            </p>
          </div>
          <Link
            to="/shop"
            className="hidden md:flex items-center gap-2 text-primary font-medium hover:underline"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              to="/shop"
              className="group relative overflow-hidden rounded-2xl aspect-[3/2]"
            >
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground">
                <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                <p className="text-sm opacity-80">{category.count.toLocaleString()} products</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
