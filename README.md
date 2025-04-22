# Personal Portfolio Website

A modern portfolio website built with Vue 3, Vite, Tailwind CSS, and GSAP animations. Features include a responsive design, dark/light mode, glass-morphism UI, interactive components, and a markdown blog.

## Features

- 🎨 Responsive design with mobile-first approach
- 🌓 Dark/light mode toggle with localStorage persistence
- 🔄 Animated page transitions using GSAP
- 🧠 Vue 3 Composition API for state management
- 📝 Markdown blog with frontmatter support
- 📱 Mobile-friendly navigation with animated hamburger menu
- 📊 Skills visualization with category filtering
- 📄 Interactive resume timeline with print styles
- 🖼️ Photography gallery with masonry layout and lightbox
- 📺 AniList integration for tracking anime

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
- **Resume**: Modify `src/data/resume.yaml` with your experience

## Project Structure

```
src/
 ├─ assets/               # Images, icons, fonts
 ├─ components/           # Reusable UI components
 ├─ layouts/              # Base and Blog layouts
 ├─ pages/                # Route pages
 ├─ data/                 # Content data files
 │   ├─ skills.json       # Skills with categories and levels
 │   ├─ resume.yaml       # Resume data
 │   ├─ photos.json       # Photography gallery images
 │   └─ posts/            # Markdown blog posts
 ├─ router/               # Vue Router configuration
 ├─ App.vue               # Main app component with navigation
 └─ main.ts               # App entry point
```

## License

MIT
