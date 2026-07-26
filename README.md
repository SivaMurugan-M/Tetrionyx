# Tetrionyx Technology Website

Welcome to the **Tetrionyx Technology** official website repository! This project is a modern, responsive, and highly optimized Single Page Application (SPA) built using React. 

This document serves as a complete guide for beginners to understand the architecture, file organization, routing, and deployment processes.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technologies Used](#technologies-used)
3. [Quick Start (Installation & Commands)](#quick-start-installation--commands)
4. [Folder Structure Guide](#folder-structure-guide)
5. [Key Components Explained](#key-components-explained)
6. [Routing System](#routing-system)
7. [Netlify Deployment Configuration](#netlify-deployment-configuration)
8. [Beginner Customization Guide](#beginner-customization-guide)

---

## Project Overview

This website serves as the landing and service portfolio portal for Tetrionyx Technology. It showcases company values, service offerings (UI/UX design, Web development, Mobile App development, Branding, Video Editing), product lines, and a careers application form. 

Key design elements include:
- A premium intro brand animation sequence.
- Hardware-accelerated transitions that prevent text blurriness.
- Dynamic page layout clamps to fit shorter and taller screens cleanly.

---

## Technologies Used

- **React**: Frontend framework for building interactive user interfaces.
- **React Router DOM**: Enables client-side page routing (navigation without reloading the page).
- **React Icons**: Icon library imports for clean icons (Fa, Fi, Hi, etc.).
- **EmailJS**: Direct client-side email transmission for the Careers contact form.
- **Vite/CRA Build System**: Packages the React scripts for local testing and optimized production distributions.

---

## Quick Start (Installation & Commands)

### 1. Prerequisites
Make sure you have **Node.js** (version 16 or higher) installed on your machine. You can verify by running:
```bash
node -v
npm -v
```

### 2. Local Installation
Clone the repository and install the project dependencies:
```bash
# Clone the repository
git clone <repository-url>

# Navigate into the project folder
cd Tetrionyx

# Install dependencies
npm install
```

### 3. Running Locally
Start the local development server:
```bash
npm start
```
This launches the app in your default browser at `http://localhost:3000` (or another port if 3000 is occupied).

### 4. Compiling for Production
Build the project into a compact, optimized bundle of static HTML, CSS, and JS files inside the `/build` directory:
```bash
npm run build
```

---

## Folder Structure Guide

Here is the exact tree of how the project is organized. Each file has a specific purpose to keep the code clean and maintainable.

```text
Tetrionyx/
├── public/                     # Static files directly served by the browser
│   ├── index.html              # Main HTML entry point of the app
│   └── _redirects              # Netlify client-side routing redirect rule
├── src/                        # Main React application source code
│   ├── assets/                 # Brand media assets and local fonts
│   │   ├── fonts/              # Custom locally hosted font files
│   │   ├── icons/              # Custom local svg or icon shapes
│   │   ├── images/             # Photographic artwork and screenshots
│   │   └── logos/              # Tetrionyx branding logo variants (png/svg)
│   ├── components/             # Reusable sections and page layout pieces
│   │   ├── AboutSection/       # Section showcasing values and features
│   │   │   ├── AboutSection.css
│   │   │   └── AboutSection.jsx
│   │   ├── CareersSection/     # Careers page visual elements
│   │   ├── ContactSection/     # Forms for getting in touch
│   │   ├── HeroBanner/         # Hero elements
│   │   ├── ProductsSection/    # Product details
│   │   ├── ServicesSection/    # Card layout grid representing core services
│   │   │   ├── ServicesSection.css
│   │   │   └── ServicesSection.jsx
│   │   ├── BrandIntro.jsx      # Initial startup splash screen component
│   │   ├── Header.jsx          # Top navigation menu and responsive mobile drawer
│   │   ├── Header.css          # Navigation drawer styles
│   │   ├── Footer.jsx          # Bottom site-wide layout footer
│   │   └── Footer.css          # Footer layout details
│   ├── layouts/                # Wrapper shells for routing layout structures
│   │   └── MainLayout.jsx      # Embeds Header and Footer around dynamic pages
│   ├── pages/                  # Page-level route views (injected into MainLayout)
│   │   ├── HomePage.jsx        # Root website landing view
│   │   ├── AboutPage.jsx       # About us detail page view
│   │   ├── ServicesPage.jsx    # General service overview
│   │   ├── ProductsPage.jsx    # Products lines list view
│   │   ├── ContactPage.jsx     # Full-page contact details
│   │   ├── CareersPage.jsx     # Main hiring description page
│   │   ├── CareersApplyPage.jsx# Job application form page
│   │   ├── CareersApplyPage.css# Job application styling and validation errors
│   │   ├── GetStartedPage.jsx  # Customer onboarding form page
│   │   ├── GetStartedPage.css  # Customer onboarding styling
│   │   ├── UiUxDesignPage.jsx  # UI/UX design service detail view
│   │   ├── UiUxDesignPage.css  # Spacing and alignment rules for UI/UX detail page
│   │   ├── WebDevelopmentPage.jsx# Web development detail view
│   │   ├── MobileAppDesignPage.jsx# Mobile application detail view
│   │   └── VideoEditingPage.jsx# Video editing service detail view
│   ├── routes/                 # Navigation router settings
│   │   └── AppRoutes.jsx       # Centralized path routing mapping table
│   ├── styles/                 # Shared styling directories
│   │   ├── brand-intro.css     # Timing and lighting rules for splash screen
│   │   └── global.css          # Root variables, reset codes, and utility classes
│   ├── utils/                  # Standalone JavaScript helpers
│   │   └── motionPreference.js # Detects browser reduced-motion preferences
│   ├── App.jsx                 # Top-level React container component
│   ├── App.css                 # Base application frame styling
│   ├── index.js                # Core JS entry point where React mounts to DOM
│   └── index.css               # Base document root font and margin rules
├── .env                        # Local configuration environment variables
├── netlify.toml                # Netlify deployment routing parameters
├── package.json                # Project configurations, commands, and dependency list
└── README.md                   # This instruction guide
```

---

## Key Components Explained

### 1. Splash Screen (`BrandIntro.jsx`)
When a visitor opens the website, `BrandIntro.jsx` triggers a 4.6-second entry lighting animation. To avoid showing it repeatedly, it sets a session variable. If a browser has "Reduced Motion" enabled, it skips directly to the main layout for accessibility.

### 2. Header and Navigation Drawer (`Header.jsx` & `Header.css`)
Provides the desktop header menu. On tablets and mobile screens, it automatically collapses into a burger icon that toggles a slide-out overlay drawer.

### 3. Service & About Cards (`ServicesSection.css` & `AboutSection.css`)
To prevent text from blurring or flickering during hover scaling in Chrome/Edge, these cards use relative `top` transitions (`top: 0` to `top: -8px`) and integer-based pixel font sizes (`1.125rem` = 18px, `0.875rem` = 14px) instead of 3D scaling matrix transforms.

---

## Routing System

The routing configuration is centralized in [src/routes/AppRoutes.jsx](file:///m:/Tetroniyx/src/routes/AppRoutes.jsx). It uses `react-router-dom` to map URL paths to specific page components.

All pages are wrapped inside the `MainLayout` shell so that the navigation `Header` and the `Footer` are automatically visible on all routes without copy-pasting them:

```jsx
<Routes>
  <Route element={<MainLayout />}>
    <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/services" element={<ServicesPage />} />
    <Route path="/services/ui-ux-design" element={<UiUxDesignPage />} />
    ...
  </Route>
</Routes>
```

---

## Netlify Deployment Configuration

Since this website is built as a client-side Single Page Application (SPA), Netlify must be configured to forward all route requests to `/index.html` so that React Router can handle subpages (like `/services/ui-ux-design`) without returning a `404 Not Found` error on browser refresh.

This is handled by two files included in this project:
1. **`netlify.toml`**: Located in the root of the project.
2. **`public/_redirects`**: Copied directly into the build root folder during the compilation command.

---

## Beginner Customization Guide

### How to add a new page:
1. Create a new React component file inside `src/pages/` (e.g., `src/pages/NewServicePage.jsx`).
2. Add the corresponding stylesheet if needed (e.g., `src/pages/NewServicePage.css`).
3. Import your page component in `src/routes/AppRoutes.jsx`.
4. Add a route definition inside the `Routes` block matching your page:
   ```jsx
   <Route path="/services/new-service" element={<NewServicePage />} />
   ```
5. Add links in `Header.jsx` or `Footer.jsx` pointing to your path using the `<Link>` component:
   ```jsx
   <Link to="/services/new-service">New Service</Link>
   ```

### How to adjust font sizes or theme colors:
- Global variables (like blue accents, background shades, and border colors) are stored inside [src/styles/global.css](file:///m:/Tetroniyx/src/styles/global.css). Modifying these variables will update styles site-wide.
- Card paddings and responsive grid breakpoints can be adjusted directly inside their corresponding `.css` files. Always try to use integer-based rem values (like `1.125rem` or `0.875rem`) to maintain sharp text rendering.

---

## License
Copyright © Tetrionyx. All rights reserved.

