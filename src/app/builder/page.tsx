import type { Metadata } from "next";

import { BuilderPlaceholder } from "@/components/box-builder/builder-placeholder";

export const metadata: Metadata = {
  title: "Builder | Box & Go",
  description: "Configure your corporate chocolate box layout and customization.",
};

export default function BuilderPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Box Builder</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Foundation preview using shared types and Zustand state. Drag-and-drop,
          customization, and export features will be built on separate feature
          branches.
        </p>
      </div>
      <BuilderPlaceholder />
    </div>
  );
}
