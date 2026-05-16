import { ExternalLinkIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { SeoulMayorDemoMarket } from "@/lib/market-data/seoul-mayor-demo";
import { formatPercent } from "@/lib/metrics/format";

export function LandingEvidenceSnapshot({
  market,
}: {
  market: SeoulMayorDemoMarket;
}) {
  return (
    <section id="evidence" className="flex flex-col gap-6">
      <div className="flex max-w-2xl flex-col gap-3">
        <Badge variant="secondary" className="w-fit">
          Source-backed snapshot
        </Badge>
        <h2 className="text-3xl font-semibold md:text-4xl">
          The demo shows real evidence slots, not placeholder copy.
        </h2>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {market.evidence.slice(0, 3).map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardDescription>
                {item.sourceName} · {item.publishedDate}
              </CardDescription>
              <CardTitle>
                <h3>{item.title}</h3>
              </CardTitle>
              <CardAction>
                <Badge
                  variant={
                    item.direction === "unfavorable" ? "destructive" : "outline"
                  }
                >
                  {item.direction}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="text-sm leading-6 text-muted-foreground">
                {item.summary}
              </p>
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="text-muted-foreground">Probability input</span>
                <span className="font-mono">
                  {item.probabilityContribution > 0 ? "+" : ""}
                  {formatPercent(item.probabilityContribution)}
                </span>
              </div>
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center gap-2 text-sm font-medium hover:text-muted-foreground"
              >
                Open source
                <ExternalLinkIcon className="size-4" />
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
