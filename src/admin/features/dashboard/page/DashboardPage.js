import React from 'react';
import {useSelector} from 'react-redux';
import OverviewCard from '../components/OverviewCard/OverviewCard';
import styles from './DashboardPage.module.css'
import Divider from "../../../../common/components/Divider/Divider";

const DashboardPage = () => {

    const isRtl = useSelector((state) => state.rtl.isRtl);
    const rtlStyles = isRtl ? styles.rtl : '';
    return (
        <div className={`${styles.dashboardPage} ${rtlStyles}`}>
            <OverviewCard/>
            <div className={styles.body}>
                <Divider/>
            </div>
        </div>
    );
};

export default DashboardPage;