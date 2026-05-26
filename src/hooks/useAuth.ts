"use client";

import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ApiService } from "@/services";

/**
 * Hook para gerenciar estado de autenticação utilizando React Query.
 * Garante cache eficiente e evita loops de requisição nas rotas.
 */
export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: user, isLoading: loading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      return await ApiService.auth.syncSession();
    },
    staleTime: 0, // Verifica sempre se a sessão é válida na montagem
    refetchOnWindowFocus: true, 
  });

  // Escuta mudanças de autenticação disparadas pelo ApiService (login/logout)
  useEffect(() => {
    const handleAuthChange = () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    };

    window.addEventListener("auth-change", handleAuthChange);
    return () => window.removeEventListener("auth-change", handleAuthChange);
  }, [queryClient]);

  const logout = async () => {
    await ApiService.auth.logout();
    queryClient.setQueryData(["authUser"], null);
    router.push("/login");
  };

  return {
    user: user ?? null,
    isAuthenticated: !!user,
    loading,
    logout,
  };
}
