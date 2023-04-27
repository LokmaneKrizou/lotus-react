import {useParams} from "react-router-dom";
import styles from './ProductDetailsPage.module.css';
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchProductDetails} from "../../redux/slices/productDetailsSlice";
import ImageSlideShow from "../../components/ImageSlideShow/ImageSlideShow";
import DropDown from "../../components/DropDown/DropDown";
import ProductsList from "../../components/ProductsList/ProductsList";
import {fetchMostSearchedProducts} from '../../redux/slices/mostSearchedProductsSlice';
import {useState} from 'react';
import SideMenu from '../../components/SideMenu/SideMenu';

import {
    setSize,
    setColor,
    setQuantity,
    resetSelection,
    isAddToCartDisabled
} from "../../redux/slices/productDetailsSlice";

const ProductDetailsPage = () => {
    const {productId} = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProductDetails(productId));
        dispatch(fetchMostSearchedProducts())
        return () => {
            dispatch(resetSelection());
        };
    }, [productId, dispatch]);

    const productDetails = useSelector((state) => state.productDetails);
    const product = productDetails.product;
    const similarProducts = useSelector((state) => state.mostSearchedProducts.products);
    const addToCartDisabled = useSelector(isAddToCartDisabled);
    const [sideMenuVisible, setSideMenuVisible] = useState(false);
    const isRtl = useSelector((state) => state.rtl.isRtl);
    const rtlStyles = isRtl ? styles.rtl : '';

    const handleColorChange = (selectedColorName) => {
        dispatch(setColor(selectedColorName));
    };

    const handleSizeChange = (selectedSize) => {
        dispatch(setSize(selectedSize));
    };
    const handleAddToCart = () => {
        setSideMenuVisible(true);
        console.log(`Add to cart clicked ${sideMenuVisible}`);

        // Implement add to cart functionality here
    };

    const handleKeepShopping = () => {
        setSideMenuVisible(false);
    };

    if (!product || !similarProducts) return null;
    return (
        <div className={`${styles.productDetails} ${rtlStyles}`}>
            <SideMenu
                visible={sideMenuVisible}
                onClose={handleKeepShopping}
                addedItem={productDetails}
            />
            <div className={styles.body}>
                <ImageSlideShow images={product.images}/>
                <div className={styles.productDescription}>
                    <h1>{product.title}</h1>
                    <h2>{product.price} DA</h2>
                    <pre>{product.description}</pre>
                    <div className={styles.dropdownsWrapper}>
                        {product.colors && product.colors.length > 1 ?
                            <DropDown
                                label="Color"
                                options={product.colors.map((color) => color.name)}
                                onChange={handleColorChange}
                            /> : null}
                        {product.sizes && product.sizes.length > 1 ?
                            <DropDown
                                label="Size"
                                options={product.sizes}
                                onChange={handleSizeChange}
                            /> : null
                        }
                        <DropDown
                            label="Quantity"
                            options={[...Array(product.totalQuantity > 10 ? 10 : product.totalQuantity).keys()].map((n) => n + 1)}
                            onChange={(value) => dispatch(setQuantity(Number(value)))}
                            defaultValue={1}
                        />
                        <button
                            className={`${styles.addToCartButton} ${addToCartDisabled ? styles.buttonDisabled : ''}`}
                            onClick={handleAddToCart}
                            disabled={addToCartDisabled}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.similarProducts}>
                <ProductsList products={similarProducts} header={"Similar Products"}/>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
