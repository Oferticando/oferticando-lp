"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      // Registrar o service worker gerado pelo Serwist
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service Worker registrado com sucesso:", registration.scope);
        })
        .catch((error) => {
          console.error("Falha ao registrar Service Worker:", error);
        });
    }
  }, []);

  return null;
}
