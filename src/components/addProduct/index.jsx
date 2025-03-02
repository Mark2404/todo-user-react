import React, { useState } from "react";
import useStore from "../../store/index"; // Подключаем Zustand
import "./index.scss";

export default function AddProductPage() {
    const { products, addProduct, updateProduct, removeProduct } = useStore(); // Используем состояние из store
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [editId, setEditId] = useState(null);

    const handleAddOrUpdateProduct = () => {
        if (!name || !price || !category) return;

        if (editId) {
            updateProduct(editId, { name, price: Number(price), category });
            setEditId(null);
        } else {
            addProduct({ id: Date.now(), name, price: Number(price), category });
        }

        setName("");
        setPrice("");
        setCategory("");
    };

    const handleEdit = (product) => {
        setEditId(product.id);
        setName(product.name);
        setPrice(String(product.price));
        setCategory(product.category);
    };

    const handleDelete = (id) => {
        removeProduct(id);
    };

    return (
        <div className="add-product-container">
            <h1 className="add-product-title">➕ Добавить товар</h1>
            <div className="add-product-form">
                <input
                    className="add-product-input"
                    placeholder="Название"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    className="add-product-input"
                    placeholder="Цена"
                    value={price}
                    onChange={(e) => {
                        if (/^\d*$/.test(e.target.value)) {
                            setPrice(e.target.value);
                        }
                    }}
                />
                <input
                    className="add-product-input"
                    placeholder="Категория"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <button onClick={handleAddOrUpdateProduct} className="add-product-button">
                    {editId ? "Сохранить" : "Добавить"}
                </button>
            </div>

            <div className="product-list">
                {products.length === 0 ? (
                    <p className="empty-message">Нет добавленных товаров</p>
                ) : (
                    products.map((product) => (
                        <div key={product.id} className="product-item">
                            <div className="product-info">
                                <h2>{product.name}</h2>
                                <p>Цена: {product.price} UZS</p>
                                <p>Категория: {product.category}</p>
                            </div>
                            <div className="product-buttons">
                                <button className="edit-button" onClick={() => handleEdit(product)}>✏️</button>
                                <button className="delete-button" onClick={() => handleDelete(product.id)}>🗑️</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
