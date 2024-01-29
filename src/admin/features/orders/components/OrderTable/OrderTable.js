import React from 'react';
import OrderRow from '../OrderRow/OrderRow';
import styles from './OrderTable.module.css';

const OrderTable = ({ orders }) => {
    return (
        <table className={styles.orderTable} >
            <thead>
            <tr>
                <th className={styles.orderTableHeader}>Order ID</th>
                <th className={styles.orderTableHeader}>Created</th>
                <th className={styles.orderTableHeader}>By</th>
                <th className={styles.orderTableHeader}>Customer</th>
                <th className={styles.orderTableHeader}>Total</th>
                <th className={styles.orderTableHeader}>Profit</th>
                <th className={styles.orderTableHeader}>Status</th>
                <th className={styles.orderTableHeader}></th> {/* For expand button column */}
            </tr>
            </thead>
            <tbody>
            {orders.map(order => <OrderRow key={order.id} order={order} />)}
            </tbody>
        </table>
    );
};

export default OrderTable;
