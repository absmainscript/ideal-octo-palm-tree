
import { useMutation, useQueryClient, UseMutationOptions } from "@tanstack/react-query";

/**
 * Hook personalizado que substitui useMutation
 * Garante que NENHUMA invalidação automática aconteça
 * Todas as atualizações devem ser manuais via setQueryData
 */
export function useStaticMutation<TData = unknown, TError = Error, TVariables = void, TContext = unknown>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>
) {
  const queryClient = useQueryClient();
  
  // Remove qualquer possibilidade de invalidação automática
  const staticOptions = {
    ...options,
    // Garante que não há invalidação automática
    onSettled: undefined,
    meta: {
      ...options.meta,
      skipInvalidation: true
    }
  };

  return useMutation(staticOptions);
}
