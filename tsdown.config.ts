import svgr from '@svgr/rollup';
import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: 'src/index.ts',
  platform: 'neutral',
  format: ['esm'],
  dts: true,
  plugins: [
    svgr({
      include: 'src/icons/basic/**/*.svg',
      svgProps: {
        color: '#898989',
      },
      exportType: 'default',
      jsxRuntime: 'automatic',
      typescript: true,
    }),
    svgr({
      exclude: 'src/icons/basic/**/*.svg',
      exportType: 'default',
      jsxRuntime: 'automatic',
      typescript: true,
    }),
  ],
});
