import {
  CircleDollarSignIcon,
  LandmarkIcon,
  ReceiptTextIcon,
  ShieldCheckIcon,
} from "lucide-react";

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
import { cn } from "@/lib/utils";

export function DecisionReceiptPanel({
  market,
}: {
  market: SeoulMayorDemoMarket;
}) {
  return (
    <Card id="decision-receipt">
      <CardHeader>
        <CardDescription>Auditable action</CardDescription>
        <CardTitle>
          <h2>Decision receipt</h2>
        </CardTitle>
        <CardAction>
          <Badge>{market.receipt.action}</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <ReceiptLine icon="market" label="Outcome" value={market.outcome} />
        <Separator />
        <ReceiptLine
          icon="receipt"
          label="Receipt ID"
          value={market.receipt.id}
          mono
        />
        <Separator />
        <ReceiptLine
          icon="dollar"
          label="Market vs Korealpha"
          value={`${formatPercent(market.marketProbability)} -> ${formatPercent(
            market.agentProbability,
          )}`}
        />
        <Separator />
        <ReceiptLine
          icon="dollar"
          label="Suggested paper exposure"
          value={formatUsdc(market.receipt.suggestedExposureUsdc)}
        />
        <Separator />
        <ReceiptLine
          icon="shield"
          label="Guardrail"
          value="Paper trade only. No real Polymarket order or mainnet transaction."
        />
      </CardContent>
    </Card>
  );
}

function ReceiptLine({
  icon,
  label,
  value,
  mono = false,
}: {
  icon: "market" | "receipt" | "shield" | "dollar";
  label: string;
  value: string;
  mono?: boolean;
}) {
  const Icon =
    icon === "market"
      ? LandmarkIcon
      : icon === "receipt"
        ? ReceiptTextIcon
        : icon === "shield"
          ? ShieldCheckIcon
          : CircleDollarSignIcon;

  return (
    <div className="flex gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
        <Icon className="size-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{label}</p>
        <p
          className={cn(
            "break-words text-sm text-muted-foreground",
            mono && "font-mono text-xs",
          )}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
