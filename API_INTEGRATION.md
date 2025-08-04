# Backend API Integration Guide

This guide explains how to integrate the Django REST Framework backend with your React frontend.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install axios
```

### 2. Environment Configuration

Copy `.env.example` to `.env.local` and configure your API base URL:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api/
```

### 3. Basic Usage

```typescript
import { useProducts, useAuth } from '@/hooks';
import { productService } from '@/services';

// Using React Query hooks
const { data: products, isLoading } = useProducts();
const { login, isLoggingIn } = useAuth();

// Direct service usage
const product = await productService.getProduct('product-slug');
```

## 📁 File Structure

```
src/
├── services/           # API service layer
│   ├── api.ts         # Base API service with axios
│   ├── authService.ts # Authentication endpoints
│   ├── productService.ts # Product management
│   ├── cartService.ts # Shopping cart
│   ├── orderService.ts # Order management
│   └── index.ts       # Export all services
├── hooks/             # React Query hooks
│   ├── useAuth.ts     # Authentication hooks
│   ├── useProducts.ts # Product hooks
│   ├── useCart.ts     # Cart hooks
│   └── ...
└── types/             # TypeScript interfaces
```

## 🔧 Services Overview

### Authentication Service

```typescript
import { authService } from '@/services';

// Login
await authService.login({ username: 'user', password: 'pass' });

// Register
await authService.register({ 
  username: 'user', 
  email: 'user@example.com', 
  password: 'pass' 
});

// Get current user
const user = await authService.getCurrentUser();

// Update profile
await authService.updateProfile({ phone: '+1234567890' });
```

### Product Service

```typescript
import { productService } from '@/services';

// Get all products with filters
const products = await productService.getProducts({
  category: 1,
  min_price: 50,
  max_price: 200,
  is_featured: true
});

// Get single product
const product = await productService.getProduct('product-slug');

// Search products
const results = await productService.searchProducts('handbag');

// Admin: Create product (requires authentication)
const newProduct = await productService.createProduct({
  name: 'New Handbag',
  description: 'Beautiful handbag',
  price: 299.99,
  category: 1,
  brand: 1
});
```

### Cart Service

```typescript
import { cartService } from '@/services';

// Get user's cart
const cart = await cartService.getCart();

// Add item to cart
await cartService.addToCart({
  product: 1,
  quantity: 2,
  color: 'Black'
});

// Update cart item
await cartService.updateCartItem(1, { quantity: 3 });

// Remove from cart
await cartService.removeFromCart(1);
```

### Order Service

```typescript
import { orderService } from '@/services';

// Get user orders
const orders = await orderService.getOrders();

// Create order
const order = await orderService.createOrder({
  address: '123 Main St',
  city: 'New York',
  state: 'NY',
  country: 'USA',
  postal_code: '10001',
  items: [
    { product_id: 1, quantity: 2 }
  ]
});

// Track order
const tracking = await orderService.trackOrder('ORD-123456');
```

## 🎣 React Query Hooks

### Authentication Hooks

```typescript
import { useAuth, useCurrentUser } from '@/hooks';

function LoginForm() {
  const { login, isLoggingIn, loginError } = useAuth();
  const { data: user } = useCurrentUser();

  const handleLogin = () => {
    login({ username, password });
  };

  return (
    <form onSubmit={handleLogin}>
      {/* form fields */}
      <button disabled={isLoggingIn}>
        {isLoggingIn ? 'Logging in...' : 'Login'}
      </button>
      {loginError && <p>Error: {loginError.message}</p>}
    </form>
  );
}
```

### Product Hooks

```typescript
import { useProducts, useProduct, useFeaturedProducts } from '@/hooks';

function ProductList() {
  const { data: products, isLoading, error } = useProducts({
    category: 1,
    page: 1
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {products?.results.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductDetail({ slug }: { slug: string }) {
  const { data: product, isLoading } = useProduct(slug);
  
  if (isLoading) return <div>Loading...</div>;
  
  return <div>{product?.name}</div>;
}
```

### Cart Hooks

```typescript
import { useCart, useAddToCart } from '@/hooks';

function CartDrawer() {
  const { data: cart, isLoading } = useCart();
  const addToCart = useAddToCart();

  const handleAddToCart = (productId: number) => {
    addToCart.mutate({
      product: productId,
      quantity: 1
    });
  };

  return (
    <div>
      <h2>Cart ({cart?.total_items})</h2>
      {cart?.items.map(item => (
        <div key={item.id}>
          {item.product.name} - ${item.total_price}
        </div>
      ))}
    </div>
  );
}
```

