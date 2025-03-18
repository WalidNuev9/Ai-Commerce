import React from 'react';
import { Trash2, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { items, removeItem, updateQuantity, total } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Votre Panier</h1>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <ShoppingBag className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">Votre panier est vide</p>
          <Link
            to="/catalog"
            className="mt-4 inline-block px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Continuer vos achats
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Votre Panier</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {items.map((item) => (
            <li key={item.product.id} className="p-6 flex items-center">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="ml-6 flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{item.product.name}</h3>
                <p className="text-gray-500">{item.product.description}</p>
                <div className="mt-2 flex items-center">
                  <button
                    onClick={() => updateQuantity(item.product.id, Math.max(0, item.quantity - 1))}
                    className="p-1 text-gray-500 hover:text-gray-700"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="mx-2 min-w-[2rem] text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="p-1 text-gray-500 hover:text-gray-700"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="ml-6 flex items-center">
                <span className="text-lg font-semibold text-gray-900 mr-6">
                  {(item.product.price * item.quantity).toLocaleString('fr-FR', {
                    style: 'currency',
                    currency: 'EUR'
                  })}
                </span>
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mt-8 flex justify-between items-center">
        <div className="text-lg">
          Total:{' '}
          <span className="font-bold text-xl">
            {total.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
          </span>
        </div>
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          Passer la Commande
        </button>
      </div>
    </div>
  );
};

export default Cart;