import { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, CheckCircle, Bike, ChefHat, PackageCheck, ChevronLeft, Store } from 'lucide-react';
import { cn } from '../lib/utils';

type OrderStatus = 'preparing' | 'on-the-way' | 'delivered' | 'ready-for-pickup' | 'picked-up';

export default function TrackOrder() {
  const { orderId } = useParams();
  const [searchParams] = useSearchParams();
  const orderType = searchParams.get('type') || 'delivery';
  
  const [status, setStatus] = useState<OrderStatus>('preparing');
  const [progress, setProgress] = useState(33);

  useEffect(() => {
    // Simulate status updates
    const timer1 = setTimeout(() => {
      if (orderType === 'delivery') {
        setStatus('on-the-way');
      } else {
        setStatus('ready-for-pickup');
      }
      setProgress(66);
    }, 10000);

    const timer2 = setTimeout(() => {
      if (orderType === 'delivery') {
        setStatus('delivered');
      } else {
        setStatus('picked-up');
      }
      setProgress(100);
    }, 25000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [orderType]);

  const deliverySteps = [
    { id: 'preparing', label: 'Preparing', icon: <ChefHat size={20} />, time: '10:30 AM' },
    { id: 'on-the-way', label: 'On the Way', icon: <Bike size={20} />, time: '10:45 AM' },
    { id: 'delivered', label: 'Delivered', icon: <PackageCheck size={20} />, time: '11:00 AM' }
  ];

  const pickupSteps = [
    { id: 'preparing', label: 'Preparing', icon: <ChefHat size={20} />, time: '10:30 AM' },
    { id: 'ready-for-pickup', label: 'Ready for Pickup', icon: <Store size={20} />, time: '10:45 AM' },
    { id: 'picked-up', label: 'Picked Up', icon: <CheckCircle size={20} />, time: '11:00 AM' }
  ];

  const steps = orderType === 'delivery' ? deliverySteps : pickupSteps;

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-green mb-8 font-bold transition-colors">
          <ChevronLeft size={20} /> Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Status Panel */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl subway-shadow p-8">
              <h2 className="text-xl font-bold text-brand-dark mb-2">Order Status</h2>
              <p className="text-sm text-gray-400 mb-6">Order ID: <span className="text-brand-dark font-bold">#{orderId || 'LV-12345'}</span></p>
              
              <div className="space-y-8 relative">
                {/* Progress line */}
                <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-gray-100 z-0" />
                <div 
                  className="absolute left-5 top-5 w-0.5 bg-brand-green z-0 transition-all duration-1000" 
                  style={{ height: `${progress === 33 ? '0%' : progress === 66 ? '50%' : '100%'}` }}
                />

                {steps.map((step, i) => {
                  const isCompleted = progress >= (i + 1) * 33;
                  const isActive = status === step.id;

                  return (
                    <div key={step.id} className="relative z-10 flex items-start gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500",
                        isCompleted ? "bg-brand-green text-white" : "bg-white text-gray-300 border-2 border-gray-100"
                      )}>
                        {step.icon}
                      </div>
                      <div>
                        <p className={cn(
                          "font-bold transition-colors duration-500",
                          isCompleted ? "text-brand-dark" : "text-gray-300"
                        )}>
                          {step.label}
                        </p>
                        <p className="text-xs text-gray-400">{step.time}</p>
                      </div>
                      {isActive && (
                        <motion.div 
                          layoutId="active-indicator"
                          className="ml-auto"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                        >
                          <span className="flex h-3 w-3 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-green"></span>
                          </span>
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-brand-green text-white rounded-3xl p-8 subway-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="text-sm opacity-80">Estimated {orderType === 'delivery' ? 'Arrival' : 'Ready Time'}</p>
                  <p className="text-2xl font-bold">15-20 mins</p>
                </div>
              </div>
              <p className="text-sm opacity-80">
                {orderType === 'delivery' 
                  ? 'Your rider is picking up your order from LEE VAAKKI Cafe.' 
                  : 'Our chefs are preparing your delicious meal for pickup.'}
              </p>
            </div>
          </div>

          {/* Map Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl subway-shadow overflow-hidden h-full min-h-[500px] relative">
              {/* Mock Map Background */}
              <div className="absolute inset-0 bg-[#f8f9fa]">
                {/* Simplified Map UI */}
                <svg className="w-full h-full opacity-20" viewBox="0 0 800 600">
                  <path d="M0 100 L800 100 M0 300 L800 300 M0 500 L800 500 M100 0 L100 600 M400 0 L400 600 M700 0 L700 600" stroke="#000" strokeWidth="2" fill="none" />
                  <circle cx="400" cy="300" r="10" fill="#4B2C20" /> {/* Cafe Location */}
                  {orderType === 'delivery' && <circle cx="200" cy="150" r="8" fill="#FF9F1C" />} {/* Delivery Location */}
                </svg>
                
                {/* Animated Rider Icon (Only for delivery) */}
                {orderType === 'delivery' && (
                  <motion.div 
                    className="absolute z-20 text-brand-green"
                    animate={{ 
                      x: status === 'preparing' ? 400 : status === 'on-the-way' ? 300 : 200,
                      y: status === 'preparing' ? 300 : status === 'on-the-way' ? 225 : 150,
                    }}
                    transition={{ duration: 5, ease: "easeInOut" }}
                  >
                    <div className="relative">
                      <div className="absolute -top-12 -left-4 bg-white px-3 py-1 rounded-full subway-shadow text-[10px] font-bold whitespace-nowrap">
                        Your Rider
                      </div>
                      <Bike size={32} />
                    </div>
                  </motion.div>
                )}

                {/* Cafe Marker */}
                <div className="absolute top-[300px] left-[400px] -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="relative">
                    <div className="absolute -top-12 -left-8 bg-brand-dark text-white px-3 py-1 rounded-full subway-shadow text-[10px] font-bold whitespace-nowrap">
                      LEE VAAKKI Cafe
                    </div>
                    <MapPin size={32} className="text-brand-dark" />
                  </div>
                </div>

                {/* Home Marker (Only for delivery) */}
                {orderType === 'delivery' && (
                  <div className="absolute top-[150px] left-[200px] -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="relative">
                      <div className="absolute -top-12 -left-4 bg-brand-yellow text-brand-dark px-3 py-1 rounded-full subway-shadow text-[10px] font-bold whitespace-nowrap">
                        Home
                      </div>
                      <MapPin size={32} className="text-brand-yellow" />
                    </div>
                  </div>
                )}
              </div>

              {/* Map Overlay Info */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-2xl subway-shadow flex items-center justify-between">
                {orderType === 'delivery' ? (
                  <>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=100&auto=format&fit=crop" alt="Rider" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Your Rider</p>
                        <p className="font-bold text-brand-dark">Rajesh Kumar</p>
                      </div>
                    </div>
                    <button className="bg-brand-green text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-opacity-90 transition-all">
                      Contact
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-brand-cream rounded-full flex items-center justify-center text-brand-green">
                        <Store size={24} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Pickup Location</p>
                        <p className="font-bold text-brand-dark">Thiruporur Main Road, Mahabalipuram</p>
                      </div>
                    </div>
                    <button className="bg-brand-green text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-opacity-90 transition-all">
                      Get Directions
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
