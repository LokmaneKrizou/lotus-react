import React, {useEffect, useState} from 'react';
import styles from './SignInPage.module.css';
import {Link,useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../redux/slices/authSlice';
import Spinner from '../../components/Spinner/Spinner';

const SignInPage = () => {
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

    const handleSubmit =  async (e) => {
        e.preventDefault();
        console.log(email,password)
        dispatch(login({email, password}));
    };
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    return (
        <div className={styles.signInPage}>
            <div className={styles.logo}>
                <Link to="/">Lotus</Link>
            </div>
            {auth.loading && <Spinner />}
            <div className={styles.signInContainer}>
                <div className={styles.formContainer}>
                    <h2 className={styles.formHeader}>Sign In</h2>
                    <form onSubmit={handleSubmit}>
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
                    </form>
                    <p className={styles.signUpLink}>
                        You don't have an account? <a href="/register">Join Lotus family</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
