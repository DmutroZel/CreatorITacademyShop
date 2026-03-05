'use client';

import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, ShoppingBag, ArrowRight, Plus, Minus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 bg-black">
        <div className="w-20 h-20 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center mb-6">
          <ShoppingBag className="w-9 h-9 text-yellow-400/60" />
        </div>
        <h1 className="text-3xl font-black text-white mb-3">Кошик порожній</h1>
        <p className="text-gray-500 mb-8 text-base">Додайте щось круте з нашого мерчу!</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-yellow-400 text-black font-black px-7 py-3.5 rounded-xl hover:bg-yellow-300 transition-all duration-200"
          style={{ boxShadow: '0 0 20px rgba(234,179,8,0.35)' }}
        >
          <ShoppingBag className="w-4 h-4" />
          До товарів
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-4 py-12">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-10"
          style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif" }}>
          Кошик
        </h1>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Items */}
          <div className="md:col-span-2 space-y-0">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.product._id}
                  layout
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-5 border-b border-yellow-500/10 py-6 group"
                >
                  <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-[#0a0a0a] border border-yellow-500/10 group-hover:border-yellow-500/30 transition-colors duration-200">
                    <Image src={item.product.image} alt={item.product.title} fill className="object-contain p-2" />
                  </div>

                  <div className="flex flex-1 items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-sm leading-snug mb-1 group-hover:text-yellow-400 transition-colors duration-200">
                        {item.product.title}
                      </h3>
                      <p className="text-yellow-400 font-black text-lg"
                        style={{ textShadow: '0 0 10px rgba(234,179,8,0.3)' }}>
                        {item.product.price} <span className="text-yellow-500/60 text-sm font-semibold">грн</span>
                      </p>

                      <div className="flex items-center gap-2 mt-3">
                        <button
                          onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-7 h-7 rounded-lg border border-yellow-500/20 flex items-center justify-center text-gray-400 hover:text-yellow-400 hover:border-yellow-400/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-white font-bold text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                          className="w-7 h-7 rounded-lg border border-yellow-500/20 flex items-center justify-center text-gray-400 hover:text-yellow-400 hover:border-yellow-400/50 transition-all duration-200"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between h-full gap-4">
                      <button
                        onClick={() => removeItem(item.product._id)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-600 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <p className="font-black text-white text-base">
                        {(item.product.price * item.quantity).toFixed(0)}
                        <span className="text-yellow-500/60 text-sm font-semibold ml-1">грн</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div
            className="bg-[#0a0a0a] border border-yellow-500/15 rounded-2xl p-7 h-fit sticky top-24"
            style={{ boxShadow: '0 0 30px rgba(234,179,8,0.06)' }}
          >
            <h2 className="text-xl font-black text-white mb-6 uppercase tracking-wide">Підсумок</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Товарів:</span>
                <span className="text-white font-semibold">
                  {items.reduce((sum, i) => sum + i.quantity, 0)} шт
                </span>
              </div>
              <div className="h-px bg-yellow-500/10" />
              <div className="flex justify-between text-base font-black text-white">
                <span>До сплати:</span>
                <span className="text-yellow-400" style={{ textShadow: '0 0 12px rgba(234,179,8,0.4)' }}>
                  {totalPrice()} грн
                </span>
              </div>
            </div>

            <button
              onClick={() => router.push('/checkout')}
              className="w-full flex items-center justify-center gap-2 bg-yellow-400 text-black font-black py-4 rounded-xl hover:bg-yellow-300 transition-all duration-200 text-sm"
              style={{ boxShadow: '0 0 20px rgba(234,179,8,0.3)' }}
            >
              Оформити замовлення
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}