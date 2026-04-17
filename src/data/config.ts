// 👉 Informações principais da loja. 
export const CLIENT_INFO = {
  name: "FL_SPORTS", 
  whatsapp: "5584992148040", 
  instagram: "fl_sports", 
  location: "São Paulo do Potengi, RN", 
  //  Link limpo e direto para o WhatsApp
  whatsappLink: "https://wa.me/5584992148040?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20produtos%20da%20FL_SPORTS"
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
  // Combos
  { id: 31, name: "Kit 2 Camisas Dri-Fit Pro", price: 149.90, category: "Combos", slug: "combos", imageUrl: "/imagens/produtos/aaa copy.webp", sizes: clothingSizes, colors: [{name: 'Preto + Branco', hex: '#18181b'}] },
  { id: 32, name: "Combo Treino (Short + Top)", price: 199.90, category: "Combos", slug: "combos", imageUrl: "/imagens/produtos/aaa copy.webp", sizes: clothingSizes, colors: standardColors },
  { id: 34, name: "Combo Treino camisa + short homem", price: 199.90, category: "Combos", slug: "combos", imageUrl: "/imagens/produtos/aaa copy.webp", sizes: clothingSizes, colors: standardColors },


  // Camisas de Time
  { id: 1, name: "Tênis FL Pro X1", price: 899.00, category: "Performance", slug: "performance", imageUrl: " ", sizes: shoeSizes, colors: standardColors },
  { id: 2, name: "Short de Compressão Elite", price: 149.90, category: "Performance", slug: "performance", imageUrl: "", sizes: clothingSizes, colors: standardColors },
  { id: 3, name: "Top Fitness High Impact", price: 129.90, category: "Performance", slug: "performance", imageUrl: "", sizes: clothingSizes, colors: standardColors },
  { id: 13, name: "Camiseta Térmica Segunda Pele", price: 89.90, category: "Performance", slug: "performance", imageUrl: "", sizes: clothingSizes, colors: standardColors },
  { id: 14, name: "Meia de Alta Performance", price: 59.90, category: "Performance", slug: "performance", imageUrl: "", sizes: ['P/M', 'G/GG'], colors: standardColors },
  
  // Camisa Peruana 40.1
  { id: 4, name: "Jaqueta Corta-Vento Stealth", price: 459.00, category: "Streetwear", slug: "streetwear", imageUrl: "", sizes: clothingSizes, colors: standardColors },
  { id: 5, name: "Calça Cargo Urban", price: 289.00, category: "Streetwear", slug: "streetwear", imageUrl: "", sizes: clothingSizes, colors: [{name: 'Preto', hex: '#18181b'}, {name: 'Khaki', hex: '#d4d4d8'}] },
  { id: 6, name: "Moletom Oversized Logo", price: 349.00, category: "Streetwear", slug: "streetwear", imageUrl: "", sizes: clothingSizes, colors: standardColors },
  { id: 15, name: "T-Shirt Heavy Cotton Boxy", price: 169.00, category: "Streetwear", slug: "streetwear", imageUrl: "", sizes: clothingSizes, colors: standardColors },
  { id: 16, name: "Gorro Beanie Classic Preto", price: 79.90, category: "Streetwear", slug: "streetwear", imageUrl: "", sizes: oneSize, colors: [{name: 'Preto', hex: '#18181b'}] },
  
  // Camisa Texturizada
  { id: 7, name: "Mochila Urban Tactical", price: 329.00, category: "Acessórios", slug: "camisa-texturizada", imageUrl: "", sizes: oneSize, colors: standardColors },
   
  // Camisa 30.1
  { id: 10, name: "Camisa Seleção Brasileira 24/25", price: 349.90, category: "Camisas de Time", slug: "camisa-30-1", imageUrl: "", sizes: clothingSizes, colors: [{name: 'Amarelo', hex: '#facc15'}] },

  // Camisa Dry Fit
  { id: 10, name: "Camisa Seleção Brasileira 24/25", price: 349.90, category: "Camisas de Time", slug: "camisa-dry-fit", imageUrl: "", sizes: clothingSizes, colors: [{name: 'Amarelo', hex: '#facc15'}] },

  // Tênis Esportivo
  { id: 10, name: "Camisa Seleção Brasileira 24/25", price: 349.90, category: "Camisas de Time", slug: "tenis-esportivo", imageUrl: "", sizes: clothingSizes, colors: [{name: 'Amarelo', hex: '#facc15'}] },

  // Óculos
  { id: 10, name: "Camisa Seleção Brasileira 24/25", price: 349.90, category: "Camisas de Time", slug: "oculos", imageUrl: "", sizes: clothingSizes, colors: [{name: 'Amarelo', hex: '#facc15'}] },

  // Short Tactel
  { id: 10, name: "Camisa Seleção Brasileira 24/25", price: 349.90, category: "Camisas de Time", slug: "short-tactel", imageUrl: "", sizes: clothingSizes, colors: [{name: 'Amarelo', hex: '#facc15'}] },

  // Short Dry Fit
  { id: 10, name: "Camisa Seleção Brasileira 24/25", price: 349.90, category: "Camisas de Time", slug: "short-dry-fit", imageUrl: "", sizes: clothingSizes, colors: [{name: 'Amarelo', hex: '#facc15'}] },

  // Short Duplo Feminino
  { id: 10, name: "Camisa Seleção Brasileira 24/25", price: 349.90, category: "Camisas de Time", slug: "short-duplo-fem", imageUrl: "", sizes: clothingSizes, colors: [{name: 'Amarelo', hex: '#facc15'}] },

  // Blusas Femininas
  { id: 10, name: "Camisa Seleção Brasileira 24/25", price: 349.90, category: "Camisas de Time", slug: "blusa-feminina", imageUrl: "", sizes: clothingSizes, colors: [{name: 'Amarelo', hex: '#facc15'}] },

  // Conjunto Feminino Poliamida
    { id: 10, name: "Camisa Seleção Brasileira 24/25", price: 349.90, category: "conjunto-feminino-poliamida", slug: "conjunto-feminino-poliamida", imageUrl: "", sizes: clothingSizes, colors: [{name: 'Amarelo', hex: '#facc15'}] },

 ];

