import styles from "./SearchFilters.module.css"
import CustomDropdown from "../../../../common/components/DropDown/DropDown";
import {
    setSort,
    setCategoryFilter,
    selectPossibleFilters,
    setPriceRangeFilter,
    setVariantFilter
} from "../../redux/searchSlice";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Divider from "../../../../common/components/Divider/Divider";
import WrappedChipGroup from "../WrappedChipGroup/WrappedChipGroup";
import DoubleSlider from "../DoubleSlider/DoubleSlider";

const SearchFilters = () => {
    const dispatch = useDispatch();

    const {categories, prices, variants} = useSelector(selectPossibleFilters);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const handleCategoryChange = (category) => {
        dispatch(setCategoryFilter(category));
    };

    const handlePriceChange = (priceRange) => {
        dispatch(setPriceRangeFilter(priceRange));
    };

    const handleVariantChange = (selectedVariants) => {
        dispatch(setVariantFilter(selectedVariants));
    };

    useEffect(() => {
        dispatch(setSort("Quality"));
    }, []);

    return (
        <div className={styles.sortContainer}>
            <CustomDropdown
                defaultValue={"Quality"}
                className={styles.sortDropDown}
                label={"Sort"}
                required={false}
                options={Array.of("New", "Cheapest", "Quality")}
                onChange={(selectedOption) => {
                    dispatch(setSort(selectedOption));
                }}
            />
            <Divider/>
            <CustomDropdown
                className={styles.categoryDropDown}
                label={"Category"}
                options={categories}
                onChange={handleCategoryChange}
            />
            <Divider/>
            <DoubleSlider
                className={styles.priceRange}
                label={"Price"}
                min={minPrice}
                max={maxPrice}
                onChange={handlePriceChange}
            />
            <Divider/>
            <WrappedChipGroup
                className={styles.variantCheckboxGroup}
                label={"Variants"}
                variants={variants}
                onChange={handleVariantChange}
            />

            <Divider/>
        </div>
    )
}

export default SearchFilters;
