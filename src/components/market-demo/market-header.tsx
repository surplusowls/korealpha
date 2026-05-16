import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { SeoulMayorDemoMarket } from "@/lib/market-data/seoul-mayor-demo";
import { formatUsdc } from "@/lib/metrics/format";

export function MarketHeader({ market }: { market: SeoulMayorDemoMarket }) {
  return (
    <header className="grid gap-5 border-b border-border pb-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
      <div className="flex max-w-4xl flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">Seoul mayor demo</Badge>
          <Badge variant="outline">{market.platform}</Badge>
          <Badge variant="outline">Testnet only</Badge>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold md:text-4xl">{market.title}</h1>
          <p className="max-w-3xl text-sm leading-6 text-muted-foreground md:text-base md:leading-7">
            {market.description}
          </p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardDescription>Tracked outcome</CardDescription>
          <CardTitle>
            <h2>{market.outcome}</h2>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3">
          <HeaderStat label="Action" value={market.action} />
          <HeaderStat label="Confidence" value={market.confidence} />
          <HeaderStat
            label="Exposure"
            value={formatUsdc(market.suggestedExposureUsdc)}
          />
          <HeaderStat label="End date" value={market.endDate} />
        </CardContent>
      </Card>
    </header>
  );
}

function HeaderStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="truncate text-sm font-semibold capitalize">{value}</p>
    </div>
  );
}
