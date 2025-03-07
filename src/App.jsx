import React from 'react'
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/uselog";
import Header from './components/header';
import Home from './components/home';
import Cart from './components/cart';
import Favorite from './components/favorite';
import AddProduct from "./components/addProduct";
import Login from "./components/login";
import Profile from "./components/profile";
import RectProducts from './components/rectProducts';


const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/reactquery' element={<RectProducts />} />
        <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
        <Route path="*" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/addProduct" element={<PrivateRoute element={<AddProduct />} />} />
        <Route path="/favorite" element={<Favorite></Favorite>} />
      </Routes>
    </>
  );
};

export default App;
