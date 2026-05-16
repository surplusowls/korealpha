import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { DemoEvidenceItem } from "@/lib/market-data/seoul-mayor-demo";
import { formatPercent } from "@/lib/metrics/format";

export function EvidencePanel({ evidence }: { evidence: DemoEvidenceItem[] }) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>Korean local evidence</CardDescription>
        <CardTitle>
          <h2>Evidence scoring</h2>
        </CardTitle>
        <CardAction>
          <Badge variant="outline">{evidence.length} signals</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col divide-y divide-border">
          {evidence.map((item) => (
            <article
              key={item.id}
              className="grid gap-3 py-4 first:pt-0 last:pb-0 lg:grid-cols-[minmax(0,1fr)_7.5rem_4.5rem_7rem]"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium">{item.title}</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {item.summary}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {item.sourceName} · {item.publishedDate}
                </p>
              </div>
              <div>
                <p className="mb-1 text-xs text-muted-foreground">Direction</p>
                <DirectionBadge direction={item.direction} />
              </div>
              <SignalMetric label="Impact" value={String(item.impactScore)} />
              <SignalMetric
                label="Contribution"
                value={`${item.probabilityContribution > 0 ? "+" : ""}${formatPercent(item.probabilityContribution)}`}
              />
            </article>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function SignalMetric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-1 text-xs text-muted-foreground">{label}</p>
      <p className="font-mono text-sm">{value}</p>
    </div>
  );
}

function DirectionBadge({
  direction,
}: {
  direction: DemoEvidenceItem["direction"];
}) {
  if (direction === "unfavorable") {
    return <Badge variant="destructive">unfavorable</Badge>;
  }

  return (
    <Badge variant={direction === "favorable" ? "default" : "outline"}>
      {direction}
    </Badge>
  );
}
