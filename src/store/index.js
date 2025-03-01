import { create } from 'zustand';

const useStore = create((set) => ({
    products: [],
    favorites: [],

    addProduct: (newProduct) => set((state) => ({ products: [...state.products, newProduct] })),

    editProduct: (id, updatedProduct) => set((state) => ({
        products: state.products.map((product) => (product.id === id ? updatedProduct : product)),
    })),

    deleteProduct: (id) => set((state) => ({
        products: state.products.filter((product) => product.id !== id),
    })),

    addFavorite: (product) => set((state) => ({
        favorites: state.favorites.some((fav) => fav.id === product.id)
            ? state.favorites
            : [...state.favorites, product],
    })),

    removeFavorite: (id) => set((state) => ({
        favorites: state.favorites.filter((product) => product.id !== id),
    })),
}));

export default useStore;
