# Portfolio Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   Create a `.env` file in the root directory:
   ```
   ANTHROPIC_API_KEY=your_anthropic_api_key
   GITHUB_USERNAME=your_github_username
   RESEND_API_KEY=your_resend_api_key (optional)
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

3. **Customize Your Content**
   
   - **Personal Info**: Update `/data/experience.ts`, `/data/skills.ts`, `/data/projects.ts`
   - **Projects**: Add/edit projects in `/data/projects.ts`
   - **Resume**: Place your `resume.pdf` in `/public/` folder
   - **Links**: Update social links in `/components/layout/Footer.tsx` and `/app/contact/ContactClient.tsx`

4. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000

5. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## Customization Guide

### Adding New Projects
Edit `/data/projects.ts` and add:
```typescript
{
  id: "unique-id",
  title: "Project Name",
  description: "Short description",
  longDescription: "Detailed description",
  tags: ["React", "Node.js"],
  techStack: ["React", "Node.js", "MongoDB"],
  githubUrl: "https://github.com/...",
  liveUrl: "https://...",
  featured: true,
  category: "Web"
}
```

### Updating Skills
Edit `/data/skills.ts` to modify skill categories and proficiency levels.

### Changing Colors
Edit `/tailwind.config.js` to customize the color scheme.

### AI Chatbot
The chatbot uses Anthropic's Claude API. Update the resume context in `/lib/anthropic.ts` with your information.

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms
Build the project with `npm run build` and deploy the `.next` folder.

## Features Checklist

- ✅ Responsive design
- ✅ Dark/Light mode
- ✅ AI chatbot
- ✅ Contact form
- ✅ Project filtering
- ✅ Animated components
- ✅ SEO optimized
- ✅ Custom cursor
- ✅ GitHub stats integration

## Support

For issues or questions, refer to the Next.js documentation: https://nextjs.org/docs
