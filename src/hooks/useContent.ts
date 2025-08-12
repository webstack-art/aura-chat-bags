import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contentService, type CreateFAQData, type CreatePolicyData, type CreateContactMessageData } from '@/services';

// Query Keys
export const contentKeys = {
  all: ['content'] as const,
  faqs: () => [...contentKeys.all, 'faqs'] as const,
  faqsByCategory: (category: string) => [...contentKeys.faqs(), category] as const,
  policies: () => [...contentKeys.all, 'policies'] as const,
  policy: (slug: string) => [...contentKeys.policies(), slug] as const,
  contacts: () => [...contentKeys.all, 'contacts'] as const,
};

// FAQ Hooks
export const useFaqs = () => {
  return useQuery({
    queryKey: contentKeys.faqs(),
    queryFn: () => contentService.getFAQs(),
    staleTime: 1000 * 60 * 30, // 30 minutes - FAQs don't change often
  });
};

export const useFaqsByCategory = (category: string) => {
  return useQuery({
    queryKey: contentKeys.faqsByCategory(category),
    queryFn: () => contentService.getFAQs(category),
    enabled: !!category,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
};

// Policy Hooks
export const usePolicies = () => {
  return useQuery({
    queryKey: contentKeys.policies(),
    queryFn: () => contentService.getPolicies(),
    staleTime: 1000 * 60 * 60, // 1 hour - policies rarely change
  });
};

export const usePolicy = (slug: string) => {
  return useQuery({
    queryKey: contentKeys.policy(slug),
    queryFn: () => contentService.getPolicy(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

// Contact Hooks
export const useContactMessages = () => {
  return useQuery({
    queryKey: contentKeys.contacts(),
    queryFn: () => contentService.getContactMessages(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Mutation Hooks
export const useCreateFaq = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (faqData: CreateFAQData) => contentService.createFAQ(faqData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contentKeys.faqs() });
    },
  });
};

export const useUpdateFaq = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CreateFAQData> }) =>
      contentService.updateFAQ(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contentKeys.faqs() });
    },
  });
};

export const useDeleteFaq = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => contentService.deleteFAQ(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contentKeys.faqs() });
    },
  });
};

export const useCreatePolicy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (policyData: CreatePolicyData) => contentService.createPolicy(policyData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contentKeys.policies() });
    },
  });
};

export const useUpdatePolicy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ slug, data }: { slug: string; data: Partial<CreatePolicyData> }) =>
      contentService.updatePolicy(slug, data),
    onSuccess: (_, { slug }) => {
      queryClient.invalidateQueries({ queryKey: contentKeys.policy(slug) });
      queryClient.invalidateQueries({ queryKey: contentKeys.policies() });
    },
  });
};

export const useDeletePolicy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (slug: string) => contentService.deletePolicy(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contentKeys.policies() });
    },
  });
};

export const useCreateContactMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (messageData: CreateContactMessageData) => contentService.sendContactMessage(messageData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contentKeys.contacts() });
    },
  });
};
