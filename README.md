# TalkSoon - Speech Language Pathology Services

A static website built with 11ty (Eleventy) for a licensed Speech-Language Pathologist providing services in Southern Costa Rica.

## Features

- **Infographic-style landing page** with radiating concern links
- **Responsive design** optimized for all devices
- **Modern color scheme** with custom CSS variables
- **Public Sans typography** for clean, professional appearance
- **SEO optimized** with proper meta tags and structure

## Color Scheme

- Background: `#fbefdf`
- Text: `#124153`
- Highlight: `#63acc0`
- Accent: `#9ac55d`

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

This will start 11ty with live reload at `http://localhost:8080`

### Building for Production

Build the static site:
```bash
npm run build
```

The generated site will be in the `_site` directory.

### Other Commands

- `npm run serve` - Start development server without watch mode
- `npm run clean` - Remove the built site directory

## Site Structure

```
src/
├── _layouts/          # Nunjucks layout templates
│   └── base.njk       # Base layout with header/footer
├── css/
│   └── style.css      # Main stylesheet
├── services/          # Individual service pages
│   ├── late-talker.njk
│   └── difficult-to-understand.njk
├── index.njk          # Landing page (infographic layout)
├── about.njk          # About page
├── blog.njk           # Blog page (placeholder)
└── contact.njk        # Contact page
```

## Customization

### Adding New Services

Create new `.njk` files in the `src/services/` directory following the existing pattern.

### Updating Contact Information

Edit the contact details in `src/contact.njk`.

### Modifying Colors

Update the CSS custom properties in `src/css/style.css`:

```css
:root {
  --bg-color: #fbefdf;
  --text-color: #124153;
  --highlight-color: #63acc0;
  --accent-color: #9ac55d;
}
```

## Deployment

This site generates static HTML/CSS/JS files that can be deployed to any web hosting service:

- Netlify
- Vercel
- GitHub Pages
- Traditional web hosting

Simply upload the contents of the `_site` directory after running `npm run build`.

## License

MIT License - see LICENSE file for details. 
