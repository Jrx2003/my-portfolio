# Personal Portfolio Website

A modern portfolio website built with Vue 3, Vite, Tailwind CSS, and GSAP animations. Features include a responsive design, dark/light mode, glass-morphism UI, interactive components, and a markdown blog.

## Features

- �9�6 Responsive design with mobile-first approach
- �9�7 Dark/light mode toggle with localStorage persistence
- �9�4 Animated page transitions using GSAP
- �0�8 Vue 3 Composition API for state management
- �9�5 Markdown blog with frontmatter support
- �9�5 Mobile-friendly navigation with animated hamburger menu
- �9�6 Skills visualization with category filtering
- �9�0 Interactive resume timeline with print styles
- �9�8�1�5 Photography gallery with masonry layout and lightbox
- �9�4 AniList integration for tracking anime

## Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/homepage.git
cd homepage

# Install dependencies
npm install

# Create required directories (if they don't exist)
mkdir -p public src/assets src/components src/layouts src/pages src/data/posts src/router
```

## Development

```bash
# Start development server
npm run dev
```

Visit http://localhost:5173/ to see your application.

## Building for Production

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Deploying to GitHub Pages

1. Update the `base` path in `vite.config.js` to match your repository name:

```js
export default defineConfig({
  plugins: [vue()],
  base: '/your-repo-name/' // Replace with your actual repository name
})
```

2. Create a deploy script in `package.json`:

```json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}
```

3. Deploy your site:

```bash
npm run deploy
```

## Customization

- **Content**: Update the files in `src/data/` to customize content
- **Styling**: Modify `tailwind.config.js` to update theme colors
- **Blog posts**: Add markdown files to `src/data/posts/`
- **Photos**: Update `src/data/photos.json` with your image links
- **Resume**: Modify `src/data/resume.json` with your experience

## Project Structure

```
src/
 ���� assets/               # Images, icons, fonts
 ���� components/           # Reusable UI components
 ���� layouts/              # Base and Blog layouts
 ���� pages/                # Route pages
 ���� data/                 # Content data files
 ��   ���� skills.json       # Skills with categories and levels
 ��   ���� resume.json       # Resume data
     photos.json       # Photography gallery images
 ��   ���� posts/            # Markdown blog posts
 ���� router/               # Vue Router configuration
 ���� App.vue               # Main app component with navigation
 ���� main.ts               # App entry point
```

## License

MIT
