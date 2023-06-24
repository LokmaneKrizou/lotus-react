import React, {useEffect, useState} from 'react';
import {useRoutes, useLocation} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import SearchPage from './pages/SearchPage/SearchPage';
import ProductDetailsPage from './pages/ProductDetailsPage/ProductDetailsPage';
import CartPage from './pages/CartPage/CartPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import styles from './App.module.css';
import Footer from "./components/Footer/Footer";
import SignInPage from "./pages/SignInPage/SignInPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser, signOut} from "./redux/slices/authSlice";
import CartOptionsDialog from './components/CartOptionsDialog/CartOptionsDialog';
import {handleCartOptions} from "./redux/slices/cartSlice";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import OrderPage from "./pages/OrderPage/OrderPage";
import ManagePage from "./pages/ManagePage/ManagePage";
const App = () => {
    const location = useLocation();
    const routes = [
        {path: '/', element: <HomePage/>},
        {path: '/search/:searchTerm', element: <SearchPage/>},
        {path: '/product/:productId', element: <ProductDetailsPage/>},
        {path: '/signin', element: <SignInPage/>},
        {path: '/register', element: <RegisterPage/>},
        {path: '/cart', element: <CartPage/>},
        {path: '/checkout/:cartId', element: <CheckoutPage/>},
        {path: '/checkout/success', element: <SuccessPage/>},
        {path: '/account/orders', element: <OrderPage/>},
        {path: '/account/manage', element: <ManagePage/>},
        {path: '*', element: <NotFoundPage/>},

    ];
    const element = useRoutes(routes);
    const shouldHideNavbar = location.pathname === '/signin' || location.pathname === '/register';
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user)
    const [showCartOptionsDialog, setShowCartOptionsDialog] = useState(false);
    const handleCartOptionsSelection = async (option) => {
        console.log(option)
        dispatch(handleCartOptions({ option }))
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
                {element}
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
