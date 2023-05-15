import React from 'react';
import {useSelector} from 'react-redux';
import styles from './PriceBreakdown.module.css';
import {Link} from "react-router-dom";

const PriceBreakdown = () => {
    const cartItems = useSelector((state) => state.cart.cart.items);

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    const shipping = 10;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    return (
        <div className={styles.priceBreakdown}>
            <div className={styles.row}>
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
            </div>
            <div className={styles.row}>
                <p>Shipping</p>
                <p>${shipping.toFixed(2)}</p>
            </div>
            <div className={styles.row}>
                <p>Tax</p>
                <p>${tax.toFixed(2)}</p>
            </div>
            <div className={`${styles.row} ${styles.total}`}>
                <p>Total</p>
                <p>${total.toFixed(2)}</p>
            </div>
            <Link to={"/checkout"}>
                <button disabled={cartItems.length === 0}>Proceed to Checkout</button>
            </Link>
        </div>
    );
};

export default PriceBreakdown;
