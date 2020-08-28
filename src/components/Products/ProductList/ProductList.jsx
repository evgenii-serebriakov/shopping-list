/* eslint-disable react/no-unused-prop-types */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { connect } from 'react-redux';

import Layout from '@/container/Layout';
import { ProductListItem } from '@/components/Products';
import { productsRequested } from '@/store/actions/actions';

import styles from './ProductList.module.scss';

const propTypes = exact({
    products: PropTypes.array,
    productsDownload: PropTypes.func.isRequired,
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
    staticContext: PropTypes.any
});

const defaultProps = {
    products: [],
    staticContext: '',
    history: {},
    location: {},
    match: {}
};

function ProductList({ productsDownload, products }) {
    useEffect(() => {
        productsDownload();
    }, [productsDownload]);

    return (
        <Layout>
            <div className={styles.products}>
                <div className={styles['products__content-inner']}>
                    <h2 className={styles.products__title}>Products</h2>
                    <div className={styles.products__items}>
                        <ProductListItem products={products} />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

ProductList.propTypes = propTypes;
ProductList.defaultProps = defaultProps;

const mapStateToProps = ({ products: { products } }) => ({
    products
});

const mapDispatchToProps = {
    productsDownload: productsRequested
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductList);
