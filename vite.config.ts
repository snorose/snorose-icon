import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'playground',
  build: {
    outDir: 'playground-dist',
  },
  plugins: [react()],
});
