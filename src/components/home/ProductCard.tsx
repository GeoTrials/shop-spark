import { Link } from "react-router-dom";
import { Clock, Gavel } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  vendor: string;
  isAuction?: boolean;
  currentBid?: number;
  endsIn?: string;
}

export function ProductCard({
  id,
  title,
  price,
  image,
  vendor,
  isAuction = false,
  currentBid,
  endsIn,
}: ProductCardProps) {
  return (
    <Link
      to={`/product/${id}`}
      className="group block"
    >
      <div className="relative overflow-hidden rounded-2xl bg-card border border-border/50 card-hover">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {isAuction && (
            <Badge 
              className="absolute top-3 left-3 bg-warning text-warning-foreground gap-1"
            >
              <Gavel className="h-3 w-3" />
              Auction
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-xs text-muted-foreground mb-1">{vendor}</p>
          <h3 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          {isAuction ? (
            <div className="space-y-1">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-muted-foreground">Current bid</span>
                <span className="font-bold text-primary">${currentBid?.toFixed(2)}</span>
              </div>
              {endsIn && (
                <div className="flex items-center gap-1 text-xs text-warning">
                  <Clock className="h-3 w-3" />
                  <span>Ends in {endsIn}</span>
                </div>
              )}
            </div>
          ) : (
            <p className="font-bold text-lg">${price.toFixed(2)}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
