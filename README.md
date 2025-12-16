<div align="center">

![Pixel & Play Logo](public/logo.webp)

# 🎮 PIXEL & PLAY

### Premier Gaming Café in Casablanca, Maarif

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=for-the-badge)](LICENSE)

[Live Website](https://www.pixel-and-play.vercel.app) • [Report Bug](https://github.com/KamalAassab/pixel-and-play/issues) • [Request Feature](https://github.com/KamalAassab/pixel-and-play/issues)

</div>

---

## 📖 About The Project

**Pixel & Play** is a modern gaming café located in the heart of Casablanca's Maarif district. Our website showcases our premium gaming experience, featuring PS5, Xbox, Nintendo Switch consoles, extensive board game library, specialty coffee, delicious crêpes, and event hosting capabilities.

This is a high-performance, SEO-optimized Next.js web application built with modern web technologies and security best practices.

### ✨ Key Features

- 🎮 **Gaming Showcase**: Beautiful presentation of console games, board games, and card games
- 📱 **Fully Responsive**: Optimized for mobile, tablet, and desktop devices
- 🎨 **Stunning Animations**: Smooth Framer Motion animations throughout
- 📚 **Interactive Menu**: 3D book-style menu with page-turning animations
- 📸 **Photo Gallery**: Showcase of café atmosphere and community vibes
- 📅 **WhatsApp Booking**: Direct integration for reservations and event bookings
- 🗺️ **Location Integration**: Embedded Google Maps with directions
- 💬 **Customer Testimonials**: Carousel of customer reviews
- 🔒 **Security First**: Comprehensive security headers and rate limiting
- ⚡ **Performance Optimized**: Fast load times with optimized images and code splitting
- 🔍 **SEO Optimized**: Professional metadata, schema markup, and local SEO
- ♿ **Accessible**: WCAG-compliant design patterns

---

## 🏗️ Project Structure

```
PIXELANDPLAY/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with metadata & fonts
│   ├── page.tsx                 # Homepage (orchestrates all sections)
│   ├── providers.tsx            # Context providers wrapper
│   └── globals.css              # Global styles & Tailwind directives
│
├── components/                   # React Components
│   ├── Header.tsx               # Navigation header with mobile menu
│   ├── HeroSection.tsx          # Hero with animated gradient text
│   ├── AboutSection.tsx         # About section with video
│   ├── MenuSection.tsx          # 3D interactive menu book
│   ├── GamesSection.tsx         # Games library & pricing
│   ├── GallerySection.tsx       # Photo gallery carousel
│   ├── TestimonialsSection.tsx  # Customer reviews
│   ├── BookingSection.tsx       # Event booking with WhatsApp
│   ├── ContactSection.tsx       # Contact info & map
│   ├── FAQSection.tsx           # Frequently asked questions
│   ├── Footer.tsx               # Footer with links & social
│   ├── StaggeredMenu.tsx        # Mobile navigation menu
│   ├── ClientSections.tsx       # Client-side wrapper
│   └── ui/                      # Reusable UI components
│       ├── accordion.tsx        # Accordion component
│       ├── button.tsx           # Button variants
│       ├── card.tsx             # Card component
│       ├── carousel.tsx         # Carousel component
│       ├── dropdown-menu.tsx    # Dropdown menus
│       ├── label.tsx            # Form labels
│       └── popover.tsx          # Popover component
│
├── lib/                         # Utilities & Data
│   ├── data.ts                  # Menu items & testimonials data
│   ├── games-catalog.ts         # Complete games catalog
│   ├── game-images.ts           # Game image mappings
│   └── utils.ts                 # Helper functions (cn, etc.)
│
├── public/                      # Static Assets
│   ├── logo.webp               # Brand logo
│   ├── video.mp4               # About section video
│   ├── BG*.webp                # Background images
│   ├── svg/                    # SVG assets
│   └── manifest.json           # PWA manifest
│
├── types/                       # TypeScript Definitions
│   └── index.ts                # Global type definitions
│
├── middleware.ts               # Security & rate limiting middleware
├── next.config.mjs             # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── .env.example                # Environment variables template

```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** or **pnpm**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/KamalAassab/pixel-and-play.git
   cd pixelandplay
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_SITE_URL=https://www.pixel-and-play.vercel.app
   NEXT_PUBLIC_WHATSAPP_NUMBER=+212XXXXXXXXX
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Tech Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.0 | React framework with App Router |
| **React** | 19.2 | UI library |
| **TypeScript** | 5.9 | Type safety |
| **Tailwind CSS** | 3.4 | Utility-first styling |

### UI & Animations

| Technology | Purpose |
|------------|---------|
| **Framer Motion** | Smooth animations & transitions |
| **GSAP** | Advanced animation sequences |
| **Radix UI** | Accessible component primitives |
| **Lucide React** | Modern icon library |
| **React Icons** | Additional icon sets |

### Fonts

- **Inter**: Body text
- **Outfit**: Headings
- **Poppins**: Accent text
- **Anton**: Display text

---

## 📦 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build production bundle |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code quality |

---

## 🔒 Security Features

This project implements comprehensive security measures:

### Security Headers

- **Content Security Policy (CSP)**: Prevents XSS attacks
- **Strict-Transport-Security (HSTS)**: Enforces HTTPS
- **X-Frame-Options**: Prevents clickjacking
- **X-Content-Type-Options**: Prevents MIME sniffing
- **Referrer-Policy**: Protects user privacy
- **Permissions-Policy**: Controls browser features

### Middleware Protection

- **Rate Limiting**: 100 requests per minute per IP
- **Request Validation**: Blocks suspicious requests
- **IP-based Tracking**: Monitors traffic patterns

### Best Practices

- Environment variables for sensitive data
- No console logs in production
- Optimized image delivery with CSP
- HTTPS enforcement in production
- CSRF protection via Next.js defaults

For more details, see [SECURITY.md](SECURITY.md)

---

## 🎨 Customization

### Update Brand Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  brand: {
    blue: "#3B82F6",
    red: "#EF4444",
    purple: "#8B5CF6",
    // Add your colors
  }
}
```

### Modify Menu Items

Edit `lib/data.ts`:

```typescript
export const menuPages = [
  {
    id: 1,
    title: "Drinks",
    items: [
      { name: "Espresso", price: "15 DH" },
      // Add more items
    ]
  }
];
```

### Update Games Catalog

Edit `lib/games-catalog.ts`:

```typescript
export const featuredGames = [
  {
    name: "Your Game",
    image: "/game-image.webp",
    category: "PS5"
  }
];
```

### Configure WhatsApp

Update `.env.local`:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=+212XXXXXXXXX
```

