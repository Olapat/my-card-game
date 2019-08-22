import axios from 'axios';

const base_URL = "http://localhost:7000/";

const Axios = axios.create({
    baseURL: base_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
    },
});

export function get(url) {
    return Axios.get(url);
};

export function post(url, params) {
    return Axios.post(url, params);
};
