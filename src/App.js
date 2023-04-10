import './App.module.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import SearchPage from './pages/SearchPage/SearchPage';
import ProductDetailsPage from './pages/ProductDetailsPage/ProductDetailsPage';
import CartPage from './pages/CartPage/CartPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import styles from './App.module.css';

const App = () => {
    return (
        <div className={styles.app}>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route path="/search/:searchTerm" element={<SearchPage/>} />
                <Route path="/product/:productId" element={<ProductDetailsPage/>} />
                <Route path="/cart" element={<CartPage/>} />
                <Route path="/checkout" element={<CheckoutPage/>} />
            </Routes>
        </div>
    );
};

export default App;
