import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { ProductList, NewProduct } from '@/components/Products';

export default (
    <Switch>
        <Route exact path="/" component={ProductList} />
        <Route path="/new-product" component={NewProduct} />
        <Redirect to="/" />
    </Switch>
);
