import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        react(),
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/frontend/src/index.jsx'
            ],
            refresh: true,
        }),
    ],
    build: {
        rollupOptions: {
            external: [
                'bootstrap/dist/css/bootstrap.min.css',
                'react-router-dom',
                '@mui/system',
                '@mui/base/TablePagination',
                '@mui/icons-material/FirstPageRounded',
                '@mui/icons-material/LastPageRounded',
                '@mui/icons-material/ChevronLeftRounded',
                '@mui/icons-material/ChevronRightRounded',
            ],
        }
    }
});