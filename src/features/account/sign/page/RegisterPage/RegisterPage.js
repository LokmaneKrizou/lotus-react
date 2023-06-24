import styles from './RegisterPage.module.css';
import {Link} from "react-router-dom";
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {register} from '../../redux/authSlice';

const RegisterPage = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleFirstNameChange = (e) => setFirstName(e.target.value);
    const handleLastNameChange = (e) => setLastName(e.target.value);
    const handleAddressChange = (e) => setAddress(e.target.value);
    const handlePhoneChange = (e) => setPhone(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register({
            email,
            password,
            firstName,
            lastName,
            address,
            phone,
        }));
    }
    return (
        <div className={styles.registerPage}>
            <div className={styles.logo}>
                <Link to="/">Lotus</Link>
            </div>
            <div className={styles.registerContainer}>
                <div className={styles.formContainer}>
                    <h2 className={styles.formHeader}>Create an account</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            className={styles.inputField}
                            type="text"
                            placeholder="Full Name"
                            required
                        />
                        <input
                            className={styles.inputField}
                            type="email"
                            placeholder="Email Address"
                            required
                        />
                        <input
                            className={styles.inputField}
                            type="password"
                            placeholder="Password"
                            required
                        />
                        <input
                            className={styles.inputField}
                            type="password"
                            placeholder="Confirm Password"
                            required
                        />
                        <button className={styles.registerButton} type="submit">
                            Register
                        </button>
                    </form>
                    <p className={styles.signInLink}>
                        Already have an account? <a href="/signin">Sign in</a>
                    </p>
                </div>
            </div>
        </div>
    );
};
export default RegisterPage;
