import React, {useCallback, useEffect, useState} from "react";
import styles from "./DoubleSlider.module.css";
import useCurrencyFormatter from "../../../../util/priceFormatter";

const DoubleSlider = ({label, min, max, onChange}) => {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const priceFormatter = useCurrencyFormatter();

    useEffect(() => {
        setMinVal(min);
        setMaxVal(max);
    }, [min, max]);

    const getPercent = useCallback(
        (value) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    // Effect to handle min value changes
    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxVal);

        if (document.querySelector(`.${styles.slider__range}`)) {

            document.querySelector(`.${styles.slider__range}`).style.left = `${minPercent}%`;
            document.querySelector(`.${styles.slider__range}`).style.width = `${maxPercent - minPercent}%`
        }
    }, [minVal, getPercent]);

    // Effect to handle max value changes
    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxVal);
        if (document.querySelector(`.${styles.slider__range}`)) {
            document.querySelector(`.${styles.slider__range}`).style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, getPercent]);

    // Effect to call the external onChange function
    useEffect(() => {
        onChange({min: minVal, max: maxVal});
    }, [minVal, maxVal]);

    return (
        <div className={styles.container}>
            <input
                type="range"
                min={min}
                max={max}
                value={minVal}
                onChange={(event) => {
                    const value = Math.min(Number(event.target.value), maxVal - 1);
                    setMinVal(value);
                }}
                className={`${styles.thumb} ${styles.thumbZindex3} ${minVal > max - 100 ? styles.thumbZindex5 : ""}`}
            />
            <input
                type="range"
                min={min}
                max={max}
                value={maxVal}
                onChange={(event) => {
                    const value = Math.max(Number(event.target.value), minVal + 1);
                    setMaxVal(value);
                }}
                className={`${styles.thumb} ${styles.thumbZindex4}`}
            />

            <div className={styles.doubleSlider}>
                <div className={styles.slider}>
                    <div className={styles.slider__track}/>
                    <div className={styles.slider__range}/>
                </div>
                <div className={styles.valueContainer}>
                    <div className={styles.sliderLeftValue}>{priceFormatter(minVal)}</div>
                    <div className={styles.sliderRightValue}>{priceFormatter(maxVal)}</div>
                </div>
            </div>
        </div>
    );
};

export default DoubleSlider;