import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: '**/assets/basic/*.svg?react',
      svgrOptions: {
        svgProps: {
          color: '#898989',
        },
      },
    }),
    svgr({
      exclude: '**/assets/basic/*.svg?react',
    }),
  ],
});
