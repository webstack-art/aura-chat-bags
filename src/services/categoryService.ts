import { apiService } from './api';

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  parent: number | null;
  children: Category[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateCategoryData {
  name: string;
  description?: string;
  parent?: number;
  image?: File;
}

class CategoryService {
  async getCategories(): Promise<Category[]> {
    const response = await apiService.get<Category[]>('/categories/');
    return response.data;
  }

  async getCategory(slug: string): Promise<Category> {
    const response = await apiService.get<Category>(`/categories/${slug}/`);
    return response.data;
  }

  async createCategory(categoryData: CreateCategoryData): Promise<Category> {
    if (categoryData.image) {
      const { image, ...restData } = categoryData;
      const response = await apiService.uploadFile<Category>('/categories/', image, restData);
      return response.data;
    } else {
      const response = await apiService.post<Category>('/categories/', categoryData);
      return response.data;
    }
  }

  async updateCategory(slug: string, categoryData: Partial<CreateCategoryData>): Promise<Category> {
    if (categoryData.image) {
      const { image, ...restData } = categoryData;
      const response = await apiService.uploadFile<Category>(`/categories/${slug}/`, image, restData);
      return response.data;
    } else {
      const response = await apiService.put<Category>(`/categories/${slug}/`, categoryData);
      return response.data;
    }
  }

  async deleteCategory(slug: string): Promise<{ message: string }> {
    const response = await apiService.delete<{ message: string }>(`/categories/${slug}/`);
    return response.data;
  }

  async getMainCategories(): Promise<Category[]> {
    const categories = await this.getCategories();
    return categories.filter(category => !category.parent);
  }

  async getSubCategories(parentId: number): Promise<Category[]> {
    const categories = await this.getCategories();
    return categories.filter(category => category.parent === parentId);
  }
}

export const categoryService = new CategoryService();
export default categoryService;
