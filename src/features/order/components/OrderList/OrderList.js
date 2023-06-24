import React, {useState} from 'react';
import styles from './OrderList.module.css';
import StatusFilter from "../StatusFilter/StatusFilter";
import OrderGroups from "../OrderGroups/OrderGroups";


const OrderList = ({orders, cancelOrder}) => {
    const [selectedStatus, setSelectedStatus] = useState('');

    const handleStatusChange = (status) => {
        if (status === selectedStatus) {
            setSelectedStatus('');
        } else {
            setSelectedStatus(status);
        }
    };

    const filteredOrders = selectedStatus
        ? orders.filter((order) => order.status === selectedStatus)
        : orders;

    return (
        <div className={styles.orderList}>
            <StatusFilter selectedStatus={selectedStatus} onStatusChange={handleStatusChange}/>
            <OrderGroups orders={filteredOrders} cancelOrder={cancelOrder}/>
        </div>
    );
};

export default OrderList;