// 👉 Informações principais da loja.
export const CLIENT_INFO = {
  name: "FL_SPORTS",
  whatsapp: "5584992148040",
  instagram: "fl_sports",
  location: "R. Potengi, 82 - Sao Paulo Do Potengi, São Paulo do Potengi - RN, 59460-000",
  whatsappLink: "https://wa.me/5584992148040?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20produtos%20da%20FL_SPORTS"
};

// 👉 AQUI EU CONFIGURO A TAXA DA MAQUININHA DE CARTÃO
export const CARD_FEE_PERCENTAGE = 10 ; 

// 👉 Lógica de formatação de preço para R$
export const formatPrice = (value: number) => {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
};

// 👉 Listas de tamanhos e cores
const clothingSizes = ["P", "M", "G", "GG"];
const shoeSizes = ["38", "39", "40", "41", "42"];
const oneSize = ["Único"];

const standardColors = [
  { name: "Preto", hex: "#18181b" },
  { name: "Branco", hex: "#ffffff" },
  { name: "Cinza", hex: "#71717a" }
];

// 👉 CATÁLOGO DE PRODUTOS
export const PRODUCTS = [
  // Combos
  //  {
  //    id: 31,
  //    name: "Kit 2 Camisas Dri-Fit Pro",
  //    price: 70.00,
  //    category: "Combos",
  //    slug: "combos",
  //    images: ["/imagens/produtos/combo1.jpeg"],
  //    sizes: clothingSizes,
  //    colors: [{ name: "Preto + Branco", hex: "#18181b" }]
  //  },
  //  {
  //    id: 32,
  //    name: "Combo Treino (Short + Top)",
  //    price: 70.00,
  //    category: "Combos",
  //    slug: "combos",
  //    images: ["/imagens/produtos/combo1.jpeg"],
  //    sizes: clothingSizes,
  //    colors: standardColors
  //  },
  //  {
  //    id: 34,
  //    name: "Combo Treino camisa + short homem",
  //    price: 70.00,
  //    category: "Combos",
  //    slug: "combos",
  //    images: ["/imagens/produtos/combo1.jpeg"],
  //    sizes: clothingSizes,
  //    colors: standardColors
  //  },

  // Camisas de Time
  {
    id: 10,
    name: "Camisa Seleção Brasileira",
    price: 50.0,
    category: "Camisas de Time",
    slug: "camisas-de-time",
    images: [
      "/imagens/produtos/camisa-time-brasil-1.jpeg",
      "/imagens/produtos/camisa-time-brasil-2.jpeg",
    ],
    sizes: clothingSizes,
    colors: [{ name: "Amarelo", hex: "#facc15" }],
  },

  // SHORT TACTEL COM ELASTANO
  {
    id: 35,
    name: "Short Tactel com Elastano",
    price: 35.0,
    category: "short-tactel",
    slug: "short-tactel",
    images: ["/imagens/produtos/Short tactel com elastano .jpeg"],
    sizes: ["M", "G", "GG"],
    colors: [
      { name: "Preto", hex: "#18181b" },
      { name: "Verde claro", hex: "#22c55e" },
      { name: "Azul claro", hex: "#3b82f6" },
      { name: "Vermelho", hex: "#ef4444" },
      { name: "Cinza", hex: "#71717a" },
    ],
  },

  // SHORT DUPLO FEMININO
  {
    id: 36,
    name: "Short Duplo Feminino",
    price: 45.0,
    category: "short-duplo-fem",
    slug: "short-duplo-fem",
    images: ["/imagens/produtos/Short duplo.jpeg"],
    sizes: ["P", "M", "G", "GG"],
    colors: [
      { name: "Branco", hex: "#ffffff" },
      { name: "Cinza", hex: "#71717a" },
      { name: "Preto", hex: "#18181b" },
      { name: "Azul marinho", hex: "#1e40af" },
      { name: "Azul claro", hex: "#3b82f6" },
    ],
  },

  // SHORT  POLIAMIDA
  {
    id: 37,
    name: "Short Nike Poliamida",
    price: 45.0,
    category: "short-dry-fit",
    slug: "short-dry-fit",
    images: ["/imagens/produtos/SHORT NIKE POLIAMIDA.jpeg"],
    sizes: ["M", "G", "GG"],
    colors: [
      { name: "Preto", hex: "#000000" },
      { name: "Rosa", hex: "#f472b6" },
      { name: "Azul claro", hex: "#3b82f6" },
      { name: "Branco", hex: "#ffffff" },
    ],
  },

  // BLUSA POLIAMIDA
  {
    id: 38,
    name: "Blusa Poliamida",
    price: 35.0,
    category: "Blusas em Poliamida",
    slug: "blusa-feminina",
    images: ["/imagens/produtos/BLUSA POLIAMIDA .jpeg"],
    sizes: ["M", "G", "GG"],
    colors: [
      { name: "Preto", hex: "#18181b" },
      { name: "Branco", hex: "#ffffff" },
      { name: "Azul", hex: "#3b82f6" },
      { name: "Cinza", hex: "#71717a" },
      { name: "Vermelho", hex: "#ef4444" },
      { name: "Vinho", hex: "#991b1b" },
      { name: "Verde claro", hex: "#22c55e" },
      { name: "Verde militar", hex: "#4d7c0f" },
      { name: "Rosa", hex: "#f472b6" },
    ],
  },
  {
    id: 34,
    name: "Blusa Poliamida Adidas",
    price: 35.0,
    category: "Blusas em Poliamida",
    slug: "blusa-feminina",
    images: ["/imagens/produtos/BLUSA POLIAMIDA .jpeg"],
    sizes: ["M", "G", "GG"],
    colors: [
      { name: "Preto", hex: "#18181b" },
      { name: "Branco", hex: "#ffffff" },
      { name: "Azul", hex: "#3b82f6" },
      { name: "Cinza", hex: "#71717a" },
      { name: "Vermelho", hex: "#ef4444" },
      { name: "Vinho", hex: "#991b1b" },
      { name: "Verde claro", hex: "#22c55e" },
      { name: "Verde militar", hex: "#4d7c0f" },
      { name: "Rosa", hex: "#f472b6" },
    ],
  },
  {
    id: 35,
    name: "Blusa Poliamida Nike",
    price: 35.0,
    category: "Blusas em Poliamida",
    slug: "blusa-feminina",
    images: ["/imagens/produtos/BLUSA POLIAMIDA .jpeg"],
    sizes: ["M", "G", "GG"],
    colors: [
      { name: "Preto", hex: "#18181b" },
      { name: "Branco", hex: "#ffffff" },
      { name: "Azul", hex: "#3b82f6" },
      { name: "Cinza", hex: "#71717a" },
      { name: "Vermelho", hex: "#ef4444" },
      { name: "Vinho", hex: "#991b1b" },
      { name: "Verde claro", hex: "#22c55e" },
      { name: "Verde militar", hex: "#4d7c0f" },
      { name: "Rosa", hex: "#f472b6" },
    ],
  },
  {
    id: 36,
    name: "Blusa Poliamida Alo",
    price: 35.0,
    category: "Blusas em Poliamida",
    slug: "blusa-feminina",
    images: ["/imagens/produtos/BLUSA POLIAMIDA .jpeg"],
    sizes: ["M", "G", "GG"],
    colors: [
      { name: "Preto", hex: "#18181b" },
      { name: "Branco", hex: "#ffffff" },
      { name: "Azul", hex: "#3b82f6" },
      { name: "Cinza", hex: "#71717a" },
      { name: "Vermelho", hex: "#ef4444" },
      { name: "Vinho", hex: "#991b1b" },
      { name: "Verde claro", hex: "#22c55e" },
      { name: "Verde militar", hex: "#4d7c0f" },
      { name: "Rosa", hex: "#f472b6" },
    ],
  },

  // CAMISA dry fit
  {
    id: 39,
    name: "Camisa Adidas Três Listras",
    price: 35.0,
    category: "camisa-dry-fit",
    slug: "camisa-dry-fit",
    images: ["/imagens/produtos/camisa-adidas-3listras.jpeg",
"/imagens/produtos/camisa-adidas-3listras-2.jpeg"
    ],
    sizes: ["M", "G", "GG"],
    colors: [
      { name: "Preto", hex: "#000000" },
      { name: "Branco", hex: "#ffffff" },
      { name: "royal", hex: "#1e40af" },
      { name: "Bege", hex: "#F5F5DC" },
      { name: "Rosa", hex: "#f187ec" },
      { name: "lilás", hex: "#C8A2C8" },
      { name: "Azul claro", hex: "#4fd0f7" },
      { name: "Verde", hex: "#6df561" },

    ],
  },
  {
    id: 40,
    name: "Camisa Nike Básica",
    price: 35.0,
    category: "camisa-dry-fit",
    slug: "camisa-dry-fit",
    images: ["/imagens/produtos/camisa-dfit-nike-basico.jpeg"],
    sizes: ["M", "G", "GG"],
    colors: [
      { name: "Preto", hex: "#000000" },
      { name: "Branco", hex: "#ffffff" },
      { name: "Azul Marinho", hex: "#22336d" },
      { name: "Bege", hex: "#F5F5DC" },
      { name: "Vinho", hex: "#612326" },
    ],
  },

  // CAMISA TEXTURIZADA
  {
    id: 50,
    name: "Camisa Texturizada Diesel",
    price: 70.0,
    category: "Camisa Texturizada",
    slug: "camisa-texturizada",
    images: ["/imagens/produtos/camisa-texturizada-diesel.jpeg"],
    sizes: ["M", "G", "GG"],
    colors: [
      { name: "Preto", hex: "#000000" },
      { name: "Verde Militar", hex: "#556B2F" },
      { name: "Cinza Chumbo", hex: "#4B5563" },
      { name: "Off-White", hex: "#F3F4F6" },
      { name: "Bege Areia", hex: "#D6D3D1" },
      { name: "Marrom Café", hex: "#78350F" },
      { name: "Vermelho", hex: "#DC2626" },
    ],
  },
  {
    id: 51,
    name: "Camisa Texturizada Hugo Boss",
    price: 70.0,
    category: "Camisa Texturizada",
    slug: "camisa-texturizada",
    images: ["/imagens/produtos/camisa-texturizada-boss.jpeg"],
    sizes: ["M", "G", "GG"],
    colors: [
      { name: "Preto", hex: "#000000" },
      { name: "Verde Militar", hex: "#556B2F" },
      { name: "Cinza Chumbo", hex: "#4B5563" },
      { name: "Off-White", hex: "#F3F4F6" },
      { name: "Bege Areia", hex: "#D6D3D1" },
      { name: "Marrom Café", hex: "#78350F" },
      { name: "Vermelho", hex: "#DC2626" },
    ],
  },
  {
    id: 52,
    name: "Camisa Texturizada Ralph Lauren",
    price: 70.0,
    category: "Camisa Texturizada",
    slug: "camisa-texturizada",
    images: ["/imagens/produtos/camisa-texturizada-lauren.jpeg"],
    sizes: ["M", "G", "GG"],
    colors: [
      { name: "Preto", hex: "#000000" },
      { name: "Verde Militar", hex: "#556B2F" },
      { name: "Cinza Chumbo", hex: "#4B5563" },
      { name: "Off-White", hex: "#F3F4F6" },
      { name: "Bege Areia", hex: "#D6D3D1" },
      { name: "Marrom Café", hex: "#78350F" },
      { name: "Vermelho", hex: "#DC2626" },
    ],
  },

  // CAMISA PLUS
  {
    id: 41,
    name: "Camisa Plus",
    price: 70.0,
    category: "Camisa Plus",
    slug: "camisa-plus",
    images: ["/imagens/produtos/CAMISAS PLUS.jpeg"],
    sizes: ["G1", "G2", "G3"],
    colors: [
      { name: "Preto", hex: "#18181b" },
      { name: "Azul royal", hex: "#1e3a8a" },
      { name: "Cinza", hex: "#71717a" },
      { name: "Branco", hex: "#ffffff" },
    ],
  },

  // BONÉ PREMIUM
  {
    id: 120,
    name: "Boné Premium",
    price: 35.0,
    category: "acessorios",
    slug: "bone",
    images: ["/imagens/produtos/bone.jpeg"],
    sizes: oneSize,
    colors: standardColors,
  },
  {
    id: 121,
    name: "Boné Premium H",
    price: 35.0,
    category: "acessorios",
    slug: "bone",
    images: [
      "/imagens/produtos/bone-h-1.jpeg",
      "/imagens/produtos/bone-h-2.jpeg",
    ],
    sizes: oneSize,
    colors: standardColors,
  },
  {
    id: 122,
    name: "Boné Premium B",
    price: 35.0,
    category: "acessorios",
    slug: "bone",
    images: [
      "/imagens/produtos/bone-B1.jpeg",
      "/imagens/produtos/BONE-B2.jpeg",
      "/imagens/produtos/bone-B3.jpeg",
      "/imagens/produtos/bone-B4.jpeg",
      "/imagens/produtos/BONE-B5.jpeg",
      "/imagens/produtos/BONE-B6.jpeg",
    ],
    sizes: oneSize,
    colors: [
      { name: "BRANCO", hex: "#ffffff" },
      { name: "Verde", hex: "#18422b" },
      { name: "AZUL ESCURO", hex: "#273081" },
      { name: "AZUL CIANO", hex: "#5ebefd" },
      { name: "Verde ESCURO", hex: "#28362e" },
      { name: "Marrom", hex: "#492a16" },
    ],
  },

  // REGATA MACHÃO
  {
    id: 43,
    name: "Regata Machão Nike",
    price: 70.0,
    category: "Regatas",
    slug: "regata-machao-over-suedine",
    images: ["/imagens/produtos/regata-machao-nike.jpeg"],
    sizes: ["M", "G", "GG"],
    colors: [
      { name: "Preto", hex: "#000000" },
      { name: "Mostarda", hex: "#B8860B" },
      { name: "Creme", hex: "#FFFDD0" },
      { name: "Branco", hex: "#FFFFFF" },
    ],
  },
  {
    id: 44,
    name: "Regata Machão Jordan",
    price: 70.0,
    category: "Regatas",
    slug: "regata-machao-over-suedine",
    images: ["/imagens/produtos/regata-machao-jordan.jpeg"],
    sizes: ["M", "G", "GG"],
    colors: [
      { name: "Preto", hex: "#000000" },
      { name: "Mostarda", hex: "#B8860B" },
      { name: "Creme", hex: "#FFFDD0" },
      { name: "Branco", hex: "#FFFFFF" },
    ],
  },
  {
    id: 45,
    name: "Regata Machão",
    price: 70.0,
    category: "Regatas",
    slug: "regata-machao-over-suedine",
    images: ["/imagens/produtos/regata-machao.jpeg"],
    sizes: ["M", "G", "GG"],
    colors: [
      { name: "Preto", hex: "#000000" },
      { name: "Mostarda", hex: "#B8860B" },
      { name: "Creme", hex: "#FFFDD0" },
      { name: "Branco", hex: "#FFFFFF" },
    ],
  },

  // SHORT SARJA IMPORTADO
  {
    id: 70,
    name: "Short Sarja CK",
    price: 80.0,
    category: "Short Sarja",
    slug: "short-sarja",
    images: ["/imagens/produtos/short-sarja.jpeg"],
    sizes: ["M", "G", "GG"],
    colors: [
      { name: "Preto", hex: "#1a1a1a" },
      { name: "Verde Oliva", hex: "#556B2F" },
      { name: "Cinza Claro", hex: "#D3D3D3" },
      { name: "Bege Areia", hex: "#E8E4C9" },
      { name: "Kaki", hex: "#C2B280" },
      { name: "Cinza Médio", hex: "#808080" },
    ],
  },
  {
    id: 71,
    name: "Short Sarja Ralph Lauren",
    price: 80.0,
    category: "Short Sarja",
    slug: "short-sarja",
    images: ["/imagens/produtos/short-sarja-ralph.jpeg"],
    sizes: ["M", "G", "GG"],
    colors: [
      { name: "Preto", hex: "#1a1a1a" },
      { name: "Verde Oliva", hex: "#556B2F" },
      { name: "Cinza Claro", hex: "#D3D3D3" },
      { name: "Bege Areia", hex: "#E8E4C9" },
      { name: "Kaki", hex: "#C2B280" },
      { name: "Cinza Médio", hex: "#808080" },
    ],
  },
  {
    id: 72,
    name: "Short Sarja Boss",
    price: 80.0,
    category: "Short Sarja",
    slug: "short-sarja",
    images: ["/imagens/produtos/short-sarja-boss.jpeg"],
    sizes: ["M", "G", "GG"],
    colors: [
      { name: "Preto", hex: "#1a1a1a" },
      { name: "Verde Oliva", hex: "#556B2F" },
      { name: "Cinza Claro", hex: "#D3D3D3" },
      { name: "Bege Areia", hex: "#E8E4C9" },
      { name: "Kaki", hex: "#C2B280" },
      { name: "Cinza Médio", hex: "#808080" },
    ],
  },

  // short dryfit
  {
    id: 100,
    name: "Short Adidas Basico",
    price: 35.0,
    category: "Short Dry Fit",
    slug: "short-dry-fit",
    images: ["/imagens/produtos/short-adidas-basico-branco.jpeg"],
    sizes: ["M", "G", "GG"],
    colors: [
      { name: "Preto", hex: "#1a1a1a" },
      { name: "Branco", hex: "#ffffff" },
      { name: "Cinza", hex: "#727272" },
    ],
  },
  {
    id: 101,
    name: "Short Adidas 3 listras",
    price: 35.0,
    category: "Short Dry Fit",
    slug: "short-dry-fit",
    images: ["/imagens/produtos/short-adidas-3listras.jpeg"],
    sizes: ["M", "G", "GG"],
    colors: [
      { name: "Preto", hex: "#1a1a1a" },
      { name: "Branco", hex: "#ffffff" },
      { name: "grafite", hex: "#5f5f5f" },
    ],
  },
  {
    id: 103,
    name: "Short Nike Básico",
    price: 35.0,
    category: "Short Dry Fit",
    slug: "short-dry-fit",
    images: ["/imagens/produtos/short-nike-basico.jpeg"],
    sizes: ["M", "G", "GG"],
    colors: [
      { name: "Azul marinho", hex: "#041d4d" },
      { name: "Preto", hex: "#000000" },
      { name: "Cinza Prata", hex: "#5f5f5f" },
      { name: "grafite", hex: "#4d4848" },
      { name: "branco", hex: "#ffffff" },
    ],
  },
  // tenis
  {
    id: 90,
    name: "Tênis Adidas 1",
    price: 120.0,
    category: "Tenis Esportivo",
    slug: "tenis-esportivo",
    images: ["/imagens/produtos/tenis-adidas-1.jpeg"],
    sizes: ["39", "40", "41", "42"],
    colors: [{ name: "Branco", hex: "#ffffff" }],
  },
  {
    id: 92,
    name: "Tênis Adidas 2",
    price: 120.0,
    category: "Tenis Esportivo",
    slug: "tenis-esportivo",
    images: ["/imagens/produtos/tenis-adidas-2.jpeg"],
    sizes: ["39", "40", "41", "42"],
    colors: [{ name: "Cinza", hex: "#494849" }],
  },
  {
    id: 93,
    name: "Tênis Adidas 3",
    price: 120.0,
    category: "Tenis Esportivo",
    slug: "tenis-esportivo",
    images: ["/imagens/produtos/tenis-adidas-3.jpeg"],
    sizes: ["39", "40", "41", "42"],
    colors: [{ name: "Preto", hex: "#000000" }],
  },
  {
    id: 94,
    name: "Tênis Nike ",
    price: 120.0,
    category: "Tenis Esportivo",
    slug: "tenis-esportivo",
    images: ["/imagens/produtos/tenis-nike-1.jpeg"],
    sizes: ["39", "40", "41", "42"],
    colors: [{ name: "Preto", hex: "#000000" }],
  },

  // CASAQUINHOS
  {
    id: 110,
    name: "Casaquinho",
    price: 40.0,
    category: "Casaquinhos Femininos",
    slug: "casaquinho",
    images: ["/imagens/produtos/casaquinho.jpeg"],
    sizes: ["M", "G"],
    colors: [
      { name: "Preto", hex: "#000000" },
      { name: "Branco", hex: "#ffffff" },
    ],
  },

    // camisa retro
{
    id: 120,
    name: "Camisa Retrô Adidas",
    price: 40.0,
    category: "Camisa Retrô",
    slug: "camisa-retro",
    images: ["/imagens/produtos/camisa-retro1.jpeg",
      "/imagens/produtos/camisa-retro2.jpeg"
    ],
    
    sizes: ["M","G","GG"],
    colors: [
      { name: "Preto", hex: "#000000" },
      { name: "Branco", hex: "#ffffff" },
    ],
  },
  {
    id: 121,
    name: "Camisa Retrô Adidas 2",
    price: 40.0,
    category: "Camisa Retrô",
    slug: "camisa-retro",
    images: ["/imagens/produtos/camisa-retro3.jpeg",
      "/imagens/produtos/camisa-retro2.jpeg"
    ],
    
    sizes: ["M","G","GG"],
    colors: [
      { name: "Preto", hex: "#000000" },
      { name: "Branco", hex: "#ffffff" },
            { name: "Cinza", hex: "#585858" },
                  { name: "Bege", hex: "#899169" },

    ],
  },

      // conjunto
{
    id: 130,
    name: "Conjunto de short duplo 3P",
    price: 139.90,
    category: "Conjunto",
    slug: "conjuntos",
    images: ["/imagens/produtos/conjunto-3p.jpeg",
      "/imagens/produtos/conjunto-3pa.jpeg"
    ],
    
    sizes: ["M","G","GG"],
    colors: [
      { name: "Azul ciano", hex: "#4dd6ff" },
    ],
  },
{
    id: 131,
    name: "Conjunto de short duplo 2P",
    price: 129.90,
    category: "Conjunto",
    slug: "conjuntos",
    images: ["/imagens/produtos/conjunto-2p.jpeg",
      "/imagens/produtos/conjunto-2pa.jpeg"
    ],
    
    sizes: ["M","G","GG"],
    colors: [
      { name: "Azul ciano", hex: "#4dd6ff" },
    ],
  },


];

