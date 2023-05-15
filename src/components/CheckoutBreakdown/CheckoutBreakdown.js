import React from 'react';
import {useSelector} from 'react-redux';
import styles from './CheckoutBreakdown.module.css';

const CheckoutBreakdown = () => {
    const cartItems = useSelector(state => state.checkout.cartItems);

    // Calculate total price
    let totalPrice = 0;
    cartItems.forEach(item => {
        totalPrice += item.product.price * item.quantity;
    });

    return (
        <div className={styles.priceBreakdown}>
            <h2>Price Breakdown</h2>
            <div className={styles.itemTotal}>
                <p>Item Total:</p>
                <p>${totalPrice.toFixed(2)}</p>
            </div>
            <div className={styles.shipping}>
                <p>Shipping:</p>
                <p>${(totalPrice * 0.1).toFixed(2)}</p> {/* 10% shipping fee */}
            </div>
            <div className={styles.taxes}>
                <p>Taxes:</p>
                <p>${(totalPrice * 0.2).toFixed(2)}</p> {/* 20% tax */}
            </div>
            <div className={styles.total}>
                <p>Total:</p>
                <p>${(totalPrice * 1.3).toFixed(2)}</p> {/* total price including shipping and taxes */}
            </div>
        </div>
    );
};

export default CheckoutBreakdown;
