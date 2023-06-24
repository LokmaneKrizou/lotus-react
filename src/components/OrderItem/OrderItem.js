// OrderItem.js

import React from 'react';
import styles from './OrderItem.module.css';
import useCurrencyFormatter from "../../util/priceFormatter";

const OrderItem = ({item}) => {
    const priceFormatter = useCurrencyFormatter();
    return (
        <div className={styles.orderItem}>
            <img src={item.product.images[0]} alt={item.product.name} className={styles.orderItemImage}/>
            <div className={styles.orderItemInfo}>
                <h3>{item.product.name}</h3>
                {item.variantSelections && item.variantSelections.map(variant => (
                    <p key={variant.name}>{variant.name === "Primary color" ? "Color" : variant.name}: {variant.value}</p>
                ))}
                <p>Quantity: {item.quantity}</p>
            </div>
            <p className={styles.orderItemPrice}>{priceFormatter(item.price ? item.price : item.product.price)}</p>
        </div>
    );
};

export default OrderItem;
