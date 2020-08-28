/* eslint-disable class-methods-use-this */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';

import SubmissionForm from './SubmissionForm';

class ProductForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {
                title: '',
                description: '',
                category: '',
                price: '',
                image: ''
            },
            categories: [
                { text: 'Electronics', category: 'electronics' },
                { text: 'Cars', category: 'cars' },
                { text: 'Flowers', category: 'flowers' }
            ]
        };
    }

    render() {
        const { categories, values } = this.state;
        return (
            <SubmissionForm
                valuesDefault={values}
                categories={categories}
            />
        );
    }
}

export default ProductForm;
