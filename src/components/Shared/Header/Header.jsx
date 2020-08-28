import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '@/assets/img/png/logo.png';

import styles from './Header.module.scss';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className="header__top container">
                <div className={styles['header__top-inner']}>

                    <div className={styles.logo}>
                        <NavLink className="logo__link" to="/">
                            <img
                                className={styles.logo__img}
                                src={logo}
                                alt="logo"
                            />
                        </NavLink>
                    </div>

                    <nav className="menu">
                        <ul className={styles.menu__list}>
                            <li className={styles['menu__list-item']}>
                                <NavLink
                                    activeClassName="menu__link--active"
                                    className={styles.menu__link}
                                    exact
                                    to="/"
                                >
                                    Products
                                </NavLink>
                            </li>
                            <li className="menu__list-item">
                                <NavLink
                                    activeClassName="menu__link--active"
                                    className={styles.menu__link}
                                    to="/new-product"
                                >
                                    New product
                                </NavLink>
                            </li>
                        </ul>
                    </nav>

                </div>
            </div>
        </header>
    );
}
