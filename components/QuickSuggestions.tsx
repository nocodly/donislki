'use client';

type Props = {
  suggestions: string[];
  onPick: (text: string) => void;
};

export function QuickSuggestions({ suggestions, onPick }: Props) {
  return (
    <div className="flex flex-wrap gap-2 px-4 pb-2">
      {suggestions.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onPick(s)}
          className="min-h-[36px] rounded-full border border-border bg-card px-3 text-[12.5px] font-medium text-accent-deep transition-colors hover:border-accent/40"
        >
          {s}
        </button>
      ))}
    </div>
  );
}
