import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Clock, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface Medication {
  id: string;
  name: string;
  time: string;
  taken: boolean;
}

export default function MedicationReminder() {
  const [medications, setMedications] = useState<Medication[]>([
    { id: "1", name: "Vitamin D", time: "8:00 AM", taken: false },
    { id: "2", name: "Blood Pressure Med", time: "12:00 PM", taken: true },
    { id: "3", name: "Calcium Supplement", time: "8:00 PM", taken: false },
  ]);

  const toggleMedication = (id: string) => {
    setMedications((prev) =>
      prev.map((med) =>
        med.id === id ? { ...med, taken: !med.taken } : med
      )
    );
  };

  return (
    <Card className="p-6 shadow-medium">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-semibold text-foreground">
          Medication Reminders
        </h3>
      </div>

      <div className="space-y-3">
        {medications.map((med) => (
          <div
            key={med.id}
            className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
              med.taken
                ? "bg-secondary border-border opacity-60"
                : "bg-card border-primary/20 shadow-soft"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  med.taken ? "bg-accent" : "bg-gradient-health"
                }`}
              >
                {med.taken ? (
                  <CheckCircle2 className="w-5 h-5 text-accent-foreground" />
                ) : (
                  <Clock className="w-5 h-5 text-primary-foreground" />
                )}
              </div>
              <div>
                <p className="font-medium text-foreground">{med.name}</p>
                <p className="text-sm text-muted-foreground">{med.time}</p>
              </div>
            </div>

            <Button
              variant={med.taken ? "outline" : "default"}
              size="sm"
              onClick={() => toggleMedication(med.id)}
              className={!med.taken ? "bg-gradient-health" : ""}
            >
              {med.taken ? "Undo" : "Take"}
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-4 p-4 bg-gradient-calm rounded-lg">
        <p className="text-sm text-muted-foreground text-center">
          🎉 Keep up the great work! Consistency is key to better health.
        </p>
      </div>
    </Card>
  );
}
