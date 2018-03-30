import { message } from 'antd';
import storage from '../utils/storage';
import yxFetch from '../utils/fetch';
import { REQ_URL } from '../constants';
import { REDUCERS_NAME } from '../constants/StateName';

export const loggedIn = (json, userName) => ({
    type: REDUCERS_NAME.LOGIN,
    accessToken: json.data.accessToken,
    userName: userName
});

export const toLogin = (userInfo, history, from) => dispatch => {
    yxFetch(REQ_URL.LOGIN, {
        userName: userInfo.userName,
        password: userInfo.passWord,
        NOUSERINFO: true,
    }).then(res => {
        if (res.code === 0) {
            dispatch(loggedIn(res, userInfo.userName));
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
