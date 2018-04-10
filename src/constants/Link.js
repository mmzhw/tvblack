import asyncComponent from '../components/AsyncComponent';

const VideoList = asyncComponent(() => import('../components/VideoList'));
const VideoDetail = asyncComponent(() => import('../components/VideoDetail'));
const IndexOption = asyncComponent(() => import('../components/IndexOption'));
const AdOption = asyncComponent(() => import('../components/AdOption'));

export const PATH = {
    ROOT: '/',
    VIDEOS: '/videos',
    INDEXOPTIION: '/indexoption',
    ADOPTION: '/ad',
};

export const ROUTES = [
    {
        path: PATH.VIDEOS,
        exact: true,
        component: VideoList,
    },
    {
        path: `${PATH.VIDEOS}/:id`,
        exact: true,
        component: VideoDetail,
    },
    {
        path: PATH.INDEXOPTIION,
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
        name: '视频管理',
        key: 'videos',
        iconType: 'profile',
        url: PATH.VIDEOS,
    },
    {
        name: '首页配置',
        key: 'indexoption',
        iconType: 'switcher',
        url: PATH.INDEXOPTIION,
    },
    {
        name: '广告配置',
        key: 'ad',
        iconType: 'shop',
        url: PATH.ADOPTION,
    },
];
