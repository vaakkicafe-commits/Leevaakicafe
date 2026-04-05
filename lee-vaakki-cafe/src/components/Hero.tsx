import { motion } from 'framer-motion';
import { ArrowRight, Coffee, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#008938_1px,transparent_1px)] [background-size:24px_24px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-sm font-bold mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
              </span>
              Now Serving in Mahabalipuram
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold text-brand-dark leading-[1.1] mb-6">
              Fresh Brews, <br />
              <span className="text-brand-green">Quick Bites,</span> <br />
              & Feel-Good Meals.
            </h1>
            
            <p className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed">
              Experience the perfect blend of casual dining and coffee-shop vibes near Mahabalipuram. From breakfast to dinner, we've got your cravings covered.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/menu"
                className="bg-brand-green text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-green/20"
              >
                View Menu
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/about"
                className="bg-white border-2 border-gray-100 text-brand-dark px-8 py-4 rounded-full font-bold text-lg hover:border-brand-green transition-all flex items-center justify-center gap-2"
              >
                Our Story
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-brand-cream flex items-center justify-center text-brand-green">
                  <Coffee size={20} />
                </div>
                <span className="text-sm font-bold text-gray-700">Premium Coffee</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-brand-cream flex items-center justify-center text-brand-green">
                  <Utensils size={20} />
                </div>
                <span className="text-sm font-bold text-gray-700">Fresh Ingredients</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden subway-shadow">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop"
                alt="Delicious Burger"
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-brand-yellow p-6 rounded-2xl subway-shadow z-20 hidden md:block">
              <p className="text-brand-dark font-display font-bold text-2xl leading-tight">
                Meal for Two <br />
                <span className="text-brand-green">₹350 - ₹400</span>
              </p>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-yellow/20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-green/20 rounded-full blur-3xl -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
