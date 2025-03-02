import React from "react";
import useStore from "../../store/index";
import { FaBoxOpen } from "react-icons/fa";
import "./index.scss";

export default function CartPage() {
    const { cart, updateCartQuantity, removeFromCart } = useStore();



    if (!cart || !Array.isArray(cart)) {
        return <p className="error-message">Ошибка загрузки данных...</p>;
    }

    if (cart.length === 0) {
        return (
            <div className="empty-products">
                <FaBoxOpen />
                <p>Здесь пока пусто... 😔</p>
                <span>Добавьте товары в каталог!</span>
            </div>
        );
    }

    const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

    return (
        <div className="cart-container">
            <h1 className="cart-title">🛒 Корзина</h1>
            {cart.map((item) => (
                <div key={item.id} className="cart-item">
                    <FaBoxOpen />
                    <h2 className="cart-item-name">{item.name}</h2>
                    <p className="cart-item-price">💰 {item.price} UZS</p>
                    <div className="quantity-controls">
                        <button
                            onClick={() => updateCartQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))}
                        >
                            ➖
                        </button>
                        <span>{item.quantity || 1}</span>
                        <button
                            onClick={() => updateCartQuantity(item.id, (item.quantity || 1) + 1)}
                        >
                            ➕
                        </button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="remove-button">🗑 Удалить</button>
                </div>
            ))}
            <h2 className="cart-total">💰 Общая сумма: {total.toLocaleString()} UZS</h2>
        </div>
    );
}
