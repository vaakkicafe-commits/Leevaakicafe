import { motion } from 'framer-motion';
import { Coffee, Users, Heart, MapPin } from 'lucide-react';

export default function About() {
  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=2071&auto=format&fit=crop"
          alt="Cafe Vibe"
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-brand-dark/60"></div>
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-bold mb-6"
          >
            Our <span className="text-brand-yellow">Story</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl opacity-90 max-w-2xl mx-auto font-medium"
          >
            Crafting memorable food experiences near Mahabalipuram since 2024.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-display font-bold text-brand-dark">
              A Welcoming Stop for <br /> <span className="text-brand-green">Every Food Lover</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              LEE VAAKKI Cafe was born out of a passion for high-quality, casual dining. Located on the bustling road to Mahabalipuram, we envisioned a space where travelers could rest and locals could gather over great coffee and even better food.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our menu is a curated blend of continental favorites and local delights, ensuring there's something for everyone—from a quick juice to a full-course pasta dinner.
            </p>
            
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <p className="text-4xl font-display font-bold text-brand-green mb-1">50+</p>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Menu Items</p>
              </div>
              <div>
                <p className="text-4xl font-display font-bold text-brand-green mb-1">10k+</p>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Happy Customers</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop" alt="Cafe" className="rounded-2xl subway-shadow" referrerPolicy="no-referrer" />
              <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop" alt="Coffee" className="rounded-2xl subway-shadow" referrerPolicy="no-referrer" />
            </div>
            <div className="space-y-4 pt-8">
              <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop" alt="Interior" className="rounded-2xl subway-shadow" referrerPolicy="no-referrer" />
              <img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop" alt="Food" className="rounded-2xl subway-shadow" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-brand-dark mb-4">What We Stand For</h2>
            <p className="text-gray-500">Our core values drive everything we do at LEE VAAKKI Cafe.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Heart className="text-brand-green" size={32} />, title: "Made with Love", desc: "Every dish is prepared with care and the freshest ingredients available." },
              { icon: <Users className="text-brand-green" size={32} />, title: "Community First", desc: "We strive to be a hub for the local community and a home away from home." },
              { icon: <Coffee className="text-brand-green" size={32} />, title: "Quality Always", desc: "We never compromise on the quality of our brews or our service." }
            ].map((value, i) => (
              <div key={i} className="text-center space-y-4 p-8 rounded-3xl bg-brand-cream border border-brand-green/5">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white subway-shadow mb-4">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-brand-dark">{value.title}</h4>
                <p className="text-gray-500 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
