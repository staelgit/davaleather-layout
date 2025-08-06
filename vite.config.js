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
  'src/components/head',
];

const pageData = {
  '/index.html': {
    title: 'Dava Leather',
  },
  '/pages/about/index.html': {
    title: 'About us - Dava Leather',
  },
  '/pages/price/index.html': {
    title: 'Price - Dava Leather',
  },
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  root: 'src',
  base: './',
  plugins: [
    handlebars({
      context(pagePath) {
        return pageData[pagePath];
      },
      partialDirectory: partDirs,
      reloadOnPartialChange: true,
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
