"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/data/config';

export default function QuickAddModal() {
  const { quickAddProduct, setQuickAddProduct, addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');

  useEffect(() => {
    if (quickAddProduct) {
      setSelectedSize('');
      setSelectedColor(quickAddProduct.colors.length === 1 ? quickAddProduct.colors[0].name : '');
    }
  }, [quickAddProduct]);

  if (!quickAddProduct) return null;

  const handleAdd = () => {
    if (!selectedSize || !selectedColor) return;
    addToCart(quickAddProduct, selectedColor, selectedSize);
  };

  // 👉 Esta é a janelinha que abre quando clico em "Opções" do produto.
  // Eu posso mudar os textos como "Adicionar ao Carrinho" aqui embaixo.
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
          onClick={() => setQuickAddProduct(null)}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg bg-white shadow-2xl overflow-hidden rounded-sm flex flex-col md:flex-row"
        >
          <div className="w-full md:w-2/5 bg-zinc-100 aspect-square md:aspect-auto flex items-center justify-center relative">
            <button onClick={() => setQuickAddProduct(null)} className="absolute top-4 left-4 p-2 bg-white rounded-full md:hidden shadow-sm z-10"><X size={20} /></button>
            {quickAddProduct.imageUrl ? (
              <img src={quickAddProduct.imageUrl} alt={quickAddProduct.name} className="w-full h-full object-cover" />
            ) : (
              <ShoppingBag className="w-16 h-16 text-zinc-300" />
            )}
          </div>

          <div className="p-6 md:p-8 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">{quickAddProduct.category}</p>
                <h3 className="text-xl font-bold tracking-tight leading-tight text-zinc-900">{quickAddProduct.name}</h3>
                <p className="text-lg font-medium text-black mt-2">{formatPrice(quickAddProduct.price)}</p>
              </div>
              <button onClick={() => setQuickAddProduct(null)} className="hidden md:block p-2 hover:bg-zinc-100 rounded-full transition-colors"><X size={24} className="text-black" /></button>
            </div>

            <div className="mb-6">
              {/* 👉 Título para as Cores */}
              <p className="text-xs font-bold text-black uppercase tracking-widest mb-3 flex items-center justify-between">
                Cor <span className="text-zinc-500 font-medium normal-case">{selectedColor || 'Selecione'}</span>
              </p>
              <div className="flex gap-3">
                {quickAddProduct.colors.map(color => (
                  <button 
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === color.name ? 'border-black scale-110' : 'border-zinc-200 hover:border-zinc-400'}`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            <div className="mb-8">
              {/* 👉 Título para os Tamanhos */}
              <p className="text-xs font-bold text-black uppercase tracking-widest mb-3 flex items-center justify-between">
                Tamanho <span className="text-zinc-500 font-medium normal-case">{selectedSize || 'Selecione'}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {quickAddProduct.sizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 text-sm font-bold uppercase transition-all rounded-sm border ${selectedSize === size ? 'bg-black text-white border-black' : 'bg-white text-black border-zinc-200 hover:border-black'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* 👉 Botão final de Adicionar (só funciona se escolher cor e tamanho) */}
            <button 
              onClick={handleAdd}
              disabled={!selectedColor || !selectedSize}
              className={`w-full py-4 font-bold uppercase tracking-widest text-sm transition-colors rounded-sm mt-auto ${(!selectedColor || !selectedSize) ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed' : 'bg-black text-white hover:bg-zinc-800'}`}
            >
              Adicionar ao Carrinho
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
