import React from 'react';
import { ArrowRight, Star, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Découvrez des Produits Adaptés à Vos Goûts
            </h1>
            <p className="text-xl mb-8">
              Notre technologie IA analyse vos préférences pour vous proposer les meilleurs produits.
            </p>
            <Link
              to="/catalog"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:text-lg"
            >
              Explorer le Catalogue
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Produits Tendance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={`https://images.unsplash.com/photo-${item}?auto=format&fit=crop&w=800`}
                alt="Product"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Produit Populaire {item}</h3>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  Description courte du produit avec ses caractéristiques principales.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-indigo-600">99,99 €</span>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    Ajouter au Panier
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Pourquoi Choisir EcoSmart ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Recommandations IA</h3>
              <p className="text-gray-600">
                Des suggestions personnalisées basées sur vos préférences et votre historique.
              </p>
            </div>
            {/* Add more features */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;