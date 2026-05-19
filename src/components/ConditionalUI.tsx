"use client";

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import QuickAddModal from '@/components/QuickAddModal';

export default function ConditionalUI({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Verifica se a URL atual começa com "/admin"
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <>
      {/* Só renderiza os elementos da loja se NÃO estiver na rota admin */}
      {!isAdmin && <Navbar />}
      {!isAdmin && <CartDrawer />}
      {!isAdmin && <QuickAddModal />}
      
      {/* O padding-top de 88px era por causa da Navbar fixa. Tiramos ele no painel admin */}
      <main className={`flex-grow w-full overflow-hidden ${isAdmin ? '' : 'pt-[88px]'}`}>
        {children}
      </main>
      
      {!isAdmin && <Footer />}
    </>
  );
}