# 🧺 KigaliCraft — Rwandan Handicraft Marketplace

> An e-commerce web application connecting Rwanda's finest artisans with customers around the world.

**Course:** EWA408510 – E-Commerce and Web Application
**Student:** Thomas S. Yekee | GitHub: tyekee8-creator
**Instructor:** Eric Maniraguha
**Academic Year:** 2025–2026

---

## 🔗 Quick Links

| | Link |
|---|---|
| 🌍 **Live Application** | https://kigalicraft.onrender.com |
| 📂 **GitHub Repository** | https://github.com/tyekee8-creator/kigalicraft |
| 📄 **Project Report** | See `docs/KigaliCraft_Project_Report_FINAL.docx` |

---

## 📖 Project Report (Summary)

### 1. Introduction
KigaliCraft is a full-stack e-commerce web application developed as the final project for EWA408510. The platform provides an online marketplace for a local Rwandan business specializing in authentic handmade crafts — woven baskets, pottery, textiles, jewelry, woodwork, and traditional Imigongo paintings — connecting skilled local artisans with customers around the world.

The application covers all required components: a responsive multi-page frontend, a RESTful Node.js backend API, a relational database design, automated testing, Docker containerization, and a full CI/CD pipeline using GitHub Actions.

### 2. Problem Statement
Many small and medium Rwandan businesses, including artisan cooperatives, lack an accessible digital storefront to reach customers beyond their local market. Without an online presence, these businesses miss opportunities for wider sales, fair pricing, and global visibility. KigaliCraft addresses this gap by providing a complete, ready-to-deploy e-commerce platform tailored to the needs of a handicraft business.

### 3. Project Objectives
- Design and implement a responsive, professional e-commerce UI
- Build a complete product catalog with category browsing, search, filtering, and sorting
- Implement full shopping cart functionality with automatic total calculation
- Build a multi-step checkout with client- and server-side form validation
- Design and implement a relational data model
- Containerize the application using Docker
- Implement a CI/CD pipeline using GitHub Actions
- Deploy the application to a publicly accessible URL

### 4. System Features

**Customer-Facing:**
- Responsive homepage with hero section, categories, featured products, and testimonials
- 24 products across 6 categories: Baskets, Pottery, Textiles, Jewelry, Woodwork, Paintings
- Search, category filters, price-range filters, and sort options
- Grid and list view toggle
- Detailed product pages with artisan info, origin, material, and stock level
- Shopping cart with live quantity controls and free-shipping threshold
- Multi-step checkout: Cart → Checkout → Confirmation
- MTN Mobile Money, Airtel Money, and card payment support
- Order confirmation page with printable receipt
- User account registration and sign-in with password-strength feedback
- About page with artisan profiles
- Contact page with form validation

**Backend / API:**
- RESTful API for products, authentication, and orders
- Password hashing with bcrypt (cost factor 12) and JWT session tokens
- Server-side input validation
- Health-check endpoint (/api/health)
- Automated API test suite — 19 tests, all passing

