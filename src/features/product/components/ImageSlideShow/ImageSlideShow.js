import React, {useState} from 'react';
import styles from './ImageSlideShow.module.css';
import {useSelector} from "react-redux";

const ImageSlideshow = ({images}) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const isRtl = useSelector((state) => state.rtl.isRtl);
    const rtlStyles = isRtl ? styles.rtl : '';
    const handleThumbnailClick = (index) => {
        setSelectedIndex(index);
    };

    const handleArrowClick = (direction) => {
        if (direction === 'left') {
            setSelectedIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        } else {
            setSelectedIndex((prevIndex) => (prevIndex + 1) % images.length);
        }
    };
    const showSliderIndicator = images.length > 1

    return (
        <div className={`${styles.slideshow} ${rtlStyles}`}>

            <div className={styles.slideContainer}>
                <div className={styles.thumbnails}>
                    {images.length>1 ?images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className={`${styles.thumbnail} ${
                                index === selectedIndex ? styles.selected : ''
                            }`}
                            onClick={() => handleThumbnailClick(index)}
                        />
                    )):null}
                </div>
                <div className={styles.containerItem}>
                    {showSliderIndicator ?
                        <button className={styles.arrowLeft} onClick={() => handleArrowClick('left')}>
                            &lt;
                        </button> : null}
                </div>
                <div className={styles.containerItem}>
                    <div className={styles.aspectRatioBox}>
                        <img src={images[selectedIndex]} alt={`Product image ${selectedIndex + 1}`} />
                    </div>
                </div>
                <div className={styles.containerItem}>
                    {showSliderIndicator ?
                        <button className={styles.arrowRight} onClick={() => handleArrowClick('right')}>
                            &gt;
                        </button> : null}

                </div>
            </div>
            <div className={styles.dots}>
                {showSliderIndicator ? images.map((_, index) => (
                    <div
                        key={index}
                        className={`${styles.dot} ${index === selectedIndex ? styles.selected : ''}`}
                        onClick={() => handleThumbnailClick(index)}
                    ></div>
                )) : null}
            </div>
        </div>
    );
};

export default ImageSlideshow;
