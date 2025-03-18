import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { products } from '../data/products';
import { useCartStore } from '../store/cartStore';
import { recommendationService } from '../services/recommendationService';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const [recommendedProducts, setRecommendedProducts] = useState<typeof products>([]);
  
  const product = products.find(p => p.id === id);

  useEffect(() => {
    const initializeRecommendations = async () => {
      if (product) {
        await recommendationService.initialize(products);
        const recommendations = await recommendationService.getRecommendations(product);
        const recommendedItems = products.filter(p => recommendations.includes(p.id));
        setRecommendedProducts(recommendedItems);
      }
    };

    initializeRecommendations();
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Produit non trouvé</h1>
          <button
            onClick={() => navigate('/catalog')}
            className="text-indigo-600 hover:text-indigo-500"
          >
            Retour au catalogue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-gray-500 mb-6">{product.description}</p>
          <div className="text-3xl font-bold text-gray-900 mb-8">
            {product.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
          </div>
          <div className="flex items-center space-x-4 mb-8">
            <button
              onClick={() => addItem(product)}
              className="flex-1 flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Ajouter au Panier
            </button>
            <button className="p-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              <Heart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Recommended Products */}
      {recommendedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Produits Recommandés</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {recommendedProducts.map((recProduct) => (
              <Link
                key={recProduct.id}
                to={`/product/${recProduct.id}`}
                className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={recProduct.image}
                  alt={recProduct.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{recProduct.name}</h3>
                  <p className="text-gray-500 mb-4 line-clamp-2">{recProduct.description}</p>
                  <span className="text-xl font-bold text-gray-900">
                    {recProduct.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;