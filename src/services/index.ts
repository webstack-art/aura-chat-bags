// Export all services for easy importing
export { default as apiService } from './api';
export { default as authService } from './authService';
export { default as productService } from './productService';
export { default as categoryService } from './categoryService';
export { default as brandService } from './brandService';
export { default as reviewService } from './reviewService';
export { default as cartService } from './cartService';
export { default as orderService } from './orderService';
export { default as contentService } from './contentService';

// Export types
export type { AuthResponse, User, RegisterData, LoginData, ProfileUpdateData } from './authService';
export type { Product, ProductListResponse, ProductFilters, CreateProductData } from './productService';
export type { Category, CreateCategoryData } from './categoryService';
export type { Brand, CreateBrandData } from './brandService';
export type { Review, CreateReviewData, ReviewHelpfulData } from './reviewService';
export type { CartItem, Cart, AddToCartData, UpdateCartItemData } from './cartService';
export type { Order, OrderItem, CreateOrderData, OrderListResponse } from './orderService';
export type { FAQ, Policy, ContactMessage, CreateFAQData, CreatePolicyData, CreateContactMessageData } from './contentService';
