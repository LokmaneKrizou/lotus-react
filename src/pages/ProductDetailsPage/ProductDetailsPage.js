import {useParams} from "react-router-dom";
import styles from './ProductDetailsPage.module.css';
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchProductDetails} from "../../redux/slices/productDetailsSlice";
import ImageSlideShow from "../../components/ImageSlideShow/ImageSlideShow";
import DropDown from "../../components/DropDown/DropDown";
import ProductsList from "../../components/ProductsList/ProductsList";
import {fetchMostSearchedProducts} from '../../redux/slices/mostSearchedProductsSlice';

const ProductDetailsPage = () => {
    const {productId} = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProductDetails(productId));
        dispatch(fetchMostSearchedProducts())
    }, [productId, dispatch]);

    const product = useSelector((state) => state.productDetails.product);
    const similarProducts = useSelector((state) => state.mostSearchedProducts.products);
    const isRtl = useSelector((state) => state.rtl.isRtl);
    const rtlStyles = isRtl ? styles.rtl : '';

    if (!product || !similarProducts) return null;
    const handleColorChange = (selectedColorName) => {
        const selectedColor = product.colors.find((color) => color.name === selectedColorName);
        console.log('Selected color:', selectedColor);
    };

    const handleSizeChange = (selectedSize) => {
        console.log('Selected size:', selectedSize);
    };
    return (
        <div className={`${styles.productDetails} ${rtlStyles}`}>
            <div className={styles.body}>
                <ImageSlideShow images={product.images}/>
                <div className={styles.productDescription}>
                    <h1>{product.title}</h1>
                    <h2>{product.price}DA</h2>
                    <p>{product.description}</p>
                    <div>
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
                    </div>
                </div>
            </div>
            <div className={styles.body}>
                <ProductsList products={similarProducts} header={"Similar Products"}/>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
