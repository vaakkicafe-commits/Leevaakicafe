import { Instagram, Facebook, Twitter, MapPin, Phone, Mail, Clock, Pizza } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center text-brand-yellow">
                <Pizza size={24} />
              </div>
              <span className="text-2xl font-display font-bold text-white tracking-tight">
                LEE VAAKKI <span className="text-brand-yellow">Cafe</span>
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Your favorite café-style dining stop near Mahabalipuram. Serving fresh brews and delicious meals from breakfast to dinner.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-green transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-green transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-green transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-brand-yellow">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/menu" className="text-gray-400 hover:text-white transition-colors">Our Menu</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/menu" className="text-gray-400 hover:text-white transition-colors">Order Online</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-brand-yellow">Visit Us</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-gray-400">
                <MapPin className="shrink-0 text-brand-green" size={20} />
                <span>Thiruporur Main Road, Mahabalipuram, Chennai</span>
              </li>
              <li className="flex gap-3 text-gray-400">
                <Phone className="shrink-0 text-brand-green" size={20} />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex gap-3 text-gray-400">
                <Mail className="shrink-0 text-brand-green" size={20} />
                <span>hello@leevaakkicafe.com</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-brand-yellow">Opening Hours</h4>
            <ul className="space-y-4">
              <li className="flex justify-between text-gray-400">
                <span>Mon - Fri</span>
                <span>8:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between text-gray-400">
                <span>Sat - Sun</span>
                <span>7:00 AM - 11:00 PM</span>
              </li>
              <li className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-brand-green font-bold mb-1">
                  <Clock size={16} />
                  <span>Breakfast Special</span>
                </div>
                <p className="text-xs text-gray-500">Served daily until 11:00 AM</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2026 LEE VAAKKI Cafe. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
