import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styles from './OrderManagementPage.module.css'
import OrderTable from "../components/OrderTable/OrderTable";
import SearchBar from "../components/SearchBar/SearchBar";
import {fetchAllOrders} from "../redux/orderManagmentSlice";

const OrderManagementPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllOrders());
    }, [dispatch]);
    const orders = useSelector(state => state.adminOrders.orders);
    const isRtl = useSelector((state) => state.rtl.isRtl);
    const rtlStyles = isRtl ? styles.rtl : '';
    return (<div className={`${styles.orderManagementPage} ${rtlStyles}`}>
        <SearchBar/>
        {/*<DateFilter />*/}
        <OrderTable orders={orders}/>
        {/*<Pagination />*/}
    </div>);
};

export default OrderManagementPage;

