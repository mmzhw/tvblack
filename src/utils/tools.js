import { IMG_PRE_FIX } from '../constants';

export const handleImgUrl = (url, prefix = IMG_PRE_FIX) => {
    if (!url) return '';
    if (url.includes('http') || url.includes('https')) {
        return url;
    }
    return prefix + url;
};