## 🔐 Authentication Flow

### 1. Login Process

```typescript
// 1. User submits login form
const { login } = useAuth();
login({ username: 'user', password: 'pass' });

// 2. Service stores tokens in localStorage
localStorage.setItem('access_token', response.data.access);
localStorage.setItem('refresh_token', response.data.refresh);

// 3. Subsequent requests automatically include token
// via axios interceptor
```

### 2. Token Refresh

```typescript
// Automatic token refresh in api.ts interceptor
if (error.response?.status === 401) {
  const refreshToken = localStorage.getItem('refresh_token');
  const response = await this.refreshToken(refreshToken);
  // Retry original request with new token
}
```

### 3. Logout

```typescript
const { logout } = useAuth();
logout(); // Clears tokens and query cache
```

## 🛡️ Error Handling

### Global Error Handling

```typescript
// In api.ts - response interceptor handles common errors
this.api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
    }
    if (error.response?.status === 403) {
      // Handle forbidden
    }
    return Promise.reject(error);
  }
);
```

### Component Error Handling

```typescript
const { data, error, isLoading } = useProducts();

if (error) {
  return (
    <div className="error">
      <h3>Error loading products</h3>
      <p>{error.message}</p>
      <button onClick={() => refetch()}>Retry</button>
    </div>
  );
}
```

## 📄 File Uploads

### Product Images

```typescript
// Upload product image
const file = event.target.files[0];
await productService.uploadProductImage(productId, file, 'Alt text', true);
```

### Category/Brand Images

```typescript
// Create category with image
await categoryService.createCategory({
  name: 'New Category',
  description: 'Category description',
  image: file
});
```

## 🎯 Best Practices

### 1. Use React Query for Data Fetching

```typescript
// ✅ Good - Uses React Query with caching
const { data: products } = useProducts();

// ❌ Avoid - Direct API calls in components
useEffect(() => {
  productService.getProducts().then(setProducts);
}, []);
```

### 2. Handle Loading States

```typescript
function ProductList() {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) return <ProductSkeleton />;
  if (error) return <ErrorMessage error={error} />;
  if (!products?.results.length) return <EmptyState />;

  return <ProductGrid products={products.results} />;
}
```

### 3. Optimistic Updates

```typescript
const updateCartItem = useUpdateCartItem();

const handleQuantityChange = (itemId: number, quantity: number) => {
  updateCartItem.mutate(
    { itemId, data: { quantity } },
    {
      onSuccess: () => {
        toast.success('Cart updated');
      },
      onError: () => {
        toast.error('Failed to update cart');
      }
    }
  );
};
```

### 4. Environment Configuration

```typescript
// Use environment variables for configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const MAX_FILE_SIZE = parseInt(import.meta.env.VITE_MAX_FILE_SIZE);
```

## 🔄 Migration from Mock Data

### 1. Replace Mock Services

```typescript
// Before - Mock data
import { products } from '@/data/products';

// After - API service
import { useProducts } from '@/hooks/useProducts';
const { data: products } = useProducts();
```

### 2. Update Components

```typescript
// Before - Static data
function BestSellers() {
  const bestSellers = products.filter(p => p.badge === 'Best Seller');
  
// After - Dynamic data
function BestSellers() {
  const { data: bestSellers } = useFeaturedProducts();
```

### 3. Add Loading States

```typescript
// Add loading and error states to existing components
function ProductCard() {
  if (isLoading) return <ProductCardSkeleton />;
  if (error) return <ProductCardError />;
  return <ProductCardContent />;
}
```

## 🚀 Deployment Considerations

### 1. Environment Variables

```env
# Production
VITE_API_BASE_URL=https://api.aurabags.com/api/

# Staging
VITE_API_BASE_URL=https://staging-api.aurabags.com/api/
```

### 2. Build Configuration

```json
{
  "scripts": {
    "build:dev": "vite build --mode development",
    "build:staging": "vite build --mode staging",
    "build:prod": "vite build --mode production"
  }
}
```

### 3. CORS Configuration

Ensure your Django backend allows requests from your frontend domain:

```python
# Django settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://aurabags.com",
]
```

This integration provides a complete, type-safe, and efficient way to connect your React frontend with the Django REST Framework backend!