---

## 🌐 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository
   - Configure environment variables
   - Deploy

3. **Set Environment Variables in Vercel**
   ```
   NEXT_PUBLIC_SITE_URL=https://www.pixel-and-play.vercel.app
   NEXT_PUBLIC_WHATSAPP_NUMBER=+212XXXXXXXXX
   ```

### Other Platforms

The application can be deployed to any platform supporting Next.js:

- **Netlify**: Full Next.js support
- **Railway**: Easy deployment with auto-scaling
- **AWS Amplify**: Enterprise-grade hosting
- **DigitalOcean App Platform**: Simple deployment

---

## 📱 Responsive Design

The website is optimized for all screen sizes:

| Breakpoint | Device | Tailwind Class |
|------------|--------|----------------|
| < 640px | Mobile | Default |
| ≥ 640px | Large Mobile | `sm:` |
| ≥ 768px | Tablet | `md:` |
| ≥ 1024px | Desktop | `lg:` |
| ≥ 1280px | Large Desktop | `xl:` |
| ≥ 1536px | Ultra Wide | `2xl:` |

---

## ⚡ Performance Optimization

### Implemented Optimizations

- ✅ Image optimization with Next.js Image
- ✅ WebP/AVIF format support
- ✅ Font optimization with next/font
- ✅ Code splitting & lazy loading
- ✅ CSS optimization
- ✅ Asset caching (1 year for static files)
- ✅ Gzip/Brotli compression
- ✅ Remove console logs in production

### Performance Metrics

Target scores (Lighthouse):

- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

---

## 🐛 Troubleshooting

### Common Issues

**Issue**: Images not loading

```bash
# Check if images exist in public folder
ls public/*.webp

# Verify next.config.mjs image domains
```

**Issue**: Build failing

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

**Issue**: Environment variables not working

```bash
# Ensure variables start with NEXT_PUBLIC_ for client-side
# Restart development server after changes
```

**Issue**: Rate limiting too strict

```env
# Adjust in .env.local
RATE_LIMIT_MAX_REQUESTS=1000
```

---

## 🧪 Browser Support

| Browser | Minimum Version |
|---------|----------------|
| Chrome | Latest |
| Firefox | Latest |
| Safari | Latest |
| Edge | Latest |
| Mobile Safari | iOS 12+ |
| Mobile Chrome | Latest |

---

## 📄 License

This project is **proprietary and confidential**. Unauthorized copying, distribution, or use is strictly prohibited.

© 2025 Pixel & Play. All rights reserved.

---

## 🤝 Contributing

This is a private project. For internal contributors:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

---

## 📞 Support

For support and inquiries:

- 📧 Email: contact@pixel-and-play.vercel.app
- 📱 WhatsApp: +212XXXXXXXXX
- 📍 Address: Maarif, Casablanca, Morocco
- 🌐 Website: [pixel-and-play.vercel.app](https://www.pixel-and-play.vercel.app)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Radix UI](https://www.radix-ui.com/) - Accessible components
- [Lucide](https://lucide.dev/) - Beautiful icons

---

<div align="center">

**Built with ❤️ in Casablanca**

[⬆ Back to Top](#-pixel--play)

</div>
