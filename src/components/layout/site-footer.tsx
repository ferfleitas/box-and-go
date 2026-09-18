import { cn } from "@/lib/utils";

interface SiteFooterProps {
  className?: string;
}

export function SiteFooter({ className }: SiteFooterProps) {
  return (
    <footer
      className={cn(
        "border-t border-border/60 bg-muted/30 py-8 text-sm text-muted-foreground",
        className,
      )}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          <span className="font-medium text-foreground">Box &amp; Go</span> — Corporate
          chocolate box configurator for Cocoa Dolce.
        </p>
        <p>Hackathon project · Sample data only</p>
      </div>
    </footer>
  );
}
