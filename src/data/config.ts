// 👉 Informações principais da loja. 
export const CLIENT_INFO = {
  name: "FL_SPORTS", 
  whatsapp: "5584992148040", 
  instagram: "fl_sports", 
  location: "São Paulo do Potengi, RN", 
  // 👉 CORRIGIDO: Link limpo e direto para o WhatsApp
  whatsappLink: "[https://wa.me/5584992148040?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20produtos%20da%20FL_SPORTS](https://wa.me/5584992148040?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20produtos%20da%20FL_SPORTS)"
};

// 👉 AQUI EU CONFIGURO A TAXA DA MAQUININHA DE CARTÃO
export const CARD_FEE_PERCENTAGE = 5; // Ex: 5 significa 5% de acréscimo.

// 👉 Lógica de formatação de preço para R$
export const formatPrice = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

// 👉 Listas de tamanhos e cores
const clothingSizes = ['P', 'M', 'G', 'GG'];
const shoeSizes = ['38', '39', '40', '41', '42'];
const oneSize = ['Único'];

const standardColors = [
  { name: 'Preto', hex: '#18181b' },
  { name: 'Branco', hex: '#ffffff' },
  { name: 'Cinza', hex: '#71717a' }
];

// 👉 CATÁLOGO DE PRODUTOS
export const PRODUCTS = [
  // 👉 NOVOS: COMBOS E KITS
  { id: 29, name: "Kit 2 Camisas Dri-Fit Pro", price: 149.90, category: "Combos", slug: "combos", imageUrl: "", sizes: clothingSizes, colors: [{name: 'Preto + Branco', hex: '#18181b'}] },
  { id: 30, name: "Combo Treino (Short + Top)", price: 199.90, category: "Combos", slug: "combos", imageUrl: "", sizes: clothingSizes, colors: standardColors },

  // PERFORMANCE
  { id: 1, name: "Tênis FL Pro X1", price: 899.00, category: "Performance", slug: "performance", imageUrl: "", sizes: shoeSizes, colors: standardColors },
  { id: 2, name: "Short de Compressão Elite", price: 149.90, category: "Performance", slug: "performance", imageUrl: "", sizes: clothingSizes, colors: standardColors },
  { id: 3, name: "Top Fitness High Impact", price: 129.90, category: "Performance", slug: "performance", imageUrl: "", sizes: clothingSizes, colors: standardColors },
  { id: 13, name: "Camiseta Térmica Segunda Pele", price: 89.90, category: "Performance", slug: "performance", imageUrl: "", sizes: clothingSizes, colors: standardColors },
  { id: 14, name: "Meia de Alta Performance", price: 59.90, category: "Performance", slug: "performance", imageUrl: "", sizes: ['P/M', 'G/GG'], colors: standardColors },
  
  // STREETWEAR
  { id: 4, name: "Jaqueta Corta-Vento Stealth", price: 459.00, category: "Streetwear", slug: "streetwear", imageUrl: "", sizes: clothingSizes, colors: standardColors },
  { id: 5, name: "Calça Cargo Urban", price: 289.00, category: "Streetwear", slug: "streetwear", imageUrl: "", sizes: clothingSizes, colors: [{name: 'Preto', hex: '#18181b'}, {name: 'Khaki', hex: '#d4d4d8'}] },
  { id: 6, name: "Moletom Oversized Logo", price: 349.00, category: "Streetwear", slug: "streetwear", imageUrl: "", sizes: clothingSizes, colors: standardColors },
  { id: 15, name: "T-Shirt Heavy Cotton Boxy", price: 169.00, category: "Streetwear", slug: "streetwear", imageUrl: "", sizes: clothingSizes, colors: standardColors },
  { id: 16, name: "Gorro Beanie Classic Preto", price: 79.90, category: "Streetwear", slug: "streetwear", imageUrl: "", sizes: oneSize, colors: [{name: 'Preto', hex: '#18181b'}] },
  
  // ACESSÓRIOS
  { id: 7, name: "Mochila Urban Tactical", price: 329.00, category: "Acessórios", slug: "acessorios", imageUrl: "", sizes: oneSize, colors: standardColors },
  { id: 8, name: "Boné Dad Hat Minimal", price: 99.90, category: "Acessórios", slug: "acessorios", imageUrl: "", sizes: oneSize, colors: standardColors },
  { id: 9, name: "Garrafa Térmica 1L Titanium", price: 159.00, category: "Acessórios", slug: "acessorios", imageUrl: "", sizes: oneSize, colors: [{name: 'Prata', hex: '#e4e4e7'}, {name: 'Preto', hex: '#18181b'}] },
  { id: 17, name: "Bolsa Transversal Chest Bag", price: 199.00, category: "Acessórios", slug: "acessorios", imageUrl: "", sizes: oneSize, colors: standardColors },
  { id: 18, name: "Corda de Pular Speed Rope Pro", price: 89.90, category: "Acessórios", slug: "acessorios", imageUrl: "", sizes: oneSize, colors: [{name: 'Preto', hex: '#18181b'}] },
  
  // CAMISAS DE TIME
  { id: 10, name: "Camisa Seleção Brasileira 24/25", price: 349.90, category: "Camisas de Time", slug: "camisas-de-time", imageUrl: "", sizes: clothingSizes, colors: [{name: 'Amarelo', hex: '#facc15'}] },
  { id: 11, name: "Camisa Real Madrid Home 24/25", price: 349.90, category: "Camisas de Time", slug: "camisas-de-time", imageUrl: "", sizes: clothingSizes, colors: [{name: 'Branco', hex: '#ffffff'}] },
  { id: 12, name: "Camisa Flamengo Retrô 81", price: 299.90, category: "Camisas de Time", slug: "camisas-de-time", imageUrl: "", sizes: clothingSizes, colors: [{name: 'Rubro-Negro', hex: '#b91c1c'}] },
  { id: 19, name: "Camisa Arsenal Home 24/25", price: 349.90, category: "Camisas de Time", slug: "camisas-de-time", imageUrl: "", sizes: clothingSizes, colors: [{name: 'Vermelho', hex: '#dc2626'}] },
  { id: 20, name: "Camisa Man. City Away 24/25", price: 349.90, category: "Camisas de Time", slug: "camisas-de-time", imageUrl: "", sizes: clothingSizes, colors: [{name: 'Azul Celeste', hex: '#38bdf8'}] },
];

// 👉 COLEÇÕES/CATEGORIAS
export const CATEGORIES = [
  // 👉 NOVA CATEGORIA
  { id: 'combos', slug: "combos", title: "Combos", subtitle: "Leve mais por menos", imgColor: "bg-red-900" },
  { id: 'esportes', slug: "performance", title: "Performance", subtitle: "A engenharia do corpo", imgColor: "bg-zinc-900" },
  { id: 'moda', slug: "streetwear", title: "Streetwear", subtitle: "As ruas como palco", imgColor: "bg-zinc-800" },
  { id: 'camisas', slug: "camisas-de-time", title: "Times", subtitle: "O manto sagrado", imgColor: "bg-zinc-700" },
  { id: 'acessorios', slug: "acessorios", title: "Acessórios", subtitle: "O detalhe definitivo", imgColor: "bg-black" }
];
