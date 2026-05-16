import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { seoulMayorDemo } from "@/lib/market-data/seoul-mayor-demo";
import { cn } from "@/lib/utils";
import { LandingAgenticProof } from "./landing-agentic-proof";
import { LandingCapabilities } from "./landing-capabilities";
import { LandingEvidenceSnapshot } from "./landing-evidence-snapshot";
import { LandingFinalCta } from "./landing-final-cta";
import { LandingHero } from "./landing-hero";
import { LandingProofStrip } from "./landing-proof-strip";
import { LandingRiskFaq } from "./landing-risk-faq";
import { LandingWorkflow } from "./landing-workflow";

export function LandingPage() {
  const demoHref = `/markets/${seoulMayorDemo.id}`;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border bg-background/95">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary text-sm font-semibold text-primary-foreground">
              k
            </span>
            <span className="font-semibold">korealpha</span>
          </Link>
          <nav className="hidden items-center gap-5 text-sm text-muted-foreground md:flex">
            <a href="#workflow" className="hover:text-foreground">
              Workflow
            </a>
            <a href="#evidence" className="hover:text-foreground">
              Evidence
            </a>
            <a href="#proof" className="hover:text-foreground">
              Proof
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="hidden sm:inline-flex">
              Arc Testnet
            </Badge>
            <Link
              href={demoHref}
              className={cn(buttonVariants({ size: "sm" }))}
            >
              Open demo
              <ArrowRightIcon data-icon="inline-end" />
            </Link>
          </div>
        </div>
      </header>

      <LandingHero market={seoulMayorDemo} demoHref={demoHref} />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-20 px-5 py-16 lg:px-8 lg:py-20">
        <LandingProofStrip market={seoulMayorDemo} />

        <section className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="flex flex-col gap-4">
            <Badge variant="secondary" className="w-fit">
              Market problem
            </Badge>
            <h2 className="text-3xl font-semibold md:text-4xl">
              The price is public. The Korean context is not.
            </h2>
          </div>
          <div className="flex flex-col gap-5 text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
            <p>
              Global traders can see the Polymarket odds, but they often miss
              local polling nuance, party nomination timing, candidate scrutiny,
              and Korean-language campaign context.
            </p>
            <p>
              Korealpha turns that context into a research-desk view: evidence,
              score, probability, edge, action, receipt, and Arc Testnet paper
              commitment.
            </p>
          </div>
        </section>

        <LandingWorkflow />
        <LandingCapabilities market={seoulMayorDemo} />
        <LandingEvidenceSnapshot market={seoulMayorDemo} />
        <LandingAgenticProof market={seoulMayorDemo} />
        <LandingRiskFaq />
        <LandingFinalCta demoHref={demoHref} />
      </div>

      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>korealpha converts Korean local information into market edge.</p>
          <div className="flex flex-wrap gap-4">
            <Link href={demoHref} className="hover:text-foreground">
              Live demo
            </Link>
            <Link href="/markets" className="hover:text-foreground">
              Markets
            </Link>
            <a
              href="https://github.com/surplusowls/korealpha"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
