import * as types from '@/store/actions/types';

import ProductService from '@/api';

const productService = new ProductService();

function productCreate(product) {
    return async (next) => {
        next({ type: types.CREATE_PRODUCT_REQUST });

        try {
            const response = await productService.productCreate(product);
            next({
                type: types.GET_PATH_PICTURE,
                payload: ''
            });

            next({
                type: types.CREATE_PRODUCT_SUCCESS,
                payload: {
                    product: response,
                    loading: false,
                    error: null
                }
            });
        } catch (err) {
            next({
                type: types.CREATE_PRODUCT_FAILURE,
                payload: {
                    loading: false,
                    error: err
                }
            });
        }
    };
}

function productsRequested() {
    return async (next) => {
        next({ type: types.FETCH_PRODUCTS_REQUST });

        try {
            const products = await productService.fetchProducts();

            next({
                type: types.FETCH_PRODUCTS_SUCCESS,
                payload: {
                    products,
                    loading: false,
                    error: null
                }
            });
        } catch (err) {
            next({
                type: types.FETCH_PRODUCTS_FAILURE,
                payload: {
                    loading: false,
                    error: err
                }
            });
        }
    };
}

function getImageSrc(src) {
    return (next) => {
        next({
            type: types.GET_PATH_PICTURE,
            payload: src
        });
    };
}

export {
    productCreate,
    productsRequested,
    getImageSrc
};