### 5. Technologies Used

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3 (custom responsive), Vanilla JavaScript |
| Backend | Node.js, Express.js |
| Database | JSON-file relational store (custom db.js — zero native deps) |
| Authentication | bcryptjs (password hashing), jsonwebtoken (JWT) |
| Containerization | Docker, Docker Compose |
| CI/CD | GitHub Actions (.github/workflows/ci-cd.yml) |
| Deployment | Render (https://kigalicraft.onrender.com) |
| Version Control | Git, GitHub |

### 6. System Architecture
KigaliCraft follows a three-tier architecture:
- **Presentation Layer** — 9 HTML/CSS/JS pages served by Express, using localStorage for client-side cart state
- **Application Layer** — Express.js REST API with JWT authentication and bcrypt password hashing
- **Data Layer** — JSON-file database with four relational tables: users, products, orders, order_items

All components run in a single Docker container on port 5000.

### 7. Database Design
Four entities with relational foreign-key semantics:
- **users** — id, first_name, last_name, email (unique), phone, password (bcrypt hash), role, created_at
- **products** — id, name, category, price, description, artisan, origin, material, stock, rating, reviews, emoji
- **orders** — id, order_ref (unique), customer details, shipping address, payment_method, subtotal, shipping_cost, tax, total, status
- **order_items** — id, order_id (→ orders), product_id (→ products), product_name, price, quantity

See `database/schema.sql` for the equivalent SQL DDL.

### 8. GitHub Repository
**URL:** https://github.com/tyekee8-creator/kigalicraft

Contains: frontend (9 HTML pages + CSS + JS), backend (Express API + db.js + seed.js + 19-test suite), database/schema.sql, Dockerfile, docker-compose.yml, .github/workflows/ci-cd.yml, and this README.

### 9. Deployment
**Live URL:** https://kigalicraft.onrender.com

Deployed on Render using Docker. The service remains accessible during the evaluation period.

### 10. CI/CD Implementation
GitHub Actions workflow runs three sequential jobs on every push to main:
1. **Build & Test (19s)** — installs dependencies, seeds database, starts server, runs 19 API tests
2. **Docker Build & Verify (40s)** — builds Docker image, starts container, verifies /api/health
3. **Deploy to Production (4s)** — final stage, runs only when both prior jobs pass

**Total duration: 1 minute 13 seconds. Status: SUCCESS ✅**

### 11. Docker Implementation
Single Dockerfile using node:18-alpine. Commands:
```bash
docker build -t kigalicraft .
docker run -p 5000:5000 kigalicraft
docker compose up --build
```

### 12. Challenges Encountered
- Native SQLite bindings require C++ compilation — solved with dependency-free JSON database
- Full mobile responsiveness across 9 pages required careful CSS restructuring
- Three payment methods required conditional form fields and dynamic validation
- WSL2 needed updating before Docker Desktop would start on Windows

### 13. Future Enhancements
- Real payment gateway (Flutterwave, Paystack, Stripe)
- Admin dashboard for product and order management
- Email order notifications
- Customer reviews and star ratings
- Multi-language support (English, Kinyarwanda, French)
- PostgreSQL migration for production scale
- Real-time order tracking with WebSockets

### 14. Conclusion
KigaliCraft demonstrates a complete, production-style e-commerce workflow covering all functional requirements (product management, shopping cart, checkout, database integration) and all mandatory DevOps requirements (GitHub, deployment, CI/CD, Docker) as specified in the course brief.

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js 18+
- npm

### Run Locally
```bash
git clone https://github.com/tyekee8-creator/kigalicraft.git
cd kigalicraft/backend
npm install
npm run seed
npm start
```
Open **http://localhost:5000**

### Run Tests
```bash
# In one terminal:
npm start

# In another terminal:
npm test
```

---

## 🐳 Docker

```bash
# Build the image
docker build -t kigalicraft .

# Run the container
docker run -p 5000:5000 kigalicraft

# Or use docker-compose
docker compose up --build
```

Open **http://localhost:5000**

---

## 📂 Project Structure

```
kigali-market/
├── frontend/
│   ├── index.html          # Homepage
│   ├── products.html       # Shop with filters
│   ├── product-detail.html # Single product
│   ├── cart.html           # Shopping cart
│   ├── checkout.html       # Checkout form
│   ├── confirmation.html   # Order confirmation
│   ├── auth.html           # Sign in / Register
│   ├── about.html          # About page
│   ├── contact.html        # Contact page
│   ├── manifest.json       # PWA manifest
│   ├── css/style.css       # All styles
│   └── js/
│       ├── data.js         # Product catalog
│       ├── cart.js         # Cart management
│       └── main.js         # UI utilities
├── backend/
│   ├── server.js           # Express server & API
│   ├── db.js               # JSON database layer
│   ├── seed.js             # Database seeder
│   ├── package.json
│   └── test/api.test.js    # 19 automated tests
├── database/
│   └── schema.sql          # Relational schema reference
├── docs/
│   ├── KigaliCraft_Project_Report_FINAL.docx
│   └── screenshots/        # Application screenshots
├── .github/workflows/
│   └── ci-cd.yml           # GitHub Actions pipeline
├── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## 🔐 Security
- Passwords hashed with bcrypt (cost factor 12)
- JWT-based authentication for protected routes
- Server-side input validation on all endpoints
- CORS enabled
- Secrets managed via environment variables

---

## 🌟 Innovation Bonus Features
- **MTN Mobile Money & Airtel Money** UI — reflects real Rwandan payment methods
- **PWA manifest** — "Add to Home Screen" capability
- **Artisan storytelling** — each product linked to a named artisan and district
- **Print-friendly** order receipt
- **Coupon code** field (demo: `RWANDA10`)

---

*Made with ❤️ in Rwanda 🇷🇼 — KigaliCraft 2026*
