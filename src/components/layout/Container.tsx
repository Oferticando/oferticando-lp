import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  variant?: "full" | "narrow";
  className?: string;
}

const Container = ({
  children,
  variant = "full",
  className = "",
}: ContainerProps) => {
  const maxWidth =
    variant === "full"
      ? "max-w-(--container-max-w)"
      : "max-w-(--container-narrow)";

  return (
    <div className={`${maxWidth} mx-auto px-4 md:px-8 w-full ${className}`}>
      {children}
    </div>
  );
};

export default Container;
