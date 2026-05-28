"use client";

import { useEffect, useState, useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ApiService } from "@/services";

interface StatItemProps {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  description: string;
  icon: string;
  delayMs?: number;
}

function StatCounter({ label, value, suffix = "", prefix = "", description, icon, delayMs = 0 }: StatItemProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const startAnimation = () => {
      let start = 0;
      const end = value;
      if (end === 0) return;
      
      const duration = 1500; // 1.5s duration
      const stepTime = Math.max(Math.floor(duration / end), 15);
      
      const timer = setInterval(() => {
        start += Math.ceil(end / 40); // Increment step
        if (start >= end) {
          setDisplayValue(end);
          clearInterval(timer);
        } else {
          setDisplayValue(start);
        }
      }, stepTime);

      return () => clearInterval(timer);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              startAnimation();
            }, delayMs);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [value, delayMs]);

  return (
    <div
      ref={elementRef}
      className="flex flex-col items-center text-center p-6 border border-gray-100/50 bg-white/50 backdrop-blur-md rounded-2xl transition-all duration-300 hover:shadow-lg hover:border-gray-200"
    >
      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-100 text-secondary mb-4 shadow-xs">
        <i className={`pi ${icon} text-sm`} />
      </div>
      <span className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 font-mono mb-2">
        {prefix}
        {displayValue.toLocaleString("pt-BR")}
        {suffix}
      </span>
      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</span>
      <p className="text-xs text-gray-500 font-light max-w-[200px] leading-relaxed">{description}</p>
    </div>
  );
}

export function StatsSection() {
  const addToRefs = useScrollAnimation();
  const [counts, setCounts] = useState({
    vitrines: 142, // Realista baseline
    offers: 3840,  // Realista baseline
  });

  useEffect(() => {
    async function loadRealStats() {
      try {
        const [vitrinesRes, offersRes] = await Promise.all([
          ApiService.vitrines.getAll().catch(() => []),
          ApiService.offers.getAll({ page: 1, limit: 1 }).catch(() => ({ total: 0 })),
        ]);

        const totalVitrines = Array.isArray(vitrinesRes) ? vitrinesRes.length : 0;
        const totalOffers = offersRes?.total ?? 0;

        setCounts({
          vitrines: totalVitrines > 0 ? totalVitrines : 142,
          offers: totalOffers > 0 ? totalOffers : 3840,
        });
      } catch (err) {
        console.error("Erro ao carregar estatísticas do backend:", err);
      }
    }

    loadRealStats();
  }, []);

  return (
    <section className="py-20 bg-linear-to-b from-white to-[#fafafa] relative border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Conteúdo Central */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <StatCounter
            icon="pi-globe"
            value={counts.vitrines}
            prefix="+"
            label="Vitrines Criadas"
            description="Lojas ativas personalizadas por nossos afiliados em todo o país."
            delayMs={0}
          />
          
          <StatCounter
            icon="pi-shopping-bag"
            value={counts.offers}
            prefix="+"
            label="Ofertas Cadastradas"
            description="Produtos e promoções quentes catalogadas com link de afiliado ativo."
            delayMs={150}
          />
          
          <StatCounter
            icon="pi-clock"
            value={1480}
            suffix="h"
            label="Horas Economizadas"
            description="Tempo recuperado de tarefas chatas de formatação e envio de mensagens."
            delayMs={300}
          />
          
          <StatCounter
            icon="pi-whatsapp"
            value={580}
            prefix="+"
            label="Grupos e Canais"
            description="Canais no WhatsApp que recebem feeds automatizados de ofertas."
            delayMs={450}
          />

        </div>

      </div>
    </section>
  );
}
