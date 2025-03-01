import React from 'react'
import { Route, Routes } from "react-router-dom";
import Header from './components/header';
import Home from './components/home';
import Cart from './components/cart';
import Favorite from './components/favorite';
import AddPrdouct from "./components/addProduct";
const App = () => {
  return (
    <>
      <Header />
      <Routes>



        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/" element={<Home />} />
        <Route path="/addProduct" element={< AddPrdouct />} />
        <Route path="/favorite" element={<Favorite />} />

      </Routes>


    </>
  )
}






export default App