import React from 'react';
import SideMenu from '../common/components/SideMenu/SideMenu'; // Adjust the import path as needed
import styles from './AdminPage.module.css';
import {useParams} from "react-router-dom";
import Menu, {getMenuValue} from "../enums/menu";
import DashboardPage from "../features/dashboard/page/DashboardPage";
import OrderManagementPage from "../features/orders/page/OrderManagementPage";
import ProductListPage from "../features/products/list/page/ProductListPage";
import AddProductPage from "../features/products/add/page/AddProductPage"; // This will be your CSS module for the admin page

const AdminPage = () => {
    const {pageName} = useParams();

    const currentPage = getMenuValue(pageName)
    let page;
    switch (currentPage) {
        case Menu.Dashboard:
            page = <DashboardPage/>;
            break;
        case Menu.OrderManagement:
            page = <OrderManagementPage/>;
            break;
        case Menu.ProductList:
            page = <ProductListPage/>;
            break;
        case Menu.AddProduct:
            page = <AddProductPage/>;
            break;
        default:
            page = <DashboardPage/>;
            break;
    }
    return (
        <div className={styles.adminPage}>
            <SideMenu currentPage={currentPage}/>
            <div className={styles.mainContent}>
                <div className={styles.navbar}>
                    <h1>{currentPage}</h1>
                    {/* Additional navbar content */}
                </div>
                <div className={styles.pageContent}>
                    {page}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
