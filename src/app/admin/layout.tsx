"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      // Pergunta pro Supabase se tem alguém logado neste navegador
      const { data: { session } } = await supabase.auth.getSession();
      
      // Se não tiver ninguém logado e a pessoa NÃO estiver na tela de login...
      if (!session && pathname !== "/admin/login") {
        router.push("/admin/login"); // Chuta o invasor de volta pro login
      } else {
        setLoading(false); // Libera o acesso
      }
    };

    checkUser();

    // Fica vigiando: se a pessoa clicar em "Sair", expulsa ela na hora
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session && pathname !== "/admin/login") {
        router.push("/admin/login");
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [pathname, router]);

  // Enquanto está verificando a identidade, mostra uma tela preta de carregamento
  if (loading && pathname !== "/admin/login") {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-zinc-500 font-bold tracking-widest">
        VERIFICANDO ACESSO...
      </div>
    );
  }

  // Se passou no teste, mostra a tela que a pessoa pediu (Dashboard, Categorias, etc)
  return <>{children}</>;
}