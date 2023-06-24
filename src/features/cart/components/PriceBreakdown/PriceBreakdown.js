import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import styles from './PriceBreakdown.module.css';
import {useNavigate} from "react-router-dom";
import Dialog from "../../../../common/components/Dialog/Dialog";
import SignInForm from "../../../account/sign/components/SignInForm/SignInForm";
import useCurrencyFormatter from "../../../../util/priceFormatter";

const PriceBreakdown = () => {
    const cartItems = useSelector((state) => state.cart.cart.items);
    const user = useSelector((state) => state.auth.user)
    const cartId = useSelector((state) => state.cart.cart.id);
    const navigate = useNavigate();
    const priceFormatter = useCurrencyFormatter();
    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );
    const [dialogVisible, setDialogVisible] = useState(false);
    const handleProceedToCheckout = () => {
        if (user) {
            navigate(`/checkout/${cartId}`)
        } else {
            setDialogVisible(true)
        }
    }

    const negative = {
        text: "Continue as a guest", onClick: () => {
            navigate(`/checkout/${cartId}`)
            setDialogVisible(false)
        }
    }
    const shipping = 10;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    return (
        <div className={styles.priceBreakdown}>
            {dialogVisible ?
                <Dialog
                    title={"Proceed to Checkout"}
                    message={"Create an account and keep records of all your orders, save your favourite items and more! "}
                    negative={negative}
                    onClose={()=>setDialogVisible(false)}
                    component={<SignInForm/>}
                /> : null}
            <div className={styles.row}>
                <p>Subtotal</p>
                <p>{priceFormatter(subtotal)}</p>
            </div>
            <div className={styles.row}>
                <p>Shipping</p>
                <p>{priceFormatter(shipping)}</p>
            </div>
            <div className={styles.row}>
                <p>Tax</p>
                <p>{priceFormatter(tax)}</p>
            </div>
            <div className={`${styles.row} ${styles.total}`}>
                <p>Total</p>
                <p>{priceFormatter(total)}</p>
            </div>
            <button className={styles.priceBreakdownButton} disabled={cartItems.length === 0} onClick={handleProceedToCheckout}>Proceed to Checkout</button>
        </div>
    );
};

export default PriceBreakdown;
