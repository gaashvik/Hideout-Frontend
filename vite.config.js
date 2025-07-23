import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://hideout-be.brazilsouth.cloudapp.azure.com',
        secure: false,
      },
    },
  },

  plugins: [react()],
});