// 👉 COLEÇÕES/CATEGORIAS
export const CATEGORIES = [
  { id: 'combos', slug: "combos", title: "Combos", subtitle: "Leve mais pagando menos", imgColor: "bg-red-900" },
  { id: 'camisas-time', slug: "camisas-de-time", title: "Camisas de Time", subtitle: "Vista seu time com estilo", imgColor: "bg-yellow-700" },
  { id: 'peruana', slug: "camisa-peruana-40-1", title: "Camisa Peruana 40.1", subtitle: "Qualidade premium e caimento perfeito", imgColor: "bg-zinc-900" },
  { id: 'texturizada', slug: "camisa-texturizada", title: "Camisa Texturizada", subtitle: "Detalhes que fazem a diferença", imgColor: "bg-zinc-800" },
  { id: '30-1', slug: "camisa-30-1", title: "Camisa 30.1", subtitle: "Conforto e durabilidade no dia a dia", imgColor: "bg-zinc-700" },
  { id: 'dryfit', slug: "camisa-dry-fit", title: "Camisa Dry Fit", subtitle: "Respirável e ideal para treino", imgColor: "bg-blue-700" },
  { id: 'tenis', slug: "tenis-esportivo", title: "Tênis Esportivo", subtitle: "Performance e conforto nos pés", imgColor: "bg-zinc-900" },
  { id: 'oculos', slug: "oculos", title: "Óculos", subtitle: "Estilo e proteção no seu dia", imgColor: "bg-purple-700" },
  { id: 'tactel', slug: "short-tactel", title: "Short Tactel", subtitle: "Leveza e liberdade no movimento", imgColor: "bg-green-700" },
  { id: 'dryfit-short', slug: "short-dry-fit", title: "Short Dry Fit", subtitle: "Treine com máximo desempenho", imgColor: "bg-blue-800" },
  { id: 'short-duplo', slug: "short-duplo-fem", title: "Short Duplo Feminino", subtitle: "Conforto e segurança no treino", imgColor: "bg-pink-700" },
  { id: 'blusa-fem', slug: "blusa-feminina", title: "Blusas Femininas", subtitle: "Estilo e leveza para o dia a dia", imgColor: "bg-rose-600" },
  { id: 'conjunto-fem', slug: "conjunto-feminino-poliamida", title: "Conjunto Feminino Poliamida", subtitle: "Elegância e performance combinadas", imgColor: "bg-indigo-700" },
];
