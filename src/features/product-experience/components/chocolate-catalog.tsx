"use client";

import { ChocolatePiece } from "@/features/product-experience/components/chocolate-piece";
import { cn } from "@/lib/utils";
import { useBoxStore } from "@/stores/use-box-store";
import type { Chocolate } from "@/types";

function CatalogItem({ chocolate }: { chocolate: Chocolate }) {
  const selectedChocolateId = useBoxStore((s) => s.selectedChocolateId);
  const setSelectedChocolate = useBoxStore((s) => s.setSelectedChocolate);
  const isSelected = selectedChocolateId === chocolate.id;

  return (
    <button
      type="button"
      onClick={() => setSelectedChocolate(isSelected ? null : chocolate.id)}
      aria-pressed={isSelected}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all outline-none",
        "focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2",
        isSelected
          ? "border-[var(--gold)] bg-[var(--cream-dark)] shadow-sm"
          : "border-[var(--chocolate-light)]/30 bg-card hover:border-[var(--chocolate-light)] hover:bg-[var(--cream-dark)]/50",
      )}
    >
      <ChocolatePiece chocolate={chocolate} size="sm" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{chocolate.name}</p>
        <p className="truncate text-xs text-muted-foreground">{chocolate.flavor}</p>
      </div>
      {isSelected && (
        <span className="shrink-0 rounded-full bg-[var(--gold)]/20 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[var(--chocolate-dark)]">
          Selected
        </span>
      )}
    </button>
  );
}

export function ChocolateCatalog() {
  const catalog = useBoxStore((s) => s.catalog);
  const selectedChocolateId = useBoxStore((s) => s.selectedChocolateId);

  return (
    <div className="space-y-3">
      <div>
        <h2 className="font-[family-name:var(--font-display)] text-lg font-medium">
          Chocolates
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Sample catalog for demo purposes. Select a piece, then click a slot to
          place it.
        </p>
      </div>

      {selectedChocolateId && (
        <p className="rounded-lg border border-[var(--gold)]/40 bg-[var(--gold)]/10 px-3 py-2 text-xs text-[var(--chocolate-dark)]">
          Click any slot in the box preview to place your selection.
        </p>
      )}

      <div className="space-y-2">
        {catalog.map((chocolate) => (
          <CatalogItem key={chocolate.id} chocolate={chocolate} />
        ))}
      </div>
    </div>
  );
}
