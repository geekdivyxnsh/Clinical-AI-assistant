import { Card } from "@/components/ui/card";
import { Lightbulb, Heart, Activity } from "lucide-react";

const tips = [
  {
    icon: Heart,
    title: "Stay Hydrated",
    description: "Drink at least 8 glasses of water daily for optimal health.",
  },
  {
    icon: Activity,
    title: "Move Your Body",
    description: "Take a 10-minute walk every few hours to boost circulation.",
  },
  {
    icon: Lightbulb,
    title: "Quality Sleep",
    description: "Aim for 7-9 hours of sleep to support immune function.",
  },
];

export default function HealthTips() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {tips.map((tip, index) => (
        <Card
          key={index}
          className="p-6 shadow-soft hover:shadow-medium transition-all hover:-translate-y-1"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-health flex items-center justify-center mb-4">
            <tip.icon className="w-6 h-6 text-primary-foreground" />
          </div>
          <h4 className="font-semibold mb-2 text-foreground">{tip.title}</h4>
          <p className="text-sm text-muted-foreground">{tip.description}</p>
        </Card>
      ))}
    </div>
  );
}
