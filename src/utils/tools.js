import { IMG_PRE_FIX, VIDEO_PRE_FIX } from '../constants';

export const handleImgUrl = (url) => {
    if (!url) return '';
    if (url.includes('http') || url.includes('https')) {
        return url;
    }
    return IMG_PRE_FIX + url;
};

export const handleVideoUrl = (url) => {
    if (!url) return '';
    if (url.includes('http') || url.includes('https')) {
        return url;
    }
    return VIDEO_PRE_FIX + url;
};

export const checkIsMobile = () => {
    let userAgentInfo = navigator.userAgent;
    let Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
    let flag = true;
    for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
};
