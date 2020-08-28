import * as types from '@/store/actions/types';

import emptyImage from '@/assets/img/png/empty.png';

const initialState = {
    srcImage: emptyImage
};

function search(state = initialState, { type, payload }) {
    switch (type) {
    case types.GET_PATH_PICTURE:
        return {
            srcImage: payload
        };
    default:
        return state;
    }
}

export default search;
