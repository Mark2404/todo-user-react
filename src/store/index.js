import { create } from "zustand";

const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
const initialProducts = JSON.parse(localStorage.getItem("products")) || [];

const useStore = create((set) => ({
    products: initialProducts,

    addProduct: (product) => set((state) => {
        const updatedProducts = [...state.products, product];
        localStorage.setItem("products", JSON.stringify(updatedProducts));
        return { products: updatedProducts };
    }),

    updateProduct: (id, updatedData) => set((state) => {
        const updatedProducts = state.products.map((product) =>
            product.id === id ? { ...product, ...updatedData } : product
        );
        localStorage.setItem("products", JSON.stringify(updatedProducts));
        return { products: updatedProducts };
    }),

    removeProduct: (id) => set((state) => {
        const updatedProducts = state.products.filter((product) => product.id !== id);
        localStorage.setItem("products", JSON.stringify(updatedProducts));
        return { products: updatedProducts };
    }),


    favorites: [],
    toggleFavorite: (product) => set((state) => {
        const isFavorite = state.favorites.some((item) => item.id === product.id);
        return {
            favorites: isFavorite
                ? state.favorites.filter((item) => item.id !== product.id) // Удалить
                : [...state.favorites, product], // Добавить
        };
    }),


    cart: Array.isArray(initialCart) ? initialCart : [],
    addToCart: (product) => set((state) => {
        const existingItem = state.cart.find(item => item.id === product.id);

        if (existingItem) {
            return {
                cart: state.cart.map(item =>
                    item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
                )
            };
        } else {
            return {
                cart: [...state.cart, { ...product, quantity: 1 }]
            };
        }
    }),

    updateCartQuantity: (id, quantity) => set((state) => ({
        cart: state.cart.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
        )
    })),


    removeFromCart: (id) => set((state) => {
        const updatedCart = state.cart.filter((item) => item.id !== id);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return { cart: updatedCart };
    }),

}));

export default useStore;
