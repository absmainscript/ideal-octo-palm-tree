import { useEffect } from 'react';

export function useSectionColors() {
  // Hook desabilitado - não aplica mais cores automaticamente
  // As cores devem ser aplicadas apenas via CSS ou uma única vez no carregamento inicial

  useEffect(() => {
    // Não faz nada - evita o piscar constante
  }, []);
}