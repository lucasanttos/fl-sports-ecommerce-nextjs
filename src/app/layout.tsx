import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'
import QuickAddModal from '@/components/QuickAddModal'

// 👉 CONFIGURAÇÃO DA FONTE: 
const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter', 
  display: 'swap' 
})

// 👉 CONFIGURAÇÃO DA TELA (VIEWPORT): 
export const viewport: Viewport = {
  themeColor: '#000000', // Deixa a aba do navegador no celular elegante (preta)
  width: 'device-width',
  initialScale: 1,
}

// 👉 SEO E COMPARTILHAMENTO (META TAGS) 
export const metadata: Metadata = {
  metadataBase: new URL('https://fl-sports.vercel.app/'), 
  title: {
    default: 'FL Sports | Elevate Your Game',
    template: '%s | FL Sports', 
  },
  description: 'A sua curadoria definitiva para equipamentos de alta performance, streetwear de vanguarda e estilo inegociável.',
  keywords: ['esportes', 'streetwear', 'camisas de time', 'performance', 'fl sports', 'loja de esportes'],
  openGraph: {
    title: 'FL Sports | Elevate Your Game',
    description: 'Equipamentos de alta performance e streetwear de vanguarda. O padrão inegociável.',
    url: 'https://fl-sports.vercel.app/', 
    siteName: 'FL Sports',
    images: [
      {
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
    index: true, 
    follow: true,
  }
}

// 👉 ESTRUTURA RAIZ DO SITE
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`scroll-smooth ${inter.variable}`}>
      
      <body className="min-h-screen flex flex-col bg-white text-black font-sans antialiased selection:bg-black selection:text-white">
        
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <QuickAddModal />
          
          <main className="flex-grow pt-[88px] w-full overflow-hidden">
            {children}
          </main>
          
          <Footer />
        </CartProvider>

        {/* 👉 GOOGLE ANALYTICS */}
        <GoogleAnalytics gaId="G-RW30GQ41P9" />
        
      </body>
    </html>
  )
}