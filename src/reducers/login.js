import { REDUCERS_NAME } from '../constants/StateName';

const login = (state = {
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
                userName: action.userName
            };
        case REDUCERS_NAME.LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                accessToken: '',
                userName: ''
            };
        default:
            return state;
    }
};

export default login;

