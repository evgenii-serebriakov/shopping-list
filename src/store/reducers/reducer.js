import { combineReducers } from 'redux';

import products from '@/store/reducers/products.reducer';
import search from '@/store/reducers/search.reducer';

export default combineReducers({
    products,
    search
});
