"use client";



interface PageHeaderProps {
  title?: string;
  description?: string;
  onButtonAdd?: () => void;
  buttonLabel?: string;
}

const PageHeader = ({
  title,
  description,
  onButtonAdd,
  buttonLabel = "Adicionar",
}: PageHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 w-full mb-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {title && (
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 tracking-tight leading-tight">
            {title}
          </h1>
        )}

        {onButtonAdd && (
          <button
            onClick={onButtonAdd}
            className="flex items-center justify-center gap-3 bg-gray-900 hover:bg-black text-white px-8 h-14 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors rounded-none border-none shrink-0"
          >
            <i className="pi pi-plus text-xs" />
            {buttonLabel}
          </button>
        )}
      </div>

      {description && (
        <p className="text-gray-400 text-sm font-light leading-relaxed max-w-lg">
          {description}
        </p>
      )}
    </div>
  );
};

export default PageHeader;
