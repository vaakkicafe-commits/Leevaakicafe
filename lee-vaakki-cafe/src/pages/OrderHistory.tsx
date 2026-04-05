import { motion } from 'framer-motion';
import { Package, Calendar, CreditCard, ChevronRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

const MOCK_ORDERS = [
  {
    id: 'LV-84291',
    date: '2026-03-28T14:30:00Z',
    total: 450,
    status: 'delivered',
    items: ['Roast Chicken Pizza', 'Mango Juice']
  },
  {
    id: 'LV-12938',
    date: '2026-03-25T19:15:00Z',
    total: 349,
    status: 'delivered',
    items: ['Paneer Cheese Spicy Burger', 'French Fries']
  },
  {
    id: 'LV-55201',
    date: '2026-03-20T12:00:00Z',
    total: 299,
    status: 'delivered',
    items: ['Cheese Egg Toast', 'Cappuccino']
  }
];

const statusColors = {
  delivered: 'bg-green-100 text-green-700',
  preparing: 'bg-yellow-100 text-yellow-700',
  'on-the-way': 'bg-blue-100 text-blue-700',
  cancelled: 'bg-red-100 text-red-700'
};

export default function OrderHistory() {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-display font-bold text-brand-dark">Order <span className="text-brand-green">History</span></h1>
          <Link to="/menu" className="text-brand-green font-bold flex items-center gap-2 hover:gap-3 transition-all">
            Order More <ShoppingBag size={20} />
          </Link>
        </div>

        <div className="space-y-6">
          {MOCK_ORDERS.length > 0 ? (
            MOCK_ORDERS.map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl subway-shadow overflow-hidden border border-gray-100 hover:border-brand-green/20 transition-all"
              >
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-brand-cream rounded-2xl flex items-center justify-center text-brand-green">
                        <Package size={24} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Order ID</p>
                        <p className="font-bold text-brand-dark">#{order.id}</p>
                      </div>
                    </div>
                    <div className={cn(
                      "px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider self-start sm:self-center",
                      statusColors[order.status as keyof typeof statusColors]
                    )}>
                      {order.status.replace('-', ' ')}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-y border-gray-50">
                    <div className="flex items-center gap-3">
                      <Calendar size={18} className="text-gray-400" />
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Date</p>
                        <p className="text-sm font-bold text-brand-dark">
                          {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <CreditCard size={18} className="text-gray-400" />
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Total Amount</p>
                        <p className="text-sm font-bold text-brand-green">₹{order.total}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <ShoppingBag size={18} className="text-gray-400" />
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Items</p>
                        <p className="text-sm font-bold text-brand-dark truncate max-w-[150px]">
                          {order.items.join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Link 
                      to={`/track-order/${order.id.replace('LV-', '')}`}
                      className="text-brand-green font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      View Details <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl subway-shadow">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                <Package size={40} />
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-2">No orders yet</h3>
              <p className="text-gray-500 mb-8">Your order history will appear here once you place an order.</p>
              <Link to="/menu" className="bg-brand-green text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-all">
                Start Ordering
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
