'use client';
import Link from 'next/link';
import { Package, ShoppingBag, AlertTriangle } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-black px-4 py-16">

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block text-[10px] font-bold text-yellow-500/60 uppercase tracking-widest border border-yellow-500/20 rounded-full px-3 py-1 mb-4">
            Система управління
          </span>
          <h1
            className="text-5xl md:text-7xl font-black text-white"
            style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif", }}
          >
            Адмін-панель
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
          {[
            {
              href: '/admin/products',
              icon: Package,
              title: 'Товари',
              desc: 'Додавання, редагування, видалення товарів',
              accent: 'yellow',
            },
            {
              href: '/admin/orders',
              icon: ShoppingBag,
              title: 'Замовлення',
              desc: 'Перегляд та зміна статусів замовлень',
              accent: 'yellow',
            },
          ].map(({ href, icon: Icon, title, desc }) => (
            <Link key={href} href={href} className="group block">
              <div
                className="relative bg-[#0a0a0a] border border-yellow-500/10 rounded-2xl p-10 text-center transition-all duration-300 group-hover:border-yellow-400/40 overflow-hidden"
                style={{ boxShadow: '0 0 0 transparent' }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 40px rgba(234,179,8,0.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 0 0 transparent')}
              >

                <span className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-yellow-500/20 rounded-tl-2xl group-hover:border-yellow-400/60 transition-colors duration-300" />
                <span className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-yellow-500/20 rounded-br-2xl group-hover:border-yellow-400/60 transition-colors duration-300" />

                <div className="w-16 h-16 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center mx-auto mb-6 group-hover:border-yellow-400/50 transition-colors duration-300">
                  <Icon className="w-8 h-8 text-yellow-400" />
                </div>

                <h2
                  className="text-2xl font-black text-white mb-2 group-hover:text-yellow-400 transition-colors duration-200"
                  style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif", letterSpacing: '0.04em' }}
                >
                  {title}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}