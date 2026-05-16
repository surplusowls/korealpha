import {
  GaugeIcon,
  ReceiptTextIcon,
  ShieldCheckIcon,
  Table2Icon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { SeoulMayorDemoMarket } from "@/lib/market-data/seoul-mayor-demo";
import { formatPercent } from "@/lib/metrics/format";

export function LandingCapabilities({
  market,
}: {
  market: SeoulMayorDemoMarket;
}) {
  const capabilities = [
    {
      title: "Evidence table",
      detail:
        "Source, date, direction, credibility, impact, and probability contribution stay visible.",
      value: `${market.evidence.length} signals`,
      icon: Table2Icon,
    },
    {
      title: "Probability edge",
      detail:
        "Korealpha probability is compared against market price with uncertainty intact.",
      value: formatPercent(market.edge),
      icon: GaugeIcon,
    },
    {
      title: "Decision receipt",
      detail:
        "Each action has a receipt id, rationale, exposure, and paper-trade state.",
      value: market.receipt.id,
      icon: ReceiptTextIcon,
    },
    {
      title: "Arc safety layer",
      detail:
        "The MVP remains testnet-only and never signs from unvalidated model output.",
      value: "testnet only",
      icon: ShieldCheckIcon,
    },
  ];

  return (
    <section className="flex flex-col gap-6">
      <div className="flex max-w-2xl flex-col gap-3">
        <Badge variant="secondary" className="w-fit">
          Research desk
        </Badge>
        <h2 className="text-3xl font-semibold md:text-4xl">
          Product primitives that backend logic can attach to later.
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {capabilities.map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <div className="mb-2 flex size-9 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                <item.icon className="size-4" />
              </div>
              <CardDescription>{item.value}</CardDescription>
              <CardTitle>
                <h3>{item.title}</h3>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">
                {item.detail}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
