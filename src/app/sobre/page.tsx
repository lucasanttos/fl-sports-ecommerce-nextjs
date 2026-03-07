"use client";
import { CLIENT_INFO } from '@/data/config';
import ScrollReveal from '@/components/ScrollReveal';

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="mb-16 border-b border-zinc-200 pb-12">
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-6">O Padrão <br/><span className="text-zinc-400">Inegociável.</span></h1>
            <p className="text-xl text-zinc-500 max-w-2xl leading-relaxed">Não vendemos apenas roupas. Entregamos a armadura para as suas batalhas diárias.</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <ScrollReveal direction="up" delay={0.2}>
            <div className="aspect-square bg-zinc-100 rounded-sm relative overflow-hidden">
              
              {/* 👉 ADICIONE A FOTO AQUI! */}
              {/* Altere o '/imagens/loja.jpg' para o nome exato da foto que você colocou na pasta public */}
              <img 
                src="/imagens/sobremim.jpg" 
                alt="Nossa loja física" 
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" 
              />
              
              {/* Essa div cria uma sombrinha bem leve por cima da foto pra deixar mais Premium */}
              <div className="absolute inset-0 bg-zinc-900 opacity-10 pointer-events-none"></div>

            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.4} className="flex flex-col justify-center space-y-8 text-lg font-light text-zinc-700">
            <p>Nascida em <strong>{CLIENT_INFO.location}</strong>, a {CLIENT_INFO.name} foi forjada para suprir a necessidade de quem exige o máximo, tanto no treino de alta performance quanto no estilo de vida urbano.</p>
            <p>Cada tecido, cada costura e cada silhueta é meticulosamente projetada e selecionada para elevar o seu nível. Da academia de alta intensidade para a selva de concreto, nossa curadoria une a máxima engenharia esportiva com a vanguarda da estética streetwear.</p>
            <p className="text-black font-medium italic text-2xl border-l-4 border-black pl-6 my-8">
              "Vestir-se com propósito não é vaidade. É mentalidade."
            </p>
            <p>Seja bem-vindo ao nosso ecossistema. Seja bem-vindo ao topo.</p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}