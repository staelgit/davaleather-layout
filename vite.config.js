import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

const partDirs = [
  'src/components/header',
  'src/components/footer',
  'src/components/contacts',
  'src/components/about-hero',
  'src/components/layout',
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  root: 'src',
  base: './',
  plugins: [
    handlebars({
      partialDirectory: partDirs,
      reloadOnPartialChange: true,
      helpers: {
        eq: function (a, b) {
          return a === b;
        },
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {},
    },
    postcss: './postcss.config.js',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        about: resolve(__dirname, 'src/pages/about/index.html'),
        price: resolve(__dirname, 'src/pages/price/index.html'),
      },
    },
  },
});
