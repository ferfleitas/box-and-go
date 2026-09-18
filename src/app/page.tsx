import Link from "next/link";
import { ArrowRight, Box, Palette, Share2 } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Box,
    title: "Configure the box",
    description:
      "Choose a 9- or 16-piece layout and place chocolates into each slot with drag and drop.",
  },
  {
    icon: Palette,
    title: "Add your brand",
    description:
      "Upload a corporate logo, pick ribbon colors, and personalize cards and packaging.",
  },
  {
    icon: Share2,
    title: "Export for production",
    description:
      "Generate shareable proofs and production-ready specifications for Cocoa Dolce.",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <section className="mx-auto max-w-3xl text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-primary">
          Cocoa Dolce · Hackathon 2026
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Corporate chocolate boxes,{" "}
          <span className="text-primary">designed visually</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Box &amp; Go is a visual configurator for corporate gifting teams. Build a
          branded chocolate box, preview the result, and export specs for production —
          no spreadsheets required.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/builder" className={cn(buttonVariants({ size: "lg" }), "gap-2")}>
            Open the builder
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/builder"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            View sample layout
          </Link>
        </div>
      </section>

      <section className="mt-16 grid gap-6 sm:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardHeader>
              <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <feature.icon className="size-5" />
              </div>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Feature modules are split across three developer branches for parallel
                work.
              </p>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
