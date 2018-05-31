export const REQ_URL = {
    LOGIN: '/back/auth/login',
    LOGOUT: '/back/auth/logout',
    GET_VIDEO_LIST: '/back/video/getUnAuditVideos', // todo 测试请求用
    GET_VIDEO_DETAIL: '/back/video/getVideoShortDetail', // todo 测试请求用
    GET_INDEX_OPTION: 'http://10.100.107.175:8088/ms/back/queryCard', // 获取首页配置信息
    SAVE_INDEX_OPTION: 'http://10.100.107.175:8088/ms/back/updateCard', // 更改首页配置信息
    UPLOAD_TOKEN: '/back/qiniu/image/uploadToken',
    QINIU: 'http://up.qiniu.com',
    SEARCH_VIDEO_LISTS: 'http://10.100.107.175:8088/tv/video/searchvideo',
    OTT_OTHER_LIST: '/ott/back/channel/other/list', // 获取ott直播，资讯以及推荐列表的接口
    OTT_OTHER_MODIFY: '/ott/back/channel/other/update', // 修改，增加，删除
    GET_CATEGORY: 'http://10.100.107.175:8088/tv/category/getcategory',
    GET_CHANNELS: 'http://10.100.107.175:8088/ms/back/queryChannel',
    PUBLISH_INDEX: 'http://10.100.107.175:8088/ms/back/publish', // 发布首页配置
    VIDEO_PROCESS: '/back/video/process', // 转码
};

export const BASE_URL = 'http://daxiangapi.youxiang0210.com';
export const IMG_PRE_FIX = 'https://image.youxiang0210.com/';
export const VIDEO_PRE_FIX = 'https://video.youxiang0210.com/';

// localstorage存储的key
export const STORAGE_NAME = {
    USER_NAME: 'userName',
    ACCESS_TOKEN: 'accessToken',
};

// 一些显示框的宽度
export const WIDTH_DATA = {
    VIDEO_MODAL: 800,
    VIDEO_WRAPPER: 400,
    PLAYER_WIDTH: 800,
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
    PAGE_WRAPPER: '页面布局',
    PAGE_PRE: '页面预览',
    CLICK_MENU: '点击激活组件',
    CLICK_OPTION: '点击相应区域，可配置内容',
    ADD_MODULE: '+',
};

export const MESSAGE = {
    LOGIN: '登陆失败',
    LOGOUT: '登出失败',
    GET_VIDEO_FAILED: '获取视频信息失败',
    GET_VIDEO_LIST: '获取视频列表失败',
    GET_CHANNEL_ERROR: '获取频道失败',
    GET_INDEX_OPTION_ERROR: '获取配置失败',
    SAVE_SUCCESS: '添加/修改/删除成功',
    PUBLISH_SUCCESS: '发布成功',
    PUBLISH_ERROR: '发布失败',
    DELETE_SURE: '确定删除吗？',
};

// 模板限制个数
export const ASSEMBLY_NUM = {
    BANNER: [0, 1, 2, 3, 4, 5, 6],
    TRANSVERSE: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    VERTICAL: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
};

// 模板类别标识
export const MODULAR_TYPE = {
    BANNER: 0,
    VERTICAL: 1,
    TRANSVERSE: 2,
};

export const PARAMETER_CATE = {
    1: 'catagory',
    2: 'year',
    3: 'area',
};

export const PLAY_STATE = {
    STATR: 1,
    PAUSE: 0,
};

export const VIDEOS_PAGE_SIZE = 10;
