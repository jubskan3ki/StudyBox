import react from '@vitejs/plugin-react-swc';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'dist',
        emptyOutDir: true,
    },
    resolve: {
        alias: {
            '~': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});
