import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const Navbar = () => {
  const { user, signOut } = useAuthStore();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              EcoSmart
            </Link>
          </div>
          
          <div className="flex-1 flex items-center justify-center px-8">
            <div className="max-w-lg w-full">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Rechercher des produits..."
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="text-gray-600 hover:text-gray-900">
              <ShoppingCart className="h-6 w-6" />
            </Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">{user.email}</span>
                <button
                  onClick={() => signOut()}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-gray-600 hover:text-gray-900">
                <User className="h-6 w-6" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;