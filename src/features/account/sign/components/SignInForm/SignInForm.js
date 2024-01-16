import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {login} from "../../../redux/authSlice";
import styles from "./SignInForm.module.css";

const SignInForm = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (auth.user) {
            navigate('/');
        }
    }, [auth.user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(login({email, password}));
    };
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);


    return <form onSubmit={handleSubmit}>
        <label htmlFor="email" className={styles.label}>Email</label>
        <input type="email"
               className={styles.inputField}
               placeholder={"example@email.com"}
               value={email}
               onChange={handleEmailChange}
               id="email"
               required
        />
        <label htmlFor="password" className={styles.label}>Password</label>
        <input type="password"
               id="password"
               className={styles.inputField}
               placeholder={"minimum size is 6 characters"}
               value={password}
               onChange={handlePasswordChange}
               required
        />
        <button type="submit" className={styles.submitButton}>Sign In</button>
    </form>;
}

export default SignInForm;