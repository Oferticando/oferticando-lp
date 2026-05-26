"use client";

import React from "react";

const ModernOfferCardSkeleton = () => {
  return (
    <div className="flex w-full flex-col animate-pulse">
      {/* Imagem (Aspect Square) */}
      <div className="relative aspect-square w-full bg-gray-50 rounded-2xl md:rounded-3xl mb-4" />

      {/* Informações */}
      <div className="flex flex-col px-1 space-y-3">
        {/* Preços */}
        <div className="flex flex-col space-y-1.5">
          <div className="h-2.5 bg-gray-50 rounded-full w-14" />
          <div className="h-5 bg-gray-50 rounded-full w-24" />
        </div>

        {/* Título */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-50 rounded-full w-full" />
          <div className="h-3 bg-gray-50 rounded-full w-2/3" />
        </div>
      </div>
    </div>
  );
};

export default ModernOfferCardSkeleton;
