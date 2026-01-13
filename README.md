# Employer Profile Automation Sales 2

🚀 **Production-ready Profile & Job Creation Automation System**

A full-stack Next.js application that automates employer profile and job advertisement creation using AI, with Make.com webhook integration.

---

## ✨ Features

- **AI-Powered Content Generation** - Automatically generates company profiles and job adverts from website analysis
- **Brand Recognition** - Extracts logos, colors, and brand identity via Brandfetch
- **Real-time Progress Tracking** - Live status updates during processing
- **Premium UI/UX** - Enterprise-grade design inspired by Oberland-Jobs
- **Payment Integration** - Stripe checkout for premium listings
- **Admin Dashboard** - Complete lead management system
- **Make.com Integration** - Webhook-based automation pipeline

---

## 🛠 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Custom CSS Design System
- **Validation**: Zod + React Hook Form
- **Animations**: Framer Motion
- **Payment**: Stripe
- **Backend Automation**: Make.com

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx          # Landing page
│   ├── create/           # Lead capture form
│   ├── status/[id]/      # Progress tracking
│   ├── preview/[id]/     # Profile & job preview
│   ├── order/[id]/       # Checkout page
│   ├── success/[id]/     # Confirmation
│   ├── admin/            # Admin dashboard
│   └── api/              # Webhook endpoints
├── components/
│   ├── ui/               # Reusable components
│   └── layout/           # Header, Footer, Sidebar
├── lib/
│   ├── makecom.ts        # Make.com utilities
│   ├── validation.ts     # Zod schemas
│   └── storage.ts        # LocalStorage helpers
└── types/                # TypeScript interfaces
```

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Configure environment
cp .env.local.example .env.local
# Edit .env.local with your API keys

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## ⚙️ Environment Variables

```env
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
NEXT_PUBLIC_MAKECOM_LEAD_WEBHOOK=https://hook.eu2.make.com/your-webhook
STRIPE_SECRET_KEY=sk_live_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
```

---

## 🔗 Make.com Integration

Import the blueprint from `make.com blueprint json/lead-processing-scenario.json`:

```
Webhook → Apify Scrape → Brandfetch → Gemini AI → Callback → Email
```

---

## 🌐 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel --prod
```

### Render (Free Tier)

Use the included `render.yaml` blueprint for automatic deployment.

---

## 📝 License

MIT License - Feel free to use for commercial projects.

---

Built with ❤️ for automated recruitment solutions.
