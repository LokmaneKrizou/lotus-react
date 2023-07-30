import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import styles from "./PasswordForm.module.css";
import {validateField} from "../../../util/validateForm";
import {changePassword, passwordChangeReset} from "../../../redux/authSlice";

const PasswordForm = () => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [formErrors, setFormErrors] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    useEffect(() => {
        if (auth.passwordChangeSuccess) {
            setFormData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
            setFormErrors({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            });
        }
    }, [auth.passwordChangeSuccess]);

    const handleChange = (field) => (e) => {
        setFormData({
            ...formData,
            [field]: e.target.value
        });

        setFormErrors({
            ...formErrors,
            [field]: ""
        });
        dispatch(passwordChangeReset())
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};
        for (const field in formData) {
            newErrors[field] = validateField(field, formData[field], formData.newPassword);
        }

        setFormErrors(newErrors);

        if (Object.values(newErrors).every((error) => error === "")) {
            dispatch(changePassword({
                newPassword: formData.newPassword,
                currentPassword: formData.currentPassword
            }));
        }
    }

    const renderInput = (field, type, placeholder) => (
        <>
            <label htmlFor={field} className={styles.label}>{field
                .replace(/([A-Z])/g, ' $1') // add a space before each uppercase letter
                .replace(/^./, function (str) {
                    return str.toUpperCase(); // convert the first character to uppercase
                })
            }</label>
            <input
                className={styles.inputField}
                id={field}
                type={type}
                placeholder={placeholder}
                value={formData[field]}
                onChange={handleChange(field)}
                required
            />
            <div className={styles.error}>{formErrors[field]}</div>
        </>
    );

    return (
        <form onSubmit={handleSubmit} noValidate={true}>
            {renderInput("currentPassword", "password", "Enter your current password")}
            {renderInput("newPassword", "password", "Password must be 6 characters minimum")}
            {renderInput("confirmPassword", "password", "Confirm new Password")}
            <div className={styles.error}>{auth.error}</div>
            {auth.passwordChangeSuccess ? <div className={styles.success}>Password Changed Successfully</div> : null}
            <div className={styles.actionButton}>
                <button className={styles.submit} type="submit">Submit</button>
            </div>
        </form>
    );
}

export default PasswordForm;

