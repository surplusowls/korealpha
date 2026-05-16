import {
  ReceiptTextIcon,
  ShieldCheckIcon,
  WalletCardsIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { SeoulMayorDemoMarket } from "@/lib/market-data/seoul-mayor-demo";
import { formatUsdc } from "@/lib/metrics/format";

export function LandingAgenticProof({
  market,
}: {
  market: SeoulMayorDemoMarket;
}) {
  return (
    <section id="proof" className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="flex flex-col gap-3">
        <Badge variant="secondary" className="w-fit">
          Agentic proof
        </Badge>
        <h2 className="text-3xl font-semibold md:text-4xl">
          Agent action is visible, bounded, and auditable.
        </h2>
        <p className="text-sm leading-6 text-muted-foreground">
          Korealpha does not hide behind a black-box prediction. The demo keeps
          action, exposure, receipt, and Arc Testnet state inspectable.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardDescription>Decision receipt</CardDescription>
          <CardTitle>
            <h3>{market.receipt.id}</h3>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <ProofRow
            icon="receipt"
            label="Action"
            value={`${market.action} · ${market.confidence} confidence`}
          />
          <Separator />
          <ProofRow
            icon="wallet"
            label="Paper exposure"
            value={formatUsdc(market.suggestedExposureUsdc)}
          />
          <Separator />
          <ProofRow
            icon="shield"
            label="Arc state"
            value={`Chain ${market.arcTransfer.chainId} · ${market.arcTransfer.status}`}
          />
        </CardContent>
      </Card>
    </section>
  );
}

function ProofRow({
  icon,
  label,
  value,
}: {
  icon: "receipt" | "wallet" | "shield";
  label: string;
  value: string;
}) {
  const Icon =
    icon === "receipt"
      ? ReceiptTextIcon
      : icon === "wallet"
        ? WalletCardsIcon
        : ShieldCheckIcon;

  return (
    <div className="flex gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground">
        <Icon className="size-4" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium">{label}</p>
        <p className="break-words text-sm text-muted-foreground">{value}</p>
      </div>
    </div>
  );
}
