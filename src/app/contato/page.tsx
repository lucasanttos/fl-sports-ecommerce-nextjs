"use client";
import { MapPin, MessageCircle, Instagram } from 'lucide-react';
import { CLIENT_INFO } from '@/data/config';
import ScrollReveal from '@/components/ScrollReveal';

export default function ContatoPage() {
  return (
    <div className="min-h-screen bg-zinc-50 py-24 text-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="mb-16 text-center">
            {/* 👉 Títulos da página de Contato */}
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4">Fale Conosco</h1>
            <p className="text-zinc-500 font-medium tracking-wide">Estamos prontos para atender você com exclusividade.</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ScrollReveal delay={0.1} direction="up" className="col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-sm shadow-sm border border-zinc-100">
              <MapPin size={32} className="mb-6 text-black" />
              <h3 className="font-bold uppercase tracking-widest text-sm mb-2">Nossa Sede</h3>
              <p className="text-zinc-500">{CLIENT_INFO.location}</p>
            </div>
            
            <a href={CLIENT_INFO.whatsappLink} target="_blank" rel="noreferrer" className="block bg-black text-white p-8 rounded-sm shadow-sm hover:bg-zinc-800 transition-colors group">
              <MessageCircle size={32} className="mb-6 text-[#25D366] group-hover:scale-110 transition-transform" />
              <h3 className="font-bold uppercase tracking-widest text-sm mb-2">WhatsApp VIP</h3>
              <p className="text-zinc-400">Atendimento humanizado</p>
            </a>

            <a href={`https://instagram.com/${CLIENT_INFO.instagram}`} target="_blank" rel="noreferrer" className="block bg-white p-8 rounded-sm shadow-sm border border-zinc-100 hover:border-black transition-colors group">
              <Instagram size={32} className="mb-6 text-black group-hover:scale-110 transition-transform" />
              <h3 className="font-bold uppercase tracking-widest text-sm mb-2">Instagram</h3>
              <p className="text-zinc-500">@{CLIENT_INFO.instagram}</p>
            </a>
          </ScrollReveal>

          <ScrollReveal delay={0.3} direction="up" className="col-span-1 lg:col-span-2">
            <div className="bg-white p-8 md:p-12 rounded-sm shadow-sm border border-zinc-100 h-full">
              <h3 className="text-2xl font-black tracking-tighter uppercase mb-8">Envie uma mensagem</h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Seu Nome</label>
                    <input type="text" className="w-full border border-zinc-300 p-4 text-sm focus:border-black focus:ring-1 focus:ring-black outline-none rounded-sm transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">E-mail ou Telefone</label>
                    <input type="text" className="w-full border border-zinc-300 p-4 text-sm focus:border-black focus:ring-1 focus:ring-black outline-none rounded-sm transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Mensagem</label>
                  <textarea className="w-full border border-zinc-300 p-4 text-sm focus:border-black focus:ring-1 focus:ring-black outline-none rounded-sm transition-all h-40 resize-none"></textarea>
                </div>
                <button type="submit" className="bg-black text-white px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-zinc-800 transition-colors rounded-sm w-full md:w-auto">
                  Enviar Mensagem
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
