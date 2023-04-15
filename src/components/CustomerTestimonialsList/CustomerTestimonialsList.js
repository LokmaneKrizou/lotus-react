import React from 'react';
import CustomerTestimonialCard from '../CustomerTestimonialCard/CustomerTestimonialCard';
import customerTestimonialsData from '../../data/customerTestimonialsData';

const CustomerTestimonialsList = () => {
    return (
        <div>
            {customerTestimonialsData.map((testimonial) => (
                <CustomerTestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
        </div>
    );
};

export default CustomerTestimonialsList;
