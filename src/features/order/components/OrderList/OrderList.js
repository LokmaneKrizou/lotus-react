import React, {useState} from 'react';
import styles from './OrderList.module.css';
import StatusFilter from "../StatusFilter/StatusFilter";
import OrderGroups from "../OrderGroups/OrderGroups";
import emptyOrders from "../../../../assets/images/emptyState/order_empty.svg";
import ErrorView from "../../../../common/components/ErrorView/ErrorView";


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
                : <ErrorView
                    image={emptyOrders}
                    alt={"Empty Orders"}
                    title={`No Orders with ${selectedStatus} status yet`}
                    content={" Please check back later, if you think there is a mistake please contact us."}
                />
            }
        </div>
    )
        ;
};

export default OrderList;