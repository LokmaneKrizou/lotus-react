import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {register} from "../../../redux/authSlice";
import styles from "./SignUpForm.module.css";
import {validateField} from "../../../util/validateForm";

const SignUpForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        phone: ""
    });

    const [formErrors, setFormErrors] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        phone: ""
    });


    const auth = useSelector(state => state.auth);

    useEffect(() => {
        if (auth.user) {
            navigate("/");
        }
    }, [auth.user, navigate]);

    const handleChange = (field) => (e) => {
        setFormData({
            ...formData,
            [field]: e.target.value
        });

        setFormErrors({
            ...formErrors,
            [field]: ""
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};
        for (const field in formData) {
            newErrors[field] = validateField(field, formData[field], formData.password);
        }

        setFormErrors(newErrors);

        if (Object.values(newErrors).every((error) => error === "")) {
            dispatch(register(formData));
        }
    }

    const renderInput = (field, type, placeholder) => (
        <>
            <label htmlFor={field} className={styles.label}>
                {field
                    .replace(/([A-Z])/g, ' $1') // add a space before each uppercase letter
                    .replace(/^./, function (str) {
                        return str.toUpperCase(); // convert the first character to uppercase
                    })
                }
            </label>
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
            {renderInput("firstName", "text", "First Name")}
            {renderInput("lastName", "text", "Last Name")}
            {renderInput("email", "email", "Email Address")}
            {renderInput("password", "password", "Password must be 6 characters minimum")}
            {renderInput("confirmPassword", "password", "Confirm Password")}
            {renderInput("phone", "tel", "Enter your phone number")}
            <div className={styles.error}>{auth.error}</div>
            <button className={styles.registerButton} type="submit">Register</button>
        </form>
    );
}

export default SignUpForm;

