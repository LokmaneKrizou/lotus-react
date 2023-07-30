import React from 'react';
import styles from './ChipItem.module.css';

const ChipItem = ({ label, isSelected, onClick }) => {
    const handleClick = () => onClick(label);

    return (
        <div
            className={`${styles.chipItem} ${isSelected ? styles.selected : ''}`}
            onClick={handleClick}
        >
            {label}
        </div>
    );
};

export default ChipItem;
