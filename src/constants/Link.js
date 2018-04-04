import asyncComponent from '../components/AsyncComponent';

const VideoList = asyncComponent(() => import('../components/VideoList'));
const VideoDetail = asyncComponent(() => import('../components/VideoDetail'));
const ChannelList = asyncComponent(() => import('../components/ChannelList'));

export const PATH = {
    ROOT: '/',
    VIDEOS: '/videos',
    CHANNELS: '/channels',
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
        path: PATH.CHANNELS,
        exact: true,
        component: ChannelList,
    },
    {
        path: `${PATH.CHANNELS}/:id`,
        exact: true,
        component: ChannelList,
    }
];

export const MENU_ITEMS = [
    {
        name: '视频管理',
        key: 'videos',
        iconType: 'profile',
        url: PATH.VIDEOS,
    },
    {
        name: '频道配置',
        key: 'channels',
        iconType: 'switcher',
        url: PATH.CHANNELS,
    },
];
