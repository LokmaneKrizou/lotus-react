// StatusChip.jsx
import React from 'react';
import styles from './StatusChip.module.css';

import {useTranslation} from "react-i18next";

const StatusChip = ({status, selectedStatus, onStatusChange, rtl}) => {
    const {name, color, icon} = status;
    const isSelected = selectedStatus === name;
    const finalColor = isSelected || !selectedStatus ? color : 'grey';
    const {t} = useTranslation();
    return (
        <div
            className={`${styles.statusChip} ${isSelected ? styles.selected : ''} ${rtl ? styles.rtl : ''}`}
            onClick={() => onStatusChange(name)}
        >
            <img
                src={icon}
                alt={name}
                className={styles.icon}
            />
            <span>{t(name) ? t(name) : name}</span>
            <div
                className={styles.statusIndicator}
                style={{backgroundColor: finalColor}}
            />
        </div>
    );
};

export default StatusChip;
