/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/button-has-type */
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './ProductListItem.module.scss';

export default function ProductListItem({ products }) {
    return products.map((product) => (
        <article className={styles.products__item} key={product.id}>
            <div className={styles['products__item-inner']}>
                <div className="products__item-image">
                    <Link
                        className="products__item-link"
                        to={`/products/${product.id}`}
                    >
                        <img
                            className={styles['products__item-img']}
                            alt="Is a cool"
                            src={product.imageSrc}
                        />
                    </Link>
                </div>
                <div className={styles['products__item-box']}>
                    <div className={styles['products__item-price']}>
                        <span>$ {product.price}</span>
                    </div>
                    <h4 className={styles['products__item-title']}>
                        <Link
                            className={styles['products__item-link']}
                            to={`/products/${product.id}`}
                        >
                            {product.title}
                        </Link>
                    </h4>
                    <p className={styles['products__item-description']}>
                        {product.description}
                    </p>
                    <div className={styles['products__item-button']}>
                        <Link
                            className={styles['products__item-btn']}
                            to={`/products/${product.id}`}

                        >
                            More info
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    ));
}
