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
import {fetchUser, signout} from "./redux/slices/authSlice";
import CartOptionsDialog from './components/CartOptionsDialog/CartOptionsDialog';
import {handleCartOptions} from "./redux/slices/cartSlice"; // Import the dialog component
const App = () => {
    const location = useLocation();
    const routes = [
        {path: '/', element: <HomePage/>},
        {path: '/search/:searchTerm', element: <SearchPage/>},
        {path: '/product/:productId', element: <ProductDetailsPage/>},
        {path: '/signin', element: <SignInPage/>},
        {path: '/register', element: <RegisterPage/>},
        {path: '/cart', element: <CartPage/>},
        {path: '/checkout', element: <CheckoutPage/>},
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
            dispatch(signout());
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
                    onClose={() => setShowCartOptionsDialog(false)}
                    onSelect={handleCartOptionsSelection}
                />
            )}
        </div>
    );
};

export default App;
