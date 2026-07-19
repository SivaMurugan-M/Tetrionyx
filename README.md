# Tetrionyx Website

## Project Description

The official static website for Tetrionyx, built as a clean and maintainable Create React App project. The structure separates reusable components, page-level views, layouts, routes, styling, utilities, and brand assets without adding sample data or unnecessary application layers.

## Features

- Clean, responsive company website foundation
- Reusable component and layout structure
- Client-side routing
- Centralized global styling
- Dedicated folders for images, icons, logos, and fonts
- Premium first-visit brand animation with per-letter motion
- Session-based intro playback with reduced-motion support
- Production build support through Create React App

## Technologies Used

- React
- Create React App (`react-scripts`)
- JavaScript and JSX
- React Router DOM
- React Icons
- CSS

## Installation

### Create the project with Create React App

```bash
npx create-react-app tetrionyx-website
cd tetrionyx-website
```

Replace the generated source files with this project's structure, then install the recommended website packages:

```bash
npm install react-router-dom react-icons
```

### Install this existing project

```bash
git clone <repository-url>
cd tetrionyx-website
npm install
```

## Running the Project

Start the local development server:

```bash
npm start
```

Create an optimized production build:

```bash
npm run build
```

Run the test suite:

```bash
npm test
```

## Project Structure

```text
tetrionyx-website/
|-- public/
|   `-- index.html
|-- src/
|   |-- assets/
|   |   |-- fonts/
|   |   |   `-- .gitkeep
|   |   |-- icons/
|   |   |   `-- .gitkeep
|   |   |-- images/
|   |   |   `-- .gitkeep
|   |   `-- logos/
|   |       |-- tetrionyx-t.png
|   |       `-- tetrionyx-wings.png
|   |-- components/
|   |   |-- BrandIntro.jsx
|   |   |-- Footer.jsx
|   |   `-- Header.jsx
|   |-- layouts/
|   |   `-- MainLayout.jsx
|   |-- pages/
|   |   `-- HomePage.jsx
|   |-- routes/
|   |   `-- AppRoutes.jsx
|   |-- styles/
|   |   |-- brand-intro.css
|   |   `-- global.css
|   |-- utils/
|   |   `-- motionPreference.js
|   |-- App.jsx
|   `-- index.js
|-- .gitignore
|-- package-lock.json
|-- package.json
`-- README.md
```

### Folder Purpose

- `public/` contains the HTML document used by Create React App and any files that must be served unchanged.
- `src/` contains all React application source code.
- `src/assets/` contains static files imported by the application.
- `src/assets/images/` stores website photography and raster artwork.
- `src/assets/icons/` stores custom icon assets not supplied by an icon library.
- `src/assets/logos/` stores Tetrionyx and partner logo files.
- `src/assets/fonts/` stores locally hosted font files.
- `src/components/` contains small, reusable interface components.
- `src/pages/` contains route-level page components.
- `src/layouts/` contains shared page shells such as headers, main content areas, and footers.
- `src/routes/` keeps the route configuration separate from the application entry point.
- `src/styles/` contains global and shared CSS.
- `src/utils/` contains reusable, framework-independent helper functions when the project needs them.

## Landing Animation

`BrandIntro.jsx` controls the intro sequence and renders each letter of the company name independently. `brand-intro.css` contains the logo, lighting, particle, letter, and transition effects.

The intro lasts 4.6 seconds and plays whenever the page is loaded or refreshed. Visitors who prefer reduced motion are taken directly to the homepage.

To customize the sequence:

- Update `INTRO_TIMING` in `src/components/BrandIntro.jsx` for the React reveal and completion timers.
- Keep those values aligned with the timing custom properties near the top of `src/styles/brand-intro.css`.
- Change the `--intro-*` color properties in `brand-intro.css` to adjust the animation palette.
- Edit the `PARTICLES` array in `BrandIntro.jsx` to change particle count, position, delay, or size.

### Important Root Files

- `package.json` defines project metadata, dependencies, browser support, and CRA scripts.
- `package-lock.json` locks exact dependency versions for repeatable installations and builds.
- `.gitignore` prevents dependencies, builds, local environment variables, logs, and editor files from being committed.
- `README.md` documents setup, development commands, structure, and project ownership.

## Recommended npm Packages

- `react-router-dom` for client-side navigation and route layouts.
- `react-icons` for accessible icons from established icon libraries.

Add more dependencies only when a project requirement justifies them.

## Author

Tetrionyx

## License

Copyright (c) Tetrionyx. All rights reserved.
