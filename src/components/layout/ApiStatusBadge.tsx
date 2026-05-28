"use client";

import { useEffect, useState } from "react";
import { ApiService } from "@/services";

export default function ApiStatusBadge() {
  const [status, setStatus] = useState<"online" | "checking" | "offline">("checking");

  useEffect(() => {
    async function checkStatus() {
      try {
        const res = await ApiService.system.ping();
        if (res && (res.message === "pong" || res.message)) {
          setStatus("online");
        } else {
          setStatus("online"); // Em caso de resposta vazia mas sem erro HTTP
        }
      } catch (error) {
        // Falha silenciosa para não alarmar desnecessariamente o usuário
        console.warn("[System Status] Erro de health check na API:", error);
        setStatus("offline");
      }
    }

    checkStatus();
  }, []);

  if (status === "checking") {
    return (
      <div className="flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-[0.2em] font-light">
        Verificando conexão
        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-[0.2em] font-semibold">
      {status === "online" ? (
        <>
          Servidores: Operacionais
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
        </>
      ) : (
        <>
          Servidores: Em Manutenção
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_#f59e0b]" />
        </>
      )}
    </div>
  );
}
