/* eslint-disable react/require-default-props */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';

import ErrorIndicator from '@/components/ErrorIndicator';

const propTypes = exact({
    children: PropTypes.node.isRequired,
    error: PropTypes.bool,
    // eslint-disable-next-line react/no-unused-prop-types
    dispatch: PropTypes.func
});
const defauleProps = {
    error: false,
    dispatch: () => {}
};

function ErrorBoundry({ error, children }) {
    return (
        <>
            { error ? (
                <ErrorIndicator />
            ) : children }
        </>
    );
}

ErrorBoundry.propTypes = propTypes;
ErrorBoundry.defauleProps = defauleProps;

const mapStateToProps = ({ products: { error } }) => ({
    error
});

export default connect(mapStateToProps, null)(ErrorBoundry);
