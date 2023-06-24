import React from 'react';
import styles from './OrderStatus.module.css';
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

const OrderStatus = ({status}) => {
    const {t} = useTranslation();
    const isRtl = useSelector((state) => state.rtl.isRtl);
    const rtlStyles = isRtl ? styles.rtl : '';

    return (
        <div className={`${styles[status.toLowerCase()]} ${styles.card} ${rtlStyles}`}>
            {t(status)}
        </div>
    );
};

export default OrderStatus;
