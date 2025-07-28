
import { QueryClient } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

export async function apiRequest(
  method: string,
  endpoint: string,
  body?: any
): Promise<Response> {
  const url = `${API_BASE_URL}${endpoint}`;

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      gcTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
      refetchIntervalInBackground: false,
      retry: false,
      retryOnMount: false,
      networkMode: 'offlineFirst',
      enabled: true,
      notifyOnChangeProps: [], // Remove qualquer reatividade
      structuralSharing: false, // Desabilita compartilhamento estrutural
    },
    mutations: {
      retry: false,
      networkMode: 'offlineFirst',
      onSuccess: undefined,
      onError: undefined,
      onSettled: undefined,
      onMutate: undefined,
    },
  },
});

// Sobrescreve TODOS os métodos que podem causar reloads
const originalInvalidateQueries = queryClient.invalidateQueries.bind(queryClient);
const originalRefetchQueries = queryClient.refetchQueries.bind(queryClient);
const originalResetQueries = queryClient.resetQueries.bind(queryClient);

queryClient.invalidateQueries = () => Promise.resolve();
queryClient.refetchQueries = () => Promise.resolve([]);
queryClient.resetQueries = () => Promise.resolve();

// Desabilita todos os listeners automáticos
queryClient.getQueryCache().subscribe = () => () => {};
queryClient.getMutationCache().subscribe = () => () => {};
