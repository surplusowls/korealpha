import { notFound } from "next/navigation";

import { MarketDemoPage } from "@/components/market-demo/market-demo-page";
import { seoulMayorDemo } from "@/lib/market-data/seoul-mayor-demo";

export default async function MarketDetailPage({
  params,
}: {
  params: Promise<{ marketId: string }>;
}) {
  const { marketId } = await params;

  if (marketId !== seoulMayorDemo.id) {
    notFound();
  }

  return <MarketDemoPage market={seoulMayorDemo} />;
}
