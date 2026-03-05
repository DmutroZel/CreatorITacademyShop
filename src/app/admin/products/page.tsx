
import { getProducts } from '@/lib/api';
import Link from 'next/link';
import { Plus, Pencil } from 'lucide-react';

export default async function AdminProducts() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-black px-4 py-12">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-end gap-4">
            <h1
              className="text-4xl md:text-5xl font-black text-white"
              style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif" }}
            >
              Товари
            </h1>
            {products.length > 0 && (
              <span className="mb-1 text-xs font-bold text-yellow-500/60 bg-yellow-400/10 border border-yellow-400/20 rounded-full px-3 py-1">
                {products.length} шт
              </span>
            )}
          </div>

          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 bg-yellow-400 text-black font-black px-5 py-2.5 rounded-xl hover:bg-yellow-300 transition-all duration-200 text-sm"
            style={{ boxShadow: '0 0 16px rgba(234,179,8,0.3)' }}
          >
            <Plus className="w-4 h-4" />
            Додати товар
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-24 border border-yellow-500/10 rounded-2xl bg-[#0a0a0a]">
            <p className="text-gray-600 text-lg mb-4">Товарів поки немає...</p>
            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-2 text-yellow-400 border border-yellow-500/30 hover:border-yellow-400 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
              Додати перший товар
            </Link>
          </div>
        ) : (
          <div
            className="overflow-x-auto rounded-2xl border border-yellow-500/10 bg-[#0a0a0a]"
            style={{ boxShadow: '0 0 30px rgba(234,179,8,0.04)' }}
          >
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-yellow-500/10">
                  {['Фото', 'Назва', 'Ціна', 'Категорія', 'В наявності', 'Дії'].map((col) => (
                    <th
                      key={col}
                      className="px-6 py-4 text-left text-[10px] font-bold text-yellow-500/60 uppercase tracking-widest"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr
                    key={p._id}
                    className={`border-b border-yellow-500/5 hover:bg-yellow-400/3 transition-colors duration-150 group ${
                      i === products.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-black border border-yellow-500/10 group-hover:border-yellow-500/30 transition-colors duration-200">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="object-contain w-full h-full p-1"
                        />
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm font-semibold text-white max-w-50 truncate">
                      {p.title}
                    </td>

                    <td className="px-6 py-4 text-sm font-black text-yellow-400">
                      {p.price}
                      <span className="text-yellow-500/50 font-semibold ml-1 text-xs">грн</span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-[10px] font-bold text-gray-500 bg-gray-800/60 border border-gray-700/50 rounded-full px-2.5 py-1 uppercase tracking-widest">
                        {p.category}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm font-bold">
                      {p.stock > 0 ? (
                        <span className="text-green-400">{p.stock} шт</span>
                      ) : (
                        <span className="text-red-400">0</span>
                      )}
                    </td>

                   
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}