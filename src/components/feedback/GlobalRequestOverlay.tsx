"use client";

import { useEffect, useState } from "react";
import { subscribeToRequestLoader } from "@/lib/request-loader";

export default function GlobalRequestOverlay() {
  const [state, setState] = useState({
    active: false,
    message: "Processando sua solicitacao...",
  });

  useEffect(() => subscribeToRequestLoader(setState), []);

  if (!state.active) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/75 backdrop-blur-sm">
      <div className="min-w-[280px] max-w-sm border border-gray-200 bg-white px-8 py-7 shadow-[0_20px_60px_rgba(17,24,39,0.12)]">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center border border-gray-200 text-gray-900">
            <i className="pi pi-spin pi-spinner text-lg" />
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-400">
              Aguarde
            </p>
            <p className="text-sm font-medium text-gray-900">{state.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
