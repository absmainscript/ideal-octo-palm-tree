/**
 * main.tsx
 * 
 * Ponto de entrada da aplicação React
 * Renderiza o componente App no DOM
 * Importa estilos globais da aplicação
 */

import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <Toaster />
  </QueryClientProvider>
);