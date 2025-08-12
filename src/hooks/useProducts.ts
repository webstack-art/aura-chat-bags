import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productService, categoryService, brandService, type ProductFilters, type CreateProductData } from '@/services';

// Query Keys
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters?: ProductFilters) => [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (slug: string) => [...productKeys.details(), slug] as const,
  featured: () => [...productKeys.all, 'featured'] as const,
  search: (query: string) => [...productKeys.all, 'search', query] as const,
  category: (categoryId: number) => [...productKeys.all, 'category', categoryId] as const,
  brand: (brandId: number) => [...productKeys.all, 'brand', brandId] as const,
};

export const categoryKeys = {
  all: ['categories'] as const,
  lists: () => [...categoryKeys.all, 'list'] as const,
  details: () => [...categoryKeys.all, 'detail'] as const,
  detail: (slug: string) => [...categoryKeys.details(), slug] as const,
};

export const brandKeys = {
  all: ['brands'] as const,
  lists: () => [...brandKeys.all, 'list'] as const,
  details: () => [...brandKeys.all, 'detail'] as const,
  detail: (slug: string) => [...brandKeys.details(), slug] as const,
};

// Hooks
export const useProducts = (filters?: ProductFilters) => {
  return useQuery({
    queryKey: productKeys.list(filters),
    queryFn: () => productService.getProducts(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useProduct = (slug: string) => {
  return useQuery({
    queryKey: productKeys.detail(slug),
    queryFn: () => productService.getProduct(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: productKeys.featured(),
    queryFn: () => productService.getFeaturedProducts(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

export const useSearchProducts = (query: string, filters?: Omit<ProductFilters, 'search'>) => {
  return useQuery({
    queryKey: productKeys.search(query),
    queryFn: () => productService.searchProducts(query, filters),
    enabled: query.length > 2,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

export const useProductsByCategory = (categoryId: number, filters?: Omit<ProductFilters, 'category'>) => {
  return useQuery({
    queryKey: productKeys.category(categoryId),
    queryFn: () => productService.getProductsByCategory(categoryId, filters),
    enabled: !!categoryId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useProductsByBrand = (brandId: number, filters?: Omit<ProductFilters, 'brand'>) => {
  return useQuery({
    queryKey: productKeys.brand(brandId),
    queryFn: () => productService.getProductsByBrand(brandId, filters),
    enabled: !!brandId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productData: CreateProductData) => productService.createProduct(productData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ slug, data }: { slug: string; data: Partial<CreateProductData> }) =>
      productService.updateProduct(slug, data),
    onSuccess: (_, { slug }) => {
      queryClient.invalidateQueries({ queryKey: productKeys.detail(slug) });
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (slug: string) => productService.deleteProduct(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
};

// Category Hooks
export const useCategories = () => {
  return useQuery({
    queryKey: categoryKeys.lists(),
    queryFn: () => categoryService.getCategories(),
    staleTime: 1000 * 60 * 15, // 15 minutes - categories don't change often
  });
};

export const useCategory = (slug: string) => {
  return useQuery({
    queryKey: categoryKeys.detail(slug),
    queryFn: () => categoryService.getCategory(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

// Brand Hooks
export const useBrands = () => {
  return useQuery({
    queryKey: brandKeys.lists(),
    queryFn: () => brandService.getBrands(),
    staleTime: 1000 * 60 * 15, // 15 minutes - brands don't change often
  });
};

export const useBrand = (slug: string) => {
  return useQuery({
    queryKey: brandKeys.detail(slug),
    queryFn: () => brandService.getBrand(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
