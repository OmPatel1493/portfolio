# Personal Portfolio Website

A modern, production-ready portfolio website built with Next.js 14, TailwindCSS, and Framer Motion.

## Features

- 🎨 Beautiful, responsive design with dark/light mode
- 🤖 AI-powered chatbot using Anthropic Claude API
- 📊 Live GitHub stats integration
- 🎭 Custom animated cursor
- 📱 Mobile-first responsive design
- ⚡ Fast page loads with Next.js App Router
- 🎬 Smooth animations with Framer Motion
- 📧 Functional contact form
- 🔍 SEO optimized

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** TailwindCSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **AI:** Anthropic Claude API
- **Language:** TypeScript

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```
   ANTHROPIC_API_KEY=your_api_key
   GITHUB_USERNAME=your_username
   RESEND_API_KEY=your_resend_key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Adding New Projects

To add a new project, simply edit `/data/projects.ts` and add a new project object:

```typescript
{
  id: "unique-id",
  title: "Project Title",
  description: "Short description",
  longDescription: "Detailed description",
  tags: ["tag1", "tag2"],
  techStack: ["tech1", "tech2"],
  githubUrl: "https://github.com/...",
  liveUrl: "https://...",
  featured: true,
  category: "Web"
}
```

## Deployment

Deploy easily to Vercel:

```bash
npm run build
```

## License

MIT License - feel free to use this template for your own portfolio!
