# DavaLeather - Multi-page Website for Leather Restoration Company

## 📋 Project Description

**DavaLeather** is a modern multi-page website for an American company specializing in leather restoration and care. The website provides information about the company's services, including furniture restoration, automotive interior restoration, commercial furniture repair, and professional leather cleaning.

## 🎯 Key Features

- **Multi-page structure** with responsive design
- **Component-based architecture** for reusable elements
- **Responsive layout** with mobile-first approach
- **SEO optimization** with proper HTML5 semantics
- **Modern technology stack** for fast development

## 🏗️ Project Architecture

```
davaleather-layout/
├── src/                          # Source code
│   ├── components/               # Reusable components
│   │   ├── header/              # Site header with navigation
│   │   ├── footer/              # Site footer
│   │   ├── contacts/            # Contact block
│   │   ├── about-hero/          # Main block for "About" page
│   │   ├── head/                # Meta tags and headers
│   │   └── placeholder/         # Placeholder for main page
│   ├── pages/                   # Website pages
│   │   ├── about/               # About company
│   │   ├── automotive/          # Automotive services
│   │   ├── blog/                # Blog with articles
│   │   ├── cleaning/            # Leather cleaning and protection
│   │   ├── commercial/          # Commercial furniture
│   │   ├── price/               # Service pricing
│   │   └── residential/         # Residential furniture
│   ├── styles/                  # SCSS styles
│   │   ├── base/                # Base styles and variables
│   │   └── components/          # Component styles
│   ├── js/                      # JavaScript files
│   └── public/                  # Static resources
│       ├── assets/              # Images, icons, fonts
│       └── favicons/            # Favicons
├── dist/                        # Production build
└── configuration files
```

## 🚀 Technology Stack

### Frontend

- **HTML5** - semantic markup
- **SCSS/Sass** - CSS preprocessor
- **JavaScript (ES6+)** - interactivity
- **Handlebars** - component templating

### Build Tools

- **Vite** - fast bundler and dev server
- **PostCSS** - CSS post-processing
- **Autoprefixer** - automatic vendor prefixes

### Libraries

- **Swiper** - sliders and carousels

### Linters and Formatting

- **ESLint** - JavaScript linting
- **Stylelint** - SCSS linting
- **Prettier** - code formatting

## 🎨 Design and UX

### Color Scheme

- **Primary background**: `#282B2D` (dark gray)
- **Accent color**: `#C75528` (orange-red)
- **Additional colors**: gray shades and white

### Typography

- **Accent font**: Random Grotesque Std
- **Primary font**: Roboto
- **Fallback**: Arial, sans-serif

### Responsiveness

- **Mobile-first** approach
- **Breakpoints**:
  - `360px` - small phones
  - `480px` - standard mobile
  - `768px` - tablets
  - `1024px` - tablets landscape
  - `1280px` - laptops
  - `1440px` - large monitors
  - `1920px` - 4K and ultrawide

## 📱 Website Pages

### Main Sections

1. **Home** (`/`) - overview of services and company
2. **About** (`/about`) - company information
3. **Services** - dropdown menu with subsections:
   - Residential furniture (`/residential`)
   - Automotive interiors (`/automotive`)
   - Commercial furniture (`/commercial`)
   - Cleaning and protection (`/cleaning`)
4. **Blog** (`/blog`) - articles and leather care tips
5. **Pricing** (`/price`) - service price list
6. **Contacts** - contact information

### Blog Articles

- Why leather cracks: causes and prevention
- Dangers of improper car interior cleaning
- Can a well-worn leather sofa be rehabbed?
- Real vs. fake leather: impact on furniture repair

## 🛠️ Installation and Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

## 📝 NPM Scripts

- `npm run dev` - start dev server with hot reload
- `npm run build` - build project for production
- `npm run preview` - preview production build
- `npm run lint:js` - check JavaScript code
- `npm run lint:scss` - check SCSS code
- `npm run format` - format code with Prettier

## 🎯 Implementation Features

### Component Approach

- Reusable components in Handlebars format
- Modular SCSS structure
- Centralized page data management

### SEO and Accessibility

- Semantic HTML5 markup
- Proper heading structure
- Alt texts for images
- ARIA attributes for interactive elements

### Performance

- Image optimization
- CSS and JS minification
- Lazy loading of components
- Font optimization

## 🔧 Configuration

### Vite

- Configured for multi-page website
- Handlebars template support
- Automatic rebuild on component changes

### PostCSS

- Autoprefixes for cross-browser compatibility
- Modern CSS features

### Linters

- ESLint for JavaScript
- Stylelint for SCSS
- Prettier for consistent formatting

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers iOS 14+ and Android 10+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linters: `npm run lint:js && npm run lint:scss`
5. Create a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Yuriy Stakhnev** - Frontend Developer

---

_Project created using modern web technologies and frontend development best practices._
