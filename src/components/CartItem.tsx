'use client';

import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus } from 'lucide-react';

interface Props {
  item: {
    product: {
      _id: string;
      title: string;
      price: number;
      image: string;
    };
    quantity: number;
  };
}

export default function CartItem({ item }: Props) {
  const { removeItem, updateQuantity } = useCartStore();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, height: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-5 border-b border-yellow-500/10 py-6 group"
    >
      <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-black border border-yellow-500/10 group-hover:border-yellow-500/30 transition-colors duration-200">
        <Image
          src={item.product.image}
          alt={item.product.title}
          fill
          className="object-contain p-2"
        />
      </div>

      <div className="flex flex-1 items-start justify-between gap-4">
        <div className="flex flex-col gap-1 flex-1">
          <h3 className="font-bold text-white text-sm leading-snug group-hover:text-yellow-400 transition-colors duration-200">
            {item.product.title}
          </h3>
          <p className="text-yellow-400 font-black text-lg"
            style={{ textShadow: '0 0 10px rgba(234,179,8,0.3)' }}>
            {item.product.price} <span className="text-yellow-500/60 text-sm font-semibold">грн</span>
          </p>


          <div className="flex items-center gap-2 mt-2">
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="w-7 h-7 rounded-lg border border-yellow-500/20 flex items-center justify-center text-gray-400 hover:text-yellow-400 hover:border-yellow-400/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            >
              <Minus className="w-3 h-3" />
            </motion.button>

            <span className="w-8 text-center text-white font-bold text-sm">
              {item.quantity}
            </span>

            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
              className="w-7 h-7 rounded-lg border border-yellow-500/20 flex items-center justify-center text-gray-400 hover:text-yellow-400 hover:border-yellow-400/50 transition-all duration-200"
            >
              <Plus className="w-3 h-3" />
            </motion.button>
          </div>
        </div>

        <div className="flex flex-col items-end justify-between h-full gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => removeItem(item.product._id)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-600 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200"
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>

          <p className="font-black text-white text-base">
            {(item.product.price * item.quantity).toFixed(0)}
            <span className="text-yellow-500/60 text-sm font-semibold ml-1">грн</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}