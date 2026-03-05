import Link from "next/link";
import { ArrowRight, Zap, Code2, ShoppingBag } from "lucide-react";

export default async function Home() {
  return (
    <div className="min-h-screen bg-black">

      <section className="relative overflow-hidden py-28 px-4">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100 rounded-full blur-[120px] opacity-20 pointer-events-none"
          />       
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(234,179,8,1) 1px, transparent 1px), linear-gradient(90deg, rgba(234,179,8,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />

        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full px-4 py-1.5 mb-8">
            <Zap className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-yellow-400 text-xs font-bold uppercase tracking-widest">Creator IT Academy</span>
          </div>

          <h1
            className="text-5xl md:text-8xl font-black text-white mb-6 leading-none"
            style={{
              fontFamily: "'Bebas Neue', 'Impact', sans-serif",
              letterSpacing: '0.02em'
            }}
          >
            Одягайся як
            <br />
            <span className="text-yellow-400" style={{ textShadow: '0 0 40px rgba(234,179,8,0.5)' }}>
              справжній кодер
            </span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Підтримуй розвиток IT-освіти для дітей у Львові з кожною покупкою мерчу
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="group inline-flex items-center gap-3 bg-yellow-400 text-black font-black px-8 py-4 rounded-2xl text-base hover:bg-yellow-300 transition-all duration-200"
              style={{ boxShadow: '0 0 30px rgba(234,179,8,0.4)' }}
            >
              <ShoppingBag className="w-5 h-5" />
              Переглянути мерч
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-yellow-500/30 text-gray-300 hover:text-yellow-400 hover:border-yellow-400/60 font-semibold px-8 py-4 rounded-2xl text-base transition-all duration-200"
            >
              Про академію
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-yellow-500/10 bg-[#060606] py-12 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Code2, title: 'IT-освіта', desc: 'Кожна покупка підтримує курси для дітей' },
            { icon: Zap, title: 'Якісний мерч', desc: 'Преміальні матеріали для справжніх кодерів' },
            { icon: ShoppingBag, title: 'Доставка по Україні', desc: 'Швидко, надійно, зручно' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center shrink-0 group-hover:border-yellow-400/50 transition-colors duration-200">
                <Icon className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="font-bold text-white text-sm mb-1">{title}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-4 text-center relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-100 h-50 rounded-full blur-[100px] opacity-15 pointer-events-none"
          />
        <div className="container mx-auto relative z-10">
          <p className="text-gray-600 text-sm uppercase tracking-widest font-bold mb-4">Готовий?</p>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-8"
            style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif" }}>
            Гортай наш каталог ↓
          </h2>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-yellow-400 border border-yellow-500/30 hover:border-yellow-400 hover:bg-yellow-400/5 font-bold px-8 py-4 rounded-2xl text-base transition-all duration-200"
          >
            До каталогу
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}