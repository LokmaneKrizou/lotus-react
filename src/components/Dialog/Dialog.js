import React from 'react';
import styles from './Dialog.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/free-solid-svg-icons";

const Dialog = ({positive, negative, message, title, component, onClose}) => {
    return (
        <div className={styles.dialogOverlay}>
            <div className={styles.dialogContainer}>
                <div className={styles.dialogContent}>
                    <h2>{title}</h2>
                    <div className={styles.dialogButtons}>
                        {negative ? <button className={styles.dialogButton} onClick={() => negative.onClick()}>
                            {negative.text}
                        </button> : null}
                        <div className={styles.divider}>
                            <span className={styles.dividerLine}></span>
                            <span className={styles.dividerText}>OR</span>
                            <span className={styles.dividerLine}></span>
                        </div>
                        {component ? <>
                            <h2>Sign In</h2>
                            <p>{message}</p>
                            {component}
                        </> : null}
                        {(!component && positive) ?
                            <button className={styles.dialogButton} onClick={() => positive.onClick()}>
                                {positive.text}
                            </button> : null}
                    </div>
                </div>
                <div className={styles.closeDialog} onClick={onClose}>
                    <FontAwesomeIcon icon={faClose} color={"#ffffff"}  size={"2xs"}/>
                </div>
            </div>
        </div>
    );
};

export default Dialog;
