import {useParams} from "react-router-dom";
import styles from './ProductDetailsPage.module.css';
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchProductDetails, setVariantOption} from "../redux/productDetailsSlice";
import ImageSlideShow from "../components/ImageSlideShow/ImageSlideShow";
import DropDown from "../../../common/components/DropDown/DropDown";
import ProductsList from "../components/ProductsList/ProductsList";
import {fetchMostSearchedProducts} from '../../home/redux/mostSearchedProductsSlice';
import {useState} from 'react';
import SideMenu from '../components/SideMenu/SideMenu';

import {
    setQuantity,
    resetSelection,
    isAddToCartDisabled
} from "../redux/productDetailsSlice";
import {addItemToCartAction, addToCart} from "../../cart/redux/cartSlice";
import ErrorDialog from '../../../common/components/ErrorDialog/ErrorDialog';
import useCurrencyFormatter from "../../../util/priceFormatter";

const ProductDetailsPage = () => {
    const {productId} = useParams();
    const dispatch = useDispatch();
    const productDetails = useSelector((state) => state.productDetails);
    const product = productDetails.product;
    const [errorDialogVisible, setErrorDialogVisible] = useState(false);
    const similarProducts = useSelector((state) => state.mostSearchedProducts.products);
    const addToCartDisabled = useSelector(isAddToCartDisabled);
    const [sideMenuVisible, setSideMenuVisible] = useState(false);
    const isRtl = useSelector((state) => state.rtl.isRtl);
    const rtlStyles = isRtl ? styles.rtl : '';
    const priceFormatter = useCurrencyFormatter();
    useEffect(() => {
        dispatch(fetchProductDetails(productId));
        dispatch(fetchMostSearchedProducts());
        return () => {
            dispatch(resetSelection());
        };
    }, [productId, dispatch]);

    const handleAddToCart = async () => {
        const item = {
            product: productDetails.product,
            variantSelections: productDetails.variantSelections,
            quantity: productDetails.quantity,
        };
        dispatch(addToCart(item))
        const result = await dispatch(addItemToCartAction());
        if (result.success) {
            setSideMenuVisible(true);
        } else {
            setErrorDialogVisible(true);
        }
    };

    const handleCloseErrorDialog = () => {
        setErrorDialogVisible(false);
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
            <ErrorDialog
                visible={errorDialogVisible}
                onClose={handleCloseErrorDialog}
                title="Error"
                message="Failed to add item to cart."
            />
            <div className={styles.body}>
                <ImageSlideShow images={product.images}/>
                <div className={styles.productDescription}>
                    <h1>{product.title}</h1>
                    <h2>{priceFormatter(product.price)}</h2>
                    <pre>{product.description}</pre>
                    <div className={styles.dropdownsWrapper}>
                        {product.variants ? product.variants.map(variant => {
                                return (variant.options && variant.options.length > 1) ?
                                    <DropDown
                                        label={variant.name}
                                        options={variant.options.map(option => option.value)}
                                        onChange={(selectedOption) => dispatch(setVariantOption({
                                            variantName: variant.name,
                                            selectedOption
                                        }))}

                                    /> : null
                            })
                            : null
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
