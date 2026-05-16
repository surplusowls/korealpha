import { ShieldCheckIcon, WalletCardsIcon } from "lucide-react";

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
import type { DemoArcTransfer } from "@/lib/market-data/seoul-mayor-demo";
import { formatUsdc } from "@/lib/metrics/format";

export function ArcTransactionPanel({
  transfer,
}: {
  transfer: DemoArcTransfer;
}) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>Paper escrow state</CardDescription>
        <CardTitle>
          <h2>Arc Testnet state</h2>
        </CardTitle>
        <CardAction>
          <Badge variant="secondary">{transfer.status}</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <TransferLine
          icon="wallet"
          label="Mode"
          value={`${transfer.mode} · ${formatUsdc(transfer.amountUsdc)}`}
        />
        <Separator />
        <TransferLine
          icon="wallet"
          label="Wallet route"
          value={`${transfer.fromLabel} -> ${transfer.toLabel}`}
        />
        <Separator />
        <TransferLine
          icon="shield"
          label="Network"
          value={`Arc Testnet · chain ${transfer.chainId}`}
        />
        <Separator />
        <TransferLine
          icon="shield"
          label="USDC interface"
          value={transfer.usdcAddress}
          mono
        />
      </CardContent>
    </Card>
  );
}

function TransferLine({
  icon,
  label,
  value,
  mono = false,
}: {
  icon: "wallet" | "shield";
  label: string;
  value: string;
  mono?: boolean;
}) {
  const Icon = icon === "wallet" ? WalletCardsIcon : ShieldCheckIcon;

  return (
    <div className="flex gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
        <Icon className="size-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{label}</p>
        <p
          className={`break-words text-sm text-muted-foreground ${
            mono ? "font-mono text-xs" : ""
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
