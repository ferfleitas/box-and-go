import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";
import type { Chocolate } from "@/types";

interface ChocolatePieceProps {
  chocolate: Chocolate;
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: CSSProperties;
}

const sizeClasses = {
  sm: "size-8 rounded-md",
  md: "size-12 rounded-lg",
  lg: "size-16 rounded-xl",
};

export function ChocolatePiece({
  chocolate,
  size = "md",
  className,
  style,
}: ChocolatePieceProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden shadow-sm ring-1 ring-black/10",
        sizeClasses[size],
        className,
      )}
      style={{ backgroundColor: chocolate.color, ...style }}
      title={chocolate.name}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.45) 0%, transparent 50%, rgba(0,0,0,0.15) 100%)",
        }}
      />
      <div className="absolute inset-x-1 top-1 h-1/4 rounded-full bg-white/20 blur-[1px]" />
    </div>
  );
}
