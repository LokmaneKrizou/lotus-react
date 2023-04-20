import React from 'react';
import styles from './SideMenu.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faClose, faWindowClose} from "@fortawesome/free-solid-svg-icons";


const SideMenu = ({visible, onClose, addedItem}) => {
    if (!visible) {
        return null;
    }
    return (
        <>
            <div className={styles.backdrop} onClick={onClose}></div>
            <div className={styles.container}>
                <button className={styles.closeButton} onClick={onClose}>
                    <FontAwesomeIcon icon={faClose} color={"#ffffff"} size={"2xs"}/>
                </button>
                <div className={styles.sideMenu}>
                    <div className={styles.itemInfo}>
                        <div className={styles.productImageContainer}>
                            <img className={styles.productImage} src={addedItem.product.images[0]} alt={`Product image 1`}/>
                            <div className={styles.tickIcon}>
                                <FontAwesomeIcon icon={faCheck} size="xs" />
                            </div>
                        </div>
                        <div className={styles.messageContainer}>
                            <h3>Item added to your cart</h3>
                            <p>Quantity: {addedItem.quantity}</p>
                            <p>Price: {addedItem.product.price*addedItem.quantity}DA</p>
                        </div>
                    </div>
                    <button className={styles.viewBasketButton}>View Basket</button>
                    <button className={styles.keepShoppingButton} onClick={onClose}>Keep Shopping</button>
                </div>
            </div>
        </>
    );
};

export default SideMenu;