import { apiService } from './api';

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category?: string;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Policy {
  id: number;
  title: string;
  content: string;
  slug: string;
  type: 'privacy' | 'terms' | 'return' | 'shipping' | 'other';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

class FaqService {
  async getFaqs(): Promise<FAQ[]> {
    const response = await apiService.get<FAQ[]>('/faqs/faqs/');
    return response.data;
  }

  async getFaqsByCategory(category: string): Promise<FAQ[]> {
    const response = await apiService.get<FAQ[]>(`/faqs/faqs/?category=${category}`);
    return response.data;
  }

  async getPolicies(): Promise<Policy[]> {
    const response = await apiService.get<Policy[]>('/faqs/policies/');
    return response.data;
  }

  async getPolicy(slug: string): Promise<Policy> {
    const response = await apiService.get<Policy>(`/faqs/policies/${slug}/`);
    return response.data;
  }

  async getPolicyByType(type: Policy['type']): Promise<Policy> {
    const response = await apiService.get<Policy>(`/faqs/policies/type/${type}/`);
    return response.data;
  }

  // Admin methods
  async createFaq(faqData: Omit<FAQ, 'id' | 'created_at' | 'updated_at'>): Promise<FAQ> {
    const response = await apiService.post<FAQ>('/faqs/faqs/', faqData);
    return response.data;
  }

  async updateFaq(id: number, faqData: Partial<Omit<FAQ, 'id' | 'created_at' | 'updated_at'>>): Promise<FAQ> {
    const response = await apiService.put<FAQ>(`/faqs/faqs/${id}/`, faqData);
    return response.data;
  }

  async deleteFaq(id: number): Promise<{ message: string }> {
    const response = await apiService.delete<{ message: string }>(`/faqs/faqs/${id}/`);
    return response.data;
  }

  async createPolicy(policyData: Omit<Policy, 'id' | 'created_at' | 'updated_at'>): Promise<Policy> {
    const response = await apiService.post<Policy>('/faqs/policies/', policyData);
    return response.data;
  }

  async updatePolicy(slug: string, policyData: Partial<Omit<Policy, 'id' | 'created_at' | 'updated_at'>>): Promise<Policy> {
    const response = await apiService.put<Policy>(`/faqs/policies/${slug}/`, policyData);
    return response.data;
  }

  async deletePolicy(slug: string): Promise<{ message: string }> {
    const response = await apiService.delete<{ message: string }>(`/faqs/policies/${slug}/`);
    return response.data;
  }
}

export const faqService = new FaqService();
export default faqService;
