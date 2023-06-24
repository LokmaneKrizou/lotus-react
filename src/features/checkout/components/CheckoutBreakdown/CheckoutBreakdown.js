import React from 'react';
import {useSelector} from 'react-redux';
import styles from './CheckoutBreakdown.module.css';
import useCurrencyFormatter from "../../../../util/priceFormatter";

const CheckoutBreakdown = () => {
    const totalPrice = useSelector(state => state.checkout.totalPrice);
    const priceFormatter = useCurrencyFormatter();

    return (
        <div className={styles.priceBreakdown}>
            <h2>Price Breakdown</h2>
            <div className={styles.itemTotal}>
                <p>Item Total:</p>
                <p>{priceFormatter(totalPrice)}</p>
            </div>
            <div className={styles.shipping}>
                <p>Shipping:</p>
                <p>{priceFormatter(totalPrice * 0.1)}</p> {/* 10% shipping fee */}
            </div>
            <div className={styles.taxes}>
                <p>Taxes:</p>
                <p>{priceFormatter(totalPrice * 0.2)}</p> {/* 20% tax */}
            </div>
            <div className={styles.total}>
                <p>Total:</p>
                <p>{priceFormatter(totalPrice * 1.3)}</p> {/* total price including shipping and taxes */}
            </div>
        </div>
    );
};

export default CheckoutBreakdown;
