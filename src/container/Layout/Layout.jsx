import React from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { connect } from 'react-redux';

import Loading from '@/components/Loading';
import ErrorBoundry from '@/container/ErrorBoundry';

import styles from './Layout.module.scss';

const propTypes = exact({
    children: PropTypes.node.isRequired,
    products: PropTypes.arrayOf(PropTypes.object).isRequired,
    loading: PropTypes.bool,
    // eslint-disable-next-line react/no-unused-prop-types
    dispatch: PropTypes.func
});

const defaultProps = {
    dispatch: () => {},
    loading: true
};

function Layout({ loading, products, children }) {
    return (
        <main className={styles.main}>
            <ErrorBoundry>
                { !loading && products.length !== 0 ? (
                    <div className="container">
                        <div className={styles['main__content-inner']}>
                            {children}
                        </div>
                    </div>
                ) : <Loading /> }
            </ErrorBoundry>
        </main>
    );
}

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

const mapStateToProps = ({ products: { loading, products } }) => ({
    loading,
    products
});

export default connect(mapStateToProps, null)(Layout);
