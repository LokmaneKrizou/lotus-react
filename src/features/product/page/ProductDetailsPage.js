import {useParams} from "react-router-dom";
import styles from './ProductDetailsPage.module.css';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchProductDetails,
    setVariantOption,
    addToCartAction,
    selectSelectedVariantQuantity,
    selectIsAddToCartDisabled,
    selectQuantityOptions,
    setQuantity,
    toggleSideMenu,
    toggleErrorDialog,
    selectAddToCartButtonLabel
} from "../redux/productDetailsSlice";
import ImageSlideShow from "../components/ImageSlideShow/ImageSlideShow";
import DropDown from "../../../common/components/DropDown/DropDown";
import ProductsList from "../components/ProductsList/ProductsList";
import {fetchMostSearchedProducts} from '../../home/redux/mostSearchedProductsSlice';
import SideMenu from '../components/SideMenu/SideMenu';
import {resetSelection} from "../redux/productDetailsSlice";
import ErrorDialog from '../../../common/components/ErrorDialog/ErrorDialog';
import useCurrencyFormatter from "../../../util/priceFormatter";

const ProductDetailsPage = () => {
    const {productId} = useParams();
    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.productDetails);
    const product = productDetails.product;
    const similarProducts = useSelector((state) => state.mostSearchedProducts.products);
    const selectedVariantQuantity = useSelector(selectSelectedVariantQuantity);
    const addToCartDisabled = useSelector(selectIsAddToCartDisabled);
    const quantityOptions = useSelector(selectQuantityOptions);
    const addToCartButtonLabel = useSelector(selectAddToCartButtonLabel);
    const isRtl = useSelector((state) => state.rtl.isRtl);
    const rtlStyles = isRtl ? styles.rtl : '';
    const priceFormatter = useCurrencyFormatter();
    const [maxQuantityDialogVisible, setMaxQuantityDialogVisible] = useState(false);

    useEffect(() => {
        if (productDetails.quantity > selectedVariantQuantity && selectedVariantQuantity !== 0) {
            setMaxQuantityDialogVisible(true);
            dispatch(setQuantity(selectedVariantQuantity));
        }
    }, [productDetails.quantity, selectedVariantQuantity, dispatch]);

    useEffect(() => {
        dispatch(fetchProductDetails(productId));
        dispatch(fetchMostSearchedProducts());
        return () => {
            dispatch(resetSelection());
        };
    }, [productId, dispatch]);

    const handleAddToCart = () => {
        dispatch(addToCartAction());
    };

    if (!product || !similarProducts) return null;
    return (
        <div className={`${styles.productDetails} ${rtlStyles}`}>
            <SideMenu
                visible={productDetails.sideMenuVisible}
                onClose={() => dispatch(toggleSideMenu())}
                addedItem={productDetails}
            />
            <ErrorDialog
                visible={maxQuantityDialogVisible}
                onClose={() => setMaxQuantityDialogVisible(false)}
                title="Quantity Error"
                message={`The maximum quantity for the selected variant is ${selectedVariantQuantity}.`}
            />
            <ErrorDialog
                visible={productDetails.errorDialogVisible}
                onClose={() => dispatch(toggleErrorDialog())}
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
                        {product.variants ? product.variants.map((variant, index) => {
                                return (variant.options && variant.options.length > 1) ?
                                    <DropDown
                                        className={styles.sortDropDown}
                                        key={`${variant.name}-${index}`}
                                        label={variant.name}
                                        options={variant.options.map(option => option.value)}
                                        onChange={(selectedOption) => dispatch(setVariantOption({
                                            variantName: variant.name,
                                            selectedOption
                                        }))}

                                    /> :
                                    null
                            })
                            : null
                        }
                        <DropDown
                            className={styles.sortDropDown}
                            label="Quantity"
                            options={quantityOptions}
                            onChange={(value) => dispatch({type: 'productDetails/setQuantity', payload: Number(value)})}
                            defaultValue={1}
                        />
                        <button
                            className={`${styles.addToCartButton} ${addToCartDisabled ? styles.buttonDisabled : ''}`}
                            onClick={handleAddToCart}
                            disabled={addToCartDisabled}>
                            {addToCartButtonLabel}
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
