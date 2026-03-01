import { ArrowRight, ShoppingBag, Package, CreditCard, Search, Tag, Heart, Store, Truck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState, useCallback } from "react";

interface IconNode {
  x: number;
  y: number;
  icon: string;
  pulse: number;
}

function useMurmuration(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  iconNodes: IconNode[]
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const NUM = 200;
    const ICON_PARTICLES = 12; // first 12 particles render as icons
    const iconEmojis = ["🛒", "🏷️", "📦", "💳", "⭐", "🛍️", "❤️", "🚚", "🏪", "💎", "🎁", "✨"];
    const particles: { x: number; y: number; vx: number; vy: number; size: number; hue: number; targetNode: number; isIcon: boolean; iconIdx: number }[] = [];
    const w = () => canvas.width / dpr;
    const h = () => canvas.height / dpr;

    for (let i = 0; i < NUM; i++) {
      particles.push({
        x: Math.random() * w(),
        y: Math.random() * h(),
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: i < ICON_PARTICLES ? 2.5 : 1.2 + Math.random() * 2.8,
        hue: 150 + Math.random() * 30,
        targetNode: iconNodes.length > 0 ? Math.floor(Math.random() * iconNodes.length) : -1,
        isIcon: i < ICON_PARTICLES,
        iconIdx: i < ICON_PARTICLES ? i % iconEmojis.length : -1,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;
    let time = 0;

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    canvas.addEventListener("mousemove", onMove);

    const loop = () => {
      time += 0.005;
      const W = w();
      const H = h();
      ctx.clearRect(0, 0, W, H);

      // Update icon node pulses
      for (const node of iconNodes) {
        node.pulse = 0.6 + Math.sin(time * 3 + node.x * 0.01) * 0.4;
      }

      // Draw glowing halos around icon nodes
      for (const node of iconNodes) {
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 80);
        gradient.addColorStop(0, `hsla(160, 84%, 45%, ${0.12 * node.pulse})`);
        gradient.addColorStop(0.5, `hsla(160, 84%, 40%, ${0.04 * node.pulse})`);
        gradient.addColorStop(1, `hsla(160, 84%, 35%, 0)`);
        ctx.beginPath();
        ctx.arc(node.x, node.y, 80, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      for (let i = 0; i < NUM; i++) {
        const p = particles[i];

        // Occasionally switch target node
        if (Math.random() < 0.002 && iconNodes.length > 0) {
          p.targetNode = Math.floor(Math.random() * iconNodes.length);
        }

        // Simplified flocking
        let avgVx = 0, avgVy = 0, sepX = 0, sepY = 0, neighbors = 0;
        for (let j = 0; j < NUM; j++) {
          if (i === j) continue;
          const o = particles[j];
          const dx = o.x - p.x;
          const dy = o.y - p.y;
          const dist = dx * dx + dy * dy;
          if (dist < 5000) {
            const d = Math.sqrt(dist);
            avgVx += o.vx;
            avgVy += o.vy;
            neighbors++;
            if (d < 22) {
              sepX -= dx / d;
              sepY -= dy / d;
            }
          }
        }

        if (neighbors > 0) {
          p.vx += (avgVx / neighbors - p.vx) * 0.025;
          p.vy += (avgVy / neighbors - p.vy) * 0.025;
        }
        p.vx += sepX * 0.06;
        p.vy += sepY * 0.06;

        // Attract to target icon node (primary attractor)
        if (p.targetNode >= 0 && p.targetNode < iconNodes.length) {
          const node = iconNodes[p.targetNode];
          const dx = node.x - p.x;
          const dy = node.y - p.y;
          const d = Math.sqrt(dx * dx + dy * dy) + 1;
          // Orbit: attract but add tangential force
          const orbitForce = 0.015;
          p.vx += (dx / d) * orbitForce + (-dy / d) * 0.008;
          p.vy += (dy / d) * orbitForce + (dx / d) * 0.008;
        }

        // Secondary wandering attractor
        const ax = W * 0.5 + Math.cos(time * 0.6) * W * 0.3;
        const ay = H * 0.5 + Math.sin(time * 0.8) * H * 0.25;
        const dax = ax - p.x, day = ay - p.y;
        const da = Math.sqrt(dax * dax + day * day) + 1;
        p.vx += (dax / da) * 0.005;
        p.vy += (day / da) * 0.005;

        // Mouse repulsion
        const mx = p.x - mouseX, my = p.y - mouseY;
        const md = Math.sqrt(mx * mx + my * my) + 1;
        if (md < 150) {
          p.vx += (mx / md) * 0.7;
          p.vy += (my / md) * 0.7;
        }

        // Speed limit
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 3) {
          p.vx = (p.vx / speed) * 3;
          p.vy = (p.vy / speed) * 3;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < -20) p.x = W + 20;
        if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20;
        if (p.y > H + 20) p.y = -20;

        // Connections between particles
        for (let j = i + 1; j < NUM; j++) {
          const o = particles[j];
          const dx = o.x - p.x;
          const dy = o.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 55) {
            const alpha = (1 - dist / 55) * 0.25;
            ctx.beginPath();
            ctx.strokeStyle = `hsla(${p.hue}, 84%, 50%, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(o.x, o.y);
            ctx.stroke();
          }
        }

        // Connections to nearby icon nodes
        for (const node of iconNodes) {
          const dx = node.x - p.x;
          const dy = node.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            const alpha = (1 - dist / 90) * 0.3;
            ctx.beginPath();
            ctx.strokeStyle = `hsla(160, 84%, 55%, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(node.x, node.y);
            ctx.stroke();
          }
        }

        // Draw particle
        if (p.isIcon && p.iconIdx >= 0) {
          // Draw as emoji icon
          const iconAlpha = 0.4 + Math.sin(time * 3 + i * 0.5) * 0.15;
          ctx.save();
          ctx.globalAlpha = iconAlpha;
          ctx.font = "14px serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(iconEmojis[p.iconIdx], p.x, p.y);
          ctx.restore();
        } else {
          // Draw dot with glow
          const glow = 0.5 + Math.sin(time * 4 + i) * 0.2;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 84%, 60%, ${glow})`;
          ctx.shadowColor = `hsla(${p.hue}, 90%, 55%, 0.6)`;
          ctx.shadowBlur = 12;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
    };
  }, [canvasRef, iconNodes]);
}

const ICON_POSITIONS = [
  { xPct: 0.12, yPct: 0.25, icon: "bag" },
  { xPct: 0.88, yPct: 0.2, icon: "tag" },
  { xPct: 0.08, yPct: 0.7, icon: "package" },
  { xPct: 0.92, yPct: 0.65, icon: "heart" },
  { xPct: 0.22, yPct: 0.45, icon: "card" },
  { xPct: 0.78, yPct: 0.42, icon: "star" },
  { xPct: 0.5, yPct: 0.12, icon: "truck" },
  { xPct: 0.5, yPct: 0.88, icon: "store" },
];

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  bag: ShoppingBag,
  tag: Tag,
  package: Package,
  heart: Heart,
  card: CreditCard,
  star: Star,
  truck: Truck,
  store: Store,
};

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [iconNodes, setIconNodes] = useState<IconNode[]>([]);

  const updateIconPositions = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const nodes = ICON_POSITIONS.map((pos) => ({
      x: pos.xPct * rect.width,
      y: pos.yPct * rect.height,
      icon: pos.icon,
      pulse: 1,
    }));
    setIconNodes(nodes);
  }, []);

  useEffect(() => {
    updateIconPositions();
    window.addEventListener("resize", updateIconPositions);
    return () => window.removeEventListener("resize", updateIconPositions);
  }, [updateIconPositions]);

  useMurmuration(canvasRef, iconNodes);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-gradient-hero min-h-[650px] flex items-center"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: "auto" }}
      />

      {/* Icon nodes rendered as DOM elements on top of canvas */}
      <div className="absolute inset-0 z-[5] pointer-events-none">
        {iconNodes.map((node, i) => {
          const IconComp = ICON_MAP[node.icon];
          if (!IconComp) return null;
          return (
            <div
              key={i}
              className="absolute flex items-center justify-center transition-transform"
              style={{
                left: node.x,
                top: node.y,
                transform: "translate(-50%, -50%)",
                animation: `float ${5 + (i % 3)}s ease-in-out infinite ${i * 0.4}s, spin-slow ${20 + i * 5}s linear infinite`,
              }}
            >
              <div className="relative group">
                <div className="absolute inset-0 rounded-full bg-primary/25 blur-xl scale-[2] animate-pulse-soft" />
                <div className="absolute inset-0 rounded-xl bg-primary/10 blur-md scale-125 animate-pulse-soft" style={{ animationDelay: "0.5s" }} />
                <div className="relative w-12 h-12 rounded-xl bg-background/80 backdrop-blur-md border border-primary/30 flex items-center justify-center shadow-glow animate-pulse-soft" style={{ animationDelay: `${i * 0.2}s` }}>
                  <IconComp className="h-5 w-5 text-primary" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="container py-16 md:py-24 lg:py-32 relative z-10 pointer-events-none">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/15 text-primary text-sm font-semibold mb-8 animate-fade-in backdrop-blur-sm border border-primary/25 pointer-events-auto shadow-glow">
            <Store className="h-4 w-4" />
            <span>Multi-Vendor Marketplace</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 animate-slide-up text-foreground leading-[1.1]">
            Discover{" "}
            <span className="text-gradient">Amazing Products</span>
            <br />
            From Top Sellers
          </h1>

          <p
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-up leading-relaxed"
            style={{ animationDelay: "0.1s" }}
          >
            One cart, many shops. Browse thousands of products from independent
            sellers, compare prices, and checkout seamlessly.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up pointer-events-auto"
            style={{ animationDelay: "0.2s" }}
          >
            <Button variant="hero" size="lg" className="text-base px-8 py-6 shadow-glow" asChild>
              <Link to="/shop">
                <Search className="h-5 w-5" />
                Start Shopping
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-base px-8 py-6 border-primary/30 hover:bg-primary/10" asChild>
              <Link to="/about">
                <Store className="h-5 w-5" />
                Become a Seller
              </Link>
            </Button>
          </div>

          <div
            className="flex flex-wrap justify-center gap-4 mt-14 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            {[
              { icon: ShoppingBag, label: "Multi-vendor cart" },
              { icon: CreditCard, label: "Secure checkout" },
              { icon: Package, label: "Order tracking" },
              { icon: Star, label: "Verified sellers" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-background/70 backdrop-blur-md border border-border/50 text-sm font-medium text-muted-foreground shadow-soft"
              >
                <Icon className="h-4 w-4 text-primary" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
