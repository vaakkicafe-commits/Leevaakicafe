import { useState } from 'react'; // Added useState
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react'; // Added Minus
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
  const [quantity, setQuantity] = useState(1); // Local state for selector

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart({ name, price, imageUrl }, quantity);
    setQuantity(1); // Optional: Reset to 1 after adding
  };

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
        
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 bg-gray-50 px-2 py-1 rounded">
              {category}
            </span>
            
            {/* New Quantity Selector UI */}
            <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-2 py-1 border border-gray-100">
              <button 
                onClick={handleDecrement}
                className="p-1 hover:text-brand-green transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span className="font-bold text-sm min-w-[20px] text-center">{quantity}</span>
              <button 
                onClick={handleIncrement}
                className="p-1 hover:text-brand-green transition-colors"
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          <button 
            onClick={handleAddToCart}
            className="w-full bg-brand-green text-white py-2.5 rounded-xl hover:bg-opacity-90 transition-all shadow-md shadow-brand-green/10 flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            <span className="text-xs font-bold uppercase tracking-wider">Add to Cart</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
