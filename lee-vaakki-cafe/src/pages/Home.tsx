import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import MenuCard from '../components/MenuCard';
import { MOCK_MENU } from '../data/mockMenu';
import { ArrowRight, Star, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const featuredItems = MOCK_MENU.filter(item => item.isFeatured).slice(0, 4);

  return (
    <div className="space-y-24 pb-24">
      <Hero />

      {/* Offers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Coffee + Toast", desc: "Start your morning right", price: "₹299", color: "bg-brand-green" },
            { title: "Burger + Fries", desc: "The perfect lunch combo", price: "₹349", color: "bg-brand-yellow" },
            { title: "Pizza + Drink", desc: "Dinner is sorted", price: "₹450", color: "bg-brand-dark" }
          ].map((offer, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className={cn(
                "p-8 rounded-3xl text-white relative overflow-hidden subway-shadow",
                offer.color
              )}
            >
              <div className="relative z-10">
                <span className="text-xs font-bold uppercase tracking-widest opacity-80">Special Offer</span>
                <h3 className="text-3xl font-display font-bold mt-2 mb-1">{offer.title}</h3>
                <p className="text-sm opacity-90 mb-6">{offer.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{offer.price}</span>
                  <Link to="/menu" className="bg-white text-brand-dark px-4 py-2 rounded-full font-bold text-sm">
                    Order Now
                  </Link>
                </div>
              </div>
              {/* Decorative Circle */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full"></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Menu */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div>
            <h2 className="text-4xl font-display font-bold text-brand-dark mb-4">Our <span className="text-brand-green">Favorites</span></h2>
            <p className="text-gray-500 max-w-md">Hand-picked dishes that our customers love the most. Freshly prepared and served with a smile.</p>
          </div>
          <Link to="/menu" className="text-brand-green font-bold flex items-center gap-2 hover:gap-3 transition-all">
            View Full Menu <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredItems.map((item, i) => (
            <MenuCard key={i} {...item} />
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop"
                alt="Cafe Interior"
                className="rounded-3xl subway-shadow"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-8 -right-8 bg-brand-green p-8 rounded-3xl text-white subway-shadow hidden md:block">
                <p className="text-4xl font-display font-bold mb-1">4.8</p>
                <div className="flex gap-1 mb-2">
                  {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="currentColor" className="text-brand-yellow" />)}
                </div>
                <p className="text-sm font-medium opacity-80">Customer Rating</p>
              </div>
            </div>
            
            <div className="space-y-8">
              <h2 className="text-4xl font-display font-bold text-brand-dark">The Perfect Stopover <br /> near <span className="text-brand-green">Mahabalipuram</span></h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                LEE VAAKKI Cafe is more than just a restaurant; it's a destination for food lovers. Whether you're a local or a traveler heading to Mahabalipuram, we provide a welcoming atmosphere and a menu that caters to all tastes.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: <Clock className="text-brand-green" />, title: "Open Daily", desc: "8 AM - 10 PM" },
                  { icon: <MapPin className="text-brand-green" />, title: "Prime Location", desc: "Near Mahabalipuram" },
                  { icon: <Star className="text-brand-green" />, title: "Top Quality", desc: "Fresh Ingredients" },
                  { icon: <ArrowRight className="text-brand-green" />, title: "Online Order", desc: "Via Swiggy/Zomato" }
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl bg-brand-cream border border-brand-green/5">
                    <div className="shrink-0">{feature.icon}</div>
                    <div>
                      <h4 className="font-bold text-brand-dark">{feature.title}</h4>
                      <p className="text-sm text-gray-500">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { cn } from '../lib/utils';
