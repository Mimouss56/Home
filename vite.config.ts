import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
console.log('VITE_MOUSS_ID:', process.env.VITE_MOUSS_ID);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3002',
        changeOrigin: true,
      },
    },
  },
});
