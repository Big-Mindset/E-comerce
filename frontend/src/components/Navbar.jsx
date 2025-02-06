import { ShoppingCart, Menu, X, StoreIcon, BaggageClaim } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { authStore } from '../store/auth.store';
import { cartStore } from '../store/cart.store';

const Navbar = () => {
  let currLocation = useLocation();
  let { userData, Logout } = authStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  let {cartItems} = cartStore()

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Logout' },
  ];

  const navLinks2 = [
    { name: 'Home', path: '/' },
    { name: 'Login', path: '/login' },
    { name: 'Sign Up', path: '/signup' },
  ];

  const currentLink = userData ? navLinks : navLinks2;

  let handleLogout = (name) => {
    if (name !== "Logout") {
      return;
    }
    Logout();
  };


  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-indigo-700 to-purple-700 backdrop-blur-sm z-50 shadow-lg">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo with initial animation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <StoreIcon className="w-8 h-8 text-white" />
          <span className="text-2xl font-bold text-white tracking-tight">
            E-Shop
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {currentLink.map((link, index) => (
        <Link key={index} to={link?.path}>
            <motion.div
              key={link.name}
              onClick={() => handleLogout(link.name)}
              className={`relative ${
                link.name === "Logout"
                  ? "bg-white text-purple-700 font-bold"
                  : "text-white/90 hover:text-white"
              } cursor-pointer font-medium px-3 py-2 rounded-lg transition-colors`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
                <p className={`${link.path === currLocation.pathname && "text-white font-bold"}`}>
                  {link.name}
                </p>
              <motion.div
                className="absolute bottom-0 left-0 w-full h-0.5 bg-white"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                />
            </motion.div>
          </Link>
          ))}
        </div>

        {/* Cart & Mobile Menu */}
        {userData && (
          <div className="flex items-center gap-4">
            <motion.button
            
              className="text-white flex gap-6 cursor-pointer items-center p-2 rounded-full"
            >
              <Link
              
              to={"/cartItems"}
              className="flex relative  p-2 items-center gap-1">
                <p className="text-xl">Cart</p>
                <ShoppingCart className="w-6 h-6" />
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center"
                >
                  {cartItems.length}
                </motion.span>
              </Link>
              {userData.role === "admin" &&
              <Link to={"/admin"}>
              <div className="flex gap-0.5 px-2 p-1.5 bg-gradient-to-l from-blue-600 to-blue-700 text-gray-200 rounded-md hover:text-white font-bold duration-200 transition-colors">
                <BaggageClaim />
                <p>Dashboard</p>
              </div>
              </Link>
}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white p-2 rounded-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        )}

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="md:hidden fixed top-16 right-0 bottom-0 w-64 bg-white shadow-xl p-4"
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.path}
                  className="block p-3 text-purple-700 hover:bg-purple-50 rounded-lg"
                  whileHover={{ x: 10 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;