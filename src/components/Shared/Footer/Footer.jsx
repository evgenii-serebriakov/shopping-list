/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/button-has-type */
import React from 'react';

import styles from './Footer.module.scss';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles['footer__content-inner']}>
                    <div className="footer__copy">
                        <p className="footer__copy-text">
                            {`Copyright © ${year} Shopping list. All rights cleared.`}
                        </p>
                    </div>
                    <div className="footer__social-icons">
                        <div className="footer__icons-group">
                            <a className={styles.footer__icon} href="#/"><i className="fa fa-twitter" aria-hidden="true" /></a>
                            <a className={styles.footer__icon} href="#/"><i className="fa fa-facebook" aria-hidden="true" /></a>
                            <a className={styles.footer__icon} href="#/"><i className="fa fa-vk" aria-hidden="true" /></a>
                            <a className={styles.footer__icon} href="#/"><i className="fa fa-instagram" aria-hidden="true" /></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
