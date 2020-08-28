import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import createRootReducer from '@/store/reducers/reducer';

const store = createStore(
    createRootReducer,
    // eslint-disable-next-line no-underscore-dangle
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true }),
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
