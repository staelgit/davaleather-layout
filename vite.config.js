import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';
import { getHandlebarsConfig } from './handlebars.config.js';

const basePath = process.env.NODE_ENV === 'development' ? '' : '/davaleather-layout';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  root: 'src',
  base: basePath,
  plugins: [handlebars(getHandlebarsConfig(basePath))],
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
