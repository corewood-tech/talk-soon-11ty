# TalkSoon - Speech Language Pathology Services

A static website built with 11ty (Eleventy) for a licensed Speech-Language Pathologist providing services in Southern Costa Rica. Deployed using GitHub integrated CloudFlare Pages for optimal performance and global CDN distribution.

## Features

- **Infographic-style landing page** with radiating concern links
- **Responsive design** optimized for all devices
- **Modern color scheme** with custom CSS variables
- **Public Sans typography** for clean, professional appearance
- **SEO optimized** with proper meta tags and structure
- **Web3Forms integration** for contact form submissions
- **CloudFlare Pages deployment** with automatic builds and global CDN

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
└── contact.njk        # Contact page with Web3Forms integration
```

## Contact Form

The contact form is powered by Web3Forms, providing:
- Secure form submissions without backend code
- All form data mapped and forwarded to email
- Custom thank you page with smooth UX transitions
- Mobile-responsive design

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

This site is deployed using **GitHub integrated CloudFlare Pages**, which provides:

- **Automatic deployments** from GitHub repository
- **Global CDN** with edge caching for fast loading worldwide
- **SSL/TLS encryption** included by default
- **Branch previews** for testing changes before production
- **Build optimization** with CloudFlare's performance features

### CloudFlare Pages Configuration

- **Build command**: `npm run build`
- **Build output directory**: `_site`
- **Node.js version**: Latest LTS
- **Environment**: Production optimized with CloudFlare's edge network

### Manual Deployment

For other hosting services, this site generates static HTML/CSS/JS files that can be deployed to:

- Netlify
- Vercel
- GitHub Pages
- Traditional web hosting

Simply upload the contents of the `_site` directory after running `npm run build`.

### Performance Benefits

CloudFlare Pages provides:
- **Global CDN**: Content served from 275+ data centers worldwide
- **Automatic optimization**: Image optimization, minification, and compression
- **Fast builds**: Optimized build pipeline with caching
- **Zero downtime deployments**: Seamless updates without service interruption

## License

MIT License - see LICENSE file for details. 
