import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CategoryCard.module.css';

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const CategoryCard = ({ category }) => {
    const backgroundStyle = {
        backgroundImage: `url(${category.imageURL || ''})`,
        backgroundColor: category.imageURL ? '' : getRandomColor(),
    };

    return (
        <div className={styles.categoryCard}>
            <Link to={`/categories/${category.id}`}>
                <div className={styles.categoryBackground} style={backgroundStyle}></div>
            </Link>
            <div className={styles.categoryName}>{category}</div>
        </div>
    );
};

export default CategoryCard;
