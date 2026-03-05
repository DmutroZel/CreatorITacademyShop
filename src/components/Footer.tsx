'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Instagram, Youtube, Send } from 'lucide-react';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-black border-t border-yellow-500/20 mt-auto"
      style={{ boxShadow: '0 -1px 40px rgba(234,179,8,0.05)' }}
    >
      {/* Top glow line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-yellow-500/60 to-transparent" />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <p
              className="text-2xl font-black text-yellow-400 mb-3"
              style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif", textShadow: '0 0 16px rgba(234,179,8,0.4)' }}
            >
              Creator Merch
            </p>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Мерч для справжніх кодерів та майбутніх IT-майстрів. Підтримай розвиток IT-освіти у Львові.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs font-bold text-yellow-500/80 uppercase tracking-widest mb-4">Навігація</p>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Головна' },
                { href: '/products', label: 'Товари' },
                { href: '/about', label: 'Про нас' },
                { href: '/cart', label: 'Кошик' },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-gray-500 hover:text-yellow-400 transition-colors duration-200 text-sm group flex items-center gap-2"
                  >
                    <span className="w-0 h-px bg-yellow-400 group-hover:w-4 transition-all duration-300"
                      style={{ boxShadow: '0 0 4px rgba(234,179,8,0.7)' }} />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <p className="text-xs font-bold text-yellow-500/80 uppercase tracking-widest mb-4">Соцмережі</p>
            <div className="flex gap-4">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Youtube, label: 'YouTube' },
                { icon: Send, label: 'Telegram' },
              ].map(({ icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  aria-label={label}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-lg border border-yellow-500/30 flex items-center justify-center text-gray-500 hover:text-yellow-400 hover:border-yellow-400 transition-colors duration-200"
                  style={{ boxShadow: 'none' }}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 12px rgba(234,179,8,0.4)')}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-yellow-500/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} Creator IT Academy. Всі права захищені.
          </p>
          <p className="text-gray-700 text-xs">
            Made with <span className="text-yellow-500">⚡</span> in Lviv
          </p>
        </div>
      </div>
    </motion.footer>
  );
}