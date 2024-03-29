import React from 'react';
import {useSelector} from 'react-redux';
import styles from './DashboardPage.module.css'
import ErrorView from "../../../../common/components/ErrorView/ErrorView";
import emptySearch from "../../../../assets/images/emptySearch/empty_search.svg";

const DashboardPage = () => {

    const isRtl = useSelector((state) => state.rtl.isRtl);
    const rtlStyles = isRtl ? styles.rtl : '';
    return (
        <div className={`${styles.dashboardPage} ${rtlStyles}`}>
            <div className={styles.body}>
                <ErrorView
                    image={emptySearch}
                    content={`No product results found,`}
                />
            </div>
        </div>
    );
};

export default DashboardPage;