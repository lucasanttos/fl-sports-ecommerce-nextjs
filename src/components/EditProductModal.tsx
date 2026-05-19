"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { X, Trash2, Plus } from "lucide-react";

export default function EditProductModal({ product, onClose, onUpdate }: any) {
  const [formData, setFormData] = useState(product);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    const { error } = await supabase
      .from("products")
      .update({
        name: formData.name,
        price: formData.price,
        sizes: formData.sizes,
        colors: formData.colors,
        images: formData.images
      })
      .eq("id", product.id);

    if (error) alert("Erro: " + error.message);
    else {
      alert("Produto atualizado!");
      onUpdate();
      onClose();
    }
    setLoading(false);
  };

  const removeImage = (index: number) => {
    setFormData({ ...formData, images: formData.images.filter((_: any, i: number) => i !== index) });
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-900 w-full max-w-lg p-6 rounded-xl border border-zinc-800 text-white max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg">Editar Produto</h2>
          <button onClick={onClose}><X /></button>
        </div>

        <input className="w-full bg-zinc-800 p-3 mb-3 rounded" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
        <input className="w-full bg-zinc-800 p-3 mb-3 rounded" type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})} />

        <h3 className="text-xs font-bold text-zinc-400 uppercase mb-2">Fotos Atuais</h3>
        <div className="flex gap-2 mb-4">
          {formData.images.map((img: string, i: number) => (
            <div key={i} className="relative w-16 h-16 group">
              <img src={img} className="w-full h-full object-cover rounded" />
              <button onClick={() => removeImage(i)} className="absolute top-0 right-0 bg-red-500 rounded-full p-1"><Trash2 size={10} /></button>
            </div>
          ))}
        </div>

        <button onClick={handleUpdate} disabled={loading} className="w-full bg-white text-black font-bold py-3 rounded">
          {loading ? "Salvando..." : "Salvar Alterações"}
        </button>
      </div>
    </div>
  );
}