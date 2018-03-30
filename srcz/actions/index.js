import { message } from 'antd';
import storage from '../utils/storage';
import yxFetch from '../utils/fetch';
import { REQ_URL } from '../constants/constants';

export const LOGGED_IN = 'LOGGED_IN';

export const loggedIn = (json) => ({
    type: LOGGED_IN,
    accessToken: json.data.accessToken
});

const fetchLogin = (userInfo, history, from) => dispatch => {
    yxFetch(REQ_URL.LOGIN, {
        userName: userInfo.userName,
        password: userInfo.passwd,
        NOUSERINFO: true,
    }).then(res => {
        if (res.code === 0) {
            dispatch(loggedIn(res));
            storage.set('user', {
                userName: userInfo.userName,
                accessToken: res.data.accessToken
            });
            history.push(from || '/');
        } else {
            // FIXME: 用dispatch触发方法
            message.error(res.errmsg);
        }
    });
};

export const toLogin = (userInfo, history, from) => dispatch => {
    return dispatch(fetchLogin(userInfo, history, from));
};
