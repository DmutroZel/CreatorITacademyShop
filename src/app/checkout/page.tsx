'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import { createOrder } from '@/lib/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';

const fields = [
  { key: 'customerName', label: "ПІБ", type: 'text', icon: User, placeholder: 'Іван Франко' },
  { key: 'email', label: 'Email', type: 'email', icon: Mail, placeholder: 'ivan@example.com' },
  { key: 'phone', label: 'Телефон', type: 'tel', icon: Phone, placeholder: '+380 XX XXX XX XX' },
  { key: 'address', label: 'Адреса доставки', type: 'text', icon: MapPin, placeholder: 'м. Львів, вул. ...' },
] as const;

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const router = useRouter();

  const [form, setForm] = useState({ customerName: '', email: '', phone: '', address: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items.length, router]);

  if (items.length === 0) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const orderData = {
        products: items.map((i) => ({ productId: i.product._id, quantity: i.quantity })),
        ...form,
        totalPrice: totalPrice(),
      };
      await createOrder(orderData);
      toast.success('Замовлення успішно оформлено!', {
        description: 'Дякуємо! Ми зв\'яжемося з вами найближчим часом.',
        duration: 5000,
      });
      clearCart();
      router.push('/thank-you');
    } catch (err: any) {
      toast.error('Помилка при оформленні замовлення', {
        description: err.response?.data?.error || 'Щось пішло не так. Спробуйте ще раз.',
        duration: 6000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2 text-center"
            style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif" }}>
            Оформлення
          </h1>
          <p className="text-gray-500 text-center mb-10 text-sm">Залиш свої дані та ми зв'яжемося з тобою</p>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="bg-[#0a0a0a] border border-yellow-500/10 rounded-2xl p-6 space-y-5"
              style={{ boxShadow: '0 0 20px rgba(234,179,8,0.04)' }}>
              <p className="text-xs font-bold text-yellow-500/70 uppercase tracking-widest mb-2">Контактні дані</p>
              {fields.map(({ key, label, type, icon: Icon, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                    {label}
                  </label>
                  <div className="relative">
                    <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                    <input
                      type={type}
                      value={form[key]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      required
                      placeholder={placeholder}
                      className="w-full bg-black border border-yellow-500/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-yellow-400/50 transition-colors duration-200"
                      style={{ caretColor: 'rgba(234,179,8,1)' }}
                      onFocus={(e) => e.currentTarget.style.boxShadow = '0 0 0 1px rgba(234,179,8,0.2)'}
                      onBlur={(e) => e.currentTarget.style.boxShadow = 'none'}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-[#0a0a0a] border border-yellow-500/10 rounded-2xl p-6"
              style={{ boxShadow: '0 0 20px rgba(234,179,8,0.04)' }}>
              <p className="text-xs font-bold text-yellow-500/70 uppercase tracking-widest mb-4">Ваше замовлення</p>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.product._id} className="flex justify-between text-sm">
                    <span className="text-gray-400">
                      {item.product.title} <span className="text-gray-600">×{item.quantity}</span>
                    </span>
                    <span className="font-bold text-white">
                      {(item.product.price * item.quantity).toFixed(0)} грн
                    </span>
                  </div>
                ))}
                <div className="h-px bg-yellow-500/10 mt-2 pt-2" />
                <div className="flex justify-between font-black text-base">
                  <span className="text-white">Разом:</span>
                  <span className="text-yellow-400" style={{ textShadow: '0 0 10px rgba(234,179,8,0.4)' }}>
                    {totalPrice()} грн
                  </span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-yellow-400 text-black font-black py-4 rounded-xl hover:bg-yellow-300 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 text-sm"
              style={{ boxShadow: loading ? 'none' : '0 0 24px rgba(234,179,8,0.35)' }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Обробляємо...
                </span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  Підтвердити замовлення
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}