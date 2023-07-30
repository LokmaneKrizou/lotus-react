import React, {useState} from 'react';
import styles from './OrderList.module.css';
import StatusFilter from "../StatusFilter/StatusFilter";
import OrderGroups from "../OrderGroups/OrderGroups";
import emptyOrders from "../../../../assets/images/emptyState/order_empty.svg";


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
            {filteredOrders && filteredOrders.length > 0 ?
                <OrderGroups orders={filteredOrders} cancelOrder={cancelOrder}/>
                : <div className={styles.emptyView}>
                    <img src={emptyOrders} alt="Empty Orders"/>
                    <h2>No Orders with {selectedStatus} status yet</h2>
                    <p> Please check back later, if you think there is a mistake please contact us.</p>
                </div>
            }
        </div>
    );
};

export default OrderList;