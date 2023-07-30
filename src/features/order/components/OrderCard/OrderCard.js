import React from 'react';
import styles from './OrderCard.module.css';
import OrderItems from '../OrderItems/OrderItems';
import useCurrencyFormatter from "../../../../util/priceFormatter"; // Make sure to import your OrderItems component

const OrderCard = ({order, handleCancel}) => {
    const priceFormatter = useCurrencyFormatter();

    return (
        <div className={styles.orderCard}>
            <div className={styles.header}>
                <div className={styles.headerId}>
                    <h4>Order:</h4>
                    <p className={styles.orderId}>{order._id}</p>
                </div>
                <button className={`${styles.cancelButton} ${order.status !== 'Pending' ? styles.hidden : ''}`} onClick={() => handleCancel(order._id)}>
                    Cancel
                </button>
            </div>
            <OrderItems items={order.items}/>
            <div className={styles.header}>
                <h4>Total price: </h4>
                <h4>{priceFormatter(order.totalPrice)}</h4>
            </div>
        </div>
    );
}

export default OrderCard;
