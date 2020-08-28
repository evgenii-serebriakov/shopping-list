/* eslint-disable react/no-unused-prop-types */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';

import { ProductForm } from '@/components/Form';
import Layout from '@/container/Layout';
import { productsRequested } from '@/store/actions/actions';

import styles from './NewProduct.module.scss';

const propTypes = exact({
    productsDownload: PropTypes.func.isRequired,
    srcImage: PropTypes.string,
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
    staticContext: PropTypes.any,
    dispatch: PropTypes.func
});

const defaultProps = {
    srcImage: '',
    staticContext: '',
    history: {},
    location: {},
    match: {},
    dispatch: () => {}
};

function NewProduct({ srcImage, productsDownload }) {
    useEffect(() => {
        productsDownload();
    }, [productsDownload]);

    return (
        <Layout>
            <div className={styles['new-product']}>
                <h2 className={styles['new-product__title']}>Add product</h2>
                <ProductForm />
            </div>
            <div className={styles.picture}>
                <div className={styles['picture__picture-inner']}>
                    <img className="picture__picture-img" src={srcImage} alt="Product view" />
                </div>
            </div>
        </Layout>
    );
}

NewProduct.propTypes = propTypes;
NewProduct.defaultProps = defaultProps;

const mapStateToProps = ({ search: { srcImage } }) => ({
    srcImage
});

const mapDispatchToProps = {
    productsDownload: productsRequested
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewProduct);
