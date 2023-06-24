import React, {useEffect, useState} from 'react';
import styles from './SignInPage.module.css';
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from 'react-redux';
import Spinner from '../../../../../common/components/Spinner/Spinner';
import SignInForm from "../../components/SignInForm/SignInForm";


function SignInPage() {

    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (auth.user) {
            navigate('/');
        }
    }, [auth.user, navigate]);

    return (
        <div className={styles.signInPage}>
            <div className={styles.logo}>
                <Link to="/">Lotus</Link>
            </div>
            {auth.loading && <Spinner/>}
            <div className={styles.signInContainer}>
                <div className={styles.formContainer}>
                    <h2 className={styles.formHeader}>Sign In</h2>
                    <SignInForm/>
                    <p className={styles.signUpLink}>
                        You don't have an account? <a href="/register">Join Lotus family</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignInPage;
