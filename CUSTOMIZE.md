# Quick Customization Reference

## 🎯 Essential Files to Update

### 1. Your Information
**File:** `/data/experience.ts`
- Update work experience
- Update education details
- Change company names, positions, dates

**File:** `/data/skills.ts`
- Add/remove skills
- Update proficiency levels
- Modify skill categories

**File:** `/data/projects.ts`
- Add your projects here
- This is the MAIN file for projects
- Just add objects to the array

### 2. Contact Information
**File:** `/app/contact/ContactClient.tsx`
- Line 67: Update email address
- Line 78: Update LinkedIn URL
- Line 90: Update GitHub URL

**File:** `/components/layout/Footer.tsx`
- Line 31: Update GitHub URL
- Line 39: Update LinkedIn URL
- Line 47: Update email address

### 3. AI Chatbot Knowledge
**File:** `/lib/anthropic.ts`
- Lines 8-40: Update RESUME_CONTEXT with your info
- This is what the AI knows about you

### 4. Personal Branding
**File:** `/components/sections/Hero.tsx`
- Line 28: Change your name
- Lines 36-42: Update roles in typewriter
- Line 51: Update tagline

**File:** `/components/layout/Navbar.tsx`
- Line 52: Update logo/initials

### 5. Resume PDF
**Location:** `/public/resume.pdf`
- Replace placeholder with your actual resume
- Must be named exactly `resume.pdf`

## 🔑 Environment Variables (.env)

```bash
# Required for AI Chatbot
ANTHROPIC_API_KEY=sk-ant-xxxxx

# Optional - for GitHub stats
GITHUB_USERNAME=your-username

# Optional - for email service
RESEND_API_KEY=re_xxxxx

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🎨 Quick Style Changes

### Colors
**File:** `/tailwind.config.js`
- Lines 11-21: Modify primary color palette

### Fonts
**File:** `/app/layout.tsx`
- Line 4: Change font import

## 📱 Social Links Quick Find

Search for these URLs across the project:
- `https://github.com` - Replace with your GitHub
- `https://linkedin.com` - Replace with your LinkedIn
- `contact@example.com` - Replace with your email

## ⚡ Quick Commands

```bash
# Install
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🚀 Deploy Checklist

- [ ] Update all personal information in `/data/` files
- [ ] Add your resume.pdf to `/public/`
- [ ] Update social links in Footer and Contact
- [ ] Add environment variables to Vercel
- [ ] Update AI chatbot context
- [ ] Test all pages locally
- [ ] Push to GitHub
- [ ] Deploy on Vercel

---

**That's it! These are the only files you need to touch to make it yours.**
