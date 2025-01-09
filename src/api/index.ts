import axios from 'axios';

export const api = axios.create({
    withCredentials: true,
    timeout: 1000 * 8,
});