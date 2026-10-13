# Team Venture Metal Coating LLC – S.P.C.
### Official Dynamic & Fully Responsive Corporate Website
**Abu Dhabi, United Arab Emirates**

---

## 🌟 Overview
Dynamic, high-performance, and mobile/tablet/desktop responsive website developed for **Team Venture Metal Coating LLC – S.P.C.**, a specialized engineering and industrial services company based in Musaffah, Abu Dhabi, UAE with branch facilities in Sajja, Sharjah.

---

## 🚀 Key Features

1. **Fully Responsive Across All Devices**:
   - **Desktop & 4K Displays**: Fluid layouts, grid cards, and interactive hover feedback.
   - **Tablets (iPad Portrait / Landscape)**: Adaptive 2-column breakdowns, touch-friendly tab selectors.
   - **Mobile (iPhone, Android)**: Animated hamburger drawer menu, stacked touch cards, quick-dial and instant WhatsApp action bar.

2. **Modest, Dignified Corporate Engineering Design**:
   - Refined matte charcoal slate (`#13161f`, `#1a1e2b`) with warm architectural bronze (`#c59b56`) and titanium steel blue accents.
   - Stately serif typography (**Merriweather**) mirroring the company's official brochure, paired with clean, readable **Inter** body copy.
   - Restrained, professional presentation without loud neon glows or flashy animations.
   - Official corporate logo image (`company-logo-raw.png`) cleanly framed in high-contrast emblem container.

3. **Core Engineering Divisions (Interactive Tabs)**:
   - **Pipe & Pipeline Services**: Spool fabrication, coating, welding, NDT, shutdown & emergency repairs.
   - **Oil & Gas Field Services (Onshore & Offshore)**: Facility support, equipment fabrication, structural mods.
   - **Structural Fabrication**: Carbon Steel & Stainless Steel works, skids, frames, tanks, marine structures.
   - **Material Procurement & Global Sourcing**: Overseas grade imports, ADNOC-approved vendors, ASTM/ASME/API compliance.

4. **Dynamic Project Portfolio Gallery**:
   - Filterable categories: *All Projects*, *Pipe & Pipeline*, *Structural Fabrication*, *Oil & Gas Field*, *Material Sourcing*.
   - Interactive Lightbox Modal with zoom, project specifications, and quick inquiry buttons.

5. **Interactive RFQ Quote Calculator**:
   - Instant estimation of turnaround schedules and compliance standards based on service type, metallurgy, and tonnage.
   - Direct form submission with feedback notifications.

6. **Official UAE Contact Hub & Direct Integration**:
   - **Head Office**: Office: 3, Mazyad Mall, Office No: 1136, Zayed City, Musaffah Industrial Area, Abu Dhabi, UAE.
   - **Branch Office**: Plot No: 5204, Sajja, Sharjah, U.A.E.
   - **Official Phone**: `+971 554098437`
   - **Official Email**: `info@tvmcservices.com`
   - **Direct WhatsApp**: One-tap floating WhatsApp widget connected to `+971 554098437`.

---

## 📁 Project Architecture & File Separation

The codebase has been refactored into a clean, modular, multi-page structure with separated concerns:

### 1. HTML Pages (Dedicated Multi-Page Structure)
- **`index.html`**: Executive Home Page (Hero, KPI Trust Metrics, Capabilities Snapshot, Featured Portfolio, Primary CTA)
- **`about.html`**: About Us & QA/QC (Company profile, Musaffah & Sajja facilities, ASME B31.3 & AWS D1.1 certifications, HSE policies)
- **`services.html`**: Engineering Services (Comprehensive breakdown of all 6 fabrication & coating disciplines with technical specifications)
- **`portfolio.html`**: Project Portfolio (Complete 16-project authentic gallery, category filter tabs, interactive Lightbox modal)
- **`rfq.html`**: RFQ Estimating Desk (Live scope calculator, schedule turnaround estimation, direct email dispatch)
- **`contact.html`**: Contact & Operations (Mazyad Mall Abu Dhabi Office, Musaffah Yard, Sajja Sharjah Branch, electronic mail desk)

### 2. Modular CSS Stylesheets (`assets/css/`)
- **`variables.css`**: Design tokens, color palette, typography definitions, container tokens, resets
- **`header.css`**: Topbar, brand emblem, desktop/tablet navigation, mobile drawer collapse
- **`components.css`**: Buttons, form inputs, modal dialogs, badges, toast notifications, floating widgets
- **`sections.css`**: Layout styles for Hero, About, Services, Quality, Portfolio, RFQ estimator, Contact hubs, Footer
- **`style.css`**: Master stylesheet entry point linking the modular CSS files via clean `@import` rules

### 3. Modular JavaScript Files (`assets/js/`)
- **`navigation.js`**: Header scroll behavior, mobile menu drawer toggle, global modal open/close helpers, ESC listeners
- **`counters.js`**: Animated KPI metric counters with intersection observer detection
- **`portfolio.js`**: Portfolio category tab filters, authentic project Lightbox modal viewer, image expansion
- **`rfq-calculator.js`**: Interactive scope estimator, dynamic turnaround days calculation, compliance specs
- **`email-dispatch.js`**: Form submissions, REST API persistence (`/api/rfq`, `/api/contact`), email confirmation modal, direct `mailto:info@tvmcservices.com` launch
- **`main.js`**: Master bootstrap script initializing modules across all pages

---

## 🛠️ Technology Stack
- **Structure**: Semantic HTML5 with Schema.org JSON-LD local business SEO.
- **Styling**: Modular Vanilla CSS3 (Custom properties, flexbox, CSS grid, glassmorphism).
- **Logic**: Modular Vanilla JavaScript (ES6+), separated by responsibility.
- **Server**: Zero-dependency Node.js HTTP server (`server.js`) with persistent JSON storage (`data/`).

---

## 💻 Running Locally

To start the local development server:

```bash
npm run dev
# or
node server.js
```

The website will be accessible at:
```
http://localhost:3000/
```
