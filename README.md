# 🧺 KigaliCraft — Rwandan Handicraft Marketplace

> An e-commerce web application connecting Rwanda's finest artisans with customers around the world.

**Course:** EWA408510 – E-Commerce and Web Application
**Submission:** Final Examination (Project-Based) — Academic Year 2025-2026

--
## 📖 Overview

KigaliCraft is a full-stack e-commerce platform built for a fictional local Rwandan business specializing in handmade crafts — woven baskets, pottery, textiles, jewelry, woodwork, and Imigongo paintings. The platform allows customers to browse products, manage a shopping cart, complete a multi-step checkout, and track their order, while artisans' stories and Rwandan culture are showcased throughout.

🏗️ System Architecture
The KigaliCraft platform follows a three-layer architecture:

Frontend (Client Layer)

Built with HTML, CSS, and vanilla JavaScript.

Provides responsive UI, shopping cart (localStorage), and form validation.

Communicates with backend via RESTful API calls.

Backend (Application Layer)

Node.js + Express server (backend/server.js).

RESTful endpoints for products, users, orders, and health checks.

Authentication with bcrypt password hashing and JWT tokens.

Serves both API and static frontend files.

Database (Data Layer)

Lightweight JSON-file database (backend/db.js) simulating relational tables.

Entities: users, products, orders, order_items.

Relationships: orders ↔ order_items ↔ products, users ↔ orders.

Infrastructure / DevOps

Dockerized for containerized deployment.

GitHub Actions CI/CD pipeline for automated testing, build, and deployment.

Local development runs on Node.js, production-ready via Docker.

Flow:  
Browser (Frontend) → Express API (Backend) → JSON Database (Data Layer)
with Docker + CI/CD wrapping around for deployment and reliability.

## ✨ Features

### Customer-Facing
- 🏠 Responsive homepage with hero, categories, featured products, testimonials
- 🔍 Product search, category filters, price filters, and sorting (price, rating, name)
- 🛍️ Grid and list view toggle on the shop page
- 📄 Detailed product pages with related items, artisan info, and quantity selector
- 🛒 Full shopping cart: add, remove, update quantity, auto-calculated totals, free-shipping threshold, coupon field
- 💳 Multi-step checkout with live form validation (customer info, shipping address, payment method: MTN Mobile Money / Airtel Money / Card)
- ✅ Order confirmation page with printable receipt
- 🔐 Sign in / Create account with client + server-side validation and password strength meter
- 📱 Fully responsive (mobile, tablet, desktop) with a hamburger menu on small screens
- ♿ Accessible focus states and semantic HTML

### Backend / API
- RESTful API (Node.js + Express)
- Product catalog endpoints with filtering, search, and sorting
- User registration & login with bcrypt password hashing and JWT authentication
- Order placement and retrieval, tied to relational records (orders ↔ order_items ↔ products)
- Health-check endpoint for uptime monitoring
- Lightweight JSON-file database layer (`backend/db.js`) — zero native build dependencies, so it installs and runs identically on any machine, container, or CI runner

### DevOps
- 🐳 Dockerized (single `Dockerfile` + `docker-compose.yml`)
- ⚙️ GitHub Actions CI/CD pipeline: install → seed → test → build Docker image → verify container health → (deploy stage placeholder)
- 🧪 Automated API test suite (`backend/test/api.test.js`)

---

## 🛠️ Tech Stack

| Layer          | Technology                                  |
|----------------|----------------------------------------------|
| Frontend       | HTML5, CSS3 (custom, responsive, no framework), Vanilla JavaScript |
| Backend        | Node.js, Express.js                          |
| Database       | Lightweight JSON-file store (`backend/db.js`) with relational-style tables |
| Auth           | bcryptjs (password hashing), jsonwebtoken (JWT) |
| Containerization | Docker, Docker Compose                     |
| CI/CD          | GitHub Actions                               |
| Fonts          | Playfair Display (display), Inter (body) — Google Fonts |

---

## 📂 Project Structure

