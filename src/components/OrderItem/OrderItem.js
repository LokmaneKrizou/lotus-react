// OrderItem.js

import React from 'react';
import styles from './OrderItem.module.css';

const OrderItem = ({item}) => {
    return (
        <div className={styles.orderItem}>
            <img src={item.product.images[0]} alt={item.product.name} className={styles.orderItemImage}/>
            <div className={styles.orderItemInfo}>
                <h3>{item.product.name}</h3>
                {item.variantSelections && item.variantSelections.map(variant => (
                    <p key={variant.name}>{variant.name}: {variant.value}</p>
                ))}
                <p>Quantity: {item.quantity}</p>
            </div>
            <p className={styles.orderItemPrice}>${item.product.price.toFixed(2)}</p>
        </div>
    );
};

export default OrderItem;
