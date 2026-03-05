'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const totalItems = useCartStore((s) => s.totalItems());

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="bg-black/90 border-b border-yellow-500/30 sticky top-0 z-50 backdrop-blur-md"
      style={{ boxShadow: '0 0 30px rgba(234,179,8,0.08)' }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">

        <Link href="/" className="group relative">
          <motion.span
            className="text-2xl md:text-3xl font-black tracking-tight text-yellow-400 group-hover:text-yellow-300 transition-colors duration-200"
            style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif", letterSpacing: '0.04em', textShadow: '0 0 20px rgba(234,179,8,0.5)' }}
          >
            /Creator Merch
          </motion.span>
       
          <motion.span
            className="absolute -bottom-1 left-0 h-0.5 w-0 bg-yellow-400 group-hover:w-full transition-all duration-300"
            style={{ boxShadow: '0 0 8px rgba(234,179,8,0.8)' }}
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {[
            { href: '/products', label: 'Товари' },
            { href: '/about', label: 'Про нас' },
          ].map((link) => (
            <motion.div key={link.href} whileHover={{ y: -1 }} transition={{ type: 'spring', stiffness: 400 }}>
              <Link
                href={link.href}
                className="relative text-gray-400 hover:text-yellow-400 transition-colors duration-200 text-sm font-semibold uppercase tracking-widest group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-yellow-400 group-hover:w-full transition-all duration-300"
                  style={{ boxShadow: '0 0 6px rgba(234,179,8,0.7)' }} />
              </Link>
            </motion.div>
          ))}
        </nav>

        <Link href="/cart" className="relative group">
          <motion.div
            whileHover={{ scale: 1.1, rotate: -6 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
            style={{ filter: totalItems > 0 ? 'drop-shadow(0 0 8px rgba(234,179,8,0.6))' : 'none' }}
          >
            <ShoppingCart className="w-6 h-6" />
          </motion.div>

          <AnimatePresence>
            {totalItems > 0 && (
              <motion.span
                key="badge"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                className="absolute -top-2.5 -right-2.5 bg-yellow-400 text-black text-xs font-black rounded-full w-5 h-5 flex items-center justify-center"
                style={{ boxShadow: '0 0 10px rgba(234,179,8,0.8)' }}
              >
                {totalItems}
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>
    </motion.header>
  );
}