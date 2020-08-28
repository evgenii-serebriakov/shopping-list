import React from 'react';
import { productsRequested } from '@/store/actions/actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';

import styles from './ErrorIndicator.module.scss';

const propTypes = exact({
    fetchProducts: PropTypes.func.isRequired
});

function ErrorIndicator({ fetchProducts }) {
    return (
        <div className={styles['error-indicator']}>
            <h2 className={styles['error-indicator__title']}>
                Opss... Something went wrong!
            </h2>
            <button
                className={styles['error-indicator__btn']}
                onClick={fetchProducts}
                type="button"
            >
                Repeat
            </button>
        </div>
    );
}

ErrorIndicator.propTypes = propTypes;

const mapDispatchToProps = {
    fetchProducts: productsRequested
};

export default connect(
    null,
    mapDispatchToProps
)(ErrorIndicator);
