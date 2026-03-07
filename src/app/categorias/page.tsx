"use client";
import Link from 'next/link';
import { CATEGORIES } from '@/data/config';
import ScrollReveal from '@/components/ScrollReveal';
import { ArrowRight } from 'lucide-react';

export default function CategoriasPage() {
  return (
    <div className="pt-12 pb-24 bg-white text-black min-h-screen max-w-7xl mx-auto px-6 md:px-12">
      <ScrollReveal>
        {/* 👉 Textos da página que lista todas as coleções */}
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4">Departamentos</h1>
        <p className="text-zinc-500 font-medium tracking-wide mb-16">Escolha a sua tribo.</p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CATEGORIES.map((cat, index) => (
          <ScrollReveal key={cat.slug} delay={index * 0.1}>
            <Link href={`/categoria/${cat.slug}`} className={`block group relative aspect-video overflow-hidden ${cat.imgColor} rounded-sm`}>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-500 z-10" />
              <div className="absolute inset-0 p-12 flex flex-col justify-end z-20 text-white transform group-hover:-translate-y-2 transition-transform duration-500">
                <p className="text-sm font-bold tracking-widest mb-2 opacity-80 uppercase">{cat.subtitle}</p>
                <h3 className="text-4xl font-black tracking-tighter uppercase">{cat.title}</h3>
                <div className="overflow-hidden mt-4 h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 mt-2">
                    Ver Produtos <ArrowRight size={16} />
                  </p>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
