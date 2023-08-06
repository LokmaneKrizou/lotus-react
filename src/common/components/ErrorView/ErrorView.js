import styles from './ErrorView.module.css'
import React from "react";

const ErrorView = ({image, alt, title, content}) => {

    return (

        <div className={styles.emptyView}>
            {image ? <img src={image} alt={alt} width ={300} /> : null}
            {title ? <h2>{title}</h2> : null}
            {content ? <p> {content}</p> : null}
        </div>
    )

}


export default ErrorView