import { useState, useEffect } from "react";

const base64ToUint8Array = (base64String: string) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

export const usePushNotifications = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null,
  );
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      checkSubscription();
    }
  }, []);

  const checkSubscription = async () => {
    try {
      if (!("serviceWorker" in navigator)) return;

      // Pegar as inscrições existentes sem esperar o status 'ready'
      // Se não houver SW ativo, ele retorna nulo ou uma lista vazia
      const registrations = await navigator.serviceWorker.getRegistrations();
      if (!registrations || registrations.length === 0) return;

      for (const reg of registrations) {
        const sub = await reg.pushManager.getSubscription();
        if (sub) {
          setSubscription(sub);
          setIsSubscribed(true);
          return;
        }
      }
    } catch (err) {
      console.warn("Aviso ao verificar inscrição de push (não crítico):", err);
    }
  };

  const subscribe = async () => {
    try {
      if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY) {
        throw new Error("Chave VAPID não configurada no ambiente.");
      }

      // Aqui SIM esperamos o service worker estar pronto para a ação do usuário
      const registration = await Promise.race([
        navigator.serviceWorker.ready,
        new Promise<ServiceWorkerRegistration>((_, reject) => 
          setTimeout(() => reject(new Error("O serviço de notificações demorou muito para responder. Tente atualizar a página.")), 15000)
        )
      ]);

      // Pede permissão e inscreve
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: base64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY.trim(),
        ),
      });

      setSubscription(sub);
      setIsSubscribed(true);
      return sub;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Falha ao se inscrever nas notificações";
      setError(message);
      throw new Error(message);
    }
  };

  const canSubscribe = isSupported && !!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

  return {
    isSupported,
    isSubscribed,
    subscription,
    subscribe,
    error,
    canSubscribe,
  };
};
