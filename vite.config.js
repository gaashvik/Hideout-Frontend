import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: `${backendUrl}`,
        secure: false,
      },
    },
  },

  plugins: [react()],
});
