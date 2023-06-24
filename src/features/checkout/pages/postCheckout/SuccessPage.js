// SuccessPage.js
import styles from './SuccessPage.module.css';
import RedirectButton from "../../../../common/components/RedirectButton/RedirectButton";
import {useSelector} from "react-redux";

const SuccessPage = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <div className={styles.successContainer}>
            <div className={styles.successBox}>
                <p className={styles.ThanksMessage}>Thank you</p>
                <svg className={styles.checkmark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle className={styles.checkmark__circle} cx="50" cy="50" r="100" fill="none"/>
                    <path className={styles.checkmark__check} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
                <p className={styles.successMessage}>Order placed successfully</p>
                <div className={styles.actionButtons}>
                    <RedirectButton title={"Return Home"} destination={'/'}/>
                    {user ? <RedirectButton title={"View Order"} destination={'/account/orders'}/> : null}
                </div>
            </div>
        </div>
    );
};

export default SuccessPage;
