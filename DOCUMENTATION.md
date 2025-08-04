# Aurabags API Complete Documentation

This document provides comprehensive API documentation for the Aurabags e-commerce backend. It includes all endpoints with detailed request/response examples, authentication requirements, and error handling.

---

## Base URL
```
Development: http://127.0.0.1:8000/api/
Production: https://your-domain.com/api/
```

## Authentication
Most endpoints require JWT authentication. Include the access token in the Authorization header:
```
Authorization: Bearer <access_token>
```

## Authentication

### 1. Login
- **URL**: `/auth/jwt/create/`
- **Method**: POST
- **Body Parameters**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "refresh": "string",
    "access": "string"
  }
  ```

### 2. Refresh Token
- **URL**: `/auth/jwt/refresh/`
- **Method**: POST
- **Body Parameters**:
  ```json
  {
    "refresh": "string"
  }
  ```
- **Response**:
  ```json
  {
    "access": "string"
  }
  ```

### 3. Verify Token
- **URL**: `/auth/jwt/verify/`
- **Method**: POST
- **Body Parameters**:
  ```json
  {
    "token": "string"
  }
  ```
- **Response**:
  ```json
  {}
  ```

### 4. Register
- **URL**: `/auth/users/`
- **Method**: POST
- **Body Parameters**:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "username": "string",
    "email": "string",
    "id": "int"
  }
  ```

---

## User Management

### 5. Get User Profile
- **URL**: `/users/profile/`
- **Method**: GET
- **Authentication**: Required
- **Response**:
  ```json
  {
    "id": "int",
    "username": "string",
    "email": "string",
    "first_name": "string",
    "last_name": "string",
    "profile": {
      "phone": "string",
      "address": "string",
      "city": "string",
      "state": "string",
      "country": "string",
      "postal_code": "string",
      "date_of_birth": "date",
      "avatar": "url"
    }
  }
  ```

### 6. Update User Profile
- **URL**: `/users/profile/details/`
- **Method**: PUT
- **Authentication**: Required
- **Body Parameters**:
  ```json
  {
    "phone": "string",
    "address": "string",
    "city": "string",
    "state": "string",
    "country": "string",
    "postal_code": "string"
  }
  ```
- **Response**:
  ```json
  {
    "phone": "string",
    "address": "string",
    "city": "string",
    "state": "string",
    "country": "string",
    "postal_code": "string",
    "date_of_birth": "date",
    "avatar": "url"
  }
  ```

---

## Products

### 7. List Products
- **URL**: `/products/`
- **Method**: GET
- **Query Params**:
  - `category`: integer
  - `brand`: integer
  - `is_featured`: boolean
  - `min_price`: float
  - `max_price`: float
- **Response**:
  ```json
  [
    {
      "id": "int",
      "name": "string",
      "slug": "string",
      "short_description": "string",
      "price": "float",
      "category": {
        "id": "int",
        "name": "string"
      }
    }
  ]
  ```

### 8. Get Product Detail
- **URL**: `/products/<slug>/`
- **Method**: GET
- **Response**:
  ```json
  {
    "id": "int",
    "name": "string",
    "description": "string",
    "price": "float",
    "images": [
      {
        "id": "int",
        "image": "url"
      }
    ]
  }
  ```

### 9. Create Product
- **URL**: `/products/`
- **Method**: POST
- **Authentication**: Admin
- **Body Parameters**:
  ```json
  {
    "name": "string",
    "description": "string",
    "price": "float"
  }
  ```
- **Response**:
  ```json
  {
    "id": "int",
    "name": "string"
  }
  ```

### 10. Update Product
- **URL**: `/products/<slug>/`
- **Method**: PUT
- **Authentication**: Admin
- **Body Parameters**:
  ```json
  {
    "name": "string",
    "description": "string",
    "price": "float"
  }
  ```
- **Response**:
  ```json
  {
    "id": "int",
    "name": "string"
  }
  ```

### 11. Delete Product
- **URL**: `/products/<slug>/`
- **Method**: DELETE
- **Authentication**: Admin
- **Response**:
  ```json
  {
    "message": "Product deleted successfully."
  }
  ```

---

## Categories

