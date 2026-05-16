import Link from "next/link";
import { ArrowRightIcon, ReceiptTextIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import type { SeoulMayorDemoMarket } from "@/lib/market-data/seoul-mayor-demo";
import { cn } from "@/lib/utils";
import { LandingDashboardMockup } from "./landing-dashboard-mockup";

export function LandingHero({
  market,
  demoHref,
}: {
  market: SeoulMayorDemoMarket;
  demoHref: string;
}) {
  return (
    <section className="border-b border-border bg-muted/35">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8 lg:py-24">
        <div className="flex max-w-3xl flex-col gap-7">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">AI research desk</Badge>
            <Badge variant="outline">Prediction-market alpha</Badge>
            <Badge variant="outline">Paper testnet action</Badge>
          </div>
          <div className="flex flex-col gap-5">
            <h1 className="text-5xl font-semibold leading-none md:text-6xl">
              Read Korea before the market does.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              Korealpha reads Korean local evidence, estimates an independent
              probability, compares it with market price, and records the agent
              paper-trade commitment on Arc Testnet.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href={demoHref} className={cn(buttonVariants())}>
              Open Seoul mayor demo
              <ArrowRightIcon data-icon="inline-end" />
            </Link>
            <Link
              href={`${demoHref}#decision-receipt`}
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              <ReceiptTextIcon data-icon="inline-start" />
              View receipt
            </Link>
          </div>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            Demo thesis: not that Oh Se-hoon will win, but whether Oh YES is
            underpriced after local Korean evidence is scored.
          </p>
        </div>

        <LandingDashboardMockup market={market} />
      </div>
    </section>
  );
}
