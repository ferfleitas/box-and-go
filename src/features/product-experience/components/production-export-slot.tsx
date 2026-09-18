"use client";

<<<<<<< HEAD
import { useState } from "react";
import { Download, FileOutput, Printer, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  buildClientProofHtml,
  buildPrintableProductionHtml,
  buildProductionSpecification,
  downloadHtmlDocument,
  downloadProductionSpecificationJson,
  openPrintableProductionDocument,
  preparePortableConfiguration,
  validateProductionSpecification,
} from "@/features/production";
import { getBoxConfigurationFromStore, useBoxStore } from "@/stores/use-box-store";
import type { BoxConfiguration, ProductionSpecification } from "@/types";

type ExportAction = "json" | "print" | "proof";

export function ProductionExportSlot() {
  const catalog = useBoxStore((s) => s.catalog);
  const [pending, setPending] = useState<ExportAction | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  async function runExport(
    action: ExportAction,
    run: (args: { configuration: BoxConfiguration; spec: ProductionSpecification }) => void,
  ) {
    setErrors([]);
    setPending(action);
    try {
      const rawConfiguration = getBoxConfigurationFromStore(useBoxStore.getState());
      const configuration = await preparePortableConfiguration(rawConfiguration);
      const spec = buildProductionSpecification(configuration, catalog);

      const validation = validateProductionSpecification(spec);
      if (!validation.valid) {
        setErrors(validation.errors);
        return;
      }

      run({ configuration, spec });
    } catch (error) {
      setErrors([error instanceof Error ? error.message : "Export failed."]);
    } finally {
      setPending(null);
    }
  }

  function handleDownloadJson() {
    void runExport("json", ({ spec }) => {
      downloadProductionSpecificationJson(spec);
    });
  }

  function handleOpenPrintable() {
    void runExport("print", ({ configuration, spec }) => {
      const html = buildPrintableProductionHtml({ configuration, spec, catalog });
      const opened = openPrintableProductionDocument(html);
      if (!opened) {
        downloadHtmlDocument(html, `box-and-go-production-${spec.orderId}.html`);
      }
    });
  }

  function handleDownloadProof() {
    void runExport("proof", ({ configuration, spec }) => {
      const html = buildClientProofHtml({ configuration, spec, catalog });
      downloadHtmlDocument(html, `box-and-go-proof-${spec.orderId}.html`);
    });
  }

  return (
    <div className="rounded-xl border border-[var(--chocolate-light)]/40 bg-[var(--cream)]/50 p-4">
=======
import { FileOutput } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getBoxConfigurationFromStore, useBoxStore } from "@/stores/use-box-store";

/**
 * Integration point for Developer B (feature/production-export).
 *
 * Expected contract:
 * - Read configuration via getBoxConfigurationFromStore(useBoxStore.getState())
 * - Produce ProductionSpecification, JSON export, printable doc, shareable proof
 *
 * Do not implement export logic here — this slot is intentionally pending.
 */
export function ProductionExportSlot() {
  const state = useBoxStore();

  function handlePreviewData() {
    const config = getBoxConfigurationFromStore(state);
    console.info("[Box & Go] Configuration ready for export module:", config);
  }

  return (
    <div className="rounded-xl border border-dashed border-[var(--chocolate-light)]/50 bg-[var(--cream)]/50 p-4">
>>>>>>> origin/develop
      <div className="flex items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
          <FileOutput className="size-4 text-muted-foreground" />
        </div>
<<<<<<< HEAD
        <div className="min-w-0 flex-1 space-y-3">
          <div>
            <p className="text-sm font-medium">Production export</p>
            <p className="text-xs text-muted-foreground">
              Generates the production specification from the current design.
            </p>
          </div>

          {errors.length > 0 && (
            <ul className="space-y-1 rounded-lg border border-destructive/30 bg-destructive/5 p-2 text-xs text-destructive">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}

          <div className="grid gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleDownloadJson}
              disabled={pending !== null}
            >
              <Download className="size-3.5" />
              {pending === "json" ? "Preparing…" : "Download production JSON"}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleOpenPrintable}
              disabled={pending !== null}
            >
              <Printer className="size-3.5" />
              {pending === "print" ? "Preparing…" : "Open printable spec"}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleDownloadProof}
              disabled={pending !== null}
            >
              <Share2 className="size-3.5" />
              {pending === "proof" ? "Preparing…" : "Download client proof"}
            </Button>
          </div>
=======
        <div className="min-w-0 flex-1 space-y-2">
          <div>
            <p className="text-sm font-medium">Production export</p>
            <p className="text-xs text-muted-foreground">
              Pending integration from{" "}
              <code className="rounded bg-muted px-1">feature/production-export</code>.
              Export will consume{" "}
              <code className="rounded bg-muted px-1">getBoxConfigurationFromStore()</code>.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled
            title="Export module not yet integrated"
            className="w-full opacity-60"
          >
            Export specification — coming soon
          </Button>
          <button
            type="button"
            onClick={handlePreviewData}
            className="text-xs text-muted-foreground underline-offset-2 hover:underline"
          >
            Preview config in console (dev)
          </button>
>>>>>>> origin/develop
        </div>
      </div>
    </div>
  );
}
