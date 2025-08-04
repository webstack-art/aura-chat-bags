import { apiService } from './api';

export interface Review {
  id: number;
  product: number;
  user: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
  };
  rating: number;
  title: string;
  comment: string;
  is_verified_purchase: boolean;
  is_custom: boolean;
  helpful_count: number;
  created_at: string;
  updated_at: string;
}

export interface CreateReviewData {
  product: number;
  rating: number;
  title: string;
  comment: string;
}

export interface ReviewHelpfulData {
  is_helpful: boolean;
}

class ReviewService {
  async getProductReviews(productId: number): Promise<Review[]> {
    const response = await apiService.get<Review[]>(`/reviews/products/${productId}/`);
    return response.data;
  }

  async createReview(reviewData: CreateReviewData): Promise<Review> {
    const response = await apiService.post<Review>('/reviews/', reviewData);
    return response.data;
  }

  async updateReview(reviewId: number, reviewData: Partial<CreateReviewData>): Promise<Review> {
    const response = await apiService.put<Review>(`/reviews/${reviewId}/`, reviewData);
    return response.data;
  }

  async deleteReview(reviewId: number): Promise<{ message: string }> {
    const response = await apiService.delete<{ message: string }>(`/reviews/${reviewId}/`);
    return response.data;
  }

  async markReviewHelpful(reviewId: number, helpfulData: ReviewHelpfulData): Promise<{ message: string }> {
    const response = await apiService.post<{ message: string }>(`/reviews/${reviewId}/helpful/`, helpfulData);
    return response.data;
  }

  async getUserReviews(): Promise<Review[]> {
    const response = await apiService.get<Review[]>('/reviews/user/');
    return response.data;
  }

  async getReviewStats(productId: number): Promise<{
    average_rating: number;
    total_reviews: number;
    rating_distribution: { [key: number]: number };
  }> {
    const response = await apiService.get(`/reviews/products/${productId}/stats/`);
    return response.data;
  }
}

export const reviewService = new ReviewService();
export default reviewService;
