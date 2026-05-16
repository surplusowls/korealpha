import Link from "next/link";
import {
  ArrowUpRightIcon,
  BadgeCheckIcon,
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
import { getSeededMarkets } from "@/lib/market-data/seeded-markets";
import { cn } from "@/lib/utils";
import { formatPercent, formatUsdc } from "@/lib/metrics/format";

export default function Home() {
  const markets = getSeededMarkets();
  const primaryMarket = markets[0];

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8 lg:px-8">
        <header className="flex flex-col gap-5 border-b pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-3xl flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">korealpha</Badge>
              <Badge variant="outline">Arc Testnet demo</Badge>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Korean local signal intelligence for prediction markets
              </h1>
              <p className="max-w-2xl text-muted-foreground">
                Seoul mayoral evidence, agent probability, market edge, paper
                exposure, and testnet escrow in one operator dashboard.
              </p>
            </div>
          </div>
          <Link
            href={`/markets/${primaryMarket.id}`}
            className={cn(buttonVariants(), "w-fit")}
          >
            Open Seoul market
            <ArrowUpRightIcon data-icon="inline-end" />
          </Link>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <MetricCard
            label="Primary market"
            value="2026 Seoul Mayor"
            detail="Oh Se-hoon YES"
          />
          <MetricCard
            label="Agent probability"
            value={formatPercent(primaryMarket.agentProbability)}
            detail={`${formatPercent(primaryMarket.edge)} edge vs market`}
          />
          <MetricCard
            label="Paper exposure"
            value={formatUsdc(primaryMarket.suggestedExposureUsdc)}
            detail="Mock by default, live on Arc Testnet"
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Markets</CardTitle>
              <CardDescription>
                Seeded MVP markets ready for the first vertical slice.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Market</TableHead>
                    <TableHead>Outcome</TableHead>
                    <TableHead>Market</TableHead>
                    <TableHead>Agent</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {markets.map((market) => (
                    <TableRow key={market.id}>
                      <TableCell className="font-medium">
                        <Link
                          href={`/markets/${market.id}`}
                          className="underline-offset-4 hover:underline"
                        >
                          {market.title}
                        </Link>
                      </TableCell>
                      <TableCell>{market.outcome}</TableCell>
                      <TableCell>
                        {formatPercent(market.marketProbability)}
                      </TableCell>
                      <TableCell>
                        {formatPercent(market.agentProbability)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            market.action === "trade" ? "default" : "secondary"
                          }
                        >
                          {market.action}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Demo readiness</CardTitle>
              <CardDescription>
                The scaffold keeps live integrations behind explicit modes.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <StatusItem
                icon="verified"
                label="Seeded evidence"
                detail="Balanced Korean signal bundle is available locally."
              />
              <Separator />
              <StatusItem
                icon="shield"
                label="Testnet only"
                detail="Arc transfers are mocked unless live mode is configured."
              />
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}

function MetricCard({
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
        <CardAction>
          <Badge variant="outline">MVP</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{detail}</p>
      </CardContent>
    </Card>
  );
}

function StatusItem({
  icon,
  label,
  detail,
}: {
  icon: "verified" | "shield";
  label: string;
  detail: string;
}) {
  const Icon = icon === "verified" ? BadgeCheckIcon : ShieldCheckIcon;

  return (
    <div className="flex gap-3">
      <div className="flex size-9 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
        <Icon />
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">{detail}</p>
      </div>
    </div>
  );
}
