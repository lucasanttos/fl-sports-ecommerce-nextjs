"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, MessageCircle, ChevronDown, MapPin, Store, CheckCircle2, Lock } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { CLIENT_INFO, formatPrice, CARD_FEE_PERCENTAGE } from '@/data/config';

const STORE_ADDRESS = {
  street: 'Rua Potengi',
  number: '82',
  neighborhood: 'Centro',
  full: 'Rua Potengi, N° 82 - Centro',
  mapsUrl: 'https://www.google.com/maps/dir//R.+Potengi,+82+-+Sao+Paulo+Do+Potengi,+S%C3%A3o+Paulo+do+Potengi+-+RN,+59460-000/@-5.8938063,-35.7642432,19z/data=!4m18!1m8!3m7!1s0x7b22f934124a7a7:0xce33357bfa835ed8!2sR.+Potengi,+82+-+Sao+Paulo+Do+Potengi,+S%C3%A3o+Paulo+do+Potengi+-+RN,+59460-000!3b1!8m2!3d-5.8938076!4d-35.7635995!16s%2Fg%2F11hbgkgm94!4m8!1m0!1m5!1m1!1s0x7b22f934124a7a7:0xce33357bfa835ed8!2m2!1d-35.7635995!2d-5.8938076!3e9?entry=ttu&g_ep=EgoyMDI2MDUwMi4wIKXMDSoASAFQAw%3D%3D'
};

