import React from "react";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const Section = ({ children, className = "", id }: SectionProps) => {
  return (
    <section id={id} className={`py-8 md:py-16 ${className}`}>
      {children}
    </section>
  );
};

export default Section;
