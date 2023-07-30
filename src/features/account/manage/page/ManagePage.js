import React, {useEffect} from 'react';
import styles from './ManagePage.module.css';
import ExpandableSection from "../../../../common/components/ExtandableSection/ExtandableSection";
import Delivery from "../../../checkout/components/Delivery/Delivery";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser, updateUser} from "../../redux/authSlice";
import UserInfo from "../components/UserInfo/UserInfo";
import {Link} from "react-router-dom";
import DeleteAccount from "../components/DeleteAccount/DeleteAccount";
import NotFoundPage from "../../../../common/pages/NotFoundPage/NotFoundPage";
import Spinner from "../../../../common/components/Spinner/Spinner";
import PasswordForm from "../components/PasswordForm/PasswordForm";

const ManagePage = () => {

        const dispatch = useDispatch()
        const user = useSelector((state) => state.auth.user)
        const isLoading = useSelector((state) => state.auth.loading)
        useEffect(() => {
            dispatch(fetchUser());
        }, [dispatch]);

        const saveAddress = (address) => {
            dispatch(updateUser({address: address}))
        }
        if (isLoading) {
            return <div className={styles.managePage}>
                <Spinner/>
            </div>;
        }
        if (user) {
            return (
                <div className={styles.managePage}>
                    <h1 className={styles.title}>Manage Account</h1>
                    <p className={styles.description}>Update your personal info and preferred delivery addres</p>
                    <div className={styles.manageContent}>
                        <ExpandableSection
                            initialState={true}
                            title={"User info"}
                            children={
                                <UserInfo/>
                            }
                        />
                        <ExpandableSection
                            title={"Change password"}
                            children={
                                <PasswordForm/>
                            }
                        />

                        <ExpandableSection
                            title={"Default Delivery"}
                            children={<Delivery setDefault={true} saveDefault={(address) => saveAddress(address)}/>}
                        />
                        <Link className={styles.link} to="/account/orders">
                            <ExpandableSection
                                title={"Orders"}
                                children={null}
                            />
                        </Link>
                        <ExpandableSection
                            title={"Delete Account"}
                            children={<DeleteAccount/>}
                        />
                    </div>
                </div>
            );
        }

        if (!user && !isLoading) {
            return <NotFoundPage/>
        }
    }
;

export default ManagePage;
