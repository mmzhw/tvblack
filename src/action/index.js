import { message } from 'antd';
import storage from '../utils/storage';
import yxFetch from '../utils/fetch';
import { REQ_URL } from '../constants/index';
import { REDUCERS_NAME } from '../constants/StateName';
import { PATH } from '../constants/Link';
import { MESSAGE, STORAGE_NAME } from '../constants';

export const loggedIn = (json, userName) => ({
    type: REDUCERS_NAME.LOGIN,
    accessToken: json.data.accessToken,
    userName: userName
});

export const loggedOut = (json, userName) => ({
    type: REDUCERS_NAME.LOGOUT,
    accessToken: '',
    userName: ''
});

export const toLogin = (userInfo, history, from) => dispatch => {
    yxFetch(REQ_URL.LOGIN, {
        userName: userInfo.userName,
        password: userInfo.passWord,
    }).then(res => {
        if (res.code === 0) {
            dispatch(loggedIn(res, userInfo.userName));
            storage.set(STORAGE_NAME.USER_NAME, userInfo.userName);
            storage.set(STORAGE_NAME.ACCESS_TOKEN, res.data.accessToken);
            history.push(from || PATH.ROOT);
        } else {
            console.log(MESSAGE.LOGIN, res);
            message.error(MESSAGE.LOGIN);
        }
    });
};

export const toLogout = (history, userName, accessToken) => dispatch => {
    yxFetch(REQ_URL.LOGOUT, { userName, accessToken }).then(res => {
        if (res.code === 0) {
            dispatch(loggedOut());
            storage.remove(STORAGE_NAME.USER_NAME);
            storage.remove(STORAGE_NAME.ACCESS_TOKEN);
            history.push(PATH.ROOT);
        } else {
            console.log(MESSAGE.LOGOUT, res);
            message.error(MESSAGE.LOGOUT);
        }
    });
};
