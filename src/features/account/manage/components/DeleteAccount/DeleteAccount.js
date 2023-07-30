import styles from "./DeleteAccount.module.css";
import React from "react";
import {useDispatch} from "react-redux";
import {deleteUser} from "../../../redux/authSlice";

const DeleteAccount = () => {
    const dispatch = useDispatch()

    const handleDeleteAccount = () => {
        dispatch(deleteUser())
    }

    return (
        <div className={styles.deleteSection}>
            <p> Are you sure you want to delete your account?</p>
            <p> All your information including personal info and order
                history will be deleted from our site.</p>
            <p>if you want to proceed press delete. </p>
            <div className={styles.actionButton}>
                <button className={styles.delete} onClick={handleDeleteAccount}> Delete</button>
            </div>
        </div>
    )
}

export default DeleteAccount