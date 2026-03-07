"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '@/data/config';

// 👉 Aqui fica toda a parte de "cérebro" do meu carrinho de compras.
// Geralmente eu não preciso editar nada neste arquivo.

type BaseProduct = typeof PRODUCTS[0];

export type CartItem = BaseProduct & { 
  cartItemId: string; 
  quantity: number;
  selectedColor: string;
  selectedSize: string;
};

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  quickAddProduct: BaseProduct | null;
  setQuickAddProduct: (product: BaseProduct | null) => void;
  addToCart: (product: BaseProduct, color: string, size: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickAddProduct, setQuickAddProduct] = useState<BaseProduct | null>(null);

  const trackProductClick = (productId: number) => {
    try {
      const twentyFourHours = 24 * 60 * 60 * 1000;
      const now = new Date().getTime();
      let stats = JSON.parse(localStorage.getItem('fl_sports_clicks') || '{"clicks":{},"lastReset":0}');
      if (!stats.lastReset || now - stats.lastReset > twentyFourHours) {
        stats = { clicks: {}, lastReset: now };
      }
      stats.clicks[productId] = (stats.clicks[productId] || 0) + 1;
      localStorage.setItem('fl_sports_clicks', JSON.stringify(stats));
      window.dispatchEvent(new Event('product_clicked')); 
    } catch (e) {}
  };

  const addToCart = (product: BaseProduct, color: string, size: string) => {
    trackProductClick(product.id);
    const cartItemId = `${product.id}-${color}-${size}`;

    setCartItems(prev => {
      const existing = prev.find(item => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map(item => item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, cartItemId, selectedColor: color, selectedSize: size, quantity: 1 }];
    });
    
    setQuickAddProduct(null);
    setIsCartOpen(true);     
  };

  const removeFromCart = (cartItemId: string) => setCartItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
  
  const updateQuantity = (cartItemId: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        const newQ = item.quantity + delta;
        return newQ > 0 ? { ...item, quantity: newQ } : item;
      }
      return item;
    }));
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cartItems, isCartOpen, setIsCartOpen, quickAddProduct, setQuickAddProduct, addToCart, removeFromCart, updateQuantity, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};
