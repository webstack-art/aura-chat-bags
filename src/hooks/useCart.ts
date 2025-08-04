import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cartService, type AddToCartData, type UpdateCartItemData } from '@/services';
import { authService } from '@/services';

// Query Keys
export const cartKeys = {
  all: ['cart'] as const,
  cart: () => [...cartKeys.all, 'cart'] as const,
  count: () => [...cartKeys.all, 'count'] as const,
};

// Hooks
export const useCart = () => {
  return useQuery({
    queryKey: cartKeys.cart(),
    queryFn: () => cartService.getCart(),
    enabled: authService.isAuthenticated(),
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

export const useCartCount = () => {
  return useQuery({
    queryKey: cartKeys.count(),
    queryFn: () => cartService.getCartItemCount(),
    enabled: authService.isAuthenticated(),
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemData: AddToCartData) => cartService.addToCart(itemData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.cart() });
      queryClient.invalidateQueries({ queryKey: cartKeys.count() });
    },
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ itemId, data }: { itemId: number; data: UpdateCartItemData }) =>
      cartService.updateCartItem(itemId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.cart() });
      queryClient.invalidateQueries({ queryKey: cartKeys.count() });
    },
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: number) => cartService.removeFromCart(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.cart() });
      queryClient.invalidateQueries({ queryKey: cartKeys.count() });
    },
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => cartService.clearCart(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.cart() });
      queryClient.invalidateQueries({ queryKey: cartKeys.count() });
    },
  });
};

export const useSyncCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (localCartItems: any[]) => cartService.syncWithLocalStorage(localCartItems),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.cart() });
      queryClient.invalidateQueries({ queryKey: cartKeys.count() });
    },
  });
};
