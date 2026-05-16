import {
  ArrowRightLeftIcon,
  BadgeCheckIcon,
  BrainCircuitIcon,
  FileSearchIcon,
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

const steps = [
  {
    title: "Collect Korean evidence",
    detail:
      "Track local polls, nomination events, candidate context, and market price movement.",
    icon: FileSearchIcon,
  },
  {
    title: "Score impact and credibility",
    detail:
      "Separate high-signal local evidence from translated noise and stale narratives.",
    icon: BadgeCheckIcon,
  },
  {
    title: "Estimate Korealpha probability",
    detail:
      "Build an independent probability range before looking at the market edge.",
    icon: BrainCircuitIcon,
  },
  {
    title: "Compare against market price",
    detail:
      "Surface underpriced or overpriced outcomes as explicit edge, not certainty.",
    icon: ArrowRightLeftIcon,
  },
  {
    title: "Commit paper action",
    detail:
      "Record a receipt and Arc Testnet paper-transfer state when risk checks pass.",
    icon: WalletCardsIcon,
  },
];

export function LandingWorkflow() {
  return (
    <section id="workflow" className="flex flex-col gap-6">
      <div className="flex max-w-2xl flex-col gap-3">
        <Badge variant="secondary" className="w-fit">
          Workflow
        </Badge>
        <h2 className="text-3xl font-semibold md:text-4xl">
          From Korean evidence to auditable market action.
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-5">
        {steps.map((step, index) => (
          <Card key={step.title}>
            <CardHeader>
              <div className="mb-2 flex size-9 items-center justify-center rounded-md bg-accent text-accent-foreground">
                <step.icon className="size-4" />
              </div>
              <CardDescription>Step {index + 1}</CardDescription>
              <CardTitle>
                <h3>{step.title}</h3>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">
                {step.detail}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
