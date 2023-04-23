import { fileURLToPath, URL } from 'node:url'
const path = require('path');

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:5000'
            }
        }
    },
    build: {
        outDir: path.resolve(__dirname, '../server/public')
    },
    plugins: [vue(), vueJsx()],
    resolve: {
        alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
