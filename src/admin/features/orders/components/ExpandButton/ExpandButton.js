import React from 'react';
import styles from './ExpandButton.module.css';
import IconArrowCircle from "../assets/IconArrowCircle";

const ExpandButton = ({ onClick, isExpanded }) => {
    return (
        <button onClick={onClick} className={styles.expandButton}>
            <IconArrowCircle className={isExpanded ? styles.rotate : styles.rotateBack}/>
        </button>
    );
};

export default ExpandButton;
