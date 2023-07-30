import React, {useState} from 'react';
import styles from './ExpandableSection.module.css';
import {useSelector} from "react-redux";

const ExpandableSection = ({title, children, initialState = false}) => {
    const [isOpen, setIsOpen] = useState(initialState);
    const isRtl = useSelector((state) => state.rtl.isRtl);
    const rtlStyles = isRtl ? styles.rtl : '';

    return (
        <div className={`${styles.section} ${rtlStyles}`}>
            <div className={styles.titleWrapper} onClick={() => setIsOpen(!isOpen)}>
                <span className={isOpen ? styles.chevronDown : isRtl? styles.chevronLeft : styles.chevronRight}/>
                    <h3 className={styles.title}>{title}</h3>
            </div>
            {isOpen && <div className={styles.content}>{children}</div>}
        </div>
    );
};

export default ExpandableSection;
