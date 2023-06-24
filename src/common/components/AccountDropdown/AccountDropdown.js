import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../../../features/account/sign/redux/authSlice';
import styles from './AccountDropdown.module.css';

const AccountDropdown = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = (e) => {
        dispatch(signOut());
        handleToggleDropdown();
    };

    const redirectToManageAccount = (e) => {
        navigate(`/account/manage`);
        handleToggleDropdown();
    };

    const redirectToManageOrders = (e) => {
        navigate(`/account/orders`);
        handleToggleDropdown();
    };

    useEffect(() => {
        const checkIfClickedOutside = (e) => {
            if (isOpen && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', checkIfClickedOutside);

        return () => {
            document.removeEventListener('mousedown', checkIfClickedOutside);
        };
    }, [isOpen]);

    return (
        <div className={styles.accountDropdown} ref={dropdownRef}>
            <button className={styles.accountBtn} onClick={handleToggleDropdown}>
                <p>Account</p>
            </button>
            {isOpen && (
                <ul className={styles.accountList}>
                    <li className={styles.accountItem}>
                        <button className={styles.accountOption} onClick={redirectToManageAccount}>
                            <p>Account Info</p>
                        </button>
                    </li>
                    <li className={styles.accountItem}>
                        <button className={styles.accountOption} onClick={redirectToManageOrders}>
                            <p>Manage Orders</p>
                        </button>
                    </li>
                    <li className={styles.accountItem}>
                        <button className={styles.accountOption} onClick={handleLogout}>
                            <p>Logout</p>
                        </button>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default AccountDropdown;
