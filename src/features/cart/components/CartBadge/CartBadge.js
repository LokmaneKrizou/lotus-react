import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getCartById, getMyCart} from "../../redux/cartSlice";
import styles from './CartBadge.module.css';

const CartBadge = () => {
    const {cart} = useSelector((state) => state.cart);
    const count = cart.items.reduce((acc, item) => acc + item.quantity, 0);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user)
    const isRtl = useSelector((state) => state.rtl.isRtl);
    const rtlStyles = isRtl ? styles.rtl : '';
    useEffect(() => {
        const localCartId = localStorage.getItem('cartId');
        if (user) {
            dispatch(getMyCart({}));
        }else if (localCartId) {
            dispatch(getCartById(localCartId));
        }
    }, [user]);

    if (count === 0) return null;

    return <span className={`${styles.cartBadge} ${rtlStyles} `}>{count}</span>;
};

export default CartBadge;
