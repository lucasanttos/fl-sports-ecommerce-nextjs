"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, ChevronRight, MessageCircle } from 'lucide-react';
import { PRODUCTS, CATEGORIES, CLIENT_INFO, formatPrice } from '@/data/config';
import { useCart } from '@/context/CartContext';
import ScrollReveal from '@/components/ScrollReveal';
import BestSellers from '@/components/BestSellers';

export default function Home() {
  const { setQuickAddProduct, isCartOpen } = useCart();
  
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <>
      <section className="relative h-[90vh] min-h-[600px] w-full bg-black flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0"><div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-950 opacity-90" /></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col items-center text-center">
          <ScrollReveal delay={0.2} direction="up"><motion.p whileHover={{ letterSpacing: "0.4em" }} className="text-zinc-400 font-medium tracking-[0.3em] uppercase text-xs sm:text-sm mb-6 cursor-default">A nova era da performance</motion.p></ScrollReveal>
          <ScrollReveal delay={0.4} direction="up"><h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-[0.85] mb-8 select-none">ELEVATE <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-300 to-zinc-600">YOUR GAME.</span></h1></ScrollReveal>
          <ScrollReveal delay={0.6} direction="up"><p className="text-zinc-300 max-w-xl mx-auto text-base sm:text-lg lg:text-xl font-light mb-12">A interseção impecável entre esporte de alta performance, estética contemporânea e atitude absoluta. Para quem dita as próprias regras.</p></ScrollReveal>
          <ScrollReveal delay={0.8} direction="up">
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a href="#produtos" onClick={(e) => handleSmoothScroll(e, 'produtos')} className="bg-white text-black px-8 py-4 sm:px-12 sm:py-5 font-bold uppercase tracking-widest text-sm hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 group rounded-sm">Explorar Produtos <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" /></a>
              <a href={CLIENT_INFO.whatsappLink} target="_blank" rel="noreferrer" className="bg-transparent text-white border border-white px-8 py-4 sm:px-12 sm:py-5 font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-2 rounded-sm">Atendimento VIP</a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section id="colecoes" className="py-24 bg-white text-black">
         <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div><h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">Categorias</h2><p className="text-zinc-500 mt-2 font-medium tracking-wide">Descubra nosso ecossistema de produtos.</p></div>
              <Link href="/categorias" className="hidden md:flex items-center gap-2 font-bold uppercase tracking-widest text-xs border-b-2 border-transparent hover:border-black pb-1 hover:text-zinc-600 transition-all duration-300 group">Ver tudo <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" /></Link>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {CATEGORIES.map((cat, index) => (
              <ScrollReveal key={cat.id} delay={index * 0.1}>
                <Link href={`/categoria/${cat.slug}`} className="block group relative aspect-[4/5] overflow-hidden bg-zinc-100 cursor-pointer rounded-sm">
                  <div className={`absolute inset-0 ${cat.imgColor} transition-transform duration-1000 group-hover:scale-105 flex items-center justify-center`}><span className="text-white font-black text-4xl opacity-10 uppercase tracking-tighter transform -rotate-45 text-center px-4 select-none">{cat.title}</span></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute bottom-0 left-0 p-6 w-full text-white transform group-hover:-translate-y-2 transition-transform duration-500">
                    <p className="text-xs font-bold tracking-widest mb-1 opacity-80 uppercase text-zinc-300">{cat.subtitle}</p>
                    <h3 className="text-2xl font-black tracking-tighter uppercase">{cat.title}</h3>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <BestSellers />

      <section id="produtos" className="py-24 bg-zinc-50 border-t border-zinc-200 text-black">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4">Catálogo</h2><p className="text-zinc-500 font-medium tracking-wide">Selecione seu arsenal. Adicione ao carrinho e conclua com exclusividade.</p></div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {PRODUCTS.slice(0,8).map((product, index) => (
              <ScrollReveal key={product.id} delay={(index % 4) * 0.1} direction="up">
                <div className="group cursor-pointer">
                  <div className="aspect-[3/4] bg-zinc-200 mb-6 relative overflow-hidden rounded-sm">
                    {product.imageUrl ? <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" /> : <div className="absolute inset-0 bg-zinc-300 transition-transform duration-1000 group-hover:scale-105 flex items-center justify-center"><ShoppingBag className="text-zinc-400 w-12 h-12 transition-transform duration-700 group-hover:scale-110" /></div>}
                    
                    {/* 👉 CORREÇÃO AQUI NO MOBILE */}
                    <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-0 lg:translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]">
                      <button onClick={() => setQuickAddProduct(product)} className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest text-xs hover:bg-zinc-800 transition-colors rounded-sm shadow-2xl lg:shadow-none">Opções</button>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">{product.category}</span>
                    <h4 className="text-lg font-bold tracking-tight mb-2 group-hover:text-zinc-600 transition-colors">{product.name}</h4>
                    <p className="text-sm font-medium">{formatPrice(product.price)}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {!isCartOpen && (
        <motion.a initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1, type: 'spring', stiffness: 200, damping: 20 }} href={CLIENT_INFO.whatsappLink} target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-2xl shadow-green-900/30 hover:scale-110 transition-transform flex items-center justify-center group" aria-label="Fale conosco no WhatsApp">
          <MessageCircle size={28} className="group-hover:rotate-12 transition-transform duration-300" />
          <span className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-75"></span>
        </motion.a>
      )}
    </>
  );
}
