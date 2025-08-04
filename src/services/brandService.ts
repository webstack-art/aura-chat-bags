import { apiService } from './api';

export interface Brand {
  id: number;
  name: string;
  slug: string;
  description: string;
  logo: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateBrandData {
  name: string;
  description?: string;
  logo?: File;
}

class BrandService {
  async getBrands(): Promise<Brand[]> {
    const response = await apiService.get<Brand[]>('/brands/');
    return response.data;
  }

  async getBrand(slug: string): Promise<Brand> {
    const response = await apiService.get<Brand>(`/brands/${slug}/`);
    return response.data;
  }

  async createBrand(brandData: CreateBrandData): Promise<Brand> {
    if (brandData.logo) {
      const { logo, ...restData } = brandData;
      const response = await apiService.uploadFile<Brand>('/brands/', logo, restData);
      return response.data;
    } else {
      const response = await apiService.post<Brand>('/brands/', brandData);
      return response.data;
    }
  }

  async updateBrand(slug: string, brandData: Partial<CreateBrandData>): Promise<Brand> {
    if (brandData.logo) {
      const { logo, ...restData } = brandData;
      const response = await apiService.uploadFile<Brand>(`/brands/${slug}/`, logo, restData);
      return response.data;
    } else {
      const response = await apiService.put<Brand>(`/brands/${slug}/`, brandData);
      return response.data;
    }
  }

  async deleteBrand(slug: string): Promise<{ message: string }> {
    const response = await apiService.delete<{ message: string }>(`/brands/${slug}/`);
    return response.data;
  }
}

export const brandService = new BrandService();
export default brandService;
