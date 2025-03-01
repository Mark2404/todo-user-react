import React from 'react';
import useStore from '../../store/index';
import { FaBox, FaSadTear, FaHeart } from 'react-icons/fa';
import './Home.scss';

const Home = () => {
    const { products, addFavorite } = useStore();

    return (
        <div className="home-container">
            <h1 className="home-title">All Products</h1>
            <div className="product-list">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.id} className="product-card">
                            <div className="product-icon">
                                <FaBox size={50} />
                            </div>
                            <h3>{product.name}</h3>
                            <p className="product-price">${product.price}</p>
                            <div className="product-actions">
                                <button className="buy-button">Buy</button>
                                <button className="favorite-button" onClick={() => addFavorite(product)}>
                                    <FaHeart size={20} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-products-container">
                        <FaSadTear size={80} className="no-products-icon" />
                        <p className="no-products-text">Oops! No products available.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
