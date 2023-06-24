import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import OrderList from '../../components/OrderList/OrderList';
import styles from './OrderPage.module.css';
import {cancelOrder, fetchOrders} from "../../redux/slices/orderSLice";
import Spinner from "../../components/Spinner/Spinner";
import emptyOrders from "../../assets/images/emptyState/order_empty.svg"
import RedirectButton from "../../components/RedirectButton/RedirectButton";

const OrderPage = () => {
    const dispatch = useDispatch();
    const orders = useSelector(state => state.order.orders);
    const status = useSelector(state => state.order.status);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);


    const handleCancelOrder = async (orderId) => {
        await dispatch(cancelOrder(orderId));
        dispatch(fetchOrders());
    };

    return (
        <div className={styles.orderPage}>
            <h1>Orders</h1>
            {status === 'loading' && <div className={styles.loadingPage}><Spinner/></div>}
            {orders && orders.length > 0 ? < OrderList orders={orders} cancelOrder={handleCancelOrder}/> :
                <div className={styles.emptyView}>
                    <img src={emptyOrders} alt="Empty Orders"/>
                    <h2>You don't have orders yet</h2>
                    <p>Once you placed your order, you can track its status here.</p>
                    <RedirectButton title={"Shop Now"} destination={'/'}/>
                </div>
            }

        </div>
    );
};

export default OrderPage;
