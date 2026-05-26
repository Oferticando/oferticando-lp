import React from "react";

interface StackProps {
  children: React.ReactNode;
  direction?: "col" | "row";
  spacing?: 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between";
  className?: string;
}

const Stack = ({
  children,
  direction = "col",
  spacing = 4,
  align = "stretch",
  justify = "start",
  className = "",
}: StackProps) => {
  const directionClass = direction === "col" ? "flex-col" : "flex-row";

  // Mapping spacing to tailwind classes
  const spacingMap: Record<number, string> = {
    0.5: "gap-0.5",
    1: "gap-1",
    1.5: "gap-1.5",
    2: "gap-2",
    2.5: "gap-2.5",
    3: "gap-3",
    4: "gap-4",
    5: "gap-5",
    6: "gap-6",
    8: "gap-8",
    10: "gap-10",
    12: "gap-12",
  };

  const alignMap: Record<string, string> = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
  };

  const justifyMap: Record<string, string> = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
  };

  return (
    <div
      className={`flex ${directionClass} ${spacingMap[spacing]} ${alignMap[align]} ${justifyMap[justify]} ${className}`}
    >
      {children}
    </div>
  );
};

export default Stack;
