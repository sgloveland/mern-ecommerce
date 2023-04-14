import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import HomeScreen from './screens/home-screen/HomeScreen';
import ProductScreen from './screens/product-screen/ProductScreen';
import ProductDetailsScreen from './screens/product-details/ProductDetailsScreen';
import CartScreen from './screens/cart-screen/CartScreen';
import OrderDetails from './screens/order-details/OrderDetails';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeScreen />}/>
        {/* Add more routes */}
        <Route path="/products" element={<ProductScreen />} />
        <Route path="/product/:id" element={<ProductDetailsScreen />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/order/:id" element={<OrderDetails />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
