import {Link} from "react-router-dom";
import React from "react";
import styles from "./RedirectButton.module.css"

const RedirectButton = ({destination, title}) => {

    return (
        <Link to={destination} className={styles.redirectLink}>
            <button className={styles.redirectButton}> {title}</button>
        </Link>
    )
}
export default RedirectButton