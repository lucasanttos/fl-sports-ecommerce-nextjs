import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google' // 👉 O jeito Sênior de usar Analytics no Next.js (rode: npm install @next/third-parties)
import './globals.css'

// 👉 Aqui eu importo todos os componentes globais que criei
import { CartProvider } from '@/context/CartContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'
import QuickAddModal from '@/components/QuickAddModal'

// 👉 AQUI EU CONFIGURO A FONTE: 
// O Next.js baixa a fonte no servidor para não travar o site do cliente nem dar aquele "pulo" na tela (Layout Shift).
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

// 👉 AQUI EU CONFIGURO A TELA (VIEWPORT): 
// Isso diz aos celulares como a tela deve se comportar (cor da barra do topo, zoom, etc).
export const viewport: Viewport = {
  themeColor: '#000000', // Deixa a aba do navegador no celular elegante (preta)
  width: 'device-width',
  initialScale: 1,
}

// 👉 MEU SEO E COMPARTILHAMENTO (META TAGS) 
// Aqui eu edito como o meu site aparece no Google, no WhatsApp e no Instagram.
export const metadata: Metadata = {
  // 👉 Troco 'sualoja.com.br' pelo domínio oficial da minha loja quando eu comprar um, para as fotos do WhatsApp funcionarem.
  metadataBase: new URL('https://sualoja.com.br'), 
  title: {
    default: 'FL Sports | Elevate Your Game',
    template: '%s | FL Sports', // Ex: Se a página for de Contato, a aba do navegador fica "Contato | FL Sports" automaticamente
  },
  description: 'A sua curadoria definitiva para equipamentos de alta performance, streetwear de vanguarda e estilo inegociável.',
  keywords: ['esportes', 'streetwear', 'camisas de time', 'performance', 'fl sports', 'loja de esportes'],
  openGraph: {
    title: 'FL Sports | Elevate Your Game',
    description: 'Equipamentos de alta performance e streetwear de vanguarda. O padrão inegociável.',
    url: 'https://sualoja.com.br', 
    siteName: 'FL Sports',
    images: [
      {
        // 👉 A foto que aparece quando eu envio o link no WhatsApp! (Eu jogo essa foto lá na pasta public/imagens/)
        url: '/imagens/sobremim.jpg', 
        width: 1200,
        height: 630,
        alt: 'Banner FL Sports',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  robots: {
    index: true, // Diz pro Google "Pode me achar nas pesquisas!"
    follow: true,
  }
}

// 👉 AQUI É O ESQUELETO (RAIZ) DE TODO O MEU SITE
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // 👉 Carrego a variável da minha fonte no HTML principal e o scroll suave
    <html lang="pt-BR" className={`scroll-smooth ${inter.variable}`}>
      
      {/* 👉 As classes 'flex', 'flex-col' e 'min-h-screen' garantem que o meu Footer fique sempre empurrado pro fundo da tela, mesmo que a página seja pequena */}
      <body className="min-h-screen flex flex-col bg-white text-black font-sans antialiased selection:bg-black selection:text-white">
        
        {/* 👉 Englobo tudo no CartProvider para o Carrinho funcionar em qualquer página */}
        <CartProvider>
          {/* Meus componentes que ficam visíveis em todas as páginas */}
          <Navbar />
          <CartDrawer />
          <QuickAddModal />
          
          {/* 👉 O "flex-grow" é o que estica o meio do site para empurrar o rodapé. 
              O "children" representa a página atual que o usuário está vendo (Home, Contato, etc) */}
          <main className="flex-grow pt-[88px] min-h-screen overflow-hidden">
            {children}
          </main>
          
          <Footer />
        </CartProvider>

        {/* 👉 MEU GOOGLE ANALYTICS */}
        {/* O script só carrega depois que o site estiver rápido e interativo (não deixa o site lento). */}
        {/* Quando eu tiver a minha conta no Google Analytics, pego o código deles e substituo o "G-SEU_CODIGO_AQUI" abaixo! */}
        <GoogleAnalytics gaId="G-SEU_CODIGO_AQUI" />
        
      </body>
    </html>
  )
}