"use client";

import { useRouter } from "next/navigation";
import React from "react";

export interface InnerPageAction {
  label?: string;
  icon?: string;
  onClick: () => void;
  variant?: "primary" | "ghost";
  disabled?: boolean;
  loading?: boolean;
  hideOnMobile?: boolean;
}

interface InnerPageHeaderProps {
  backLabel?: string;
  backHref?: string;
  title: string;
  actions?: InnerPageAction[];
  maxWidth?: string;
}

const InnerPageHeader = ({
  backLabel = "Voltar",
  backHref,
  title,
  actions = [],
  maxWidth = "max-w-5xl",
}: InnerPageHeaderProps) => {
  const router = useRouter();

  const handleBack = () => {
    if (backHref) router.push(backHref);
    else router.back();
  };

  return (
    <div className="sticky top-0 z-40 bg-white border-b border-gray-100">
      <div
        className={`${maxWidth} mx-auto px-6 lg:px-12 h-20 flex items-center justify-between gap-6`}
      >
        {/* Breadcrumb ultra minimal */}
        <div className="flex items-center gap-3 text-sm min-w-0">
          <button
            onClick={handleBack}
            className="shrink-0 text-gray-400 hover:text-gray-900 transition-colors duration-500 font-medium flex items-center gap-2 group uppercase tracking-widest text-[10px]"
          >
            <i className="pi pi-arrow-left text-xs transition-transform duration-500 group-hover:-translate-x-1" />
            <span className="hidden sm:inline">{backLabel}</span>
          </button>
          <span className="text-gray-200 shrink-0 font-light">/</span>
          <span className="font-light text-gray-900 text-sm md:text-base tracking-tight truncate">
            {title}
          </span>
        </div>

        {/* Ações */}
        {actions.length > 0 && (
          <div className="flex items-center gap-3 shrink-0">
            {actions.map((action, i) => (
              <button
                key={i}
                type="button"
                onClick={action.onClick}
                disabled={action.disabled || action.loading}
                className={`
                  px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2
                  transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed
                  ${
                    action.variant === "primary"
                      ? "bg-gray-900 hover:bg-black text-white rounded-sm"
                      : "border border-gray-200 text-gray-900 hover:border-gray-900 bg-transparent rounded-sm"
                  }
                  ${action.hideOnMobile ? "hidden sm:flex" : "flex"}
                `}
              >
                {action.loading ? (
                  <i className="pi pi-spin pi-spinner text-xs" />
                ) : action.icon ? (
                  <i className={`pi ${action.icon} text-xs`} />
                ) : null}
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InnerPageHeader;
