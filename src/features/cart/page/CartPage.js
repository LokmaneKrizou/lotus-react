import React from 'react';
import CartItems from '../components/CartItems/CartItems';
import PriceBreakdown from '../components/PriceBreakdown/PriceBreakdown';
import styles from './CartPage.module.css';
import {useSelector} from "react-redux";

const CartPage = () => {
    const cartItems = useSelector((state) => state.cart.cart.items);
    const isRtl = useSelector((state) => state.rtl.isRtl);
    const rtlStyles = isRtl ? styles.rtl : '';
    return (
        <>
            {cartItems.length > 0 ? <div className={`${styles.cartPage} ${rtlStyles}`}>
                    <CartItems/>
                <div className={styles.divider}/>
                    <PriceBreakdown/>
                </div>
                : <div className={styles.emptyView}><h2>Your Cart Is Empty</h2></div>}
        </>
    );
};

export default CartPage;