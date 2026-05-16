import { ArrowUpRightIcon, BrainCircuitIcon } from "lucide-react";

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
import { formatPercent } from "@/lib/metrics/format";

export function AgentAnalysisPanel({
  market,
}: {
  market: SeoulMayorDemoMarket;
}) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>Agent analysis</CardDescription>
        <CardTitle>
          <h2>Why Korealpha marks this as a paper trade</h2>
        </CardTitle>
        <CardAction>
          <Badge>{market.confidence} confidence</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="grid gap-5 md:grid-cols-[14rem_1fr]">
        <div className="flex flex-col gap-4">
          <AnalysisLine
            icon="brain"
            label="Probability range"
            value={`${formatPercent(market.probabilityRange.low)} to ${formatPercent(
              market.probabilityRange.high,
            )}`}
          />
          <Separator />
          <AnalysisLine
            icon="action"
            label="Recommended action"
            value={market.action}
          />
        </div>
        <p className="text-sm leading-6 text-muted-foreground">
          {market.rationale}
        </p>
      </CardContent>
    </Card>
  );
}

function AnalysisLine({
  icon,
  label,
  value,
}: {
  icon: "brain" | "action";
  label: string;
  value: string;
}) {
  const Icon = icon === "brain" ? BrainCircuitIcon : ArrowUpRightIcon;

  return (
    <div className="flex gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground">
        <Icon className="size-4" />
      </div>
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">{value}</p>
      </div>
    </div>
  );
}
