"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-6">
          <h1 className="text-3xl font-bold tracking-wider">PAINEL ADMIN</h1>
          <button 
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition font-medium"
          >
            Sair
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:border-zinc-600 transition">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              📦 Produtos
            </h2>
            <p className="text-zinc-400 mb-6">Adicione, edite ou remova roupas do catálogo da loja.</p>
            <Link href="/admin/produtos" className="inline-block bg-white text-black px-4 py-2 rounded font-medium hover:bg-gray-200 transition">
              Gerenciar Produtos →
            </Link>
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:border-zinc-600 transition">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              📁 Categorias
            </h2>
            <p className="text-zinc-400 mb-6">Crie novas categorias como "Retro", "Corta Vento", etc.</p>
            <Link href="/admin/categorias" className="inline-block bg-white text-black px-4 py-2 rounded font-medium hover:bg-gray-200 transition">
              Gerenciar Categorias →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}