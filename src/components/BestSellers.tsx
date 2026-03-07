"use client";
import { useState, useEffect, useRef } from 'react';
import { ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import { PRODUCTS, formatPrice } from '@/data/config';
import { useCart } from '@/context/CartContext';
import ScrollReveal from './ScrollReveal';

export default function BestSellers() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [topProducts, setTopProducts] = useState<typeof PRODUCTS>([]);
  const { setQuickAddProduct } = useCart(); 

  useEffect(() => {
    const updateTopProducts = () => {
      try {
        const stats = JSON.parse(localStorage.getItem('fl_sports_clicks') || '{"clicks":{}}');
        const clicks = stats.clicks || {};
        if (Object.keys(clicks).length === 0) { clicks[1] = 15; clicks[10] = 12; clicks[4] = 9; clicks[7] = 5; }
        const sortedIds = Object.keys(clicks).sort((a, b) => clicks[b] - clicks[a]);
        let sortedProducts = sortedIds.map(id => PRODUCTS.find(p => p.id === parseInt(id))).filter((p): p is typeof PRODUCTS[0] => p !== undefined).slice(0, 8);
        setTopProducts([...new Set([...sortedProducts, ...PRODUCTS])].slice(0, 8));
      } catch (e) {
        setTopProducts(PRODUCTS.slice(0, 8));
      }
    };
    updateTopProducts();
    window.addEventListener('product_clicked', updateTopProducts);
    return () => window.removeEventListener('product_clicked', updateTopProducts);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === 'left' ? -300 : 300, behavior: 'smooth' });
    }
  };

  if (topProducts.length === 0) return null;

  return (
    <section className="py-24 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                <p className="text-zinc-400 font-bold tracking-[0.2em] uppercase text-xs">Atualizado em tempo real</p>
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">Mais Vendidos</h2>
            </div>
            <div className="hidden md:flex gap-2">
              <button onClick={() => scroll('left')} className="w-12 h-12 border border-zinc-800 flex items-center justify-center hover:bg-white hover:text-black transition-colors rounded-full"><ChevronLeft size={24} /></button>
              <button onClick={() => scroll('right')} className="w-12 h-12 border border-zinc-800 flex items-center justify-center hover:bg-white hover:text-black transition-colors rounded-full"><ChevronRight size={24} /></button>
            </div>
          </div>
        </ScrollReveal>

        <div className="relative -mx-6 md:mx-0 px-6 md:px-0">
          <div ref={scrollRef} className="flex gap-6 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden scroll-smooth pb-8">
            {topProducts.map((product, index) => (
              <div key={product.id} className="min-w-[85vw] sm:min-w-[45vw] md:min-w-[30vw] lg:min-w-[22vw] snap-start group cursor-pointer shrink-0">
                <div className="aspect-[3/4] bg-zinc-900 mb-6 relative overflow-hidden rounded-sm">
                  {product.imageUrl ? (
                     <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  ) : (
                     <div className="absolute inset-0 bg-zinc-800 transition-transform duration-1000 group-hover:scale-105 flex items-center justify-center"><ShoppingBag className="text-zinc-600 w-12 h-12 transition-transform duration-700 group-hover:scale-110" /></div>
                  )}
                  <div className="absolute top-4 left-4 bg-white text-black w-8 h-8 flex items-center justify-center font-black text-sm z-10 shadow-lg rounded-sm">#{index + 1}</div>
                  
                  {/* 👉 CORREÇÃO AQUI: translate-y-0 no mobile, e lg:translate-y-full no desktop */}
                  <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-0 lg:translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]">
                    <button onClick={() => setQuickAddProduct(product)} className="w-full bg-white text-black py-4 font-bold uppercase tracking-widest text-xs hover:bg-zinc-200 transition-colors rounded-sm shadow-2xl lg:shadow-none">Opções</button>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">{product.category}</span>
                  <h4 className="text-lg font-bold tracking-tight mb-2 truncate group-hover:text-zinc-300 transition-colors">{product.name}</h4>
                  <p className="text-sm font-medium text-zinc-400">{formatPrice(product.price)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
