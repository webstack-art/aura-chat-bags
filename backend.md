# Backend Architecture for aurabags-frontend (Django REST Framework)

---

## 1. Technology Stack

- **Python**
- **Django** (Web framework)
- **Django REST Framework** (API layer)
- **Django Admin** (built-in admin dashboard)
- **PostgreSQL** (recommended, but can use SQLite for dev)
- **django-storages** (for cloud file uploads, e.g., AWS S3)
- **JWT or Session Auth** (for authentication)

---

## 2. Core Features

### A. Product Management

- **Product Model**
  - Fields: name, description, price, images (ImageField/FileField), category (ForeignKey), stock, is_featured, brand, etc.
- **CRUD via Django Admin**
  - Admins can add/edit/delete products easily
- **API Endpoints**
  - List, detail, search, filter by category/brand/price
- **Image Uploads**
  - Handled via Django forms/admin and REST API

- **Product Reviews**
  - Model: product, user, rating, comment, created_at
  - API for users to post reviews
  - Admin moderation via Django Admin
  - Custom Reviews: Admins can add, edit, or delete reviews directly from the Django Admin panel. This enables curated or promotional reviews to be displayed alongside user-generated reviews. The reviews model can include a flag (e.g., `is_custom`) to distinguish admin-created reviews from user reviews. API endpoints can expose both types, or filter as needed for frontend display.

---

### B. Category Management

- **Category Model**
  - Fields: name, image, description, parent (optional for hierarchy)
- **CRUD via Django Admin**
- **API Endpoints**
  - List all categories, filter products by category

---

### C. Admin Management

- **Django Admin Panel**
  - Built-in, customizable
  - Role-based access (superuser, staff)
  - Manage products, categories, orders, users, reviews

---

### D. User Management

- **User Model**
  - Use Django's built-in User or extend with custom fields
- **Registration/Login**
  - API endpoints for user registration, login (JWT or session)
- **Profile Management**
  - API for updating profile info

- **Cart & Orders**
  - Cart Model: user, items (product, quantity)
  - Order Model: user, items, status, total, address, etc.
  - API for cart operations, placing orders, viewing order history

---

### E. Dynamic Content

- **Best Sellers, Featured Categories**
  - Product model can have is_featured, sales_count fields
  - API endpoints to fetch featured/best-selling products

- **Search & Filters**
  - API for searching products by name, category, price, etc.

- **FAQ, Policies, Reviews**
  - FAQ/Policy models for dynamic content
  - CRUD via admin, API for frontend

---

### F. Other Dynamic Features

- **Brands Management**
  - Brand model, link products to brands
  - CRUD via admin, API for frontend

- **Order Management**
  - Admin can view/manage orders, update status

- **Support/Contact**
  - Contact/Support model, store messages, admin can view/respond

---

## 3. Example API Endpoints (DRF)

- `GET /api/products/` (list, filter, search)
- `POST /api/products/` (admin only)
- `GET /api/products/<id>/` (detail)
- `PUT /api/products/<id>/` (admin only)
- `DELETE /api/products/<id>/` (admin only)
- `GET /api/categories/` (list)
- `POST /api/categories/` (admin only)
- `GET /api/brands/` (list)
- `POST /api/brands/` (admin only)
- `POST /api/auth/register/`
- `POST /api/auth/login/`
- `GET /api/cart/`, `POST /api/cart/`
- `POST /api/orders/`, `GET /api/orders/`
- `POST /api/reviews/`, `GET /api/reviews/?product=<id>`
- `GET /api/faqs/`, `GET /api/policies/`

---

## 4. Security & Best Practices

- Use HTTPS
- Validate all inputs (DRF serializers)
- Protect admin endpoints with permissions
- Limit file upload size/types
- Sanitize user-generated content

---

## 5. Deployment

- Host API (e.g., on Heroku, AWS, Vercel, DigitalOcean)
- Use environment variables for secrets
- Set up automated backups for DB
- Use whitenoise or S3 for static/media files

---

## 6. Extensibility

- Add analytics (track views, sales)
- Integrate payment gateways (Stripe, PayPal)
- Add email notifications (order confirmation, password reset)
- Multi-admin support

---

## 7. Suggested Django App Structure

```
backend/
  aurabags/
    settings.py
    urls.py
    wsgi.py
    ...
  products/
    models.py
    views.py
    serializers.py
    admin.py
    urls.py
  categories/
    models.py
    views.py
    serializers.py
    admin.py
    urls.py
  users/
    models.py
    views.py
    serializers.py
    admin.py
    urls.py
  orders/
    models.py
    views.py
    serializers.py
    admin.py
    urls.py
  reviews/
    models.py
    views.py
    serializers.py
    admin.py
    urls.py
  faqs/
    models.py
    views.py
    serializers.py
    admin.py
    urls.py
  brands/
    models.py
    views.py
    serializers.py
    admin.py
    urls.py
```

---

This backend plan leverages Django's built-in admin and DRF for a robust, scalable, and easily manageable solution. If you need model or API code samples, let me know!
