"use client";

import React from "react";

const ShimmerBlock = ({
  className,
  delay = "0s",
}: {
  className: string;
  delay?: string;
}) => (
  <div className={`relative overflow-hidden bg-gray-100 ${className}`}>
    <div
      className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/70 to-transparent"
      style={{ animationDelay: delay }}
    />
  </div>
);

const ModernOfferCardSkeleton = () => {
  return (
    <div className="flex w-full flex-col rounded-2xl md:rounded-3xl border border-gray-100">
      <ShimmerBlock
        className="relative aspect-square w-full rounded-2xl md:rounded-3xl"
        delay="0s"
      />

      <div className="flex flex-col px-2 pt-3 pb-3 space-y-2.5">
        <div className="flex flex-col space-y-1.5">
          <ShimmerBlock className="h-2.5 rounded-full w-12" delay="0.1s" />
          <ShimmerBlock className="h-6 rounded-full w-20" delay="0.15s" />
        </div>
        <div className="space-y-1.5">
          <ShimmerBlock className="h-3 rounded-full w-full" delay="0.2s" />
          <ShimmerBlock className="h-3 rounded-full w-3/4" delay="0.25s" />
        </div>
      </div>
    </div>
  );
};

export default ModernOfferCardSkeleton;
