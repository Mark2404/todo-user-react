import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.scss';
import { FaHome, FaShoppingCart, FaHeart, FaPlusCircle } from 'react-icons/fa';

const Header = () => {
    return (
        <header className="masculine-header">
            <nav>
                <NavLink to="/" exact activeClassName="active">
                    <FaHome /> Home
                </NavLink>
                <NavLink to="/cart" activeClassName="active">
                    <FaShoppingCart /> Cart
                </NavLink>
                <NavLink to="/favorite" activeClassName="active">
                    <FaHeart /> Favorite
                </NavLink>
                <NavLink to="/addProduct" activeClassName="active">
                    <FaPlusCircle /> Add Product
                </NavLink>
            </nav>
        </header>
    );
};

export default Header;
