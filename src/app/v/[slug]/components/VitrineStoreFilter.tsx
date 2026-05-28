"use client";

interface StoreItem {
  id: string | number;
  name: string;
  logo: string;
}

interface VitrineStoreFilterProps {
  stores: StoreItem[];
  selectedStoreId: string | number | null;
  primaryColor: string | undefined;
  onSelect: (id: string | number | null) => void;
}

const VitrineStoreFilter = ({
  stores,
  selectedStoreId,
  primaryColor,
  onSelect,
}: VitrineStoreFilterProps) => {
  if (stores.length < 2) return null;

  const activeBorder = { borderColor: primaryColor || "#0071e3" };

  return (
    <div className="mb-8">
      <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">

        {/* Todas */}
        <button
          onClick={() => onSelect(null)}
          className={`flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer transition-all duration-200 ${
            !selectedStoreId ? "opacity-100" : "opacity-40 hover:opacity-70"
          }`}
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-200 bg-gray-50 border-gray-100"
            style={!selectedStoreId ? { ...activeBorder, transform: "scale(1.08)" } : {}}
          >
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
              />
            </svg>
          </div>
          <span className="text-[9px] font-bold text-gray-500 leading-none">Todas</span>
        </button>

        {/* Lojas */}
        {stores.map((store) => {
          const isSelected = selectedStoreId === store.id;
          return (
            <button
              key={store.id}
              onClick={() => onSelect(isSelected ? null : store.id)}
              className={`flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer transition-all duration-200 ${
                isSelected ? "opacity-100" : "opacity-40 hover:opacity-70"
              }`}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-200 overflow-hidden bg-white border-gray-100"
                style={isSelected ? { ...activeBorder, transform: "scale(1.08)" } : {}}
              >
                {store.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={store.logo} alt={store.name} className="w-9 h-9 object-contain" />
                ) : (
                  <span className="text-sm font-black text-gray-400">{store.name.charAt(0)}</span>
                )}
              </div>
              <span className="text-[9px] font-bold text-gray-500 leading-none max-w-[60px] truncate">
                {store.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default VitrineStoreFilter;
