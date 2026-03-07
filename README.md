# Phillip Kinuthia — Freelance Web Developer Portfolio

A fully custom React + Vite portfolio & business website for Phillip Kinuthia, Nairobi-based freelance web developer.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

## 📁 Project Structure

```
phillip-kinuthia/
├── index.html              # Entry HTML (SEO meta tags, structured data, fonts)
├── vite.config.js          # Vite config
├── package.json
└── src/
    ├── main.jsx            # React root
    ├── App.jsx             # Root component — composes all sections
    ├── data/
    │   └── constants.js    # All data: services, projects, packages, socials
    ├── hooks/
    │   ├── useInView.js    # IntersectionObserver hook for scroll animations
    │   └── useTypewriter.js # Typewriter effect hook
    └── components/
        ├── Navbar.jsx          # Fixed nav with mobile hamburger menu
        ├── Hero.jsx            # Landing section with typewriter + stats
        ├── Services.jsx        # 6-card services grid
        ├── Projects.jsx        # Portfolio with filter tabs
        ├── Pricing.jsx         # 4-tier pricing cards + addon subscriptions
        ├── WhyMe.jsx           # 5 selling point cards
        ├── Contact.jsx         # Contact info + WhatsApp order form
        ├── OrderForm.jsx       # Form that sends pre-filled WhatsApp message
        ├── Footer.jsx          # Full footer with nav + contact links
        ├── FloatingWhatsApp.jsx # Fixed floating WhatsApp CTA button
        └── CheckIcon.jsx       # Reusable check icon for feature lists
```

## ✏️ Customising

All content lives in **`src/data/constants.js`** — edit there to update:
- Your phone number, email
- Services, projects, packages, pricing
- Social media links
- Stats on the hero section

## 🔍 SEO

- Meta title, description, keywords set in `index.html`
- Open Graph & Twitter Card tags included
- JSON-LD structured data (Person schema) included
- Canonical URL set — update to your actual domain

## 📞 Contact
- WhatsApp: +254 797 321 068
- Email: phillipkinuthia72@gmail.com
