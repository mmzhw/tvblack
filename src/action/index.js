import { message } from 'antd';
import storage from '../utils/storage';
import yxFetch from '../utils/fetch';
import { REQ_URL } from '../constants';

export const loggedIn = (json) => ({
    type: 'GO_LOGIN',
    accessToken: json.data.accessToken
});

export const toLogin = (userInfo, history, from) => dispatch => {
    yxFetch(REQ_URL.LOGIN, {
        userName: userInfo.userName,
        password: userInfo.passWord,
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
