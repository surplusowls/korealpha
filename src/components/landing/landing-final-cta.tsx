import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LandingFinalCta({ demoHref }: { demoHref: string }) {
  return (
    <section className="border-y border-border py-8 md:py-10">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex max-w-2xl flex-col gap-2">
          <h2 className="text-3xl font-semibold">
            Open the Seoul mayor research desk.
          </h2>
          <p className="text-sm leading-6 text-muted-foreground">
            Inspect the evidence, probability edge, decision receipt, and Arc
            Testnet paper state behind the demo.
          </p>
        </div>
        <Link href={demoHref} className={cn(buttonVariants(), "w-fit")}>
          Open demo
          <ArrowRightIcon data-icon="inline-end" />
        </Link>
      </div>
    </section>
  );
}
