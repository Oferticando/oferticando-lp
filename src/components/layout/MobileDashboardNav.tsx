"use client";

import Link from "next/link";
import { classNames } from "primereact/utils";

interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
}

interface MobileDashboardNavProps {
  items: NavItem[];
  active: string;
}

const MobileDashboardNav = ({ items, active }: MobileDashboardNavProps) => {
  return (
    <nav className="w-full bg-white/80 backdrop-blur-xl border-b border-gray-100 flex items-center h-16 overflow-hidden sticky top-[72px] z-40 px-4">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 h-full">
        {items.map((item) => {
          const isActive = active === item.id;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={classNames(
                "flex items-center gap-2 px-5 h-10 rounded-full transition-all duration-300 shrink-0 text-[11px] font-bold uppercase tracking-widest",
                {
                  "bg-gray-900 text-white shadow-lg shadow-gray-200": isActive,
                  "bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600": !isActive,
                }
              )}
            >
              <i className={classNames("pi text-[10px]", item.icon)} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
      
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </nav>
  );
};

export default MobileDashboardNav;
