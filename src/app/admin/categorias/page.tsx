"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Category = {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  imgcolor: string;
};

const GRADIENTS = [
  {
    name: "Amarelo Ouro",
    value: "linear-gradient(135deg, #eab308, #854d0e)",
  },
  {
    name: "Azul Performance",
    value: "linear-gradient(135deg, #0ea5e9, #1e3a8a)",
  },
  {
    name: "Vermelho Intenso",
    value: "linear-gradient(135deg, #dc2626, #7f1d1d)",
  },
  {
    name: "Preto / Grafite",
    value: "linear-gradient(135deg, #475569, #0f172a)",
  },
  {
    name: "Verde Esmeralda",
    value: "linear-gradient(135deg, #10b981, #14532d)",
  },
  {
    name: "Rosa Vibrante",
    value: "linear-gradient(135deg, #ec4899, #9d174d)",
  },
  {
    name: "Ciano Neon",
    value: "linear-gradient(135deg, #06b6d4, #164e63)",
  },
  {
    name: "Laranja",
    value: "linear-gradient(135deg, #fb923c, #9a3412)",
  },
];

export default function CategoriasPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(false);

  // CREATE
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [imgColor, setImgColor] = useState(GRADIENTS[0].value);

  // CUSTOM COLORS
  const [fromColor, setFromColor] = useState("#000000");
  const [toColor, setToColor] = useState("#ffffff");

  // EDIT
  const [editingCategory, setEditingCategory] =
    useState<Category | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setCategories(data);
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  // CREATE CATEGORY
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const slug = generateSlug(title);

      const { error } = await supabase.from("categories").insert([
        {
          title,
          subtitle,
          slug,
          imgcolor: imgColor,
        },
      ]);

      if (error) throw error;

      alert("Categoria criada com sucesso.");

      setTitle("");
      setSubtitle("");
      setImgColor(GRADIENTS[0].value);

      fetchCategories();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      "Deseja excluir essa categoria?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
    } else {
      fetchCategories();
    }
  };

  // EDIT SAVE
  const handleSaveEdit = async () => {
    if (!editingCategory) return;

    try {
      setLoading(true);

      const { error } = await supabase
        .from("categories")
        .update({
          title: editingCategory.title,
          subtitle: editingCategory.subtitle,
          slug: generateSlug(editingCategory.title),
          imgcolor: editingCategory.imgcolor,
        })
        .eq("id", editingCategory.id);

      if (error) throw error;

      alert("Categoria atualizada.");

      setEditingCategory(null);

      fetchCategories();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // APPLY CUSTOM
  const applyCustomGradient = (isEdit = false) => {
    const gradient = `linear-gradient(135deg, ${fromColor}, ${toColor})`;

    if (isEdit && editingCategory) {
      setEditingCategory({
        ...editingCategory,
        imgcolor: gradient,
      });
    } else {
      setImgColor(gradient);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="flex items-center gap-4 border-b border-zinc-800 pb-4">
          <Link
            href="/admin"
            className="bg-zinc-900 px-4 py-2 rounded text-sm font-bold"
          >
            ← Voltar
          </Link>

          <h1 className="text-2xl font-black uppercase">
            Categorias
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* CREATE */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-5">
            <h2 className="text-lg font-bold">
              Nova Categoria
            </h2>

            <form
              onSubmit={handleCreate}
              className="space-y-4"
            >
              <input
                type="text"
                required
                placeholder="Nome da categoria"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                className="w-full bg-zinc-800 p-3 rounded"
              />

              <input
                type="text"
                required
                placeholder="Subtítulo"
                value={subtitle}
                onChange={(e) =>
                  setSubtitle(e.target.value)
                }
                className="w-full bg-zinc-800 p-3 rounded"
              />

              {/* PREDEFINED */}
              <div className="space-y-2">
                <p className="text-sm font-bold text-zinc-400">
                  Gradientes prontos
                </p>

                <select
                  value={imgColor}
                  onChange={(e) =>
                    setImgColor(e.target.value)
                  }
                  className="w-full bg-zinc-800 p-3 rounded"
                >
                  {GRADIENTS.map((grad) => (
                    <option
                      key={grad.value}
                      value={grad.value}
                    >
                      {grad.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* CUSTOM */}
              <div className="border border-zinc-800 rounded-xl p-4 space-y-4">
                <p className="text-sm font-bold text-zinc-400">
                  Gradiente Personalizado
                </p>

                <div className="flex gap-4">
                  <div>
                    <label className="text-xs text-zinc-500">
                      Cor Inicial
                    </label>

                    <input
                      type="color"
                      value={fromColor}
                      onChange={(e) =>
                        setFromColor(e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className="text-xs text-zinc-500">
                      Cor Final
                    </label>

                    <input
                      type="color"
                      value={toColor}
                      onChange={(e) =>
                        setToColor(e.target.value)
                      }
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    applyCustomGradient(false)
                  }
                  className="w-full bg-zinc-800 h-11 rounded font-bold"
                >
                  Aplicar Gradiente
                </button>

                <div
                  className="h-20 rounded-xl border border-zinc-700"
                  style={{
                    background: imgColor,
                  }}
                />
              </div>

              <button
                disabled={loading}
                className="w-full bg-white text-black h-12 rounded font-black uppercase"
              >
                {loading
                  ? "Salvando..."
                  : "Criar Categoria"}
              </button>
            </form>
          </div>

          {/* LIST */}
          <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="space-y-4">
              {categories.length === 0 && (
                <p className="text-zinc-500 text-center py-10">
                  Nenhuma categoria criada.
                </p>
              )}

              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="bg-zinc-800/40 border border-zinc-800 rounded-xl p-5"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      {/* PREVIEW */}
                      <div
                        className="w-20 h-20 rounded-xl border border-zinc-700 flex-shrink-0"
                        style={{
                          background: cat.imgcolor,
                        }}
                      />

                      <div className="min-w-0">
                        <h3 className="font-black text-lg truncate">
                          {cat.title}
                        </h3>

                        <p className="text-zinc-400 text-sm truncate">
                          {cat.subtitle}
                        </p>

                        <p className="text-zinc-600 text-xs mt-1">
                          /{cat.slug}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          setEditingCategory(cat)
                        }
                        className="bg-white text-black px-4 h-10 rounded font-bold"
                      >
                        Editar
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(cat.id)
                        }
                        className="bg-red-950 text-red-500 px-4 h-10 rounded font-bold"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* EDIT MODAL */}
        {editingCategory && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-2xl p-6 space-y-5">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-black">
                  Editar Categoria
                </h2>

                <button
                  onClick={() =>
                    setEditingCategory(null)
                  }
                  className="text-2xl text-zinc-400"
                >
                  ×
                </button>
              </div>

              <input
                type="text"
                value={editingCategory.title}
                onChange={(e) =>
                  setEditingCategory({
                    ...editingCategory,
                    title: e.target.value,
                  })
                }
                className="w-full bg-zinc-800 p-3 rounded"
              />

              <input
                type="text"
                value={editingCategory.subtitle}
                onChange={(e) =>
                  setEditingCategory({
                    ...editingCategory,
                    subtitle: e.target.value,
                  })
                }
                className="w-full bg-zinc-800 p-3 rounded"
              />

              {/* PREDEFINED */}
              <select
                value={editingCategory.imgcolor}
                onChange={(e) =>
                  setEditingCategory({
                    ...editingCategory,
                    imgcolor: e.target.value,
                  })
                }
                className="w-full bg-zinc-800 p-3 rounded"
              >
                {GRADIENTS.map((grad) => (
                  <option
                    key={grad.value}
                    value={grad.value}
                  >
                    {grad.name}
                  </option>
                ))}
              </select>

              {/* CUSTOM */}
              <div className="border border-zinc-800 rounded-xl p-4 space-y-4">
                <p className="text-sm font-bold text-zinc-400">
                  Gradiente Personalizado
                </p>

                <div className="flex gap-4">
                  <input
                    type="color"
                    value={fromColor}
                    onChange={(e) =>
                      setFromColor(e.target.value)
                    }
                  />

                  <input
                    type="color"
                    value={toColor}
                    onChange={(e) =>
                      setToColor(e.target.value)
                    }
                  />
                </div>

                <button
                  type="button"
                  onClick={() =>
                    applyCustomGradient(true)
                  }
                  className="w-full bg-zinc-800 h-11 rounded font-bold"
                >
                  Aplicar Gradiente
                </button>

                <div
                  className="h-24 rounded-xl border border-zinc-700"
                  style={{
                    background:
                      editingCategory.imgcolor,
                  }}
                />
              </div>

              <button
                onClick={handleSaveEdit}
                disabled={loading}
                className="w-full bg-white text-black h-12 rounded font-black uppercase"
              >
                {loading
                  ? "Salvando..."
                  : "Salvar Alterações"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}