import styles from './AccountDropdown.module.css';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout, signout} from "../../redux/slices/authSlice";

const AccountDropdown = ({isRtl}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = (e) => {
        dispatch(signout())
        handleToggleDropdown()
    }

    const redirectToManageAccount = (e) => {
        navigate(`/account`);
        handleToggleDropdown()
    }

    return (
        <div className={styles.accountDropdown}>
            <button className={styles.accountBtn} onClick={handleToggleDropdown}>
                <p>Account</p>
            </button>
            {isOpen && (
                <ul className={styles.accountList}>
                    <li className={styles.accountItem}>
                        <button className={styles.accountOption} onClick={e => redirectToManageAccount(e)}>
                            <p>Manage</p>
                        </button>
                    </li>
                    <li className={styles.accountItem}>
                        <button className={styles.accountOption} onClick={e => handleLogout(e)}>
                            <p>Logout</p>
                        </button>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default AccountDropdown;
