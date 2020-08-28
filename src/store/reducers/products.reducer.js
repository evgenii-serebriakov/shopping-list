import * as types from '@/store/actions/types';

const initialState = {
    products: [],
    loading: true,
    error: null
};

function products(state = initialState, { type, payload }) {
    switch (type) {
    case types.CREATE_PRODUCT_SUCCESS:
        return {
            products: payload.product,
            loading: false,
            error: null
        };
    case types.CREATE_PRODUCT_FAILURE:
        return {
            ...state,
            loading: payload.loading,
            error: payload.error
        };
    case types.FETCH_PRODUCTS_SUCCESS:
        return {
            products: payload.products,
            loading: false,
            error: null
        };
    case types.FETCH_PRODUCTS_FAILURE:
        return {
            ...state,
            loading: payload.loading,
            error: payload.error
        };
    default:
        return state;
    }
}

export default products;