// 👉 COLEÇÕES/CATEGORIAS
export const CATEGORIES = [
  // { 
  //   id: "combos",
  //   slug: "combos",
  //   title: "Combos",
  //   subtitle: "Monte seu kit e economize mais",
  //   imgColor: "bg-gradient-to-br from-red-700 to-red-900",
  // },
  {
    id: "camisas-time",
    slug: "camisas-de-time",
    title: "Camisas de Time",
    subtitle: "Represente seu clube com orgulho",
    imgColor: "bg-gradient-to-br from-yellow-500 to-yellow-800",
  },
  // {
  //   id: "peruana",
  //   slug: "camisa-peruana-40-1",
  //   title: "Camisa Peruana 40.1",
  //   subtitle: "Premium, macia e com caimento impecável",
  //   imgColor: "bg-gradient-to-br from-slate-600 to-slate-900",
  // },
  {
    id: "texturizada",
    slug: "camisa-texturizada",
    title: "Camisa Texturizada",
    subtitle: "Acabamento sofisticado em cada detalhe",
    imgColor: "bg-gradient-to-br from-stone-500 to-stone-800",
  },
  // {
  //   id: "30-1",
  //   slug: "camisa-30-1",
  //   title: "Camisa 30.1",
  //   subtitle: "Conforto e durabilidade para o cotidiano",
  //   imgColor: "bg-gradient-to-br from-neutral-500 to-neutral-800",
  // },
  {
    id: "dryfit",
    slug: "camisa-dry-fit",
    title: "Camisa Dry Fit",
    subtitle: "Tecnologia que mantém você seco no treino",
    imgColor: "bg-gradient-to-br from-sky-500 to-blue-800",
  },
   {
     id: "tenis",
     slug: "tenis-esportivo",
     title: "Tênis Esportivo",
     subtitle: "Velocidade, conforto e estilo a cada passo",
     imgColor: "bg-gradient-to-br from-orange-500 to-orange-900",
   },
  // {
  //   id: "oculos",
  //   slug: "oculos",
  //   title: "Óculos",
  //   subtitle: "Proteção UV com visual moderno e arrojado",
  //   imgColor: "bg-gradient-to-br from-violet-500 to-purple-900",
  // },
  {
    id: "tactel",
    slug: "short-tactel",
    title: "Short Tactel",
    subtitle: "Leve, fresco e perfeito para o verão",
    imgColor: "bg-gradient-to-br from-emerald-500 to-green-800",
  },
  {
    id: "dryfit-short",
    slug: "short-dry-fit",
    title: "Short Dry Fit",
    subtitle: "Alta performance para seus melhores treinos",
    imgColor: "bg-gradient-to-br from-blue-500 to-indigo-800",
  },
  {
    id: "short-duplo",
    slug: "short-duplo-fem",
    title: "Short Duplo Feminino",
    subtitle: "Segurança e conforto na medida certa",
    imgColor: "bg-gradient-to-br from-pink-400 to-pink-800",
  },
  {
    id: "short-sarja",
    slug: "short-sarja",
    title: "Short Sarja importado",
    subtitle: "Estilo e conforto na medida certa",
    imgColor: "bg-gradient-to-br from-blue-500 to-indigo-300",
  },
  {
    id: "blusa-fem",
    slug: "blusa-feminina",
    title: "Blusas Poliamida",
    subtitle: "Feminilidade e leveza para qualquer ocasião",
    imgColor: "bg-gradient-to-br from-rose-400 to-rose-700",
  },
  // {
  //   id: "conjunto-fem",
  //   slug: "conjunto-feminino-poliamida",
  //   title: "Conjunto Feminino Poliamida",
  //   subtitle: "Modelagem perfeita com toque de elegância",
  //   imgColor: "bg-gradient-to-br from-fuchsia-500 to-indigo-800",
  // },
  {
    id: "bone",
    slug: "bone",
    title: "Bonés",
    subtitle: "Complete seu look com atitude e estilo",
    imgColor: "bg-gradient-to-br from-teal-500 to-teal-900",
  },
  {
    id: "regata-machao-over-suedine",
    slug: "regata-machao-over-suedine",
    title: "Regata Machão Over Suedine",
    subtitle: "Oversized, confortável e cheio de personalidade",
    imgColor: "bg-gradient-to-br from-amber-300 to-orange-800",
  },
  {
    id: "camisa-plus",
    slug: "camisa-plus",
    title: "Camisa Plus Size",
    subtitle: "Moda inclusiva com estilo para todos os corpos",
    imgColor: "bg-gradient-to-br from-cyan-500 to-cyan-900",
  },
  {
    id: "casaquinho",
    slug: "casaquinho",
    title: "Casaquinhos Femininos",
    subtitle: "O toque quentinho que o seu look precisava",
    imgColor: "bg-gradient-to-br from-cyan-900 to-black-900",
  },
  {
    id: "camisa-retro",
    slug: "camisa-retro",
    title: "Camisas Retrô",
    subtitle: "Moda que fica pra sempre",
    imgColor: "bg-gradient-to-br from-orange-900 to-black-900",
  },
  {
    id: "conjuntos",
    slug: "conjuntos",
    title: "Conjuntos",
    subtitle: "Complete seu look com atitude e estilo",
    imgColor: "bg-gradient-to-br from-teal-500 to-teal-900",
  },
 // {
//id: "blusa-frases",
//slug: "blusa-frases",
//title: "Blusas com Frases",
//subtitle: "inspiração e elegância",
//imgColor: "bg-gradient-to-br from-white-900 to-yellow-900",
 // },
];