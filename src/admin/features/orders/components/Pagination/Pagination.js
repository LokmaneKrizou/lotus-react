import React from 'react';
import styles from './Pagination.module.css'; // Define styles

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    // Logic to render pagination items
    return (
        <div className={styles.pagination}>
            {/* Render pagination items here */}
        </div>
    );
};

export default Pagination;
