"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { PRODUCTS, CATEGORIES, formatPrice } from '@/data/config';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/lib/supabase'; // 👉 Conexão adicionada
import ScrollReveal from '@/components/ScrollReveal';
import { ShoppingBag } from 'lucide-react';

export default function CategoriaEspecifica() {
  const params = useParams();
  const slug = params.slug as string;
  const { setQuickAddProduct } = useCart();
  
  const [categoryInfo, setCategoryInfo] = useState<any>(null);
  const [categoryProducts, setCategoryProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategoryData = async () => {
      try {
        // Busca a categoria e os produtos no Supabase
        const { data: dbCats } = await supabase.from("categories").select("*");
        const { data: dbProds } = await supabase.from("products").select("*").eq("category_slug", slug);

        // Une as categorias (banco + locais) para achar o título/subtítulo
        const combinedCats = [...(dbCats || []).map(c => ({ ...c, imgColor: c.imgcolor })), ...CATEGORIES];
        const foundCat = combinedCats.find(c => c.slug === slug);
        setCategoryInfo(foundCat);

        // Une os produtos da nuvem desta categoria com os locais filtrados
        const localProds = PRODUCTS.filter(p => p.slug === slug);
        setCategoryProducts([...(dbProds || []), ...localProds]);
      } catch (error) {
        console.error("Erro ao carregar dados da categoria:", error);
        // Fallback local se a nuvem falhar
        setCategoryInfo(CATEGORIES.find(c => c.slug === slug));
        setCategoryProducts(PRODUCTS.filter(p => p.slug === slug));
      } finally {
        setLoading(false);
      }
    };

    loadCategoryData();
  }, [slug]);

  if (loading) return <div className="py-32 text-center text-zinc-500 font-bold tracking-widest animate-pulse">CARREGANDO...</div>;
  if (!categoryInfo) return <div className="p-24 text-center font-bold text-2xl">Categoria não encontrada.</div>;

  return (
    <div className="py-24 max-w-7xl mx-auto px-6 md:px-12 min-h-screen bg-white text-black">
      <ScrollReveal>
        <div className="mb-16 border-b border-zinc-200 pb-12">
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm mb-2">{categoryInfo.subtitle}</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">{categoryInfo.title}</h1>
          <p className="mt-4 font-medium text-zinc-400">{categoryProducts.length} produtos encontrados</p>
        </div>
      </ScrollReveal>

      {categoryProducts.length === 0 ? (
        <p className="text-zinc-400">Nenhum produto cadastrado nesta categoria ainda.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categoryProducts.map((product, index) => (
            <ScrollReveal key={`cat-prod-${product.slug || product.id}-${index}`} delay={(index % 4) * 0.1} direction="up">
              <div className="group cursor-pointer">
                <div className="aspect-[3/4] bg-zinc-100 mb-6 relative overflow-hidden rounded-sm">
                  {product.images && product.images.length > 0 ? (
                     <img 
                       src={product.images[0]} 
                       alt={product.name} 
                       className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                     />
                  ) : (
                     <div className="absolute inset-0 flex items-center justify-center transition-transform duration-1000 group-hover:scale-105">
                       <ShoppingBag className="text-zinc-300 w-16 h-16" />
                     </div>
                  )}
                  <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-0 lg:translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]">
                    <button 
                      onClick={() => setQuickAddProduct(product)} 
                      className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest text-xs hover:bg-zinc-800 transition-colors rounded-sm shadow-2xl lg:shadow-none"
                    >
                      Opções
                    </button>
                  </div>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-lg font-bold tracking-tight mb-1 group-hover:text-zinc-600 transition-colors">{product.name}</h4>
                  <p className="text-sm font-medium">{formatPrice(product.price)}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  );
}