### 12. List Categories
- **URL**: `/categories/`
- **Method**: GET
- **Response**:
  ```json
  [
    {
      "id": "int",
      "name": "string",
      "slug": "string",
      "children": []
    }
  ]
  ```

### 13. Create Category
- **URL**: `/categories/`
- **Method**: POST
- **Authentication**: Admin
- **Body Parameters**:
  ```json
  {
    "name": "string",
    "description": "string"
  }
  ```
- **Response**:
  ```json
  {
    "id": "int",
    "name": "string"
  }
  ```

---

## Brands

### 14. List Brands
- **URL**: `/brands/`
- **Method**: GET
- **Response**:
  ```json
  [
    {
      "id": "int",
      "name": "string",
      "slug": "string"
    }
  ]
  ```

### 15. Create Brand
- **URL**: `/brands/`
- **Method**: POST
- **Authentication**: Admin
- **Body Parameters**:
  ```json
  {
    "name": "string",
    "description": "string"
  }
  ```
- **Response**:
  ```json
  {
    "id": "int",
    "name": "string"
  }
  ```

---

## Reviews

### 16. Get Product Reviews
- **URL**: `/reviews/products/<product_id>/`
- **Method**: GET
- **Response**:
  ```json
  [
    {
      "id": "int",
      "rating": "int",
      "comment": "string"
    }
  ]
  ```

### 17. Create Review
- **URL**: `/reviews/`
- **Method**: POST
- **Authentication**: Required
- **Body Parameters**:
  ```json
  {
    "product": "int",
    "rating": "int",
    "title": "string",
    "comment": "string"
  }
  ```
- **Response**:
  ```json
  {
    "id": "int",
    "product": "int"
  }
  ```

### 18. Mark Review as Helpful
- **URL**: `/reviews/<review_id>/helpful/`
- **Method**: POST
- **Authentication**: Required
- **Body Parameters**:
  ```json
  {
    "is_helpful": "boolean"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Vote recorded successfully."
  }
  ```

---

## Orders

### 19. List Orders
- **URL**: `/orders/`
- **Method**: GET
- **Authentication**: Required
- **Response**:
  ```json
  [
    {
      "order_number": "string",
      "total": "float"
    }
  ]
  ```

### 20. Create Order
- **URL**: `/orders/create/`
- **Method**: POST
- **Authentication**: Required
- **Body Parameters**:
  ```json
  {
    "address": "string",
    "city": "string",
    "state": "string",
    "country": "string",
    "postal_code": "string",
    "items": [
      {
        "product_id": "int",
        "quantity": "int"
      }
    ]
  }
  ```
- **Response**:
  ```json
  {
    "order_number": "string",
    "total": "float"
  }
  ```

---

## Cart

### 21. Get User Cart
- **URL**: `/users/cart/`
- **Method**: GET
- **Authentication**: Required
- **Response**:
  ```json
  {
    "total_items": "int",
    "total_price": "float",
    "items": [
      {
        "id": "int",
        "product": {
          "id": "int",
          "name": "string"
        },
        "quantity": "int",
        "total_price": "float"
      }
    ]
  }
  ```

### 22. Add to Cart
- **URL**: `/users/cart/items/`
- **Method**: POST
- **Authentication**: Required
- **Body Parameters**:
  ```json
  {
    "product": "int",
    "quantity": "int"
  }
  ```
- **Response**:
  ```json
  {
    "id": "int",
    "product": {
      "id": "int",
      "name": "string"
    },
    "quantity": "int",
    "total_price": "float"
  }
  ```

---

## FAQs & Policies

### 23. List FAQs
- **URL**: `/faqs/faqs/`
- **Method**: GET
- **Response**:
  ```json
  [
    {
      "question": "string",
      "answer": "string"
    }
  ]
  ```

### 24. List Policies
- **URL**: `/faqs/policies/`
- **Method**: GET
- **Response**:
  ```json
  [
    {
      "title": "string",
      "content": "string"
    }
  ]
  ```

---

## 📚 *This document provides an extensive overview of the Aurabags API for frontend integration, including authentication routes, product and category operations, order and cart management, and dynamic content handling like FAQs and reviews.*
