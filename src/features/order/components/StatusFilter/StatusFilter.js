// StatusFilter.jsx

import React from 'react';
import StatusChip from "../StatusChip/StatusChip";
import styles from './StatusFilter.module.css';
import {useSelector} from "react-redux";
import pending from '../../../../assets/images/orderStatus/pending.svg';
import confirmed from '../../../../assets/images/orderStatus/confirmed.svg';
import shipped from '../../../../assets/images/orderStatus/shipped.svg';
import delivered from '../../../../assets/images/orderStatus/delivered.svg';
import cancelled from '../../../../assets/images/orderStatus/cancelled.svg';

const statuses = [
    {name: 'Pending', color: '#f6e05e', icon: pending},  // Light Yellow
    {name: 'Confirmed', color: '#63b3ed', icon: confirmed},  // Light Blue
    {name: 'Shipped', color: '#94e1c7', icon: shipped},  // Medium Green
    {name: 'Delivered', color: '#48bb78', icon: delivered},  // Light Green
    {name: 'Cancelled', color: '#e53e3e', icon: cancelled},  // Light Red
];

const StatusFilter = ({selectedStatus, onStatusChange}) => {
    const isRtl = useSelector((state) => state.rtl.isRtl);
    const rtlStyles = isRtl ? styles.rtl : '';

    return (
        <div className={`${styles.statusFilter} ${rtlStyles}`}>
            {statuses.map((status, index) => (
                <StatusChip
                    key={`${status.name}-${index}`}
                    status={status}
                    selectedStatus={selectedStatus}
                    onStatusChange={onStatusChange}
                    rtl={isRtl}
                />
            ))}
        </div>
    );
};

export default StatusFilter;
