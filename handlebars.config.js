export const partDirs = [
  'src/components/header',
  'src/components/footer',
  'src/components/contacts',
  'src/components/about-hero',
  'src/components/head',
  'src/components/placeholder',
  'src/components/main-hero',
  'src/components/cta-button',
  'src/components/modal',
  'src/components/modal-phone',
  'src/components/modal-zipcode',
  'src/components/modal-form',
  'src/components/modal-success',
  'src/components/search',
  'src/components/help-request',
  'src/layouts',
];

export const pageData = {
  '/index.html': {
    title: 'Dava Leather',
    highlightActiveMenuItems: {
      home: true,
    },
  },
  '/pages/about/index.html': {
    title: 'About us - Dava Leather',
    highlightActiveMenuItems: {
      about: true,
    },
  },
  '/pages/price/index.html': {
    title: 'Price - Dava Leather',
    highlightActiveMenuItems: {
      price: true,
    },
  },
  '/pages/residential/index.html': {
    title: 'Residential Furniture Service - Dava Leather',
    highlightActiveMenuItems: {
      residential: true,
      services: true,
    },
  },
  '/pages/commercial/index.html': {
    title: 'Commercial Furniture Repair - Dava Leather',
    highlightActiveMenuItems: {
      commercial: true,
      services: true,
    },
  },
  '/pages/automotive/index.html': {
    title: 'Automotive Interior Restoration - Dava Leather',
    highlightActiveMenuItems: {
      automotive: true,
      services: true,
    },
  },
  '/pages/cleaning/index.html': {
    title: 'Leather Cleaning & Protecting - Dava Leather',
    highlightActiveMenuItems: {
      cleaning: true,
      services: true,
    },
  },
  '/pages/blog/index.html': {
    title: 'Blog - Dava Leather',
    highlightActiveMenuItems: {
      blog: true,
    },
  },

  '/pages/blog/leather-cracks/index.html': {
    title: 'Why leather cracks: causes and prevention - Dava Leather',
    highlightActiveMenuItems: {
      blog: true,
    },
  },
  '/pages/blog/car-leather-dangers/index.html': {
    title: 'Why is improper cleaning of a car’s leather interior dangerous? - Dava Leather',
    highlightActiveMenuItems: {
      blog: true,
    },
  },
  '/pages/blog/sofa-rehab/index.html': {
    title: 'Can a well-worn leather sofa be rehabbed? - Dava Leather',
    highlightActiveMenuItems: {
      blog: true,
    },
  },
  '/pages/blog/fake-leather/index.html': {
    title:
      'Real vs. fake leather —what’s the deal & how it affects furniture repair - Dava Leather',
    highlightActiveMenuItems: {
      blog: true,
    },
  },
};

export const getHandlebarsConfig = (basePath) => ({
  context(pagePath) {
    return pageData[pagePath];
  },
  partialDirectory: partDirs,
  reloadOnPartialChange: true,
  helpers: {
    basePath: (path) => `${basePath}${path}`,
  },
});
