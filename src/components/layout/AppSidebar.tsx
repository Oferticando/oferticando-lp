"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

export interface SidebarMenuItem {
  id: string;
  label: string;
  icon: string;
  href: string;
}

export interface SidebarSection {
  /** The menu item id that opens this section header above it */
  beforeItemId: string;
  label: string;
}

interface AppSidebarProps {
  /** Which menu item is currently active */
  active: string;
  /** Menu items to render */
  items: SidebarMenuItem[];
  /** Panel label shown below the user card when expanded */
  panelLabel: string;
  /** Subtitle shown in the user card (e.g. email or role label) */
  userSubtitle: string;
  /** Fallback initial for the avatar when user has no name */
  avatarFallback?: string;
  /** Side where the active indicator border is rendered */
  activeBorderSide?: "left" | "right";
  /** Optional section separator injected before a specific item */
  section?: SidebarSection;
  /** Extra padding-bottom for the footer area */
  footerPaddingBottom?: string;
  /** Vertical padding for the root container */
  containerPaddingY?: string;
  /** Whether to add a right border to the root container */
  withBorderRight?: boolean;
  isCollapsed?: boolean;
}

const AppSidebar = ({
  active,
  items,
  panelLabel,
  userSubtitle,
  avatarFallback = "U",
  activeBorderSide = "left",
  section,
  footerPaddingBottom = "pb-6",
  containerPaddingY = "py-6",
  withBorderRight = false,
  isCollapsed = false,
}: AppSidebarProps) => {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const borderClass =
    activeBorderSide === "left"
      ? { active: "border-l-2 border-gray-900", inactive: "border-l-2 border-transparent" }
      : { active: "border-r-2 border-gray-900", inactive: "border-r-2 border-transparent" };

  return (
    <div
      className={`flex flex-col gap-6 ${containerPaddingY} h-full bg-white ${withBorderRight ? "border-r border-gray-100" : ""} transition-all duration-500 ${isCollapsed ? "px-2 items-center" : "pr-6"}`}
    >
      {/* User Status Card */}
      {mounted && user && (
        <div className={`${isCollapsed ? "px-0" : "px-6"} mb-4`}>
          <div
            className={`bg-gray-50/50 p-4 border border-gray-100/50 rounded-2xl flex items-center gap-4 transition-all duration-500 ${isCollapsed ? "w-12 h-12 justify-center p-0 overflow-hidden" : ""}`}
          >
            <div className="w-10 h-10 rounded-full bg-gray-900 border border-gray-900 text-white flex items-center justify-center shrink-0 shadow-sm">
              {(user.name || avatarFallback).charAt(0).toUpperCase()}
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <p className="text-xs font-bold text-gray-900 truncate leading-tight tracking-tight uppercase">
                  {user.name}
                </p>
                <p className="text-[9px] text-gray-400 truncate mt-0.5 font-medium">
                  {userSubtitle === "__email__" ? user.email : userSubtitle}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {!isCollapsed && (
        <div className="px-6 mb-4">
          <p className="text-[10px] font-medium text-gray-400 uppercase tracking-[0.2em]">
            {panelLabel}
          </p>
        </div>
      )}

      <nav className="flex flex-col w-full gap-2">
        {items.map((item) => {
          const isActive = active === item.id;

          return (
            <div key={item.id}>
              {/* Optional section separator */}
              {!isCollapsed && section && section.beforeItemId === item.id && (
                <>
                  <div className="px-6 pt-2 pb-1">
                    <p className="text-[9px] font-medium text-gray-300 uppercase tracking-[0.2em]">
                      {section.label}
                    </p>
                  </div>
                  <hr className="border-gray-100 mx-6 mb-2" />
                </>
              )}
              <Link
                href={item.href}
                title={isCollapsed ? item.label : ""}
                className={`
                  group flex items-center gap-4 py-4 transition-all duration-500
                  ${isCollapsed ? "px-0 justify-center w-12 h-12 mx-auto rounded-xl" : "px-6"}
                  ${
                    isActive
                      ? `bg-gray-50/50 ${borderClass.active} text-gray-900`
                      : `text-gray-400 hover:text-gray-900 hover:bg-gray-50/30 ${borderClass.inactive}`
                  }
                `}
              >
                <i
                  className={`pi ${item.icon} text-sm transition-transform duration-500 group-hover:scale-110 ${isActive ? "text-gray-900" : "text-gray-400 group-hover:text-gray-900"}`}
                />
                {!isCollapsed && (
                  <span
                    className={`text-xs capitalize tracking-widest ${isActive ? "font-bold" : "font-medium"}`}
                  >
                    {item.label}
                  </span>
                )}
              </Link>
            </div>
          );
        })}
      </nav>

      {!isCollapsed && (
        <div className={`mt-auto px-6 ${footerPaddingBottom} border-t border-gray-50 pt-6 hidden md:block`}>
          <Link
            href="https://unificando.com.br/"
            target="_blank"
            className="group flex flex-col gap-2"
          >
            <span className="text-[9px] font-black text-gray-300 uppercase tracking-[0.3em]">
              Tecnologia por
            </span>
            <span className="text-sm font-black text-gray-400 group-hover:text-gray-900 transition-colors tracking-tighter flex items-center gap-2">
              Unificando
              <span className="w-1 h-1 rounded-full bg-[#ccff00] animate-pulse" />
            </span>
            <p className="text-[9px] text-gray-400 leading-tight mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Precisa de automação? <br /> Fale conosco.
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AppSidebar;
