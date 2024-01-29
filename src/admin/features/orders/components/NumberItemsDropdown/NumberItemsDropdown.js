import React from 'react';
import styles from './NumberItemsDropdown.module.css'; // Define styles

const NumberItemsDropdown = ({ value, onChange }) => {
    return (
        <select className={styles.numberItemsDropdown} value={value} onChange={onChange}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
        </select>
    );
};

export default NumberItemsDropdown;
