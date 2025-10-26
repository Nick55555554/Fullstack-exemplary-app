import axios from 'axios';

export const todoQuery = axios.create({
    baseURL: `/api`,
    timeout: 3000,
    headers: {'Content-Type': 'application/json', Authorization: ''},
});
