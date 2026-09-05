import svgr from '@svgr/rollup';
import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: 'src/index.ts',
  platform: 'neutral',
  format: ['esm'],
  dts: true,
  loader: {
    '.svg': 'tsx',
  },
  plugins: [
    svgr({
      include: 'src/icons/basic/**/*.svg',
      svgProps: {
        color: '#898989',
      },
      babel: false,
      exportType: 'default',
      jsxRuntime: 'automatic',
      typescript: true,
      svgoConfig: {
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false,
              },
            },
          },
        ],
      },
    }),
    svgr({
      exclude: 'src/icons/basic/**/*.svg',
      babel: false,
      exportType: 'default',
      jsxRuntime: 'automatic',
      typescript: true,
      svgoConfig: {
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false,
              },
            },
          },
        ],
      },
    }),
  ],
});
