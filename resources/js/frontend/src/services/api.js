import axios from 'axios';

const token = localStorage.getItem('token');

const api = axios.create({
    baseURL: 'https://application-for-purchase-of-goods.vercel.app/api',
    // headers: {
    //     'Authorization': `Bearer ${token}`
    // },
});

// Menambahkan interceptor untuk menambahkan token ke setiap request
api.interceptors.request.use(
    (config) => {
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Menambahkan interceptor untuk menangani kesalahan 401
// api.interceptors.response.use(
//     response => response,
//     error => {
//         if (error.response && error.response.status === 401) {
//             // Handle token refresh or redirect to login
//             localStorage.removeItem('token');
//             window.location.href = '/';
//         } else if (!error.response) {
//             console.error('Network or server error occurred:', error.message);
//         }
//         return Promise.reject(error);
//     }
// );

export default api;