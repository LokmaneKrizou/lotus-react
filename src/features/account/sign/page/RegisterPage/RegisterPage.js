import styles from './RegisterPage.module.css';
import {Link, useNavigate} from "react-router-dom";
import React, {useEffect} from 'react';
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import {useSelector} from "react-redux";
import Spinner from "../../../../../common/components/Spinner/Spinner";

const RegisterPage = () => {
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (auth.user) {
            navigate('/');
        }
    }, [auth.user, navigate]);

    return (
        <div className={styles.registerPage}>
            <div className={styles.logo}>
                <Link to="/">Lotus</Link>
            </div>
            {auth.loading && <Spinner/>}
            <div className={styles.registerContainer}>
                <div className={styles.formContainer}>
                    <h2 className={styles.formHeader}>Create an account</h2>
                    <SignUpForm/>
                    <p className={styles.signInLink}>
                        Already have an account? <a href="/signin">Sign in</a>
                    </p>
                </div>
            </div>
        </div>
    );
};
export default RegisterPage;
