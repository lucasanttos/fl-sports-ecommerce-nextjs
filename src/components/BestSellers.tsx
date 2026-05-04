"use client";
import { useState, useEffect, useRef } from "react";
import { ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import { PRODUCTS, formatPrice } from "@/data/config";
import { useCart } from "@/context/CartContext";
import ScrollReveal from "./ScrollReveal";

export default function BestSellers() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [topProducts, setTopProducts] = useState<typeof PRODUCTS>([]);
  const { setQuickAddProduct } = useCart();

  useEffect(() => {
    const updateTopProducts = () => {
      try {
        const stats = JSON.parse(localStorage.getItem("fl_sports_clicks") || '{"clicks":{}}');
        const clicks = stats.clicks || {};
        if (Object.keys(clicks).length === 0) {
          clicks[1] = 15;
          clicks[10] = 12;
          clicks[4] = 9;
          clicks[7] = 5;
        }
        const sortedIds = Object.keys(clicks).sort((a, b) => clicks[b] - clicks[a]);

        let sortedProducts = sortedIds
          .map(id => PRODUCTS.find(p => p.id === parseInt(id)))
          .filter((p): p is typeof PRODUCTS[0] => p !== undefined)
          .slice(0, 8);

        setTopProducts([...new Set([...sortedProducts, ...PRODUCTS])].slice(0, 8));
      } catch (e) {
        setTopProducts(PRODUCTS.slice(0, 8));
      }
    };

    updateTopProducts();
    window.addEventListener("product_clicked", updateTopProducts);
    return () => window.removeEventListener("product_clicked", updateTopProducts);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === "left" ? -200 : 200, behavior: "smooth" });
    }
  };

  if (topProducts.length === 0) return null;

  return (
    <section className="py-6 sm:py-8 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                <p className="text-zinc-400 font-bold tracking-[0.2em] uppercase text-[10px]">Atualizado em tempo real</p>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight uppercase">Mais Vendidos</h2>
            </div>
            <div className="hidden md:flex gap-2">
              <button
                onClick={() => scroll("left")}
                className="w-8 h-8 border border-zinc-700 flex items-center justify-center hover:bg-white hover:text-black transition-colors rounded-full"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-8 h-8 border border-zinc-700 flex items-center justify-center hover:bg-white hover:text-black transition-colors rounded-full"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </ScrollReveal>

        <div className="relative -mx-2 px-2">
          <div ref={scrollRef} className="flex gap-2 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden scroll-smooth pb-4">
            {topProducts.map((product, index) => (
              <div
                key={`best-seller-${product.id}-${index}`}
                className="w-[340px] sm:w-[180px] md:w-[220px] lg:w-[340px] flex-none snap-start group cursor-pointer"
              >
                <div className="aspect-[3/4] bg-zinc-900 mb-2.5 relative overflow-hidden rounded-sm w-full">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center">
                      <ShoppingBag className="text-zinc-600 w-8 h-8" />
                    </div>
                  )}
                  <div className="absolute top-2 left-2 bg-white text-black w-5 h-5 flex items-center justify-center font-black text-[10px] z-10 rounded-sm shadow-sm">
                    #{index + 1}
                  </div>

                  <div className="absolute bottom-0 left-0 w-full p-2 transform translate-y-0 lg:translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[0.16,1,0.3,1]">
                    <button
                      onClick={() => setQuickAddProduct(product)}
                      className="w-full bg-white text-black text-[10px] uppercase tracking-widest font-bold py-1.5 hover:bg-zinc-200 transition-colors rounded-sm"
                    >
                      Opções
                    </button>
                  </div>
                </div>
                <div className="flex flex-col pt-1.5">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider line-clamp-1 mb-0.5">
                    {product.category}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold tracking-tight line-clamp-1 mb-0.5">{product.name}</h4>
                  <p className="text-xs text-zinc-400">{formatPrice(product.price)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}