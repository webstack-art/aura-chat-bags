import { apiService } from './api';

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: number;
  stock_quantity: number;
  is_featured: boolean;
  is_active: boolean;
  sku: string;
  weight: number;
  dimensions: string;
  materials: string;
  created_at: string;
  updated_at: string;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  brand: {
    id: number;
    name: string;
    slug: string;
  };
  images: {
    id: number;
    image: string;
    alt_text: string;
    is_primary: boolean;
  }[];
  average_rating: number;
  review_count: number;
}

export interface ProductListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
}

export interface ProductFilters {
  category?: number;
  brand?: number;
  is_featured?: boolean;
  min_price?: number;
  max_price?: number;
  search?: string;
  ordering?: string;
  page?: number;
  page_size?: number;
}

export interface CreateProductData {
  name: string;
  description: string;
  short_description?: string;
  price: number;
  stock_quantity?: number;
  is_featured?: boolean;
  category: number;
  brand: number;
  sku?: string;
  weight?: number;
  dimensions?: string;
  materials?: string;
}

class ProductService {
  async getProducts(filters?: ProductFilters): Promise<ProductListResponse> {
    const response = await apiService.get<ProductListResponse>('/products/', filters);
    return response.data;
  }

  async getProduct(slug: string): Promise<Product> {
    const response = await apiService.get<Product>(`/products/${slug}/`);
    return response.data;
  }

  async createProduct(productData: CreateProductData): Promise<Product> {
    const response = await apiService.post<Product>('/products/', productData);
    return response.data;
  }

  async updateProduct(slug: string, productData: Partial<CreateProductData>): Promise<Product> {
    const response = await apiService.put<Product>(`/products/${slug}/`, productData);
    return response.data;
  }

  async deleteProduct(slug: string): Promise<{ message: string }> {
    const response = await apiService.delete<{ message: string }>(`/products/${slug}/`);
    return response.data;
  }

  async getFeaturedProducts(): Promise<Product[]> {
    const response = await this.getProducts({ is_featured: true });
    return response.results;
  }

  async searchProducts(query: string, filters?: Omit<ProductFilters, 'search'>): Promise<ProductListResponse> {
    const response = await this.getProducts({ ...filters, search: query });
    return response;
  }

  async getProductsByCategory(categoryId: number, filters?: Omit<ProductFilters, 'category'>): Promise<ProductListResponse> {
    const response = await this.getProducts({ ...filters, category: categoryId });
    return response;
  }

  async getProductsByBrand(brandId: number, filters?: Omit<ProductFilters, 'brand'>): Promise<ProductListResponse> {
    const response = await this.getProducts({ ...filters, brand: brandId });
    return response;
  }

  async uploadProductImage(productId: number, imageFile: File, altText?: string, isPrimary?: boolean): Promise<any> {
    const additionalData: any = { product: productId.toString() };
    if (altText) additionalData.alt_text = altText;
    if (isPrimary !== undefined) additionalData.is_primary = isPrimary.toString();

    const response = await apiService.uploadFile(`/products/${productId}/images/`, imageFile, additionalData);
    return response.data;
  }
}

export const productService = new ProductService();
export default productService;
