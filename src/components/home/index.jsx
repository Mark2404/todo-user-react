import React from "react";
import useStore from "../../store/index";
import { FaBoxOpen } from "react-icons/fa";
import "./home.scss";
import { useMemo } from 'react';

import { notification } from 'antd';

const Context = React.createContext({ name: 'Default' });

export default function HomePage() {
    const { products, addToCart, toggleFavorite, favorites } = useStore();
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (placement) => {
        api.info({
            message: `Notification ${placement}`,
            description: <Context.Consumer>{({ name }) => `Hello, ${name}!`}</Context.Consumer>,
            placement,
        });
    };

    const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);


    const handleClick = (product) => {
        toggleFavorite(product);
        openNotification('topRight');
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4"> Товары</h1>
            {products.length === 0 ? (
                <div className="empty-products">
                    <FaBoxOpen />
                    <p>Здесь пока пусто... 😔</p>
                    <span>Добавьте товары в каталог!</span>
                </div>
            ) : (
                <div className="grid">
                    {products.map((product) => {
                        const isFavorite = favorites.some((item) => item.id === product.id);

                        return (
                            <div key={product.id} className="card">
                                <h2>{product.name}</h2>
                                <p>💰 {product.price} UZS</p>
                                <p>📌 {product.category}</p>
                                <div className="card-buttons">
                                    <button onClick={() => addToCart(product)} className="bg-green-500">
                                        Купить
                                    </button>
                                    <button
                                        onClick={() => {
                                            toggleFavorite(product);
                                        }}


                                        className={isFavorite ? "bg-pink-500" : "bg-gray-500"}
                                    >
                                        {isFavorite ? "💖" : "💕"}
                                    </button>

                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
