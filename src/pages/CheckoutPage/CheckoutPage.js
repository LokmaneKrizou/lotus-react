import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createOrder, updateCartItems, updateStatus} from '../../redux/slices/checkoutSlice';
import ClientInfo from '../../components/ClientInfo/ClientInfo';
import Delivery from '../../components/Delivery/Delivery';
import styles from './CheckoutPage.module.css';
import CheckoutBreakdown from "../../components/CheckoutBreakdown/CheckoutBreakdown";
import OrderItems from "../../components/OrderItems/OrderItems";
import {Link, useNavigate, useParams} from "react-router-dom";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Spinner from "../../components/Spinner/Spinner";
import {deleteCart} from "../../redux/slices/cartSlice";
import RedirectButton from "../../components/RedirectButton/RedirectButton";

const CheckoutPage = () => {
        const {cartId} = useParams();
        const dispatch = useDispatch();
        const checkout = useSelector(state => state.checkout)
        const {clientInfo, deliveryAddress,defaultAddress} = checkout;
        const cartItems = useSelector((state) => state.cart.cart.items);
        const totalPrice = useSelector((state) => state.checkout.totalPrice)
        const existingCartId = useSelector((state) => state.cart.cart.id);
        const isRtl = useSelector((state) => state.rtl.isRtl);
        const rtlStyles = isRtl ? styles.rtl : '';
        const isReadyToCheckout = clientInfo == null || deliveryAddress == null || cartItems.length === 0
        const navigate = useNavigate();
        useEffect( () => {
            if (checkout.status === 'success') {
               dispatch(deleteCart(cartId))
                navigate('/checkout/success');
                dispatch(updateStatus())
            }
        }, [checkout.status, navigate]);

        useEffect(() => {
            dispatch(updateCartItems(cartItems))

        }, [cartItems]);
        const handleOrderSubmit = () => {
            const items = cartItems.map((item) => {
                return {
                    product: item.product._id,
                    variantSelections: item.variantSelections,
                    quantity: item.quantity,
                    price: item.product.price
                };
            });
            const order = {
                receiver: {
                    ...clientInfo,
                    address: deliveryAddress
                },
                defaultAddress:defaultAddress,
                totalPrice: totalPrice,
                items: items
            }
            dispatch(createOrder(order));
        };
        return (
            <>
                {(cartId === existingCartId) ?
                    <div className={`${styles.checkout} ${isRtl ? rtlStyles : ''}`}>
                        <h1>Checkout</h1>
                        {checkout.status === 'loading' && <Spinner/>}
                        {cartItems.length > 0 ? <div className={styles.checkoutContent}>
                                <div className={styles.clientInfo}>
                                    <ClientInfo/>
                                    <Delivery/>
                                </div>
                                <div className={styles.delivery}>
                                    <OrderItems items={cartItems}/>
                                    <CheckoutBreakdown/>
                                    <button className={styles.submit} disabled={isReadyToCheckout}
                                            onClick={handleOrderSubmit}>Submit Order
                                    </button>
                                </div>
                            </div>
                            : <div className={styles.emptyView}>
                                <h2>Nothing to checkout yet</h2>
                                <p>Add items to your cart first, then proceed to checkout.</p>
                                <RedirectButton title={"Shop Now"} destination={'/'}/>
                            </div>}
                    </div>
                    : <NotFoundPage/>}
            </>
        )
            ;
    }
;

export default CheckoutPage;