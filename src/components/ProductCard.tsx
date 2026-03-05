'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye } from 'lucide-react';

interface Props {
  product: {
    _id: string;
    title: string;
    description: string;
    price: number;
    image: string;
    category: string;
    sizes?: string[];
    stock: number;
  };
}

export default function ProductCard({ product }: Props) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col h-full bg-[#0a0a0a] border border-yellow-500/10 rounded-2xl overflow-hidden transition-all duration-300"
      style={{ boxShadow: '0 0 0 transparent' }}
      // onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 30px rgba(234,179,8,0.12), 0 0 0 1px rgba(234,179,8,0.2)')}
      // onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 0 0 transparent')}
    >
      <span className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-yellow-500/40 rounded-tl-2xl z-10 group-hover:border-yellow-400 transition-colors duration-300" />
      <span className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-yellow-500/40 rounded-br-2xl z-10 group-hover:border-yellow-400 transition-colors duration-300" />
      <div className="relative h-64 bg-black overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-8 group-hover:scale-105 transition-transform duration-500"
        />

        <span className="absolute top-3 right-3 bg-black/80 border border-yellow-500/30 text-yellow-500 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md">
          {product.category}
        </span>

        {product.stock <= 0 && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <span className="border border-red-500/50 text-red-400 px-5 py-2 rounded-full font-semibold text-sm tracking-wide">
              Закінчився
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-5 flex flex-col grow">
        <h3 className="text-base font-bold text-white mb-3 line-clamp-2 group-hover:text-yellow-400 transition-colors duration-200 leading-snug">
          {product.title}
        </h3>

        <p className="text-2xl font-black text-yellow-400 mt-auto mb-4"
          style={{ textShadow: '0 0 12px rgba(234,179,8,0.4)' }}>
          {product.price} <span className="text-base font-semibold text-yellow-500/70">грн</span>
        </p>

        {product.stock > 0 && product.stock <= 5 && (
          <p className="text-xs text-orange-400 mb-3 font-medium">
            ⚠ Залишилось лише {product.stock} шт
          </p>
        )}

        <div className="flex gap-2 mt-2">
          <Link
            href={`/products/${product._id}`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-yellow-500/20 rounded-xl text-gray-400 hover:text-yellow-400 hover:border-yellow-400/50 transition-all duration-200 text-sm font-medium"
          >
            <Eye className="w-4 h-4" />
            Детальніше
          </Link>

          <motion.button
            onClick={() => addItem(product)}
            disabled={product.stock <= 0}
            whileTap={product.stock > 0 ? { scale: 0.94 } : {}}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
              product.stock > 0
                ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                : 'bg-gray-800 text-gray-600 cursor-not-allowed'
            }`}
            style={product.stock > 0 ? { boxShadow: '0 0 0 transparent' } : {}}
            onMouseEnter={(e) => {
              if (product.stock > 0) e.currentTarget.style.boxShadow = '0 0 16px rgba(234,179,8,0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 0 transparent';
            }}
          >
            {product.stock > 0 ? (
              <>
                <ShoppingCart className="w-4 h-4" />
                В кошик
              </>
            ) : 'Немає'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}