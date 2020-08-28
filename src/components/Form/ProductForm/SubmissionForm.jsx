/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import {
    Formik,
    Field,
    Form,
    ErrorMessage
} from 'formik';

import { productCreate, getImageSrc } from '@/store/actions/actions';
import SignupSchema from './validationShema';

import styles from './SubmissionForm.module.scss';

function ErrorValidation({ children }) {
    return (
        <div className={styles['error-validation']}>
            <span>{ children }</span>
        </div>
    );
}

ErrorValidation.propTypes = exact({ children: PropTypes.string });
ErrorValidation.defaultProps = { children: '' };

function SubmissionForm({
    valuesDefault,
    categories,
    productBuilding,
    imageSrc
}) {
    const [inputFile, setInputFile] = useState(null);

    function onSubmitForm(value, action, prodBuild) {
        prodBuild(value);
        action.resetForm();
    }

    function onFileChange(event, values) {
        const file = event.target.files[0];
        // eslint-disable-next-line no-param-reassign
        values.picture = file;

        const reader = new FileReader();

        reader.onload = () => {
            imageSrc(reader.result);
        };

        reader.readAsDataURL(file);
    }
    return (
        <Formik
            initialValues={valuesDefault}
            validationSchema={SignupSchema}
            onSubmit={(value, action) => onSubmitForm(value, action, productBuilding)}
        >
            {({ isValid, values }) => (
                <Form className="form">
                    <div className={styles['form__form-group']}>
                        <label
                            className="form__label-title form__label"
                            htmlFor="title"
                        >
                            Title
                        </label>
                        <div className={styles['form__field-input']}>
                            <Field
                                id="title"
                                className={`${styles.form__input} ${styles.form__control}`}
                                name="title"
                                placeholder="Add title"
                            />
                        </div>
                        <ErrorMessage name="title" component={ErrorValidation} />
                    </div>
                    <div className="form__form-group">
                        <label
                            className={`form__label-message ${styles.form__label}`}
                            htmlFor="description"
                        >
                            Description
                        </label>
                        <div className="form__field-textarea">
                            <Field
                                id="description"
                                className={`${styles.form__description} ${styles.form__control}`}
                                placeholder="Add message"
                                name="description"
                                as="textarea"
                            />
                        </div>
                        <ErrorMessage name="description" component={ErrorValidation} />
                    </div>
                    <div className={`form__form-group ${styles['form__form-group-price']}`}>
                        <label
                            className={styles['form__label-price']}
                            htmlFor="price"
                        >
                            Price $
                        </label>
                        <div className={styles['form__field-price']}>
                            <Field
                                id="price"
                                className={`${styles.form__input} ${styles.form__control}`}
                                name="price"
                                placeholder="0"
                            />
                        </div>
                        <ErrorMessage name="price" component={ErrorValidation} />
                    </div>
                    <div className={`form__form-group ${styles['form__form-group-category']}`}>
                        <label
                            className={`form__label-category ${styles.form__label}`}
                            htmlFor="category"
                        >
                            Categories
                        </label>
                        <div className="form__field-category">
                            <Field
                                id="category"
                                className={`${styles.form__category} ${styles.form__control}`}
                                placeholder="Favorite Color"
                                name="category"
                                as="select"
                            >
                                {
                                    categories.map((category) => (
                                        <option
                                            key={category.text}
                                            value={category.color}
                                        >
                                            {category.text}
                                        </option>
                                    ))
                                }
                            </Field>
                        </div>
                        <ErrorMessage name="category" component={ErrorValidation} />
                    </div>
                    <div className={`form__form-group ${styles['form__form-group-file']}`}>
                        <div className="form__field-file">
                            <label
                                className={`form__label-file ${styles.form__label}`}
                                htmlFor="category"
                            >
                                Add photo
                            </label>
                            <Field
                                className={styles.form__file}
                                name="image"
                                type="file"
                                accept="image/*"
                                innerRef={(el) => setInputFile(el)}
                                onChange={(e) => onFileChange(e, values)}
                            />
                            <button
                                className={styles['form__file-btn']}
                                onClick={() => { inputFile.click(); }}
                                type="button"
                            >
                                <i
                                    className={`${styles['form__file-icon']} fa fa-cloud-upload`}
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                    </div>
                    <div className={styles.form__button}>
                        <button className={styles.form__btn} type="submit" disabled={!isValid}>
                            Add
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

SubmissionForm.propTypes = exact({
    productBuilding: PropTypes.func.isRequired,
    imageSrc: PropTypes.func,
    valuesDefault: PropTypes.objectOf(PropTypes.string).isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired
});

SubmissionForm.defaultProps = {
    imageSrc: () => {}
};

const mapDispatchToProps = {
    productBuilding: productCreate,
    imageSrc: getImageSrc
};

export default connect(null, mapDispatchToProps)(SubmissionForm);
