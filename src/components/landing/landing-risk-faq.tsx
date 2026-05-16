import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const items = [
  {
    question: "Does Korealpha claim Oh Se-hoon will win?",
    answer:
      "No. The demo asks whether Oh YES is underpriced after Korean local evidence is scored. The evidence still shows Chong as the polling leader.",
  },
  {
    question: "Does the MVP place real Polymarket trades?",
    answer:
      "No. The product shows market intelligence and a paper action. Real-money Polymarket order execution is out of scope.",
  },
  {
    question: "Does the agent sign mainnet transactions?",
    answer:
      "No. Arc is testnet-only in the MVP, and the UI keeps the paper-trade status visible.",
  },
];

export function LandingRiskFaq() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex max-w-2xl flex-col gap-3">
        <Badge variant="secondary" className="w-fit">
          Risk controls
        </Badge>
        <h2 className="text-3xl font-semibold md:text-4xl">
          Built for demo clarity, not prediction certainty.
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <Card key={item.question}>
            <CardHeader>
              <CardTitle>
                <h3>{item.question}</h3>
              </CardTitle>
              <CardDescription>Guardrail</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">
                {item.answer}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
