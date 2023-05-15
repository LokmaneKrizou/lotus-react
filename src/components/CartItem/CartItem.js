import React from 'react';
import styles from './CartItem.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {useDispatch} from "react-redux";
import {refreshCart, removeFromCart, updateQuantity} from "../../redux/slices/cartSlice";

const CartItem = ({item}) => {

    const dispatch = useDispatch();

    const onDelete = async (item) => {
        dispatch(removeFromCart(item))
        await dispatch(refreshCart())
    }
    const increaseOne = async (item) => {
        const updatedItem = {...item, quantity: item.quantity + 1}
        dispatch(updateQuantity(updatedItem))
        await dispatch(refreshCart())
    }
    const decreaseOne = async (item) => {
        if (item.quantity === 1) {
            dispatch(removeFromCart(item))
        } else {
            const updatedItem = {...item, quantity: item.quantity - 1}
            dispatch(updateQuantity(updatedItem))
        }
        await dispatch(refreshCart())
    }
    return (
        <div className={styles.cartItem}>
            <div className={styles.cartItemContent}>
                <img src={item.product.images[0]} alt={item.product.name}/>
                <div className={styles.cartItemInfo}>
                    <h3>{item.product.name}</h3>
                    {item.variantSelections && item.variantSelections.map(variant => {
                        return <p>{variant.name}: {variant.value}</p>
                    })}
                    <div className={styles.quantity}>
                        <button onClick={() => decreaseOne(item)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => increaseOne(item)}>+</button>
                    </div>
                </div>
                <p>${item.product.price.toFixed(2)}</p>
            </div>
            <div className={styles.cartItemDelete}>
                <FontAwesomeIcon icon={faTrash} onClick={() => onDelete(item)}/>
            </div>
        </div>
    );
};

export default CartItem;
