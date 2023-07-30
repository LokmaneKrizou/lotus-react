// OrderGroup.jsx

import React from 'react';
import OrderCard from "../OrderCard/OrderCard";
import styles from './OrderGroup.module.css'
import OrderStatus from "../OrderStatus/OrderStatus";
const OrderGroup = ({orders, cancelOrder}) => {
    return (
        <div className={styles.orderGroup}>
            {orders.map((order) => (
                    <div key={order._id} className={styles.order}>
                        <OrderStatus status={order.status}/>
                        <OrderCard order={order} handleCancel={cancelOrder}/>
                    </div>
                )
            )}
        </div>
    )
        ;
};

export default OrderGroup;
