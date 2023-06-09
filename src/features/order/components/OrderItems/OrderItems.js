// OrderItems.js

import React, {useState} from 'react';
import OrderItem from '../OrderItem/OrderItem';
import styles from './OrderItems.module.css';

const OrderItems = ({items}) => {
    const [expanded, setExpanded] = useState(false);

    const renderItems = () => {
        if (expanded) {
            return items.map((item) => <OrderItem key={item._id} item={item}/>);
        } else {
            return items.slice(0, 2).map((item) => <OrderItem key={item._id} item={item}/>);
        }
    };

    return (
        <div className={styles.orderItemsContainer}>
            <h2>Items</h2>
            <div
                className={`${styles.orderItems} ${(!expanded && items.length > 2) ? styles.collapsed : styles.expanded}`}>
                {renderItems()}
                {items.length > 2 && (
                    <button onClick={() => setExpanded(!expanded)}
                            className={styles.expandButton}>{!expanded ? "Expand" : "Collapse"}</button>
                )}
            </div>
        </div>
    );
};

export default OrderItems;
