import React, {useState} from 'react';
import styles from './StatusDropDown.module.css';
import IconArrow from "../assets/IconArrow";

// Mock status options
const STATUS_OPTIONS = ['Pending', 'Completed', 'Shipped', 'Confirmed','Cancelled'];
const rootStyle = getComputedStyle(document.documentElement);

const statusColors = {
    pending: rootStyle.getPropertyValue('--color-pending').trim(),
    confirmed: rootStyle.getPropertyValue('--color-confirmed').trim(),
    shipped: rootStyle.getPropertyValue('--color-shipped').trim(),
    completed: rootStyle.getPropertyValue('--color-completed').trim(),
    cancelled: rootStyle.getPropertyValue('--color-cancelled').trim()
};

const StatusDropdown = ({initialStatus}) => {
    const [isOpen, setIsOpen] = useState(false);
    // Ensure that initialStatus is a string with a default value
    const [status, setStatus] = useState(initialStatus || 'Pending');


    const toggleDropdown = () => setIsOpen(!isOpen);

    const selectStatus = (newStatus) => {
        setStatus(newStatus);
        setIsOpen(false);
    };

    return (
        <div className={styles.dropdown}>
            <button className={`${styles.statusIndicator} ${styles[status.toLowerCase()]}`} onClick={toggleDropdown}>
                <span>{status}</span>
                <IconArrow className={isOpen ? styles.arrowUp : ''} color={statusColors[status.toLowerCase()]}/>
            </button>

            {isOpen && (
                <div className={styles.dropdownContent}>
                    {STATUS_OPTIONS.map((option, index) => (
                        <div
                            key={index}
                            className={styles.dropdownItem}
                            onClick={() => selectStatus(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StatusDropdown;
