import {
  ActivityIcon,
  GaugeIcon,
  ScaleIcon,
  WalletCardsIcon,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { SeoulMayorDemoMarket } from "@/lib/market-data/seoul-mayor-demo";
import { formatPercent, formatUsdc } from "@/lib/metrics/format";

export function ProbabilityPanel({ market }: { market: SeoulMayorDemoMarket }) {
  const items = [
    {
      label: "Market probability",
      value: formatPercent(market.marketProbability),
      detail: "Polymarket snapshot",
      meter: market.marketProbability,
      icon: ActivityIcon,
    },
    {
      label: "Korealpha probability",
      value: formatPercent(market.agentProbability),
      detail: `${formatPercent(market.probabilityRange.low)}-${formatPercent(
        market.probabilityRange.high,
      )} range`,
      meter: market.agentProbability,
      icon: GaugeIcon,
    },
    {
      label: "Detected edge",
      value: formatPercent(market.edge),
      detail: "Agent estimate minus market",
      meter: Math.min(Math.abs(market.edge) * 4, 1),
      icon: ScaleIcon,
    },
    {
      label: "Paper exposure",
      value: formatUsdc(market.suggestedExposureUsdc),
      detail: "Conservative testnet sizing",
      meter: market.suggestedExposureUsdc / 20,
      icon: WalletCardsIcon,
    },
  ];

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label}>
          <CardHeader>
            <CardDescription className="flex items-center gap-2">
              <item.icon className="size-4" />
              {item.label}
            </CardDescription>
            <CardTitle className="font-mono text-3xl">{item.value}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-accent"
                style={{
                  width: `${Math.max(0, Math.min(item.meter, 1)) * 100}%`,
                }}
              />
            </div>
            <p className="text-sm text-muted-foreground">{item.detail}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
