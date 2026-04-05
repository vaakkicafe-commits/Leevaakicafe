import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, User, Pizza } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { auth, signInWithGoogle } from '../firebase';
import { onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';
import { useCart } from '../context/CartContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const location = useLocation();
  const { totalItems } = useCart();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center text-brand-yellow">
              <Pizza size={24} />
            </div>
            <span className="text-2xl font-display font-bold text-brand-green tracking-tight">
              LEE VAAKKI <span className="text-brand-yellow">Cafe</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "text-sm font-semibold transition-colors hover:text-brand-green",
                  location.pathname === link.path ? "text-brand-green" : "text-gray-600"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link 
                  to="/order-history"
                  className="text-sm font-semibold text-gray-600 hover:text-brand-green flex items-center gap-1"
                >
                  Orders
                </Link>
                <div className="flex items-center gap-3">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || ''} className="w-8 h-8 rounded-full" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-brand-green flex items-center justify-center text-white text-xs font-bold">
                      {user.displayName?.charAt(0) || 'U'}
                    </div>
                  )}
                  <button 
                    onClick={() => signOut(auth)}
                    className="text-sm font-medium text-gray-600 hover:text-brand-green"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={signInWithGoogle}
                className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-brand-green"
              >
                <User size={18} />
                Login
              </button>
            )}
            <Link
              to="/checkout"
              className="bg-brand-green text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-opacity-90 transition-all flex items-center gap-2 relative"
            >
              <ShoppingBag size={18} />
              Order Online
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-yellow text-brand-dark text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "block px-3 py-4 text-base font-bold rounded-md",
                    location.pathname === link.path ? "text-brand-green bg-brand-cream" : "text-gray-700"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                {user ? (
                  <>
                    <Link
                      to="/order-history"
                      className="block px-3 py-4 text-base font-bold text-gray-700 hover:text-brand-green"
                      onClick={() => setIsOpen(false)}
                    >
                      My Orders
                    </Link>
                    <button 
                      onClick={() => { signOut(auth); setIsOpen(false); }}
                      className="w-full text-left px-3 py-4 text-base font-bold text-gray-700"
                    >
                      Logout ({user.displayName})
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => { signInWithGoogle(); setIsOpen(false); }}
                    className="w-full text-left px-3 py-4 text-base font-bold text-gray-700"
                  >
                    Login
                  </button>
                )}
                <Link
                  to="/menu"
                  className="bg-brand-green text-white px-6 py-4 rounded-xl font-bold text-center text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Order Online
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
