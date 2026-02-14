# Dhiraj Kumar Pandit - Portfolio Website

A modern, full-stack developer portfolio built with Next.js 16, React, TypeScript, and Tailwind CSS. Features MongoDB integration, APK distribution, an admin dashboard, smooth animations, and professional UI/UX design.

## Features

- **Modern UI/UX Design** - Professional portfolio with smooth animations and gradient effects
- **Responsive Design** - Mobile-first approach optimized for all screen sizes
- **MongoDB Integration** - Comments/messages storage with API endpoints
- **APK Download System** - MongoDB GridFS-based file distribution for mobile apps
- **Admin Dashboard** - Password-protected admin panel at `/admin/admin` with:
  - Real-time statistics and data filtering
  - Message and rating management
  - 5-second auto-refresh
- **Tech Stack Icons** - CDN-based SVG icons for technologies
- **Dark Mode Support** - Seamless light/dark theme switching
- **SEO Optimized** - Meta tags, robots.txt, and sitemap included
- **Smooth Animations** - Custom keyframe animations (fadeIn, slideIn, pulse-glow, etc.)

## Tech Stack

**Frontend:**
- Next.js 16.1.6 (with Turbopack)
- React 19
- TypeScript
- Tailwind CSS 3
- Custom CSS Animations

**Backend:**
- Next.js API Routes
- MongoDB Atlas
- GridFS (for large file storage)

**Tools & Deployment:**
- Node.js
- Git & GitHub
- Vercel (ready for deployment)

## Project Structure

```
my_portfolio/
├── app/
│   ├── api/
│   │   ├── admin/verify/route.ts      # Password verification endpoint
│   │   ├── apk/route.ts               # APK upload/download endpoints
│   │   └── comments/route.ts          # Comments/messages API
│   ├── admin/
│   │   └── admin/page.tsx             # Admin dashboard (protected)
│   ├── components/
│   │   ├── Header.tsx                 # Sticky navigation bar
│   │   ├── HeroSection.tsx            # Landing section with CTA
│   │   ├── AboutSection.tsx           # Bio and stats
│   │   ├── ProjectsSection.tsx        # Featured projects
│   │   ├── SkillsSection.tsx          # Technical skills with icons
│   │   ├── ContactSection.tsx         # Contact form
│   │   └── Footer.tsx                 # Footer with links
│   ├── globals.css                    # Global styles and animations
│   ├── layout.tsx                     # Root layout
│   └── page.tsx                       # Home page
├── lib/
│   └── mongodb.ts                     # MongoDB client configuration
├── public/
│   ├── Dhiraj.jpeg                    # Profile image
│   ├── robots.txt                     # SEO robots file
│   └── sitemap.xml                    # SEO sitemap
├── scripts/
│   └── upload-apk.js                  # APK upload script
└── package.json
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
ADMIN_PW=your_admin_password
```

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Configure environment variables
echo "MONGODB_URI=your_mongodb_uri" > .env.local
echo "ADMIN_PW=your_password" >> .env.local
```

### Running Locally

```bash
# Development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Building for Production

```bash
npm run build
npm run start
```

## Key Features Explained

### Admin Panel
- **Route:** `/admin/admin`
- **Password:** Set in `ADMIN_PW` environment variable (default: `mangorange296`)
- **Features:**
  - View all submissions and messages
  - Filter by message type or ratings
  - Real-time statistics
  - Auto-refresh every 5 seconds

### APK Distribution
- **Upload:** Run `node scripts/upload-apk.js` to upload APK to MongoDB GridFS
- **Download:** Users can download APK from the AgriFarm project card
- **Storage:** MongoDB GridFS handles large file storage (supports 105MB+ files)

### API Endpoints

#### Comments/Messages
- `GET /api/comments` - Fetch all submissions
- `POST /api/comments` - Submit new message or rating

#### APK
- `GET /api/apk` - Download APK file
- `POST /api/apk` - Upload new APK to GridFS

#### Admin
- `POST /api/admin/verify` - Verify admin password

## Portfolio Sections

1. **Hero Section** - Eye-catching intro with CTA buttons and social links
2. **About Section** - Bio, profile image, and key statistics
3. **Projects Section** - 6 featured projects with descriptions and download buttons
4. **Skills Section** - Technical skills organized by category with CDN icons
5. **Contact Section** - Contact information and message form
6. **Footer** - Social links and quick navigation

## Animations

Custom CSS animations applied throughout:
- `fadeInUp`, `fadeInDown`, `fadeInLeft`, `fadeInRight` - Directional entrance
- `scaleIn` - Scale animation
- `pulse-glow` - Text glow effect
- `float` - Floating movement
- `glow-filter` - Drop-shadow glow
- Stagger delays for sequential animations

## Styling

- **Color Scheme:** Blue to Purple gradient
- **Dark Mode:** Fully supported with Tailwind CSS
- **Responsive Breakpoints:** sm, md, lg
- **Custom Scrollbar:** Blue themed
- **Backdrop Blur:** Modern glassmorphism effects

## Deployment

### Vercel (Recommended)

1. Push to GitHub:
   ```bash
   git push origin main
   ```

2. Import to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Import the GitHub repository
   - Add environment variables
   - Deploy

### Other Platforms

Can be deployed to any platform supporting Node.js and Next.js (AWS, Heroku, etc.)

## Performance

- **Optimized Images:** Next.js Image component with lazy loading
- **Code Splitting:** Automatic route-based code splitting
- **CSS Optimization:** Tailwind CSS tree-shaking
- **SEO:** Meta tags, structured data, sitemap

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Contributing

Feel free to fork and submit pull requests for improvements.

## License

MIT License - Open for personal and commercial use

## Contact

- **Email:** panditdhiraj296@gmail.com
- **Phone:** +977 9705330207
- **GitHub:** [DhirajBro1](https://github.com/DhirajBro1)
- **LinkedIn:** [Dhiraj Pandit](https://www.linkedin.com/in/dhiroj-kr-pandit-2539b9347)

---

Built with  by Dhiraj Kumar Pandit
