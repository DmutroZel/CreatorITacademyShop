import { getProducts } from '@/lib/api';
import ProductCard from '@/components/ProductCard';

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-black px-4 py-12">
      <div className="container mx-auto mb-12">
        <div className="relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-64 h-16 blur-[60px] opacity-20 pointer-events-none rounded-full"
            />
          <p className="text-xs font-bold text-yellow-500/70 uppercase tracking-widest text-center mb-2">Каталог</p>
          <h1 className="text-4xl md:text-6xl font-black text-white text-center"
            style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif" }}>
            Наш мерч
          </h1>
        </div>
      </div>

      <div className="container mx-auto">
        {products.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-16 h-16 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📦</span>
            </div>
            <p className="text-gray-500 text-lg">Товарів поки немає...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}