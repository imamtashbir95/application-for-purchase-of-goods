import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
window.axios.defaults.baseURL = (process.env.NODE_ENV === 'production') ? 'https://application-for-purchase-of-goods.vercel.app/apis' : 'http://localhost:8000/api';