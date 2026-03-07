"use client";
import Link from 'next/link';
import { Instagram, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import { CLIENT_INFO } from '@/data/config';
import ScrollReveal from './ScrollReveal';

export default function Footer() {
  return (
    <footer className="bg-white text-black pt-24 pb-12 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* PARTE DE CIMA DO RODAPÉ (Animada) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          <ScrollReveal delay={0.1}>
            <h3 className="text-3xl font-black tracking-tighter uppercase mb-6">{CLIENT_INFO.name}</h3>
            {/* 👉 Se eu quiser mudar o textinho abaixo do nome da loja no rodapé, é aqui. */}
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs mb-8">
              A sua curadoria definitiva para equipamentos de alta performance, streetwear de vanguarda e estilo inegociável.
            </p>
            <div className="flex gap-4">
              <a href={`https://instagram.com/${CLIENT_INFO.instagram}`} target="_blank" rel="noreferrer" className="w-12 h-12 bg-black text-white flex items-center justify-center hover:bg-zinc-800 transition-colors rounded-full hover:scale-110 transform duration-300"><Instagram size={20} /></a>
              <a href={CLIENT_INFO.whatsappLink} target="_blank" rel="noreferrer" className="w-12 h-12 bg-black text-white flex items-center justify-center hover:bg-zinc-800 transition-colors rounded-full hover:scale-110 transform duration-300"><MessageCircle size={20} /></a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            {/* 👉 Links da coluna Explorar */}
            <h4 className="font-bold uppercase tracking-widest text-sm mb-6">Explorar</h4>
            <ul className="space-y-4 text-zinc-500 text-sm font-medium">
              <li><Link href="/" className="hover:text-black transition-colors">Início</Link></li>
              <li><Link href="/categorias" className="hover:text-black transition-colors">Categorias</Link></li>
              <li><Link href="/#produtos" className="hover:text-black transition-colors">Catálogo</Link></li>
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            {/* 👉 Links da coluna Atendimento */}
            <h4 className="font-bold uppercase tracking-widest text-sm mb-6">Atendimento</h4>
            <ul className="space-y-4 text-zinc-500 text-sm font-medium">
              <li><a href={CLIENT_INFO.whatsappLink} target="_blank" rel="noreferrer" className="hover:text-black transition-colors">Rastrear Pedido</a></li>
              <li><a href={CLIENT_INFO.whatsappLink} target="_blank" rel="noreferrer" className="hover:text-black transition-colors">Trocas e Devoluções</a></li>
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            {/* 👉 Campo de Newsletter */}
            <h4 className="font-bold uppercase tracking-widest text-sm mb-6">Newsletter VIP</h4>
            <p className="text-zinc-500 text-sm mb-4">Inscreva-se para drops antecipados e convites exclusivos.</p>
            <form className="flex group" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="SEU MELHOR E-MAIL" className="bg-zinc-100 border-none px-5 py-4 text-xs font-bold tracking-widest focus:ring-2 focus:ring-black outline-none w-full rounded-l-sm" />
              <button className="bg-black text-white px-6 hover:bg-zinc-800 transition-colors rounded-r-sm group-hover:px-8 duration-300"><ArrowRight size={20} /></button>
            </form>
          </ScrollReveal>
        </div>

        {/* 👉 PARTE DE BAIXO DO RODAPÉ (Sem animação, para os CRÉDITOS aparecerem sempre) */}
        <div className="pt-10 border-t border-zinc-200 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-bold text-zinc-400 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} {CLIENT_INFO.name}. TODOS OS DIREITOS RESERVADOS.</p>
          
          {/* 👉 CRÉDITOS DA UICODE COM O LINK 100% CORRIGIDO! */}
          <div className="flex items-center gap-2 bg-zinc-50 px-4 py-2 rounded-full border border-zinc-200 hover:border-zinc-300 hover:shadow-sm transition-all duration-300">
            <Sparkles size={14} className="text-zinc-400" />
            <span className="text-zinc-500">Desenvolvido por</span>
            <a href="https://uicode.site" target="_blank" rel="noreferrer" className="text-black font-black hover:text-blue-600 transition-colors duration-300 relative group overflow-hidden">
              uicode.dev
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-blue-600 transform -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
            </a>
          </div>
          
        </div>
      </div>
    </footer>
  );
}