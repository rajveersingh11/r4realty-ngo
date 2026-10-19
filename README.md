# R4Realty - Ghar Margdarshan Foundation
### Independent Non-Profit Real Estate Guidance & Internet Market Analytics Platform

**R4Realty - Ghar Margdarshan Foundation** is a 100% free, commission-free public web application and consumer advocacy platform designed to guide first-time homebuyers, families, and new investors through real estate decisions, protect them from fraudulent schemes, and analyze property market data across India.

---

## Key Features

### 1. Flagship Real Estate Internet Market Analytics & Due Diligence Hub
- **Automated Property Deal Analyzer & Risk Scorer**: Enter property location, price, and carpet area to evaluate fair market value corridors, detect overpricing, and score transaction risk from 0 (Safe) to 100 (Critical Alert) using statutory benchmarks.
- **15+ City Real Estate Index & Micro-Market Trends**: Curated, verified analytics on major Indian markets (Mumbai MMR, Delhi-NCR, Bengaluru, Pune, Hyderabad, Chennai, Ahmedabad, Kolkata) with interactive 5-year capital appreciation charts, rental yield indices, and circle rate variance alerts.
- **PMAY & Affordable Housing Subsidy Estimator**: Transparent credit-linked subsidy calculator (EWS, LIG, MIG) and directory of official government lottery boards (MHADA, DDA, CIDCO, BDA, RHB, UPAVP).
- **Monetary Policy & Home Loan Benchmark**: Live tracker of RBI Repo Rates, transmission to floating EBLR loans, and comparison of interest rates and women borrower discounts across major public and private banks.

### 2. Multi-Device Responsive Architecture
- **Mobile-First Design**: Optimized for smartphones with safe-area insets (`env(safe-area-inset-top)`, `env(safe-area-inset-bottom)`) and a thumb-accessible sticky bottom navigation bar.
- **Tablet & Desktop**: Multi-column fluid layouts, sticky sidebars, and desktop navigation bar with global keyboard search (`Ctrl + K`).
- **Dark & Light Mode**: Accessible, high-contrast themes honoring system preferences with manual toggle.
- **Print & PDF Support**: Checklists and due diligence reports are styled with clean print stylesheets for on-site property visits.

### 3. Decision Calculators (Commission-Free)
- **Advanced EMI & Amortization Calculator**: Interactive yearly principal vs. interest breakdown with a smart prepayment simulator showing years and interest saved.
- **True Affordability Estimator**: Calculates safe home purchase capacity factoring in a 35% debt-to-income cap and reserving 8% of liquid funds for stamp duties and closing buffers.
- **Bank Loan Eligibility Estimator**: FOIR-based bank sanction calculator.
- **State Stamp Duty & Registration Estimator**: Computes state-specific duty, municipal cess, and female ownership rebates across 8+ states.
- **Rent vs. Buy 15-Year Simulator**: Compares the long-term wealth of property equity versus renting and investing in equity mutual funds.
- **True Net Rental Yield Calculator**: Gross yield vs. net in-hand yield after property taxes, society maintenance, and vacancy buffers.

### 4. Consumer Protection & Scam Watchdog
- **60-Second Scam Diagnostic Tool**: Instant diagnostic for predatory red flags (assured return promises, advance payments >10%, GPA sales).
- **RERA National Directory**: Direct deep links to search registered projects and file consumer complaints across all 28 State & UT RERA authorities.
- **Scam Reporting Desk**: Submit reports of suspicious promotions directly to non-profit volunteers via WhatsApp.
- **Statutory Buyer Rights**: Plain-English guide to consumer rights under RERA 2016.

### 5. Interactive Checklists & Educational Roadmaps
- **On-Site Checklists**: Pre-booking token checklist, 30-year title document checklist, and possession snagging inspection list (hollow tiles, plumbing slope, electrical earthing) with `localStorage` persistence.
- **Comprehensive Buyer Guides**: Step-by-step blueprints for first-time buyers, home loans, RERA compliance, and resale property due diligence.
- **Legal Glossary & FAQ**: 30+ legal terms (Carpet Area, OC/CC, Mutation, 7/12 Extract, Encumbrance Certificate) with vernacular synonyms and practical tips.

---

## Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom editorial design tokens
- **Icons**: Lucide React
- **Data Visualization**: Recharts
- **State / Persistence**: Browser `localStorage` (Privacy-first; zero server storage of personal user queries)

---

## Getting Started

### Prerequisites
- Node.js (v18 or newer)
- npm (v9 or newer)

### Development
### Development & Micro-API
```bash
# Install dependencies
npm install

# Start the frontend dev server (port 3000)
npm run dev

# Start the lightweight SQLite Micro-API (port 3001)
npm run server
```

### Production Build
```bash
npm run build
npm run preview
```

---

## Deploying on Cloudflare Pages

### Option 1: Cloudflare Git Integration (Recommended)
1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages > Create application > Pages > Connect to Git**.
2. Select repository: `rajveersingh11/r4realty-ngo`.
3. Set the following build settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Environment variables**: Add `NODE_VERSION` = `22`
4. Click **Save and Deploy**. Cloudflare will automatically build and distribute the app across its global edge network!

### Option 2: Wrangler CLI Deployment
```bash
npm run deploy:cf
```

The repository includes pre-configured:
- `public/_redirects`: SPA client-side routing fallback (`/*  /index.html  200`).
- `public/_headers`: Cloudflare edge security headers and 1-year asset caching.
- `wrangler.toml` & `.nvmrc`: Ready-to-go project configuration.

---

## Featherlight SQLite Data Collection

The platform includes an ultra-lightweight data collection engine built using Node.js's native `node:sqlite` module (zero external backend dependencies):
- **Single-File Database**: `data/r4realty.db`
- **Tables**: `scam_reports`, `citizen_inquiries`, `event_registrations`, `volunteer_signups`
- **Offline-First Fallback**: If the server is offline or deployed as a static site, submissions are securely captured in local browser storage without error.
- **NGO Data Desk**: Press `Ctrl + Shift + D` or click **"🗄️ SQLite Data Desk"** in the footer to inspect records, filter alerts, and download the full `.db` or CSV export with one click.

---

## Non-Profit Ethical Charter

- **0% Commissions**: We never accept developer referral fees, listing sponsorships, or broker kickbacks.
- **Zero Lead Selling**: Compliant with the Digital Personal Data Protection (DPDP) Act, 2023. User data is never monetized.
- **Free for Everyone**: All software, guides, and tools remain free for the public.
