import { REDUCERS_NAME } from '../constants/StateName';

const loginRedux = (state = {
    isAuthenticated: false,
    accessToken: '',
    userName: '',
}, action) => {
    switch (action.type) {
        case REDUCERS_NAME.LOGIN:
            // 登录
            return {
                ...state,
                isAuthenticated: true,
                accessToken: action.accessToken,
                userName: ''
            };
        case REDUCERS_NAME.LOGOUT:
            return state;
        default:
            return state;
    }
};

export default loginRedux;

