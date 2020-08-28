import React from 'react';

import loading from '@/assets/img/svg/loading.svg';

import styles from './Loading.module.scss';

export default function Loading() {
    return (
        <div className={styles.loading}>
            <img className="loading__img" src={loading} alt="loading" />
        </div>
    );
}