```
kigali-market/
├── frontend/
│   ├── index.html              # Homepage
│   ├── products.html           # Shop / product listing with filters
│   ├── product-detail.html     # Single product page
│   ├── cart.html                # Shopping cart
│   ├── checkout.html           # Checkout with validation
│   ├── confirmation.html       # Order confirmation / receipt
│   ├── auth.html                # Sign in / register
│   ├── about.html               # About us / artisans
│   ├── contact.html             # Contact form
│   ├── manifest.json            # PWA manifest
│   ├── css/style.css            # All styling (responsive)
│   └── js/
│       ├── data.js              # Static product catalog (frontend demo data)
│       ├── cart.js              # Cart state management (localStorage)
│       └── main.js              # UI utilities, toasts, rendering helpers
├── backend/
│   ├── server.js                 # Express server & API routes
│   ├── db.js                     # JSON-file database layer
│   ├── seed.js                   # Seeds the database with 24 products
│   ├── package.json
│   ├── test/api.test.js          # API test suite
│   └── data/                     # Generated database file (gitignored)
├── database/                     # SQL schema reference (see below)
├── .github/workflows/ci-cd.yml   # CI/CD pipeline
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js 18+
- npm

### Installation & Run

```bash
# Clone the repository
git clone https://github.com/tyekee8-creator/kigalicraft.git
# Install dependencies
npm install

# Seed the database with the product catalog
npm run seed

# Start the server
npm start
```

The application will be available at **http://localhost:5000** (frontend and API are served from the same Express app).

### Run Tests

```bash
cd backend
npm start &        # start the server in one terminal
npm test            # run the API test suite in another
```

---

## 🐳 Running with Docker

```bash
# Build and run with Docker Compose (recommended)
docker compose up --build

# Or build and run manually
docker build -t kigalicraft .
docker run -p 5000:5000 kigalicraft
```

Visit **http://localhost:5000**.

---

## ⚙️ CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/ci-cd.yml`) runs on every push/PR to `main`:

1. **Build & Test** — installs dependencies, seeds the database, starts the server, and runs the automated API test suite.
2. **Docker Build & Verify** — builds the Docker image and starts a container to confirm the `/api/health` endpoint responds correctly.
3. **Deploy** — placeholder stage that runs on pushes to `main` after both prior jobs succeed (ready to be wired to Render / Railway / Fly.io via a deploy hook secret).

---

## 🗄️ Database Design

Entities and relationships (implemented in `backend/db.js` as JSON "tables", mirroring this relational schema — see `database/schema.sql` for the equivalent SQL DDL):

- **users** (`id`, `first_name`, `last_name`, `email` [unique], `phone`, `password` [hashed], `role`, `created_at`)
- **products** (`id`, `name`, `category`, `price`, `description`, `artisan`, `origin`, `material`, `stock`, `rating`, `reviews`, `emoji`, `created_at`)
- **orders** (`id`, `order_ref` [unique], `customer_name`, `customer_email`, `customer_phone`, `shipping_address`, `shipping_city`, `shipping_country`, `payment_method`, `subtotal`, `shipping_cost`, `tax`, `total`, `status`, `created_at`)
- **order_items** (`id`, `order_id` → orders.id, `product_id` → products.id, `product_name`, `price`, `quantity`)

`orders` 1—N `order_items` N—1 `products`. `users` are linked to `orders` by email (guest checkout is supported; no login required to purchase).

---

## 🔐 Security Notes

- Passwords hashed with bcrypt (cost factor 12), never stored in plaintext
- JWT-based authentication for protected routes
- Server-side input validation on all forms (email format, password length, required fields)
- Client-side validation mirrors server-side rules for fast feedback
- CORS enabled with sane defaults
- `.env.example` provided; real secrets are excluded via `.gitignore`

---

## 🌟 Innovation Highlights (Bonus Features)

- **Mobile Money integration UI** (MTN MoMo / Airtel Money) reflecting how Rwandan customers actually pay online
- **PWA manifest** for "add to home screen" capability
- **Artisan storytelling** — each product is tied to a named artisan and district, reinforcing the fair-trade narrative
- **Print-friendly order receipt**
- **Coupon code field** (demo: `RWANDA10`)

---

## 🚧 Challenges Encountered

- Native SQLite bindings (`better-sqlite3`) require compilation toolchains that aren't guaranteed across all CI/hosting environments; this was solved by implementing a lightweight, dependency-free JSON-file database layer with the same relational semantics, ensuring the app installs and runs identically everywhere with zero native build steps.
- Balancing a rich, multi-page shopping flow with full mobile responsiveness required careful CSS grid restructuring at each breakpoint.

## 🔮 Future Enhancements

- Real payment gateway integration (Flutterwave / Paystack / Stripe)
- Admin dashboard for managing products, orders, and inventory
- Email order confirmations
- Customer reviews and ratings submission
- Multi-language support (English / Kinyarwanda / French)

---

## 👤 Author

Submitted for **EWA408510 – E-Commerce and Web Application**, Faculty of Computing and Information Sciences, ULK.
Instructor: Eric Maniraguha

---

## 📜 License

This project was created for academic purposes as part of a final examination.
