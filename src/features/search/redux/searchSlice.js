import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import api from '../../../common/api';

export const fetchSearchResults = createAsyncThunk(
    'search/fetchSearchResults',
    async ({searchTerm, cursor}, {rejectWithValue}) => {
        try {
            return await api.products.searchProducts(searchTerm, cursor);
        } catch (error) {
            console.error('Error in fetchSearchResults:', error);
            return rejectWithValue(error.message);
        }
    }
);

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        products: [],
        pageInfo: {endCursor: null, hasNextPage: false},
        searchTerm: '',
        sort: 'new',
        filters: {
            category: null,
            priceRange: {
                min: null,
                max: null
            },
            variants: []
        },
        status: 'idle',
        error: null,
    },
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
            state.products = []
            state.pageInfo = {endCursor: null, hasNextPage: false}
        },
        setSort: (state, action) => {
            state.sort = action.payload;
        },
        setCategoryFilter: (state, action) => {
            state.filters.category = action.payload;
        },
        setPriceRangeFilter: (state, action) => {
            state.filters.priceRange = action.payload;
        },
        setVariantFilter: (state, action) => {
            state.filters.variants = action.payload;
        },
        clearFilters: (state) => {
            state.filters.category = null;
            state.filters.priceRange = {min: null, max: null};
            state.filters.variants = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchResults.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchSearchResults.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (state.products.length === 0) {
                    state.products = [...action.payload.products];
                } else if (state.pageInfo.endCursor !== action.payload.pageInfo.endCursor) {
                    state.products = [...state.products, ...action.payload.products];
                }
                state.pageInfo = action.payload.pageInfo;
            })
            .addCase(fetchSearchResults.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const {
    setSearchTerm,
    setSort,
    setCategoryFilter,
    setPriceRangeFilter,
    setVariantFilter,
    clearFilters
} = searchSlice.actions;
export const selectSortedAndFilteredProducts = createSelector(
    state => state.search.products,
    state => state.search.sort,
    state => state.search.filters,
    (products, sort, filters) => {
        let filteredProducts = [...products];
        // filter by category
        if (filters.category) {
            filteredProducts = filteredProducts.filter(product => product.category === filters.category);
        }

        // filter by price range
        if (filters.priceRange.min !== null && filters.priceRange.max !== null) {
            filteredProducts = filteredProducts.filter(product => product.price >= filters.priceRange.min && product.price <= filters.priceRange.max);
        }

        // filter by variants
        if (filters.variants.length) {
            filteredProducts = filteredProducts.filter(product => {
                return filters.variants.every(selectedVariant => {
                    return product.variants.some(productVariant => {
                        return productVariant.options.some(option => {
                            return selectedVariant.name === productVariant.name && selectedVariant.value === option.value;
                        });
                    });
                });
            });
        }

        // sort
        switch (sort) {
            case 'New':
                filteredProducts.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
                break;
            case 'Cheapest':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'Quality':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }

        return filteredProducts;
    }
);

export const selectPossibleFilters = createSelector(
    state => state.search.products,
    (products) => {
        let categories = new Set();
        let prices = new Set();
        let variantMap = new Map();


        products.forEach(product => {
            categories.add(product.category);
            prices.add(product.price);
            product.variants.forEach(variant => {
                // Check if the variant name is already in the map
                if (variantMap.has(variant.name)) {
                    // If the variant name is already in the map, add the new option values to the existing set
                    const existingSet = variantMap.get(variant.name);
                    variant.options.forEach(option => existingSet.add(option.value));
                } else {
                    // If the variant name is not in the map, create a new set with the option values
                    let newSet = new Set();
                    variant.options.forEach(option => newSet.add(option.value));
                    variantMap.set(variant.name, newSet);
                }
            });
        });

        return {
            categories: [...categories],
            prices: [...prices],
            variants: variantMap
        };
    }
);

export default searchSlice.reducer;

