"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, ZoomIn } from 'lucide-react'; 
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/data/config';

export default function QuickAddModal() {
  const { quickAddProduct, setQuickAddProduct, addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [isImageExpanded, setIsImageExpanded] = useState<boolean>(false); 

  useEffect(() => {
    if (quickAddProduct) {
      document.body.style.overflow = 'hidden';
      setSelectedSize('');
      setSelectedColor(
        quickAddProduct.colors.length === 1 ? quickAddProduct.colors[0].name : ''
      );
      setIsImageExpanded(false); 
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [quickAddProduct]);

  if (!quickAddProduct) return null;

  const canAdd = selectedSize && selectedColor;

  const handleAdd = () => {
    if (!canAdd) return;
    addToCart(quickAddProduct, selectedColor, selectedSize);
    setQuickAddProduct(null); 
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center sm:p-4">

        {/* Backdrop do Modal Principal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickAddProduct(null)}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Principal */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="
            relative w-full bg-white shadow-2xl overflow-hidden
            rounded-t-2xl sm:rounded-sm
            max-h-[92dvh] sm:max-h-[85vh]
            flex flex-col sm:flex-row
            sm:max-w-lg
          "
        >

          {/* Imagem do Produto */}
          <div className="
            relative bg-zinc-100 flex-shrink-0 flex items-center justify-center
            sm:w-2/5 sm:h-auto
            group
          ">
            {/* Botão fechar — mobile */}
            <button
              onClick={() => setQuickAddProduct(null)}
              className="absolute top-3 right-3 z-10 p-1.5 bg-white rounded-full shadow-md sm:hidden"
              aria-label="Fechar"
            >
              <X size={18} />
            </button>

            {quickAddProduct.imageUrl ? (
              <div
                className="relative w-full cursor-zoom-in"
                onClick={() => setIsImageExpanded(true)} 
              >
                <img
                  src={quickAddProduct.imageUrl}
                  alt={quickAddProduct.name}
                  className="
                    w-full object-contain
                    max-h-[30vh] sm:max-h-none sm:h-full
                  "
                />
                {/* Ícone de zoom para indicar que a imagem é clicável */}
                <div className="
                  absolute inset-0 flex items-center justify-center bg-black/20 opacity-0
                  group-hover:opacity-100 transition-opacity duration-200
                  pointer-events-none // Garante que o clique passe para a div pai
                ">
                  <ZoomIn size={32} className="text-white" />
                </div>
              </div>
            ) : (
              <div className="w-full flex items-center justify-center py-10">
                <ShoppingBag className="w-16 h-16 text-zinc-300" />
              </div>
            )}
          </div>

          {/* Conteúdo do Modal (Opções de Cor/Tamanho/Preço) */}
          <div className="flex-1 flex flex-col overflow-y-auto min-h-0">
            <div className="p-5 sm:p-8 flex flex-col flex-1">

              {/* Header */}
              <div className="flex justify-between items-start mb-5">
                <div>
                  <p className="hidden sm:block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">
                    {quickAddProduct.category}
                  </p>
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight leading-tight text-zinc-900">
                    {quickAddProduct.name}
                  </h3>
                  <p className="text-base sm:text-lg font-semibold text-black mt-1.5">
                    {formatPrice(quickAddProduct.price)}
                  </p>
                </div>

                {/* Botão fechar — desktop */}
                <button
                  onClick={() => setQuickAddProduct(null)}
                  className="hidden sm:flex p-2 hover:bg-zinc-100 rounded-full transition-colors"
                  aria-label="Fechar"
                >
                  <X size={22} className="text-black" />
                </button>
              </div>

              {/* Cores */}
              {quickAddProduct.colors.length > 0 && (
                <div className="mb-5">
                  <p className="text-xs font-bold text-black uppercase tracking-widest mb-2.5 flex items-center justify-between">
                    Cor
                    <span className="text-zinc-400 font-medium normal-case text-xs">
                      {selectedColor || 'Selecione uma cor'}
                    </span>
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {quickAddProduct.colors.map(color => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        title={color.name}
                        aria-label={`Cor ${color.name}`}
                        className={`
                          w-8 h-8 rounded-full border-2 transition-all
                          ${selectedColor === color.name
                            ? 'border-black scale-110 shadow-md'
                            : 'border-zinc-200 hover:border-zinc-500'
                          }
                        `}
                        style={{ backgroundColor: color.hex }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Tamanhos */}
              <div className="mb-5">
                <p className="text-xs font-bold text-black uppercase tracking-widest mb-2.5 flex items-center justify-between">
                  Tamanho
                  <span className="text-zinc-400 font-medium normal-case text-xs">
                    {selectedSize || 'Selecione um tamanho'}
                  </span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {quickAddProduct.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`
                        px-3.5 py-2 text-xs font-bold uppercase tracking-wide
                        transition-all rounded-sm border
                        ${selectedSize === size
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-black border-zinc-200 hover:border-black'
                        }
                      `}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Botão Adicionar */}
              <div className="mt-auto pt-2">
                <button
                  onClick={handleAdd}
                  disabled={!canAdd}
                  className={`
                    w-full py-3.5 font-bold uppercase tracking-widest text-sm
                    transition-all duration-200 rounded-sm
                    ${canAdd
                      ? 'bg-black text-white hover:bg-zinc-800 active:scale-[0.98]'
                      : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                    }
                  `}
                >
                  {canAdd ? 'Adicionar ao Carrinho' : 'Selecione cor e tamanho'}
                </button>
              </div>

            </div>
          </div>

        </motion.div>

        {/* --- Modal de Imagem Expandida --- */}
        <AnimatePresence>
          {isImageExpanded && quickAddProduct.imageUrl && (
            <div className="fixed inset-0 z-[90] flex items-center justify-center p-4"> {/* z-[90] para ficar acima do modal principal */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsImageExpanded(false)}
                className="absolute inset-0 bg-black/90" 
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
              >
                <img
                  src={quickAddProduct.imageUrl}
                  alt={quickAddProduct.name}
                  className="max-w-full max-h-full object-contain" 
                />
                <button
                  onClick={() => setIsImageExpanded(false)}
                  className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg"
                  aria-label="Fechar visualização da imagem"
                >
                  <X size={24} />
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        {/* --- Fim do Modal de Imagem Expandida --- */}

      </div>
    </AnimatePresence>
  );
}