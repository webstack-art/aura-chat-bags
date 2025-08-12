import { apiService } from './api';

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  is_active: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Policy {
  id: number;
  title: string;
  content: string;
  slug: string;
  is_active: boolean;
  last_updated: string;
  created_at: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface CreateFAQData {
  question: string;
  answer: string;
  category?: string;
  order?: number;
}

export interface CreatePolicyData {
  title: string;
  content: string;
  slug?: string;
}

export interface CreateContactMessageData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

class ContentService {
  // FAQ Methods
  async getFAQs(category?: string): Promise<FAQ[]> {
    const params = category ? { category } : {};
    const response = await apiService.get<FAQ[]>('/faqs/faqs/', params);
    return response.data;
  }

  async getFAQ(id: number): Promise<FAQ> {
    const response = await apiService.get<FAQ>(`/faqs/faqs/${id}/`);
    return response.data;
  }

  async createFAQ(faqData: CreateFAQData): Promise<FAQ> {
    const response = await apiService.post<FAQ>('/faqs/faqs/', faqData);
    return response.data;
  }

  async updateFAQ(id: number, faqData: Partial<CreateFAQData>): Promise<FAQ> {
    const response = await apiService.put<FAQ>(`/faqs/faqs/${id}/`, faqData);
    return response.data;
  }

  async deleteFAQ(id: number): Promise<{ message: string }> {
    const response = await apiService.delete<{ message: string }>(`/faqs/faqs/${id}/`);
    return response.data;
  }

  async getFAQCategories(): Promise<string[]> {
    const response = await apiService.get<string[]>('/faqs/categories/');
    return response.data;
  }

  // Policy Methods
  async getPolicies(): Promise<Policy[]> {
    const response = await apiService.get<Policy[]>('/faqs/policies/');
    return response.data;
  }

  async getPolicy(slug: string): Promise<Policy> {
    const response = await apiService.get<Policy>(`/faqs/policies/${slug}/`);
    return response.data;
  }

  async createPolicy(policyData: CreatePolicyData): Promise<Policy> {
    const response = await apiService.post<Policy>('/faqs/policies/', policyData);
    return response.data;
  }

  async updatePolicy(slug: string, policyData: Partial<CreatePolicyData>): Promise<Policy> {
    const response = await apiService.put<Policy>(`/faqs/policies/${slug}/`, policyData);
    return response.data;
  }

  async deletePolicy(slug: string): Promise<{ message: string }> {
    const response = await apiService.delete<{ message: string }>(`/faqs/policies/${slug}/`);
    return response.data;
  }

  // Contact Methods
  async sendContactMessage(messageData: CreateContactMessageData): Promise<ContactMessage> {
    const response = await apiService.post<ContactMessage>('/contact/messages/', messageData);
    return response.data;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    const response = await apiService.get<ContactMessage[]>('/contact/messages/');
    return response.data;
  }

  async markMessageAsRead(id: number): Promise<ContactMessage> {
    const response = await apiService.patch<ContactMessage>(`/contact/messages/${id}/`, { is_read: true });
    return response.data;
  }

  async deleteContactMessage(id: number): Promise<{ message: string }> {
    const response = await apiService.delete<{ message: string }>(`/contact/messages/${id}/`);
    return response.data;
  }
}

export const contentService = new ContentService();
export default contentService;
