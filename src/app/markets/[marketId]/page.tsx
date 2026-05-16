import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeftIcon,
  ExternalLinkIcon,
  LandmarkIcon,
  ReceiptTextIcon,
  ShieldCheckIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getSeededEvidenceForMarket } from "@/lib/market-data/seeded-evidence";
import { getSeededMarket } from "@/lib/market-data/seeded-markets";
import { formatPercent, formatUsdc } from "@/lib/metrics/format";
import { cn } from "@/lib/utils";

export default async function MarketDetailPage({
  params,
}: {
  params: Promise<{ marketId: string }>;
}) {
  const { marketId } = await params;
  const market = getSeededMarket(marketId);

  if (!market) {
    notFound();
  }

  const evidence = getSeededEvidenceForMarket(market.id);

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8 lg:px-8">
        <header className="flex flex-col gap-5 border-b pb-6">
          <Link
            href="/"
            className={cn(buttonVariants({ variant: "ghost" }), "w-fit")}
          >
            <ArrowLeftIcon data-icon="inline-start" />
            Dashboard
          </Link>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex max-w-3xl flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">Seoul election</Badge>
                <Badge variant="outline">{market.source}</Badge>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  {market.title}
                </h1>
                <p className="max-w-2xl text-muted-foreground">
                  {market.description}
                </p>
              </div>
            </div>
            <a
              href={market.polymarketUrl}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline" }), "w-fit")}
            >
              Polymarket
              <ExternalLinkIcon data-icon="inline-end" />
            </a>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-4">
          <SignalCard
            label="Market probability"
            value={formatPercent(market.marketProbability)}
            detail="Seeded Polymarket snapshot"
          />
          <SignalCard
            label="Agent probability"
            value={formatPercent(market.agentProbability)}
            detail={`${formatPercent(market.probabilityRange.low)}-${formatPercent(
              market.probabilityRange.high,
            )} uncertainty range`}
          />
          <SignalCard
            label="Edge"
            value={formatPercent(market.edge)}
            detail="Agent minus market"
          />
          <SignalCard
            label="Paper exposure"
            value={formatUsdc(market.suggestedExposureUsdc)}
            detail="Escrow candidate"
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Evidence scoring</CardTitle>
              <CardDescription>
                Balanced Korean evidence for and against the demo thesis.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Signal</TableHead>
                    <TableHead>Direction</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Source</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {evidence.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.title}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            item.direction === "favorable"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {item.direction}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.score}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {item.source}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Decision receipt</CardTitle>
              <CardDescription>
                Fixture receipt shape for the first vertical slice.
              </CardDescription>
              <CardAction>
                <Badge>{market.action}</Badge>
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <ReceiptLine
                icon="market"
                label="Outcome"
                value={market.outcome}
              />
              <Separator />
              <ReceiptLine
                icon="receipt"
                label="Rationale"
                value={market.rationale}
              />
              <Separator />
              <ReceiptLine
                icon="shield"
                label="Arc mode"
                value="Mock locally, live only with testnet wallet env vars"
              />
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}

function SignalCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>{label}</CardDescription>
        <CardTitle>{value}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{detail}</p>
      </CardContent>
    </Card>
  );
}

function ReceiptLine({
  icon,
  label,
  value,
}: {
  icon: "market" | "receipt" | "shield";
  label: string;
  value: string;
}) {
  const Icon =
    icon === "market"
      ? LandmarkIcon
      : icon === "receipt"
        ? ReceiptTextIcon
        : ShieldCheckIcon;

  return (
    <div className="flex gap-3">
      <div className="flex size-9 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
        <Icon />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">{value}</p>
      </div>
    </div>
  );
}
