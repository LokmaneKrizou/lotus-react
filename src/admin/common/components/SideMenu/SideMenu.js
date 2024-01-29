import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import styles from './SideMenu.module.css';
import IconAddProduct from '../../../../assets/images/sideMenu/add_product.svg';
import IconProductList from '../../../../assets/images/sideMenu/product_list.svg';
import IconDashboard from '../../../../assets/images/sideMenu/dashboard.svg';
import IconManageAdmin from '../../../../assets/images/sideMenu/manage_admin.svg';
import IconOrderManagement from '../../../../assets/images/sideMenu/manage_orders.svg';
import IconCustomers from '../../../../assets/images/sideMenu/customers.svg';
import IconCollapseMenu from '../../../../assets/images/sideMenu/collapse_menu.svg';
import IconExpandMenu from '../../../../assets/images/sideMenu/expand_menu.svg';
import IconAdminsRoles from '../../../../assets/images/sideMenu/admins_roles.svg';
import IconLogo from '../../../../assets/images/sideMenu/logo.svg';
import Menu, {formattedMenuName} from "../../../enums/menu";

const SideMenu = ({currentPage}) => {
    // Function to handle menu item click

    const [isCollapsed, setIsCollapsed] = useState(false);
    const getNavLinkClass = (menuName) => {
        return currentPage === menuName ? styles.activeLink : '';
    };
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className={`${styles.sideMenu} ${isCollapsed ? styles.collapsed : ''}`}>
            <div className={styles.logoContainer}>
                <div className={styles.brandAndLogo}>
                    <img src={IconLogo} alt="Lotus Logo" className={styles.logo}/>
                    <p className={styles.brand}>Lotus</p>
                </div>
                <button onClick={toggleCollapse} className={styles.collapseButton}>
                    <img src={isCollapsed ? IconExpandMenu : IconCollapseMenu} alt="Collapse Menu"/>
                </button>
            </div>

            <div className={styles.menuSection}>
                <p className={styles.menuLabel}>MAIN MENU</p>
                <NavLink to={`/admin/${formattedMenuName(Menu.Dashboard)}`} activeClassName={styles.activeLink}
                         className={`${styles.menuItem} ${getNavLinkClass(Menu.Dashboard)}`} >
                    <img src={IconDashboard} alt={`${Menu.Dashboard}`} className={styles.icon}/>
                    <span className={styles.menuItemText}>Dashboard</span>
                </NavLink>
                <NavLink to={`/admin/${formattedMenuName(Menu.OrderManagement)}`} activeClassName={styles.activeLink}
                         className={`${styles.menuItem} ${getNavLinkClass(Menu.OrderManagement)}`}>
                    <img src={IconOrderManagement} alt={`${Menu.OrderManagement}`} className={styles.icon}/>
                    <span className={styles.menuItemText}>Order Management</span>
                </NavLink>
                <NavLink to={`/admin/${formattedMenuName(Menu.Customers)}`} activeClassName={styles.activeLink}
                         className={`${styles.menuItem} ${getNavLinkClass(Menu.Customers)}`}>
                    <img src={IconCustomers} alt={`${Menu.Customers}`} className={styles.icon}/>
                    <span className={styles.menuItemText}>Customers</span>
                </NavLink>
                {/* Repeat for other MAIN MENU items */}
            </div>

            {/* PRODUCTS section */}
            <div className={styles.menuSection}>
                <p className={styles.menuLabel}>PRODUCTS</p>
                <NavLink to={`/admin/${formattedMenuName(Menu.AddProduct)}`} activeClassName={styles.activeLink}
                         className={`${styles.menuItem} ${getNavLinkClass(Menu.AddProduct)}`}>
                    <img src={IconAddProduct} alt={`${Menu.AddProduct}`} className={styles.icon}/>
                    <span className={styles.menuItemText}>Add Products</span>
                </NavLink>
                <NavLink to={`/admin/${formattedMenuName(Menu.ProductList)}`} activeClassName={styles.activeLink}
                         className={`${styles.menuItem} ${getNavLinkClass(Menu.ProductList)}`}>
                    <img src={IconProductList} alt={`${Menu.ProductList}`} className={styles.icon}/>
                    <span className={styles.menuItemText}>Product List</span>
                </NavLink>
                {/* Repeat for other PRODUCT items */}
            </div>

            {/* ADMIN section */}
            <div className={styles.menuSection}>
                <p className={styles.menuLabel}>ADMIN</p>
                <NavLink to={`/admin/${formattedMenuName(Menu.ManageAdmins)}`} activeClassName={styles.activeLink}
                         className={`${styles.menuItem} ${getNavLinkClass(Menu.ManageAdmins)}`}>
                    <img src={IconManageAdmin} alt={`${Menu.ManageAdmins}`} className={styles.icon}/>
                    <span className={styles.menuItemText}>Manage Admins</span>
                </NavLink>
                <NavLink to={`/admin/${formattedMenuName(Menu.AdminRoles)}`} activeClassName={styles.activeLink}
                         className={`${styles.menuItem} ${getNavLinkClass(Menu.AdminRoles)}`}>
                    <img src={IconAdminsRoles} alt={`${Menu.AdminRoles}`} className={styles.icon}/>
                    <span className={styles.menuItemText}>Admin Roles</span>
                </NavLink>
                {/* Repeat for other ADMIN items */}
            </div>

        </div>
    );
};

export default SideMenu;
