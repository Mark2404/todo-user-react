import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Pagination } from "antd";
import useStore from "../../store/index";
import "./index.scss";

const fetchProducts = async (page) => {
    const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`);
    return res.json();
};

export default function RectProducts() {
    const [currentPage, setCurrentPage] = useState(1);

    const { data, isLoading, error } = useQuery({
        queryKey: ["products", currentPage],
        queryFn: () => fetchProducts(currentPage),
        keepPreviousData: true,
    });

    const { addToCart, toggleFavorite, favorites } = useStore();

    if (isLoading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка загрузки данных</p>;

    return (
        <div className="product-container">
            <h1>With React Query Products</h1>
            <div className="product-grid">
                {data.products.map((product) => {
                    const isFavorite = favorites.some((fav) => fav.id === product.id);
                    return (
                        <div key={product.id} className="product-card">
                            <img src={product.thumbnail} alt={product.title} className="product-image" />
                            <h3>{product.title}</h3>
                            <p>{product.price} $</p>
                            <div className="buttons">
                                <button onClick={() => addToCart(product)} className="buy-btn">
                                    Купить
                                </button>
                                <button
                                    onClick={() => toggleFavorite(product)}
                                    className={isFavorite ? "fav-btn active" : "fav-btn"}
                                >
                                    {isFavorite ? "💖" : "💕"}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
            <Pagination
                current={currentPage}
                total={100}
                pageSize={10}
                onChange={(page) => setCurrentPage(page)}
            />
        </div>
    );
}
