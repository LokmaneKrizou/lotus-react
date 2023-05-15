import React from 'react';
import {useSelector} from 'react-redux';
import CartItem from '../CartItem/CartItem';
import styles from './CartItems.module.css';

const CartItems = () => {
    const items = useSelector((state) => state.cart.cart.items);
    return (
        <div className={styles.cartItems}>
            {items && items.map((item) => (
                <CartItem key={item._id} item={item}/>
            ))}
        </div>
    );
};

export default CartItems;
