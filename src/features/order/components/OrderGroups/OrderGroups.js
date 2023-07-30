// OrderGroups.jsx

import React from 'react';
import OrderGroup from "../OrderGroup/OrderGroup";
import moment from "moment";
import styles from './OrderGroups.module.css'
import ExpandableSection from "../../../../common/components/ExtandableSection/ExtandableSection";
import {useSelector} from "react-redux";
import 'moment/locale/ar';
const groupOrders = (orders, isRtl) => {
    const local = isRtl ? "ar" : "en"
    moment.locale(local);
    const today = moment().startOf('day');
    const yesterday = moment().subtract(1, 'day').startOf('day');

    return orders.reduce((groups, order) => {
        const orderDate = moment(order.createdAt);
        let group;

        if (orderDate.isSame(today, 'd')) {
            group = moment().format('LL');  // Localized 'Today'
        } else if (orderDate.isSame(yesterday, 'd')) {
            group = moment().subtract(1, 'day').format('LL');  // Localized 'Yesterday'
        } else {
            group = orderDate.format('MMMM YYYY'); // Group by month and year
        }

        groups[group] = groups[group] || [];
        groups[group].push(order);

        return groups;
    }, {});
};

const OrderGroups = ({orders, cancelOrder}) => {
    const isRtl = useSelector((state) => state.rtl.isRtl);
    const groupedOrders = groupOrders(orders, isRtl);

    return (
        <div className={styles.orderGroups}>
            {Object.keys(groupedOrders).map((group, index) => (
                <ExpandableSection
                    key={`${group}-${index}`}
                    initialState={index === 0}
                    title={group}
                    children={
                        <OrderGroup key={`${group}-${index}-group`} orders={groupedOrders[group]}
                                    cancelOrder={cancelOrder}/>
                    }
                />
            ))
            }
        </div>
    );
};

export default OrderGroups;
