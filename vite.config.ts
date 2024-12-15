import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
            },
        },
    },
    plugins: [
        react(),
        tsconfigPaths(),
    ],
    server: {
        port: 5173,
    },
    build: {
        outDir: 'build',
        emptyOutDir: true,
        sourcemap: true,
        chunkSizeWarningLimit: 1600,
    },
})
