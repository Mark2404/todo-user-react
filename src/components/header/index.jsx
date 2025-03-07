import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.scss';
import { FaHome, FaShoppingCart, FaHeart, FaPlusCircle, FaUser } from 'react-icons/fa';
import { useAuthStore } from "../../store/uselog";
const Header = () => {
    const { isAuthenticated } = useAuthStore();
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
                {isAuthenticated && <NavLink to="/addProduct">Add Product</NavLink>}
                {isAuthenticated ? <NavLink to="/profile">Profile</NavLink> : <NavLink to="/login">Login</NavLink>}
            </nav>
        </header>
    );
};

export default Header;
