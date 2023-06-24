import React from 'react';
import styles from './CartOptionsDialog.module.css';

const CartOptionsDialog = ({onSelect}) => {
    return (
        <div className={styles.dialogOverlay}>
            <div className={styles.dialogContent}>
                <h2>Select Cart Option</h2>
                <button onClick={() => onSelect('keep')}>Keep Existing Cart</button>
                <button onClick={() => onSelect('use_new')}>Use New Cart</button>
                <button onClick={() => onSelect('merge')}>Merge Carts</button>
            </div>
        </div>
    );
};

export default CartOptionsDialog;
