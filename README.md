# Femiora — Feminine. Elegant. Effortless.

Femiora is a full-stack, online-first women's fashion e-commerce platform. It combines a modern Next.js storefront with a FastAPI backend, PostgreSQL database, and a Groq-powered AI shopping assistant.

## Features

### Storefront
- Home page with auto-sliding hero banner carousel
- Product listing with category filtering, hover previews, and quick add-to-bag
- Product detail pages with image gallery, quantity selector, and related products
- Persistent shopping cart (with slide-in cart drawer) using local storage
- Checkout flow with shipping details and Cash on Delivery (COD) payment
- Order confirmation with email notification to the customer
- Wishlist
- Newsletter signup
- Contact Us page with query submission
- Responsive design (mobile-first, 2 columns on mobile / 4 on desktop)

### AI Shopping Assistant
- Floating chat widget powered by the Groq API
- Text-based conversations for outfit suggestions, sizing questions, and general store help
- Image upload support (vision-capable model, pending account access)

### Admin
- JWT-based admin authentication (separate login, protected routes)
- Orders dashboard — view all orders, update order status (pending → confirmed → shipped → delivered → cancelled)
- Customer queries dashboard — view messages submitted via the Contact Us page

## Tech Stack

**Frontend**
- Next.js (App Router) + React + TypeScript
- Tailwind CSS
- Framer Motion (animations)
- lucide-react (icons)

**Backend**
- FastAPI (Python)
- SQLAlchemy ORM + Alembic (migrations)
- PostgreSQL
- Groq API (AI chatbot)
- Cloudinary (image hosting)
- JWT (python-jose) + bcrypt (passlib) for authentication

## Project Structure

femiora/
├── backend/
│ ├── app/
│ │ ├── models/ # SQLAlchemy models (Product, Order, User, etc.)
│ │ ├── routers/ # API endpoints (products, orders, auth, chatbot, contact, newsletter)
│ │ ├── services/ # Business logic (email, cloudinary, chatbot, auth)
│ │ ├── db.py # Database connection
│ │ └── main.py # FastAPI app entry point
│ ├── alembic/ # Database migrations
│ ├── seed.py # Sample product data
│ └── requirements.txt
├── frontend/
│ ├── app/ # Next.js pages (shop, cart, checkout, admin, etc.)
│ ├── components/ # React components (cart, chatbot, layout, home, product)
│ ├── lib/ # API client, Cart/Wishlist context
│ └── package.json
└── README.md


## Getting Started

### Prerequisites
- Node.js (v18+)
- Python 3.12+
- PostgreSQL

### Backend Setup

```bash
cd backend
python -m venv venv
.\venv\Scripts\Activate      # Windows
pip install -r requirements.txt
```

Create a `.env` file in `backend/`:

DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/femiora
GROQ_API_KEY=your_groq_api_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
FROM_EMAIL=your_email@gmail.com
JWT_SECRET=a-long-random-secret-string


Run migrations and seed sample data:
```bash
alembic upgrade head
python -m app.seed
```

Start the server:
```bash
uvicorn app.main:app --reload
```
Backend runs at `http://localhost:8000` (API docs at `/docs`).

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env.local` file in `frontend/`:

NEXT_PUBLIC_API_URL=http://localhost:8000


Start the dev server:
```bash
npm run dev
```
Frontend runs at `http://localhost:3000`.

### Creating an Admin Account

Register a user via `/auth/register` (Swagger docs at `http://localhost:8000/docs`), then promote it to admin:
```sql
UPDATE users SET is_admin = true WHERE email = 'your_email@example.com';
```
Log in at `http://localhost:3000/admin/login`.

## Roadmap
- Payment gateway integration (JazzCash / PayFast) beyond COD
- Multiple product images per item
- Category, price, and size filters on the shop page
- Vision-capable model access for AI assistant image analysis

## License
This project is private and proprietary to Femiora.