import React from 'react';
import styles from './CustomerTestimonialCard.module.css';

const CustomerTestimonialCard = ({ testimonial }) => {
    return (
        <div className={styles.testimonialCard}>
            <p>{testimonial.content}</p>
            <h4>{testimonial.name}</h4>
        </div>
    );
};

export default CustomerTestimonialCard;
