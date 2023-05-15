import React from 'react';
import {useDispatch} from 'react-redux';
import {createOrder} from '../../redux/slices/checkoutSlice';
import ClientInfo from '../../components/ClientInfo/ClientInfo';
import Delivery from '../../components/Delivery/Delivery';
import styles from './CheckoutPage.module.css';
import CheckoutBreakdown from "../../components/CheckoutBreakdown/CheckoutBreakdown";
import OrderItems from "../../components/OrderItems/OrderItems";

const CheckoutPage = () => {
    const dispatch = useDispatch();

    const handleOrderSubmit = () => {
        dispatch(createOrder());
    };

    return (
        <div className={styles.checkout}>
            <h1>Checkout</h1>
            <div className={styles.checkoutContent}>

                <div className={styles.clientInfo}>
                    <ClientInfo/>
                    <Delivery/>
                </div>
                <div className={styles.delivery}>
                    <OrderItems/>
                    <CheckoutBreakdown/>
                    <button className={styles.submit} onClick={handleOrderSubmit}>Submit Order</button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;