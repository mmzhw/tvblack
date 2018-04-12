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
