import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { ShoppingBag, MapPin, CreditCard, CheckCircle, Trash2, Plus, Minus, ChevronRight, ChevronLeft, Bike } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

type Step = 'cart' | 'details' | 'payment' | 'success';

export default function Checkout() {
  const { cart, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const [step, setStep] = useState<Step>('cart');
  const [orderId, setOrderId] = useState<string>('');
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (step === 'cart') setStep('details');
    else if (step === 'details') setStep('payment');
    else if (step === 'payment') {
      // Mock order placement
      const newOrderId = `LV-${Math.floor(Math.random() * 90000) + 10000}`;
      setOrderId(newOrderId);
      setStep('success');
      clearCart();
    }
  };

  const prevStep = () => {
    if (step === 'details') setStep('cart');
    else if (step === 'payment') setStep('details');
  };

  if (cart.length === 0 && step !== 'success') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="w-20 h-20 bg-brand-cream rounded-full flex items-center justify-center text-brand-green mb-6">
          <ShoppingBag size={40} />
        </div>
        <h2 className="text-2xl font-bold text-brand-dark mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 text-center max-w-md">
          Looks like you haven't added anything to your cart yet. Browse our menu to find something delicious!
        </p>
        <Link to="/menu" className="bg-brand-green text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-all">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        {step !== 'success' && (
          <div className="mb-12">
            <div className="flex justify-between items-center relative">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
              <div 
                className="absolute top-1/2 left-0 h-0.5 bg-brand-green -translate-y-1/2 z-0 transition-all duration-500" 
                style={{ width: step === 'cart' ? '0%' : step === 'details' ? '50%' : '100%' }}
              />
              
              {[
                { id: 'cart', icon: <ShoppingBag size={20} />, label: 'Cart' },
                { id: 'details', icon: <MapPin size={20} />, label: 'Details' },
                { id: 'payment', icon: <CreditCard size={20} />, label: 'Payment' }
              ].map((s, i) => (
                <div key={s.id} className="relative z-10 flex flex-col items-center">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                    step === s.id ? "bg-brand-green text-white scale-110" : 
                    (i < ['cart', 'details', 'payment'].indexOf(step)) ? "bg-brand-green text-white" : "bg-white text-gray-400 border-2 border-gray-200"
                  )}>
                    {s.icon}
                  </div>
                  <span className={cn(
                    "mt-2 text-xs font-bold uppercase tracking-wider",
                    step === s.id ? "text-brand-green" : "text-gray-400"
                  )}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 'cart' && (
            <motion.div
              key="cart"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-3xl subway-shadow overflow-hidden"
            >
              <div className="p-8">
                <h2 className="text-2xl font-bold text-brand-dark mb-8">Review Your Order</h2>
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.name} className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-0">
                      <img 
                        src={item.imageUrl || `https://picsum.photos/seed/${item.name}/100/100`} 
                        alt={item.name} 
                        className="w-20 h-20 object-cover rounded-xl"
                      />
                      <div className="flex-grow">
                        <h3 className="font-bold text-brand-dark">{item.name}</h3>
                        <p className="text-brand-green font-bold">₹{item.price}</p>
                      </div>
                      <div className="flex items-center gap-3 bg-gray-50 rounded-full px-3 py-1">
                        <button 
                          onClick={() => updateQuantity(item.name, item.quantity - 1)}
                          className="text-gray-500 hover:text-brand-green"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-bold w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.name, item.quantity + 1)}
                          className="text-gray-500 hover:text-brand-green"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.name)}
                        className="text-gray-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-brand-cream p-8">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-600 font-medium">Subtotal</span>
                  <span className="text-2xl font-bold text-brand-dark">₹{totalPrice}</span>
                </div>
                <button 
                  onClick={nextStep}
                  className="w-full bg-brand-green text-white py-4 rounded-2xl font-bold text-lg hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  Proceed to Details <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-3xl subway-shadow p-8"
            >
              <h2 className="text-2xl font-bold text-brand-dark mb-8">Order Details</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <button
                  onClick={() => setOrderType('delivery')}
                  className={cn(
                    "flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all",
                    orderType === 'delivery' ? "border-brand-green bg-brand-green/5 text-brand-green" : "border-gray-100 text-gray-400 hover:border-gray-200"
                  )}
                >
                  <MapPin size={32} />
                  <span className="font-bold">Delivery</span>
                </button>
                <button
                  onClick={() => setOrderType('pickup')}
                  className={cn(
                    "flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all",
                    orderType === 'pickup' ? "border-brand-green bg-brand-green/5 text-brand-green" : "border-gray-100 text-gray-400 hover:border-gray-200"
                  )}
                >
                  <ShoppingBag size={32} />
                  <span className="font-bold">Pickup</span>
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your mobile number"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all"
                  />
                </div>
                {orderType === 'delivery' && (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Delivery Address</label>
                    <textarea 
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter your full address"
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Special Instructions (Optional)</label>
                  <textarea 
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Any special requests?"
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-12">
                <button 
                  onClick={prevStep}
                  className="flex-1 border-2 border-gray-100 text-gray-400 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                >
                  <ChevronLeft size={20} /> Back
                </button>
                <button 
                  onClick={nextStep}
                  disabled={!formData.name || !formData.phone || (orderType === 'delivery' && !formData.address)}
                  className="flex-[2] bg-brand-green text-white py-4 rounded-2xl font-bold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next: Payment <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 'payment' && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-3xl subway-shadow p-8"
            >
              <h2 className="text-2xl font-bold text-brand-dark mb-8">Payment Method</h2>
              
              <div className="space-y-4 mb-12">
                {[
                  { id: 'cod', label: 'Cash on Delivery', desc: 'Pay when your food arrives' },
                  { id: 'card', label: 'Credit / Debit Card', desc: 'Secure online payment' },
                  { id: 'upi', label: 'UPI / GPay / PhonePe', desc: 'Instant mobile payment' }
                ].map((method) => (
                  <label key={method.id} className="flex items-center gap-4 p-6 rounded-2xl border-2 border-gray-100 hover:border-brand-green/30 cursor-pointer transition-all group">
                    <input type="radio" name="payment" defaultChecked={method.id === 'cod'} className="w-5 h-5 text-brand-green focus:ring-brand-green" />
                    <div>
                      <p className="font-bold text-brand-dark group-hover:text-brand-green transition-colors">{method.label}</p>
                      <p className="text-sm text-gray-500">{method.desc}</p>
                    </div>
                  </label>
                ))}
              </div>

              <div className="bg-brand-cream rounded-2xl p-6 mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-bold">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-bold text-brand-green">₹{orderType === 'delivery' ? 40 : 0}</span>
                </div>
                <div className="h-px bg-gray-200 my-4" />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-brand-dark">Total</span>
                  <span className="text-2xl font-bold text-brand-green">₹{totalPrice + (orderType === 'delivery' ? 40 : 0)}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={prevStep}
                  className="flex-1 border-2 border-gray-100 text-gray-400 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                >
                  <ChevronLeft size={20} /> Back
                </button>
                <button 
                  onClick={nextStep}
                  className="flex-[2] bg-brand-green text-white py-4 rounded-2xl font-bold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  Place Order <CheckCircle size={20} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl subway-shadow p-12 text-center"
            >
              <div className="w-24 h-24 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle size={48} />
              </div>
              <h2 className="text-3xl font-bold text-brand-dark mb-4">Order Placed Successfully!</h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Thank you for choosing LEE VAAKKI Cafe. Your order has been received and is being prepared with care.
              </p>
              <div className="bg-gray-50 rounded-2xl p-6 mb-12 text-left max-w-sm mx-auto">
                <p className="text-sm text-gray-400 uppercase font-bold tracking-widest mb-4">Order Summary</p>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-bold">{orderId}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Estimated Time:</span>
                    <span className="font-bold">30-45 mins</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-bold capitalize">{orderType}</span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to={`/track-order/${orderId.replace('#', '')}?type=${orderType}`}
                  className="bg-brand-green text-white px-12 py-4 rounded-2xl font-bold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  <Bike size={20} /> Track Order
                </Link>
                <Link 
                  to="/"
                  className="border-2 border-gray-100 text-gray-500 px-12 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all"
                >
                  Back to Home
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
