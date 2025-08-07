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
  'src/components/placeholder',
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
  '/pages/residential/index.html': {
    title: 'Residential Furniture Service - Dava Leather',
  },
  '/pages/commercial/index.html': {
    title: 'Commercial Furniture Repair - Dava Leather',
  },
  '/pages/automotive/index.html': {
    title: 'Automotive Interior Restoration - Dava Leather',
  },
  '/pages/cleaning/index.html': {
    title: 'Leather Cleaning & Protecting - Dava Leather',
  },
  '/pages/blog/index.html': {
    title: 'Blog - Dava Leather',
  },
  '/pages/blog/leather-cracks/index.html': {
    title: 'Why leather cracks: causes and prevention - Dava Leather',
  },
  '/pages/blog/car-leather-dangers/index.html': {
    title: 'Why is improper cleaning of a car’s leather interior dangerous? - Dava Leather',
  },
  '/pages/blog/sofa-rehab/index.html': {
    title: 'Can a well-worn leather sofa be rehabbed? - Dava Leather',
  },
  '/pages/blog/fake-leather/index.html': {
    title:
      'Real vs. fake leather —what’s the deal & how it affects furniture repair - Dava Leather',
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
        residential: resolve(__dirname, 'src/pages/residential/index.html'),
        commercial: resolve(__dirname, 'src/pages/commercial/index.html'),
        automotive: resolve(__dirname, 'src/pages/automotive/index.html'),
        cleaning: resolve(__dirname, 'src/pages/cleaning/index.html'),
        blog: resolve(__dirname, 'src/pages/blog/index.html'),
        'leather-cracks': resolve(__dirname, 'src/pages/blog/leather-cracks/index.html'),
        'car-leather-dangers': resolve(__dirname, 'src/pages/blog/car-leather-dangers/index.html'),
        'sofa-rehab': resolve(__dirname, 'src/pages/blog/sofa-rehab/index.html'),
        'fake-leather': resolve(__dirname, 'src/pages/blog/fake-leather/index.html'),
      },
    },
  },
});
