import { Product } from '../store/cartStore';

export const products: Product[] = [
  {
    id: '1',
    name: 'Casque Audio Premium',
    price: 199.99,
    description: 'Casque audio sans fil avec réduction de bruit active',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    name: 'Montre Connectée',
    price: 299.99,
    description: 'Montre intelligente avec suivi d\'activité et notifications',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    name: 'Enceinte Portable',
    price: 149.99,
    description: 'Enceinte Bluetooth waterproof avec son immersif',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    name: 'Appareil Photo Numérique',
    price: 599.99,
    description: 'Appareil photo mirrorless avec objectif kit',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
  },
];