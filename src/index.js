import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '@/store/store';
import routes from '@/routes';

import { Header, Footer } from '@/components/Shared';

import '@/assets/scss/main.scss';

ReactDom.render(
    <Provider store={store}>
        <Router>
            <Header />
            {routes}
            <Footer />
        </Router>
    </Provider>,
    document.getElementById('root')
);
