import React from 'react';
import styles from './ManagePage.module.css';

const ManagePage = () => {
    return (
        <div className={styles.managePage}>
            <h1 className={styles.title}>Manage Account</h1>
            <p className={styles.description}>Update your personal info and preferred delivery addres</p>
        </div>
    );
};

export default ManagePage;
