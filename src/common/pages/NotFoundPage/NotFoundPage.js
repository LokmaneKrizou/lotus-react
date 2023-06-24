import React from 'react';
import styles from './NotFoundPage.module.css';
import RedirectButton from "../../components/RedirectButton/RedirectButton";

const NotFoundPage = () => {
    return (
        <div className={styles.notFoundPage}>
            <h1 className={styles.title}>404</h1>
            <p className={styles.description}>Oops! The page you're looking for does not exist.</p>
           <RedirectButton title={"Return Home"} destination={'/'}/>
        </div>
    );
};

export default NotFoundPage;
