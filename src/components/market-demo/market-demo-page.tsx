import Link from "next/link";
import { ArrowLeftIcon, ExternalLinkIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import type { SeoulMayorDemoMarket } from "@/lib/market-data/seoul-mayor-demo";
import { cn } from "@/lib/utils";
import { AgentAnalysisPanel } from "./agent-analysis-panel";
import { ArcTransactionPanel } from "./arc-transaction-panel";
import { DecisionReceiptPanel } from "./decision-receipt-panel";
import { EvidencePanel } from "./evidence-panel";
import { MarketHeader } from "./market-header";
import { ProbabilityPanel } from "./probability-panel";

export function MarketDemoPage({ market }: { market: SeoulMayorDemoMarket }) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 py-5 lg:px-8">
        <nav className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className={cn(buttonVariants({ variant: "ghost" }), "w-fit")}
          >
            <ArrowLeftIcon data-icon="inline-start" />
            korealpha
          </Link>
          <a
            href={market.polymarketUrl}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "outline" }), "w-fit")}
          >
            Polymarket event
            <ExternalLinkIcon data-icon="inline-end" />
          </a>
        </nav>

        <MarketHeader market={market} />
        <ProbabilityPanel market={market} />

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.75fr)]">
          <div className="flex min-w-0 flex-col gap-6">
            <EvidencePanel evidence={market.evidence} />
            <AgentAnalysisPanel market={market} />
          </div>
          <aside className="flex min-w-0 flex-col gap-6">
            <DecisionReceiptPanel market={market} />
            <ArcTransactionPanel transfer={market.arcTransfer} />
          </aside>
        </section>
      </div>
    </main>
  );
}
