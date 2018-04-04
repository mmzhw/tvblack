import storage from '../utils/storage';
import axios from 'axios';
import { BASE_URL } from '../constants/index';
import { PATH } from '../constants/Link';
import { STORAGE_NAME } from '../constants';

let fetcher = axios.create({
    method: 'post',
    baseURL: BASE_URL,
    withCredentials: true,
    transformRequest: [(data) => {
        const userName = storage.get(STORAGE_NAME.USER_NAME);
        const accessToken = storage.get(STORAGE_NAME.ACCESS_TOKEN);
        if (userName && accessToken) {
            data.userName = userName;
            data.accessToken = accessToken;
        }
        return JSON.stringify(data);
    }],
    headers: {
        'Acces-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    }
});

fetcher.interceptors.request.use((config) => {
    return config;
}, (error) => {
    return Promise.reject(error);
});

fetcher.interceptors.response.use((response) => {
    if (response.data.code === 89001 || response.data.code === 81001) {
        window.location.href = PATH.ROOT;
    }
    return response.data;
}, (error) => {
    return Promise.reject(error);
});

export default fetcher.post;
