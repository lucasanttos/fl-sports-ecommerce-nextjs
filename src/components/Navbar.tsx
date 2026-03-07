"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Search, User, MessageCircle } from 'lucide-react';
import { CLIENT_INFO } from '@/data/config';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { cartItems, setIsCartOpen } = useCart();
  const pathname = usePathname();
  const router = useRouter();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (pathname !== "/") return;
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      const offsetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/pesquisa?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header className={`fixed top-0 w-full z-40 transition-all duration-500 border-b ${
        isScrolled ? 'bg-white/90 backdrop-blur-md border-zinc-200 text-black py-4 shadow-sm' : 'bg-black/80 backdrop-blur-md border-transparent text-white py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 -ml-2 hover:opacity-70 transition-opacity"><Menu size={24} /></button>
          
          <Link href="/" className="text-2xl font-black tracking-tighter uppercase cursor-pointer">
            {CLIENT_INFO.name}
          </Link>

          {/* 👉 Aqui eu edito os links que aparecem no menu de quem acessa pelo computador */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-widest uppercase">
            <Link href="/categorias" className="relative group overflow-hidden">
              <span className="hover:text-zinc-500 transition-colors duration-300">Coleções</span>
            </Link>
            <Link href="/#produtos" onClick={(e) => handleSmoothScroll(e, 'produtos')} className="relative group overflow-hidden">
              <span className="hover:text-zinc-500 transition-colors duration-300">Catálogo</span>
            </Link>
            <Link href="/sobre" className="relative group overflow-hidden">
              <span className="hover:text-zinc-500 transition-colors duration-300">A Marca</span>
            </Link>
            <Link href="/contato" className="relative group overflow-hidden">
              <span className="hover:text-zinc-500 transition-colors duration-300">Contato</span>
            </Link>
          </nav>

          <div className="flex items-center gap-4 lg:gap-6 relative">
            <AnimatePresence>
              {isSearchOpen && (
                <motion.form 
                  initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }}
                  onSubmit={handleSearch} 
                  className="absolute right-full mr-2 hidden sm:flex items-center bg-zinc-100 rounded-sm overflow-hidden"
                >
                  <input type="text" autoFocus value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Buscar..." className="bg-transparent border-none px-4 py-2 text-sm text-black outline-none w-48" />
                </motion.form>
              )}
            </AnimatePresence>
            
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="hidden sm:block p-2 hover:opacity-70 transition-transform hover:scale-110"><Search size={20} /></button>
            <button className="hidden sm:block p-2 hover:opacity-70 transition-transform hover:scale-110"><User size={20} /></button>
            <button onClick={() => setIsCartOpen(true)} className="p-2 hover:opacity-70 transition-transform hover:scale-110 relative group">
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} key={totalItems} className="absolute top-1 right-0 w-4 h-4 bg-red-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full border border-white shadow-sm">
                  {totalItems}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </header>
      
      {/* 👉 Aqui eu edito os links que aparecem no menu de quem acessa pelo celular */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, x: '-100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '-100%' }} transition={{ type: 'tween', duration: 0.4 }} className="fixed inset-0 z-[60] bg-black text-white p-6 flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <div className="text-2xl font-black tracking-tighter">{CLIENT_INFO.name}</div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-zinc-900 rounded-full transition-colors"><X size={28} /></button>
            </div>
            
            <form onSubmit={handleSearch} className="flex items-center bg-zinc-900 rounded-sm overflow-hidden mb-8">
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Buscar produto..." className="bg-transparent border-none px-4 py-3 text-sm text-white outline-none w-full" />
              <button type="submit" className="p-3 bg-zinc-800"><Search size={20} /></button>
            </form>

            <nav className="flex flex-col gap-6 text-2xl font-light tracking-tight">
              <Link href="/categorias" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-zinc-800 pb-4">Categorias</Link>
              <Link href="/#produtos" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-zinc-800 pb-4">Catálogo Completo</Link>
              <Link href="/sobre" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-zinc-800 pb-4">Sobre a Marca</Link>
              <Link href="/contato" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-zinc-800 pb-4">Contato</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
