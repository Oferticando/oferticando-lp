"use client";

import { useState, useEffect } from "react";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import axios from "axios";

const PushNotificationBanner = () => {
    const { canSubscribe, isSubscribed, subscribe } = usePushNotifications();
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useRef<Toast>(null);

    useEffect(() => {
        // Mostra o banner apenas se suportado, configurado e não inscrito
        if (canSubscribe && !isSubscribed) {
            const timer = setTimeout(() => {
                const dismissed = localStorage.getItem("push-banner-dismissed");
                if (!dismissed) {
                    setIsVisible(true);
                }
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [canSubscribe, isSubscribed]);

    const handleSubscribe = async () => {
        setIsLoading(true);
        try {
            const sub = await subscribe();
            
            // Enviar para o backend
            try {
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/notifications/subscribe`, {
                    subscription: sub
                });
            } catch (backendError) {
                console.warn("Inscrito no navegador, mas falha ao salvar no backend:", backendError);
                // Mesmo que o backend falhe agora, o usuário já deu permissão.
                // Podemos tentar novamente em outra visita ou apenas logar.
            }

            setIsVisible(false);
            toast.current?.show({
                severity: "success",
                summary: "Notificações Ativas!",
                detail: "Você receberá nossas melhores ofertas agora.",
                life: 3000
            });
        } catch (error) {
            console.error("Falha ao ativar notificações:", error);
            toast.current?.show({
                severity: "error",
                summary: "Não foi possível ativar",
                detail: error instanceof Error ? error.message : "Ocorreu um erro inesperado.",
                life: 5000
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDismiss = () => {
        setIsVisible(false);
        localStorage.setItem("push-banner-dismissed", "true");
    };

    if (!isVisible) return <Toast ref={toast} />;

    return (
        <>
            <Toast ref={toast} />
            <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:w-[400px] z-[60] animate-fade-in-up">
                <div className="bg-white/80 backdrop-blur-2xl border border-gray-100 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col gap-4">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-[#0071e3]/10 flex items-center justify-center text-[#0071e3]">
                                <i className="pi pi-bell text-xl" />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-gray-900 tracking-tight">Ativar Notificações?</h4>
                                <p className="text-xs text-gray-500 leading-relaxed mt-1">Receba cupons e ofertas raras direto no seu celular antes de todo mundo.</p>
                            </div>
                        </div>
                        <button onClick={handleDismiss} className="text-gray-400 hover:text-gray-600 transition-colors">
                            <i className="pi pi-times text-xs" />
                        </button>
                    </div>
                    <div className="flex gap-3">
                        <Button 
                            label="Ativar Agora" 
                            className="flex-1 p-button-sm !bg-[#0071e3] !border-none text-xs font-semibold" 
                            onClick={handleSubscribe}
                            loading={isLoading}
                            disabled={isLoading}
                        />
                        <Button 
                            label="Depois" 
                            className="flex-1 p-button-sm p-button-text !text-gray-500 text-xs font-semibold" 
                            onClick={handleDismiss}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default PushNotificationBanner;
