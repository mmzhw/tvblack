export const REQ_URL = {
    LOGIN: '/back/auth/login',
    LOGOUT: '/back/auth/logout',
    GET_VIDEO_LIST: '/back/video/getUnAuditVideos', // todo 测试请求用
    GET_VIDEO_DETAIL: '/back/video/getVideoShortDetail', // todo 测试请求用
};

export const BASE_URL = 'http://dxapi.youxiang0210.com';
export const IMG_PRE_FIX = 'http://dx-image-test.itangchao.me/';
export const VIDEO_PRE_FIX = 'http://dx-video-test.itangchao.me/';

// localstorage存储的key
export const STORAGE_NAME = {
    USER_NAME: 'userName',
    ACCESS_TOKEN: 'accessToken',
};

// 一些显示框的宽度
export const WIDTH_DATA = {
    VIDEO_MODAL: 800,
    VIDEO_WRAPPER: 400,
};

// 一些显示的名称
export const NAME = {
    PROJECT_NAME: 'Launcher',
    COPY_RIGHT: 'Design ©2018 Created by YouXiang',
    LOG_IN: '登陆',
    LOG_OUT: '退出',
    USER_NAME: '账号',
    USER_NAME_MSG: '输入帐号',
    PASS_CODE: '密码',
    PASS_CODE_MSG: '输入密码',
    VIDEO_PRE: '视频预览',
    COVER_MAP: '封面图',
};
