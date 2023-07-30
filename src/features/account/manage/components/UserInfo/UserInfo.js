import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styles from './UserInfo.module.css';
import {updateUser} from "../../../redux/authSlice";
import Divider from "../../../../../common/components/Divider/Divider";
import {validateField} from "../../../util/validateForm";

const UserInfo = () => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
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

    const [isDataChanged, setIsDataChanged] = useState(false);
    const [expanded, setExpanded] = useState(true);

    useEffect(() => {
        if (user) {
            setFormData({...user})
            setExpanded(false);
        }
    }, [user]);
    const handleChange = (field) => (e) => {
        const newFormData = {
            ...formData,
            [field]: e.target.value
        };
        setFormData(newFormData);

        setIsDataChanged((user.firstName !== newFormData.firstName ||
                user.lastName !== newFormData.lastName ||
                user.phone !== newFormData.phone) &&
            user.email === newFormData.email
        );

        setFormErrors({
            ...formErrors,
            [field]: ""
        });
    }

    const isFormValid = () => {
        const newErrors = {};
        for (const field in formData) {
            newErrors[field] = validateField(field, formData[field], formData.password);
        }
        setFormErrors(newErrors);
        return Object.values(newErrors).every((error) => error === "")
    }
    const handleSave = () => {
        if (isFormValid()) {
            if (isDataChanged) {
                dispatch(updateUser(formData));
                setExpanded(false);
            }
        }
    };

    const handleExpand = () => {
        setExpanded(!expanded);
        setIsDataChanged((user.firstName !== formData.firstName ||
                user.lastName !== formData.lastName ||
                user.phone !== formData.phone) &&
            user.email === formData.email
        );
    };
    const handleCancel = () => {
        setIsDataChanged((user.firstName !== formData.firstName ||
                user.lastName !== formData.lastName ||
                user.phone !== formData.phone) &&
            user.email === formData.email
        );
        setFormData({...user})
        handleExpand()
    };


    const renderInput = (field, type, placeholder, disabled = false) => (
        <>
            <label htmlFor={field} className={styles.label}>{field
                .replace(/([A-Z])/g, ' $1') // add a space before each uppercase letter
                .replace(/^./, function (str) {
                    return str.toUpperCase(); // convert the first character to uppercase
                })
            }</label>
            <input
                id={field}
                type={type}
                disabled={disabled}
                placeholder={placeholder}
                value={formData[field]}
                onChange={handleChange(field)}
                required
            />
            <div className={styles.error}>{formErrors[field]}</div>
        </>
    );

    return (
        <div className={styles.clientInfo}>
            {expanded ? (
                <div className={styles.infoForm}>
                    {renderInput("firstName", "text", "First Name")}
                    {renderInput("lastName", "text", "Last Name")}
                    {renderInput("email", "email", "Email Address", true)}
                    {renderInput("phone", "tel", "Enter your phone number")}
                    <div className={styles.actionButtons}>
                        <button className={styles.submit} onClick={handleCancel}>Cancel</button>
                        <button className={`${styles.submit} ${!isDataChanged ? styles.buttonDisabled : ''}`}
                                disabled={!isDataChanged} onClick={handleSave}>Update
                        </button>
                    </div>

                </div>
            ) : (
                <div className={styles.savedInfo}>
                    <p>{formData.firstName}</p>
                    <Divider/>
                    <p>{formData.lastName}</p>
                    <Divider/>
                    <p>{formData.email}</p>
                    <Divider/>
                    <p>{formData.phone}</p>
                    <Divider/>
                    <div className={styles.actionButtons}>
                        <button className={styles.submit} onClick={handleExpand}>Change</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserInfo;
