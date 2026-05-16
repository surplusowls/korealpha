import { ArrowUpRightIcon, FileTextIcon, ShieldCheckIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { SeoulMayorDemoMarket } from "@/lib/market-data/seoul-mayor-demo";
import { formatPercent, formatUsdc } from "@/lib/metrics/format";

export function LandingDashboardMockup({
  market,
}: {
  market: SeoulMayorDemoMarket;
}) {
  const topEvidence = market.evidence.slice(0, 3);

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardDescription>Research desk preview</CardDescription>
        <CardTitle>
          <h2 className="text-2xl">{market.outcome}</h2>
        </CardTitle>
        <CardAction>
          <Badge>{market.action}</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="grid gap-3 sm:grid-cols-3">
          <Metric
            label="Market"
            value={formatPercent(market.marketProbability)}
          />
          <Metric
            label="Korealpha"
            value={formatPercent(market.agentProbability)}
          />
          <Metric label="Edge" value={formatPercent(market.edge)} />
        </div>

        <Separator />

        <div className="flex flex-col gap-3">
          {topEvidence.map((item) => (
            <div
              key={item.id}
              className="grid gap-2 border-b border-border pb-3 last:border-b-0 last:pb-0 sm:grid-cols-[1fr_4rem]"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{item.title}</p>
                <p className="text-xs text-muted-foreground">
                  {item.sourceName} · {item.publishedDate}
                </p>
              </div>
              <p className="font-mono text-sm text-muted-foreground sm:text-right">
                {item.probabilityContribution > 0 ? "+" : ""}
                {formatPercent(item.probabilityContribution)}
              </p>
            </div>
          ))}
        </div>

        <Separator />

        <div className="grid gap-3 sm:grid-cols-3">
          <Proof label="Receipt" value={market.receipt.id} icon="receipt" />
          <Proof
            label="Exposure"
            value={formatUsdc(market.suggestedExposureUsdc)}
            icon="action"
          />
          <Proof label="Network" value="Arc Testnet" icon="shield" />
        </div>
      </CardContent>
    </Card>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-border pb-3 last:border-b-0 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-3 sm:last:border-r-0">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-mono text-2xl font-semibold">{value}</p>
    </div>
  );
}

function Proof({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: "receipt" | "action" | "shield";
}) {
  const Icon =
    icon === "receipt"
      ? FileTextIcon
      : icon === "action"
        ? ArrowUpRightIcon
        : ShieldCheckIcon;

  return (
    <div className="flex min-w-0 gap-2">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground">
        <Icon className="size-4" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}
