// OrderGroups.jsx

import React from 'react';
import OrderGroup from "../OrderGroup/OrderGroup";
import moment from "moment";
import styles from './OrderGroups.module.css'

const groupOrders = (orders) => {
    const today = moment().startOf('day');
    const yesterday = moment().subtract(1, 'day').startOf('day');

    return orders.reduce((groups, order) => {
        const orderDate = moment(order.createdAt);
        let group;

        if (orderDate.isSame(today, 'd')) {
            group = 'Today';
        } else if (orderDate.isSame(yesterday, 'd')) {
            group = 'Yesterday';
        } else {
            group = orderDate.format('MMMM YYYY'); // Group by month and year
        }

        groups[group] = groups[group] || [];
        groups[group].push(order);

        return groups;
    }, {});
};
const OrderGroups = ({ orders, cancelOrder }) => {
    const groupedOrders = groupOrders(orders);

    return (
        <div className={styles.orderGroups}>
            {Object.keys(groupedOrders).map((group) => (
                <OrderGroup key={group} groupName={group} orders={groupedOrders[group]} cancelOrder={cancelOrder} />
            ))}
        </div>
    );
};

export default OrderGroups;
