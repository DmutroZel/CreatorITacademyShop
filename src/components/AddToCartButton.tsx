'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { ShoppingCart, Check } from 'lucide-react';
import Link from 'next/link';
import type { Product } from '@/types';

interface Props {
  product: Product;
}

export default function AddToCartButton({ product }: Props) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-8">
      <button
        onClick={handleAdd}
        disabled={product.stock <= 0}
        className={`flex-1 flex items-center justify-center gap-2 font-black py-4 rounded-xl text-sm transition-all duration-200 ${
          product.stock > 0
            ? added
              ? 'bg-green-500 text-white'
              : 'bg-yellow-400 text-black hover:bg-yellow-300'
            : 'bg-gray-800 text-gray-600 cursor-not-allowed'
        }`}
        style={product.stock > 0 && !added ? { boxShadow: '0 0 20px rgba(234,179,8,0.35)' } : {}}
      >
        {product.stock > 0 ? (
          added ? (
            <>
              <Check className="w-4 h-4" />
              Додано!
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              Додати в кошик
            </>
          )
        ) : (
          'Немає в наявності'
        )}
      </button>

      <Link
        href="/cart"
        className="flex-1 flex items-center justify-center gap-2 border border-yellow-500/20 text-gray-300 hover:text-yellow-400 hover:border-yellow-400/50 font-semibold py-4 rounded-xl text-sm transition-all duration-200"
      >
        Купити одразу
      </Link>
    </div>
  );
}