import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface MenuCardProps {
  name: string;
  price: number;
  category: string;
  description?: string;
  imageUrl?: string;
  isFeatured?: boolean;
}

export default function MenuCard({ name, price, category, description, imageUrl, isFeatured }: MenuCardProps) {
  const { addToCart } = useCart();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white rounded-2xl overflow-hidden subway-shadow group hover:translate-y-[-4px] transition-all duration-300 border border-gray-50"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={imageUrl || `https://picsum.photos/seed/${name}/600/450`}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        {isFeatured && (
          <div className="absolute top-3 left-3 bg-brand-yellow text-brand-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            Best Seller
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-brand-dark leading-tight group-hover:text-brand-green transition-colors">
            {name}
          </h3>
          <span className="text-brand-green font-bold text-lg whitespace-nowrap">
            ₹{price}
          </span>
        </div>
        
        <p className="text-sm text-gray-500 mb-6 line-clamp-2 min-h-[2.5rem]">
          {description || "Freshly prepared with the finest ingredients for a delightful experience."}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 bg-gray-50 px-2 py-1 rounded">
            {category}
          </span>
          <button 
            onClick={() => addToCart</add>({ name, price, imageUrl })}
            className="bg-brand-green text-white p-2 rounded-full hover:bg-opacity-90 transition-all shadow-md shadow-brand-green/10 flex items-center gap-1 px-4"
          >
            <Plus size={18} />
            <span className="text-xs font-bold uppercase tracking-wider">Add</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
