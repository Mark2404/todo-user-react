import { create } from "zustand";

export const useAuthStore = create((set) => ({
    isAuthenticated: false,
    username: '',
    password: '',

    setUsername: (username) => set({ username }),
    setPassword: (password) => set({ password }),

    login: async (username, password) => {
        try {
            const response = await fetch("https://dummyjson.com/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) throw new Error("Login failed");

            const data = await response.json();
            set({ isAuthenticated: true, username: data.username, password: "" });

        } catch (error) {
            console.error("Login error:", error);
            set({ isAuthenticated: false });
        }
    },

    logout: () => set({ isAuthenticated: false, username: "", password: "" }),
}));
