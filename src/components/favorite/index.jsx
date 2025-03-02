import React from "react";
import useStore from "../../store/index";
import "./index.scss";
import { FaBoxOpen } from "react-icons/fa";
export default function FavoritesPage() {
    const { favorites, toggleFavorite } = useStore();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Избранные товары</h1>
            {favorites.length === 0 ? (
                <div className="empty-products">
                    <FaBoxOpen />
                    <p>Здесь пока пусто... 😔</p>
                    <span>Добавьте товары в каталог!</span>
                </div>
            ) : (
                <div className="grid">
                    {favorites.map((product) => (
                        <div key={product.id} className="card">
                            <h2>{product.name}</h2>
                            <p>💰 {product.price} UZS</p>
                            <p>📌 {product.category}</p>
                            <button
                                onClick={() => toggleFavorite(product)}
                                className="bg-red-500"
                            >
                                ❌ Удалить
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
