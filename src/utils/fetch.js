import storage from '../utils/storage';
import axios from 'axios';
import { baseUrl } from '../constants';

let fetcher = axios.create({
    method: 'post',
    baseURL: baseUrl,
    withCredentials: true,
    transformRequest: [(data) => {
        const userInfo = storage.get('user');
        if (userInfo && data && !data.NOUSERINFO) {
            data.userName = userInfo.userName;
            data.accessToken = userInfo.accessToken;
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
        window.location.href = '/login';
    }
    return response.data;
}, (error) => {
    return Promise.reject(error);
});

export default fetcher.post;
