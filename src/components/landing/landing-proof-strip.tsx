import {
  BadgeCheckIcon,
  DatabaseIcon,
  FileTextIcon,
  WalletCardsIcon,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { SeoulMayorDemoMarket } from "@/lib/market-data/seoul-mayor-demo";
import { formatUsdc } from "@/lib/metrics/format";

export function LandingProofStrip({
  market,
}: {
  market: SeoulMayorDemoMarket;
}) {
  const items = [
    {
      label: "source-backed signals",
      value: String(market.sourceCount),
      icon: DatabaseIcon,
    },
    {
      label: "demo reports",
      value: String(market.reportCount),
      icon: FileTextIcon,
    },
    {
      label: "paper trades",
      value: String(market.paperTradeCount),
      icon: BadgeCheckIcon,
    },
    {
      label: "testnet volume",
      value: formatUsdc(market.testnetVolumeUsdc),
      icon: WalletCardsIcon,
    },
  ];

  return (
    <section
      aria-label="Korealpha proof metrics"
      className="grid gap-3 md:grid-cols-4"
    >
      {items.map((item) => (
        <Card key={item.label}>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
              <item.icon className="size-4" />
            </div>
            <div className="min-w-0">
              <p className="font-mono text-2xl font-semibold">{item.value}</p>
              <p className="truncate text-sm text-muted-foreground">
                {item.label}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
