import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  total: number;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addItem: (product) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.product.id === product.id);
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { items: [...state.items, { product, quantity: 1 }] };
    }),
  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((item) => item.product.id !== productId),
    })),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      ),
    })),
  get total() {
    return this.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  },
}));