"use client";

import { Vitrine } from "@/models/vitrine.model";

interface VitrineNavbarProps {
  vitrine: Vitrine | null;
  linkCopied: boolean;
  onCopy: () => void;
}

const VitrineNavbar = ({ vitrine, linkCopied, onCopy }: VitrineNavbarProps) => {
  return (
    <nav className="sticky top-0 z-50 w-full h-14 md:h-16 flex items-center border-b backdrop-blur-md transition-all duration-300 bg-white/85 border-gray-100/60">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 flex items-center justify-between">

        {/* Identidade da vitrine */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-white p-0.5 border border-gray-100 overflow-hidden flex-shrink-0 flex items-center justify-center">
            {vitrine?.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={vitrine.imageUrl}
                alt={vitrine.name}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span className="text-xs font-black text-gray-400">
                {vitrine?.name?.charAt(0)}
              </span>
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-black text-gray-900 truncate leading-none mb-0.5">
              {vitrine?.name}
            </span>
            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider leading-none">
              Curador
            </span>
          </div>
        </div>

        {/* Ações */}
        <div className="flex items-center gap-2">

          {/* Instagram */}
          {vitrine?.instagram && (
            <a
              href={`https://instagram.com/${vitrine.instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram do curador"
              className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-xl border transition-all duration-200 active:scale-95 cursor-pointer bg-gray-50 border-gray-200 text-gray-400 hover:text-pink-500 hover:bg-gray-100"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          )}

          {/* Compartilhar */}
          <button
            onClick={onCopy}
            aria-label="Compartilhar vitrine"
            className="inline-flex items-center justify-center gap-2 h-9 md:h-10 px-3 sm:px-4 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all duration-200 active:scale-95 cursor-pointer bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200"
          >
            <svg
              className="w-4 h-4 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            <span className="hidden sm:inline">{linkCopied ? "Copiado!" : "Compartilhar"}</span>
          </button>

        </div>
      </div>
    </nav>
  );
};

export default VitrineNavbar;