export default function CartDrawer() {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [isCheckout, setIsCheckout] = useState(false);
  const [orderSent, setOrderSent] = useState(false);
  
  const [buyerName, setBuyerName] = useState('');
  const [deliveryMode, setDeliveryMode] = useState(''); 
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [reference, setReference] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  useEffect(() => {
    if (!isCartOpen) {
      setIsCheckout(false);
      setDeliveryMode('');
      setOrderSent(false);
    }
  }, [isCartOpen]);

  const isCardPayment = paymentMethod.includes('Cartão');
  const cardFeeAmount = isCardPayment ? cartTotal * (CARD_FEE_PERCENTAGE / 100) : 0;
  const finalTotal = cartTotal + cardFeeAmount;

  const handleFinishOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    let text = `*NOVO PEDIDO - ${CLIENT_INFO.name}* 🚀\n\n`;
    text += `*👤 Cliente:* ${buyerName}\n`;
    text += `*💳 Pagamento:* ${paymentMethod}\n`;
    text += `*📦 Modalidade:* ${deliveryMode === 'delivery' ? '🛵 ENTREGA' : '🏪 RETIRADA NA LOJA'}\n\n`;
    
    text += `*Resumo do Pedido:*\n`;
    cartItems.forEach(item => { 
      text += `${item.quantity}x ${item.name} (${item.selectedColor}, Tam: ${item.selectedSize}) - ${formatPrice(item.price * item.quantity)}\n`; 
    });
    
    text += `\n*Subtotal:* ${formatPrice(cartTotal)}\n`;
    
    if (isCardPayment) {
      text += `*Acréscimo Cartão (${CARD_FEE_PERCENTAGE}%):* ${formatPrice(cardFeeAmount)}\n`;
    }
    
    text += `*Total a pagar:* *${formatPrice(finalTotal)}*\n\n`;
    
    if (deliveryMode === 'delivery') {
      text += `*📍 Dados de Entrega:*\n`;
      text += `Rua: ${street}, Nº ${number}\n`;
      text += `Bairro: ${neighborhood}\n`;
      if (reference) text += `Referência: ${reference}\n`;
    } else {
      text += `*📍 Retirada na Loja:*\n`;
      text += `${STORE_ADDRESS.full}\n`;
    }
    
    text += `\nAguardando confirmação de pagamento e ${deliveryMode === 'delivery' ? 'envio' : 'retirada'}!`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${CLIENT_INFO.whatsapp}?text=${encoded}`, '_blank');
    
    setOrderSent(true);
  };

  const handleCloseAndReset = () => {
    setIsCartOpen(false);
    setOrderSent(false);
    setIsCheckout(false);
    setDeliveryMode('');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={handleCloseAndReset} 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]" 
          />
          
          <motion.div 
            initial={{ x: '100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '100%' }} 
            transition={{ type: 'tween', duration: 0.5 }} 
            className="fixed top-0 right-0 h-full w-full max-w-lg bg-white shadow-2xl z-[70] flex flex-col"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-200 bg-gradient-to-r from-zinc-60 to-white">
              <h2 className="text-xl font-black uppercase tracking-tighter text-zinc-500">
                {orderSent ? 'Pedido Enviado!' : isCheckout ? 'Finalizar Pedido' : 'Seu Carrinho'}
              </h2>
              <button 
                onClick={handleCloseAndReset} 
                className="p-2 hover:bg-zinc-200 rounded-full transition-colors"
              >
                <X size={24} className="text-zinc-900" />
              </button>
            </div>
            
            {/* CONTEÚDO PRINCIPAL */}
            <div className="flex-1 overflow-y-auto p-6 text-black">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-zinc-500">
                  <ShoppingBag size={64} className="mb-4 opacity-50 mx-auto" />
                  <p className="font-medium tracking-wide">Seu carrinho está vazio.</p>
                </div>
              ) : orderSent ? (
                // ========== TELA DE SUCESSO ==========
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full text-center px-4"
                >
                  <div className="bg-green-100 rounded-full p-6 mb-6">
                    <CheckCircle2 size={64} className="text-green-600" />
                  </div>
                  
                  <h3 className="text-2xl font-black text-black mb-3">
                    Pedido Enviado com Sucesso!
                  </h3>
                  
                  <p className="text-zinc-600 mb-8 max-w-sm">
                    Seu pedido foi enviado para nosso WhatsApp. 
                    Em breve entraremos em contato para confirmar!
                  </p>

                  {/* SÓ MOSTRA O ENDEREÇO + MAPS SE FOR RETIRADA E DEPOIS DE ENVIAR */}
                  {deliveryMode === 'pickup' && (
                    <div className="w-full max-w-sm space-y-4">
                      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                        <div className="flex items-start gap-3 mb-3">
                          <Store className="text-blue-600 mt-1" size={24} />
                          <div className="flex-1 text-left">
                            <p className="font-bold text-black text-sm mb-2"> Endereço para Retirada:</p>
                            <div className="bg-white border border-blue-300 rounded p-3">
                              <p className="text-sm font-bold text-blue-900">{CLIENT_INFO.name}</p>
                              <p className="text-sm text-zinc-700 mt-1">{STORE_ADDRESS.full}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <a
                        href={STORE_ADDRESS.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-blue-600 text-white py-4 px-4 font-bold uppercase tracking-widest text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 rounded-lg shadow-lg"
                      >
                        <MapPin size={20} />
                        Ver Rota no Google Maps
                      </a>

                      <p className="text-xs text-zinc-500 mt-4">
                        ⚠️ Aguarde a confirmação da loja antes de ir retirar seu pedido!
                      </p>
                    </div>
                  )}

                  {deliveryMode === 'delivery' && (
                    <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 max-w-sm">
                      <p className="text-sm text-green-800 font-medium">
                        🛵 Seu pedido será entregue no endereço informado após a confirmação!
                      </p>
                    </div>
                  )}

                  <button
                    onClick={handleCloseAndReset}
                    className="mt-8 bg-black text-white py-3 px-8 font-bold uppercase tracking-widest text-sm hover:bg-zinc-800 transition-colors rounded-lg"
                  >
                    Fechar
                  </button>
                </motion.div>
              ) : (
                <>
                  {!isCheckout ? (
                    // ========== TELA DO CARRINHO ==========
                    <div className="space-y-6">
                      <AnimatePresence>
                        {cartItems.map((item) => (
                          <motion.div 
                            layout 
                            initial={{ opacity: 0, y: 20 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            exit={{ opacity: 0, scale: 0.9 }} 
                            key={item.cartItemId} 
                            className="flex gap-4 border-b border-zinc-100 pb-6"
                          >
                            <div className="w-20 h-24 bg-zinc-100 flex items-center justify-center shrink-0 rounded-sm">
                              {item.images && item.images.length > 0 ? (
                                <img 
                                  src={item.images[0]} 
                                  alt={item.name} 
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <ShoppingBag className="text-zinc-300 w-8 h-8" />
                              )}
                            </div>
                            
                            <div className="flex-1 flex flex-col justify-between">
                              <div>
                                <h4 className="font-bold leading-tight">{item.name}</h4>
                                <p className="text-xs text-zinc-500 mt-1">
                                  {item.selectedColor} • Tam: {item.selectedSize}
                                </p>
                                <p className="text-sm font-medium mt-1">{formatPrice(item.price)}</p>
                              </div>
                              
                              <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center border border-zinc-200 rounded-sm">
                                  <button 
                                    onClick={() => updateQuantity(item.cartItemId, -1)} 
                                    className="p-2 hover:bg-zinc-100"
                                  >
                                    <Minus size={14} />
                                  </button>
                                  <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                                  <button 
                                    onClick={() => updateQuantity(item.cartItemId, 1)} 
                                    className="p-2 hover:bg-zinc-100"
                                  >
                                    <Plus size={14} />
                                  </button>
                                </div>
                                <button 
                                  onClick={() => removeFromCart(item.cartItemId)} 
                                  className="text-zinc-400 hover:text-red-500 transition-colors p-2"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  ) : (
                    // ========== TELA DE CHECKOUT ==========
                    <form id="checkout-form" onSubmit={handleFinishOrder} className="space-y-6 pb-12">
                      <div className="border-b border-zinc-200 pb-6">
                        <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-4">Resumo</p>
                        <div className="bg-zinc-50 p-4 rounded-sm border border-zinc-200">
                          {cartItems.map(item => (
                            <div key={item.cartItemId} className="flex justify-between text-sm mb-2">
                              <span className="text-zinc-600">
                                {item.quantity}x {item.name} ({item.selectedSize})
                              </span>
                              <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <p className="text-sm font-bold text-black uppercase tracking-widest">Identificação</p>
                        <input 
                          required 
                          type="text" 
                          value={buyerName} 
                          onChange={(e) => setBuyerName(e.target.value)} 
                          placeholder="Nome Completo" 
                          className="w-full border border-zinc-300 p-3 text-sm focus:border-black outline-none rounded-sm transition-all" 
                        />
                      </div>

                      {/* MODALIDADE DE RECEBIMENTO */}
                      <div className="space-y-4 border-t border-zinc-200 pt-6">
                        <p className="text-sm font-bold text-black uppercase tracking-widest">Modalidade de Recebimento</p>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setDeliveryMode('delivery')}
                            className={`p-4 border-2 rounded-sm transition-all flex flex-col items-center justify-center gap-2 ${
                              deliveryMode === 'delivery' 
                                ? 'border-black bg-black text-white' 
                                : 'border-zinc-300 hover:border-zinc-400'
                            }`}
                          >
                            <MapPin size={24} />
                            <span className="text-xs font-bold uppercase tracking-wide">Entrega</span>
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => setDeliveryMode('pickup')}
                            className={`p-4 border-2 rounded-sm transition-all flex flex-col items-center justify-center gap-2 ${
                              deliveryMode === 'pickup' 
                                ? 'border-black bg-black text-white' 
                                : 'border-zinc-300 hover:border-zinc-400'
                            }`}
                          >
                            <Store size={24} />
                            <span className="text-xs font-bold uppercase tracking-wide">Retirar</span>
                          </button>
                        </div>
                      </div>

                      {/* ENDEREÇO DE ENTREGA - Só aparece se escolher delivery */}
                      {deliveryMode === 'delivery' && (
                        <div className="space-y-4 border-t border-zinc-200 pt-6">
                          <p className="text-sm font-bold text-black uppercase tracking-widest">Endereço de Entrega</p>
                          <div className="flex gap-4">
                            <input 
                              required 
                              type="text" 
                              value={street} 
                              onChange={(e) => setStreet(e.target.value)} 
                              placeholder="Rua" 
                              className="w-2/3 border border-zinc-300 p-3 text-sm focus:border-black outline-none rounded-sm transition-all" 
                            />
                            <input 
                              required 
                              type="text" 
                              value={number} 
                              onChange={(e) => setNumber(e.target.value)} 
                              placeholder="Número" 
                              className="w-1/3 border border-zinc-300 p-3 text-sm focus:border-black outline-none rounded-sm transition-all" 
                            />
                          </div>
                          <input 
                            required 
                            type="text" 
                            value={neighborhood} 
                            onChange={(e) => setNeighborhood(e.target.value)} 
                            placeholder="Bairro" 
                            className="w-full border border-zinc-300 p-3 text-sm focus:border-black outline-none rounded-sm transition-all" 
                          />
                          <input 
                            type="text" 
                            value={reference} 
                            onChange={(e) => setReference(e.target.value)} 
                            placeholder="Ponto de Referência (Opcional)" 
                            className="w-full border border-zinc-300 p-3 text-sm focus:border-black outline-none rounded-sm transition-all" 
                          />
                        </div>
                      )}

                      {/* ENDEREÇO CENSURADO - Só aparece se escolher pickup ANTES de enviar */}
                      {deliveryMode === 'pickup' && (
                        <div className="space-y-4 border-t border-zinc-200 pt-6">
                          <p className="text-sm font-bold text-black uppercase tracking-widest">Retirada na Loja</p>
                          <div className="bg-zinc-100 border-2 border-zinc-300 p-5 rounded-sm relative overflow-hidden">
                            {/* Efeito de blur/bloqueio */}
                            <div className="absolute inset-0 bg-gradient-to-br from-zinc-200/90 to-zinc-300/90 backdrop-blur-sm flex items-center justify-center">
                              <div className="text-center">
                                <Lock className="mx-auto mb-3 text-zinc-600" size={32} />
                                <p className="font-bold text-zinc-700 text-sm">Endereço Bloqueado</p>
                                <p className="text-xs text-zinc-600 mt-1">Será revelado após confirmar o pedido</p>
                              </div>
                            </div>
                            
                            {/* Conteúdo censurado (blur de fundo) */}
                            <div className="flex items-start gap-3 blur-sm">
                              <Store className="text-zinc-400 mt-1" size={20} />
                              <div className="flex-1">
                                <p className="font-bold text-zinc-400 text-sm">███████████</p>
                                <p className="text-sm text-zinc-400 mt-1">Rua ████████, N° ██ - ██████</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-amber-50 border border-amber-200 p-3 rounded-sm">
                            <p className="text-xs text-amber-800 font-medium flex items-start gap-2">
                              <span className="text-base">🔒</span>
                              <span>
                                O endereço completo e a rota no mapa serão disponibilizados 
                                após você finalizar o pedido no WhatsApp.
                              </span>
                            </p>
                          </div>
                        </div>
                      )}

                      {/* MÉTODO DE PAGAMENTO */}
                      <div className="space-y-4 border-t border-zinc-200 pt-6">
                        <p className="text-sm font-bold text-black uppercase tracking-widest">Método de Pagamento</p>
                        <div className="relative">
                          <select 
                            required 
                            value={paymentMethod} 
                            onChange={(e) => setPaymentMethod(e.target.value)} 
                            className="w-full border border-zinc-300 p-3 pr-10 text-sm focus:border-black outline-none rounded-sm transition-all bg-white appearance-none cursor-pointer"
                          >
                            <option value="" disabled>Selecione uma opção</option>
                            <option value="PIX">PIX</option>
                            <option value="Cartão de Crédito">Cartão de Crédito</option>
                            <option value="Cartão de Débito">Cartão de Débito</option>
                            <option value="Dinheiro">Dinheiro (Espécie)</option>
                          </select>
                          <ChevronDown 
                            size={18} 
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 pointer-events-none" 
                          />
                        </div>
                        
                        {isCardPayment && (
                          <p className="text-xs text-red-500 font-bold mt-1 animate-pulse">
                            ⚠️ Acréscimo de {CARD_FEE_PERCENTAGE}% da maquininha aplicado.
                          </p>
                        )}
                      </div>
                    </form>
                  )}
                </>
              )}
            </div>

            {/* FOOTER - BOTÕES */}
            {cartItems.length > 0 && !orderSent && (
              <div className="border-t border-zinc-200 p-6 bg-zinc-50">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Subtotal</span>
                  <span className="text-sm font-bold text-black">{formatPrice(cartTotal)}</span>
                </div>
                
                {isCardPayment && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-red-500">
                      Taxa Cartão ({CARD_FEE_PERCENTAGE}%)
                    </span>
                    <span className="text-sm font-bold text-red-500">+{formatPrice(cardFeeAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between items-center mb-6 mt-4 pt-4 border-t border-zinc-200">
                  <span className="text-sm font-bold uppercase tracking-widest text-black">Total a pagar</span>
                  <span className="text-2xl font-black tracking-tight text-black">{formatPrice(finalTotal)}</span>
                </div>

                {!isCheckout ? (
                  <button 
                    onClick={() => setIsCheckout(true)} 
                    className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest text-sm hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 rounded-sm"
                  >
                    Avançar para Entrega <ArrowRight size={18} />
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setIsCheckout(false)} 
                      className="w-1/3 border border-black text-black py-4 font-bold uppercase tracking-widest text-sm hover:bg-zinc-100 transition-colors rounded-sm"
                    >
                      Voltar
                    </button>
                    <button 
                      type="submit" 
                      form="checkout-form" 
                      disabled={!deliveryMode}
                      className={`w-2/3 bg-[#25D366] text-white py-4 font-bold uppercase tracking-widest text-sm transition-colors flex items-center justify-center gap-2 rounded-sm shadow-lg shadow-green-600/20 ${
                        !deliveryMode ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
                      }`}
                    >
                      Concluir no WhatsApp <MessageCircle size={18} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}