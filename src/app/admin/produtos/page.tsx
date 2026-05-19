"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";

const OPCOES_ROUPAS = ["P", "M", "G", "GG", "XG", "G1", "G2", "G3"];
const OPCOES_CALCADOS = ["38", "39", "40", "41", "42"];

type ProductColor = {
  name: string;
  hex: string;
};

type Product = {
  id: string;
  name: string;
  price: number;
  category_slug: string;
  slug: string;
  sizes: string[];
  colors: ProductColor[];
  images: string[];
};

export default function ProdutosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  // CREATE
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categorySlug, setCategorySlug] = useState("");

  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const [colorName, setColorName] = useState("");
  const [colorHex, setColorHex] = useState("#000000");
  const [colorsList, setColorsList] = useState<ProductColor[]>([]);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // EDIT
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    const { data } = await supabase.from("categories").select("*");

    if (data) {
      setCategories(data);

      if (data.length > 0) {
        setCategorySlug(data[0].slug);
      }
    }
  };

  const fetchProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) {
      setProducts(data);
    }
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setSelectedSizes([]);
    setColorsList([]);
    setSelectedFiles([]);
    setImagePreviews([]);
  };

  const toggleSize = (
    size: string,
    currentSizes?: string[],
    setter?: (sizes: string[]) => void
  ) => {
    const list = currentSizes || selectedSizes;
    const setList = setter || setSelectedSizes;

    if (list.includes(size)) {
      setList(list.filter((s) => s !== size));
    } else {
      setList([...list, size]);
    }
  };

  const addColor = (
    currentColors?: ProductColor[],
    setter?: (colors: ProductColor[]) => void
  ) => {
    if (!colorName) return;

    const list = currentColors || colorsList;
    const setList = setter || setColorsList;

    setList([...list, { name: colorName, hex: colorHex }]);

    setColorName("");
    setColorHex("#000000");
  };

  const removeColor = (
    index: number,
    currentColors?: ProductColor[],
    setter?: (colors: ProductColor[]) => void
  ) => {
    const list = currentColors || colorsList;
    const setList = setter || setColorsList;

    setList(list.filter((_, i) => i !== index));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isEdit = false
  ) => {
    if (!e.target.files) return;

    const filesArray = Array.from(e.target.files);

    const previews = filesArray.map((file) => URL.createObjectURL(file));

    if (isEdit && editingProduct) {
      setEditingProduct({
        ...editingProduct,
        newFiles: filesArray,
        newPreviews: previews,
      } as any);
    } else {
      setSelectedFiles(filesArray);
      setImagePreviews(previews);
    }
  };

  const uploadImages = async (files: File[]) => {
    const uploadedUrls: string[] = [];

    for (const file of files) {
      const ext = file.name.split(".").pop();

      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}.${ext}`;

      const { error } = await supabase.storage
        .from("produtos")
        .upload(fileName, file);

      if (error) {
        throw error;
      }

      const { data } = supabase.storage
        .from("produtos")
        .getPublicUrl(fileName);

      uploadedUrls.push(data.publicUrl);
    }

    return uploadedUrls;
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const uploadedImages = await uploadImages(selectedFiles);

      const slug =
        name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "") +
        "-" +
        Date.now();

      const { error } = await supabase.from("products").insert([
        {
          name,
          price: parseFloat(price),
          category_slug: categorySlug,
          slug,
          sizes: selectedSizes,
          colors: colorsList,
          images: uploadedImages,
        },
      ]);

      if (error) throw error;

      alert("Produto criado com sucesso.");

      resetForm();

      fetchProducts();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!editingProduct) return;

    try {
      setLoading(true);

      let images = editingProduct.images || [];

      const newFiles = (editingProduct as any).newFiles || [];

      if (newFiles.length > 0) {
        const uploaded = await uploadImages(newFiles);
        images = [...images, ...uploaded];
      }

      const { error } = await supabase
        .from("products")
        .update({
          name: editingProduct.name,
          price: editingProduct.price,
          sizes: editingProduct.sizes,
          colors: editingProduct.colors,
          images,
        })
        .eq("id", editingProduct.id);

      if (error) throw error;

      alert("Produto atualizado.");

      setEditingProduct(null);

      fetchProducts();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    const confirmDelete = confirm(
      "Deseja remover esse produto definitivamente?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
    } else {
      fetchProducts();
    }
  };

  const removeImageFromEdit = (url: string) => {
    if (!editingProduct) return;

    setEditingProduct({
      ...editingProduct,
      images: editingProduct.images.filter((img) => img !== url),
    });
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-4 border-b border-zinc-800 pb-4">
          <Link
            href="/admin"
            className="bg-zinc-900 px-4 py-2 rounded text-sm font-bold"
          >
            ← Voltar
          </Link>

          <h1 className="text-2xl font-black uppercase">
            Gerenciar Produtos
          </h1>
        </div>

        {/* CREATE */}
        <form
          onSubmit={handleCreate}
          className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-5"
        >
          <h2 className="text-lg font-bold">Novo Produto</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nome do produto"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-zinc-800 p-3 rounded"
              required
            />

            <input
              type="number"
              step="0.01"
              placeholder="Preço"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="bg-zinc-800 p-3 rounded"
              required
            />
          </div>

          <select
            value={categorySlug}
            onChange={(e) => setCategorySlug(e.target.value)}
            className="w-full bg-zinc-800 p-3 rounded"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.title}
              </option>
            ))}
          </select>

          {/* SIZES */}
          <div className="space-y-3">
            <p className="font-bold text-sm text-zinc-400">Tamanhos</p>

            <div className="flex flex-wrap gap-2">
              {[...OPCOES_ROUPAS, ...OPCOES_CALCADOS, "Único"].map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`px-4 h-11 rounded font-bold ${
                    selectedSizes.includes(size)
                      ? "bg-white text-black"
                      : "bg-zinc-800"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* COLORS */}
          <div className="space-y-3">
            <p className="font-bold text-sm text-zinc-400">Cores</p>

            <div className="flex gap-2">
              <input
                type="color"
                value={colorHex}
                onChange={(e) => setColorHex(e.target.value)}
              />

              <input
                type="text"
                placeholder="Nome da cor"
                value={colorName}
                onChange={(e) => setColorName(e.target.value)}
                className="flex-1 bg-zinc-800 p-3 rounded"
              />

              <button
                type="button"
                onClick={() => addColor()}
                className="bg-white text-black px-4 rounded font-bold"
              >
                Adicionar
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {colorsList.map((color, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-zinc-800 px-3 py-2 rounded-full"
                >
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ background: color.hex }}
                  />

                  <span className="text-sm">{color.name}</span>

                  <button
                    type="button"
                    onClick={() => removeColor(index)}
                    className="text-red-500 font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* IMAGES */}
          <div className="space-y-3">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
            />

            <div className="flex flex-wrap gap-2">
              {imagePreviews.map((img, index) => (
                <div
                  key={index}
                  className="relative w-20 h-20 overflow-hidden rounded border border-zinc-700"
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full bg-white text-black h-12 rounded font-black uppercase"
          >
            {loading ? "Salvando..." : "Cadastrar Produto"}
          </button>
        </form>

        {/* PRODUCTS */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="border border-zinc-800 rounded-xl p-4"
              >
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 relative rounded overflow-hidden border border-zinc-700">
                      <Image
                        src={product.images?.[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    <div>
                      <h3 className="font-bold">{product.name}</h3>

                      <p className="text-emerald-500 font-bold">
                        R$ {product.price.toFixed(2)}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-2">
                        {product.sizes?.map((size) => (
                          <span
                            key={size}
                            className="bg-zinc-800 px-2 py-1 rounded text-xs"
                          >
                            {size}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="bg-white text-black px-4 h-10 rounded font-bold"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => handleDeleteProduct(product.id)}
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

        {/* EDIT MODAL */}
        {editingProduct && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 space-y-5">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-black">Editar Produto</h2>

                <button
                  onClick={() => setEditingProduct(null)}
                  className="text-zinc-400 text-2xl"
                >
                  ×
                </button>
              </div>

              <input
                type="text"
                value={editingProduct.name}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    name: e.target.value,
                  })
                }
                className="w-full bg-zinc-800 p-3 rounded"
              />

              <input
                type="number"
                step="0.01"
                value={editingProduct.price}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    price: Number(e.target.value),
                  })
                }
                className="w-full bg-zinc-800 p-3 rounded"
              />

              {/* EDIT SIZES */}
              <div className="flex flex-wrap gap-2">
                {[...OPCOES_ROUPAS, ...OPCOES_CALCADOS, "Único"].map(
                  (size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() =>
                        toggleSize(
                          size,
                          editingProduct.sizes,
                          (sizes) =>
                            setEditingProduct({
                              ...editingProduct,
                              sizes,
                            })
                        )
                      }
                      className={`px-4 h-11 rounded font-bold ${
                        editingProduct.sizes.includes(size)
                          ? "bg-white text-black"
                          : "bg-zinc-800"
                      }`}
                    >
                      {size}
                    </button>
                  )
                )}
              </div>

              {/* EDIT COLORS */}
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {editingProduct.colors?.map((color, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-zinc-800 px-3 py-2 rounded-full"
                    >
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ background: color.hex }}
                      />

                      {color.name}

                      <button
                        onClick={() =>
                          setEditingProduct({
                            ...editingProduct,
                            colors: editingProduct.colors.filter(
                              (_, i) => i !== index
                            ),
                          })
                        }
                        className="text-red-500"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="color"
                    value={colorHex}
                    onChange={(e) => setColorHex(e.target.value)}
                  />

                  <input
                    type="text"
                    value={colorName}
                    onChange={(e) => setColorName(e.target.value)}
                    placeholder="Nova cor"
                    className="flex-1 bg-zinc-800 p-3 rounded"
                  />

                  <button
                    onClick={() =>
                      addColor(editingProduct.colors, (colors) =>
                        setEditingProduct({
                          ...editingProduct,
                          colors,
                        })
                      )
                    }
                    className="bg-white text-black px-4 rounded font-bold"
                  >
                    Adicionar
                  </button>
                </div>
              </div>

              {/* EDIT IMAGES */}
              <div className="space-y-3">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, true)}
                />

                <div className="flex flex-wrap gap-3">
                  {editingProduct.images?.map((img, index) => (
                    <div
                      key={index}
                      className="relative w-24 h-24 rounded overflow-hidden border border-zinc-700"
                    >
                      <img
                        src={img}
                        className="w-full h-full object-cover"
                      />

                      <button
                        onClick={() => removeImageFromEdit(img)}
                        className="absolute top-1 right-1 bg-red-600 text-white w-6 h-6 rounded-full text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleSaveEdit}
                className="w-full bg-white text-black h-12 rounded font-black uppercase"
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}