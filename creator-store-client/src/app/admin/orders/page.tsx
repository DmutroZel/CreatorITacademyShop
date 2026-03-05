
import { getOrders } from '@/lib/api';

interface Order {
  _id: string;
  customerName: string;
  totalPrice: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

const statusMap: Record<Order['status'], { label: string; classes: string }> = {
  pending:    { label: 'Очікує',     classes: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/30' },
  processing: { label: 'В обробці',  classes: 'bg-blue-400/10 text-blue-400 border-blue-400/30' },
  shipped:    { label: 'Відправлено', classes: 'bg-purple-400/10 text-purple-400 border-purple-400/30' },
  delivered:  { label: 'Доставлено', classes: 'bg-green-400/10 text-green-400 border-green-400/30' },
  cancelled:  { label: 'Скасовано',  classes: 'bg-red-400/10 text-red-400 border-red-400/30' },
};

export default async function AdminOrders() {
  let orders: Order[] = [];

  try {
    orders = await getOrders();
  } catch (error) {
    console.error('Не вдалося завантажити замовлення:', error);
  }

  return (
    <div className="min-h-screen bg-black px-4 py-12">
      <div className="container mx-auto">
        <div className="flex items-end gap-4 mb-10">
          <h1
            className="text-4xl md:text-5xl font-black text-white"
            style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif" }}>
            Замовлення
          </h1>
          {orders.length > 0 && (
            <span className="mb-1 text-xs font-bold text-yellow-500/60 bg-yellow-400/10 border border-yellow-400/20 rounded-full px-3 py-1">
              {orders.length} шт
            </span>
          )}
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-24 border border-yellow-500/10 rounded-2xl bg-[#0a0a0a]">
            <p className="text-gray-600 text-lg">Замовлень поки немає</p>
          </div>
        ) : (
          <div
            className="overflow-x-auto rounded-2xl border border-yellow-500/10 bg-[#0a0a0a]"
            style={{ boxShadow: '0 0 30px rgba(234,179,8,0.04)' }}
          >
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-yellow-500/10">
                  {['ID', 'Клієнт', 'Сума', 'Статус', 'Дата'].map((col) => (
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
                {orders.map((order, i) => (
                  <tr
                    key={order._id}
                    className={`border-b border-yellow-500/5 hover:bg-yellow-400/3 transition-colors duration-150 ${
                      i === orders.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <td className="px-6 py-4 font-mono text-xs text-gray-600">
                      #{order._id.slice(-8).toUpperCase()}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-white">
                      {order.customerName}
                    </td>
                    <td className="px-6 py-4 text-sm font-black text-yellow-400">
                      {order.totalPrice.toLocaleString('uk-UA')}
                      <span className="text-yellow-500/50 font-semibold ml-1 text-xs">грн</span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block text-[10px] font-bold uppercase tracking-widest border rounded-full px-2.5 py-1 ${statusMap[order.status].classes}`}
                      >
                        {statusMap[order.status].label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-600">
                      {new Date(order.createdAt).toLocaleString('uk-UA', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
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