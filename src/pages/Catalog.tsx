import React from 'react';
import { Grid, Filter, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCartStore } from '../store/cartStore';

const Catalog = () => {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Catalogue</h1>
        <div className="flex space-x-4">
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            <Filter className="h-5 w-5 mr-2" />
            Filtres
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            <Grid className="h-5 w-5 mr-2" />
            Vue Grille
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
            </Link>
            <div className="p-4">
              <Link to={`/product/${product.id}`}>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
              </Link>
              <p className="text-gray-500 mb-4 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900">
                  {product.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                </span>
                <button
                  onClick={() => addItem(product)}
                  className="flex items-center px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  <ShoppingCart className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;