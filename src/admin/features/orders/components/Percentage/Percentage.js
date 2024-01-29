import React from 'react';
import styles from './Percentage.module.css';
import useCurrencyFormatter from "../../../../../util/priceFormatter";

const Percentage = ({amount, percentage}) => {
    const priceFormatter = useCurrencyFormatter();
    return (
        <div className={styles.profitPercentageContainer}>
            {amount && <div>{priceFormatter(amount)}</div>}
            <div className={styles.profitPercentage}>{percentage}%</div>
        </div>
    );
};

export default Percentage;
