// OrderGroup.jsx

import React from 'react';
import OrderCard from "../OrderCard/OrderCard";
import styles from './OrderGroup.module.css'
import OrderStatus from "../OrderStatus/OrderStatus";

const OrderGroup = ({groupName, orders, cancelOrder}) => {
    return (
        <div className={styles.orderGroup} >
            <h2 className={styles.groupName}>{groupName}</h2>
            {orders.map((order) => (
                <div className={styles.order}>
                    <OrderStatus status={order.status}/>
                    <OrderCard key={order._id} order={order} handleCancel={cancelOrder}/>
                </div>
            ))}
        </div>
    );
};

export default OrderGroup;
