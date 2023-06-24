// Select.js
import React, { useRef } from 'react';
import styles from './Select.module.css';
import { useSelector } from "react-redux";

const Select = ({ options, value, onChange, title }) => {
    const selectRef = useRef();

    const handleChevronClick = (event) => {
        if (event.target.className.includes(styles.chevron)) {
            selectRef.current.focus();
        }
    };

    const isRtl = useSelector((state) => state.rtl.isRtl);
    const classNames = isRtl ? `${styles.selectWrapper} ${styles.rtl}` : `${styles.selectWrapper}`;

    return (
        <div
            className={`${styles.selectWrapper} ${isRtl ? styles.rtl : ""}`}
            onClick={handleChevronClick}
        >
            <select
                ref={selectRef}
                value={value}
                onChange={onChange}
                className={classNames}
            >
                <option value=''>{title}</option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <span className={styles.chevron}>⌄</span>
        </div>
    );
};

export default Select;
