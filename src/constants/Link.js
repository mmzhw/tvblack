import asyncComponent from '../components/AsyncComponent';

const VideoList = asyncComponent(() => import('../components/VideoList'));
const VideoDetail = asyncComponent(() => import('../components/VideoDetail'));
const IndexOption = asyncComponent(() => import('../components/IndexOption'));
const AdOption = asyncComponent(() => import('../components/AdOption'));
const Player = asyncComponent(() => import('../components/Player'));

export const PATH = {
    ROOT: '/',
    PLAYER: '/player',
    VIDEOS: '/videos',
    INDEX_OPTIION: '/indexoption',
    ADOPTION: '/ad',
};

export const ROUTES = [
    {
        path: PATH.VIDEOS,
        exact: true,
        component: VideoList,
    },
    {
        path: PATH.PLAYER,
        exact: true,
        component: Player,
    },
    {
        path: `${PATH.VIDEOS}/:id`,
        exact: true,
        component: VideoDetail,
    },
    {
        path: PATH.INDEX_OPTIION,
        exact: true,
        component: IndexOption,
    },
    {
        path: PATH.ADOPTION,
        exact: true,
        component: AdOption,
    },
];

// PATH对应key，根据key显示name
export const MENU_ITEMS = [
    {
        name: '视频播放器',
        key: 'player',
        iconType: 'profile',
        url: PATH.PLAYER,
    },
    // {
    //     name: '视频管理',
    //     key: 'videos',
    //     iconType: 'profile',
    //     url: PATH.VIDEOS,
    // },
    // {
    //     name: '首页配置',
    //     key: 'indexoption',
    //     iconType: 'switcher',
    //     url: PATH.INDEX_OPTIION,
    // },
    // {
    //     name: '广告配置',
    //     key: 'ad',
    //     iconType: 'shop',
    //     url: PATH.ADOPTION,
    // },
];
