import React from 'react';
import CategoryCard from '../CategoryCard/CategoryCard';
import styles from './CategoriesList.module.css';
import {useSelector} from "react-redux";

const CategoriesList = () => {
    const categories = useSelector((state) => state.categories.categories);
    const error = useSelector((state) => state.categories.error);

    if (error) {
        return <p>Something went wrong while fetching categories. Please try again later.</p>;
    }

    return (
        <div className={styles.categoriesContainer}>
            <p className={styles.categoriesListHeader}>Incredible style and decor, plus one-of-a-kind gifts right this way!
            </p>
            <div className={styles.categoriesList}>
                {categories.map((category) => (
                    <CategoryCard key={category.id} category={category} />
                ))}
            </div>

        </div>
    );
};

export default CategoriesList;
