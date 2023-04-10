import logo from './logo.svg';
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
                <Route exact path="/" component={HomePage} />
                <Route path="/search" component={SearchPage} />
                <Route path="/product/:productId" component={ProductDetailsPage} />
                <Route path="/cart" component={CartPage} />
                <Route path="/checkout" component={CheckoutPage} />
            </Routes>
        </div>
    );
};

export default App;
