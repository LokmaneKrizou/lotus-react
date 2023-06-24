import React from 'react';
import styles from './Checkbox.module.css';

const Checkbox = ({ text, checked, onChange }) => {
    return (
        <label className={styles.customCheckbox}>
            <input type="checkbox" checked={checked} onChange={onChange} />
            <span className={styles.checkmark}></span>
            <p className={styles.text}>{text}</p>
        </label>
    );
}

export default Checkbox;
