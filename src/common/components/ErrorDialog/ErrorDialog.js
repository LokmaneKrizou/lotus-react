// components/ErrorDialog/ErrorDialog.js

import React from 'react';
import styles from './ErrorDialog.module.css';

const ErrorDialog = ({ visible, onClose, title, message }) => {
    if (!visible) {
        return null;
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.dialog}>
                <div className={styles.header}>
                    <h3>{title}</h3>
                </div>
                <div className={styles.body}>
                    <p>{message}</p>
                </div>
                <div className={styles.footer}>
                    <button onClick={onClose} className={styles.closeButton}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorDialog;
