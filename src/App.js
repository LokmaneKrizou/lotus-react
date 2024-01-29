import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate, useRoutes} from 'react-router-dom';
import Navbar from './features/navbar/components/Navbar/Navbar';
import HomePage from './features/home/page/HomePage';
import SearchPage from './features/search/page/SearchPage';
import ProductDetailsPage from './features/product/page/ProductDetailsPage';
import CartPage from './features/cart/page/CartPage';
import CheckoutPage from './features/checkout/pages/CheckoutPage';
import styles from './App.module.css';
import Footer from "./common/components/Footer/Footer";
import SignInPage from "./features/account/sign/page/SignInPage/SignInPage";
import RegisterPage from "./features/account/sign/page/RegisterPage/RegisterPage";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser, signOut} from "./features/account/redux/authSlice";
import CartOptionsDialog from './features/cart/components/CartOptionsDialog/CartOptionsDialog';
import {handleCartOptions} from "./features/cart/redux/cartSlice";
import NotFoundPage from "./common/pages/NotFoundPage/NotFoundPage";
import SuccessPage from "./features/checkout/pages/postCheckout/SuccessPage";
import OrderPage from "./features/order/page/OrderPage";
import ManagePage from "./features/account/manage/page/ManagePage";
import Spinner from "./common/components/Spinner/Spinner";
import Role from "./admin/enums/role";
import AdminPageRouteHandler from "./admin/base/AdminPageRouteHandler";

const App = () => {

    const authLoading = useSelector((state) => state.auth.loading)
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector((state) => state.auth.user);
    useEffect(() => {
        if (user && (location.pathname === '/signin' || location.pathname === '/register')) {
            navigate('/');
        }
        if (user && (user.role !== Role.ADMIN && user.role !== Role.EDITOR) && location.pathname === '/admin/:pageName') {
            navigate('/');
        }
    }, [user, navigate, location.pathname]);

    const components = [
        {route: {path: '/', element: <HomePage/>}, shouldHideNavBar: false},
        {route: {path: '/admin/:pageName', element: <AdminPageRouteHandler/>}, shouldHideNavBar: true},
        {route: {path: '/search/:searchTerm', element: <SearchPage/>}, shouldHideNavBar: false},
        {route: {path: '/product/:productId', element: <ProductDetailsPage/>}, shouldHideNavBar: false},
        {route: {path: '/signin', element: <SignInPage/>}, shouldHideNavBar: true},
        {route: {path: '/register', element: <RegisterPage/>}, shouldHideNavBar: true},
        {route: {path: '/cart', element: <CartPage/>}, shouldHideNavBar: false},
        {route: {path: '/checkout/:cartId', element: <CheckoutPage/>}, shouldHideNavBar: true},
        {route: {path: '/checkout/postCheckout', element: <SuccessPage/>}, shouldHideNavBar: true},
        {route: {path: '/account/orders', element: <OrderPage/>}, shouldHideNavBar: false},
        {route: {path: '/account/manage', element: <ManagePage/>}, shouldHideNavBar: false},
        {route: {path: '*', element: <NotFoundPage/>}, shouldHideNavBar: false},

    ];
    const routes = components.map(component => component.route)
    const element = useRoutes(routes);
    const matchedComponent = components.find(component => component.route.path === element.props.match.route.path);
    const shouldHideNavbar = matchedComponent ? matchedComponent.shouldHideNavBar : false;
    const dispatch = useDispatch();
    const [showCartOptionsDialog, setShowCartOptionsDialog] = useState(false);
    const handleCartOptionsSelection = async (option) => {
        console.log(option)
        dispatch(handleCartOptions({option}))
        setShowCartOptionsDialog(false);
    };
    const checkLocalCartAndHandleOptions = () => {
        const localCartId = localStorage.getItem('cartId');
        if (user && localCartId) {
            setShowCartOptionsDialog(true);
        }
    };
    useEffect(() => {
        if (!user) {
            dispatch(fetchUser());
        }
        const clearUser = () => {
            dispatch(signOut());
        };

        window.addEventListener('clearUser', clearUser);

        return () => {
            window.removeEventListener('clearUser', clearUser);
        };
    }, []);
    useEffect(() => {
        checkLocalCartAndHandleOptions();
    }, [user])
    return (
        <div className={styles.app}>
            {!shouldHideNavbar && <Navbar/>}
            <div>
                {authLoading ? <div className={styles.loading}><Spinner/></div> : element}
            </div>
            {!shouldHideNavbar && <footer><Footer/></footer>}
            {showCartOptionsDialog && (
                <CartOptionsDialog
                    onSelect={handleCartOptionsSelection}
                />
            )}
        </div>
    );
};

export default App;
