# Barani Swetha - UX Designer Portfolio

A modern, responsive portfolio website showcasing the work and experience of Barani Swetha, Senior Lead Experience Designer.

## Features

- **Responsive Design**: Optimized for all device sizes
- **Interactive Case Studies**: Detailed project breakdowns with metrics and insights
- **Smooth Navigation**: Seamless scrolling and section detection
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS v4
- **Performance Optimized**: Fast loading with optimized assets

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS v4, Custom CSS Variables
- **Build Tool**: Vite
- **UI Components**: Radix UI primitives, shadcn/ui
, shadcn/ui
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd barani-swetha-portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open your browser and visit `http://localhost:5173`

### Building for Production

```bash
npm run build
# or
yarn build
# or  
pnpm build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
# or
yarn preview
# or
pnpm preview
```

## Project Structure

```
├── App.tsx              # Main application component
├── main.tsx            # React entry point
├── index.html          # HTML entry point
├── components/         # React components
│   ├── case-studies/   # Individual case study components
│   ├── figma/         # Figma-specific components
│   └── ui/            # Reusable UI components (shadcn/ui)
└── styles/
    └── globals.css     # Global styles and Tailwind configuration
```

## Case Studies

The portfolio includes detailed case studies for:

- **Zooplus**: E-commerce UX optimization
- **DRAX**: B2B logistics platform design
- **Youth Banking**: FinTech mobile app for Gen Z
- **Nymble**: IoT device HMI and mobile app design

## Development Notes

- This project uses **Tailwind CSS v4** (alpha) with the new `@theme inline` syntax
- All UI components are based on **shadcn/ui** with Radix UI primitives
- The portfolio uses custom CSS variables for consistent theming
- Typography is controlled via CSS custom properties (avoid Tailwind text classes unless necessary)

## Contact

- **Email**: araxdesignn@gmail.com
- **LinkedIn**: [linkedin.com/in/baraniswetha](https://www.linkedin.com/in/baraniswetha)
- **Portfolio**: [swedesigns.framer.website](https://swedesigns.framer.website/)

## License

This project is private and proprietary.