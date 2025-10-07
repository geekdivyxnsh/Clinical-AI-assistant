import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const symptoms = [
  { emoji: "🤒", label: "Fever", id: "fever" },
  { emoji: "🤢", label: "Nausea", id: "nausea" },
  { emoji: "🤕", label: "Headache", id: "headache" },
  { emoji: "😴", label: "Fatigue", id: "fatigue" },
  { emoji: "🤧", label: "Cold", id: "cold" },
  { emoji: "💊", label: "Pain", id: "pain" },
];

export default function SymptomTracker() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSymptom = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <Card className="p-6 shadow-medium">
      <h3 className="text-xl font-semibold mb-4 text-foreground">
        Track Your Symptoms 📊
      </h3>
      <p className="text-sm text-muted-foreground mb-6">
        Select the symptoms you're experiencing today
      </p>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {symptoms.map((symptom) => (
          <Button
            key={symptom.id}
            variant={selected.includes(symptom.id) ? "default" : "outline"}
            onClick={() => toggleSymptom(symptom.id)}
            className={`h-24 flex flex-col gap-2 transition-all ${
              selected.includes(symptom.id)
                ? "bg-gradient-health shadow-glow"
                : "hover:border-primary"
            }`}
          >
            <span className="text-3xl">{symptom.emoji}</span>
            <span className="text-xs">{symptom.label}</span>
          </Button>
        ))}
      </div>

      {selected.length > 0 && (
        <div className="animate-slide-up p-4 bg-secondary rounded-lg">
          <p className="text-sm text-secondary-foreground">
            You've logged <strong>{selected.length}</strong> symptom
            {selected.length !== 1 ? "s" : ""} today. Keep tracking for better
            health insights! 💪
          </p>
        </div>
      )}
    </Card>
  );
}
