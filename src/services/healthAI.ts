// Health AI Service - Provides intelligent health responses
export interface HealthResponse {
  response: string;
  severity: "low" | "medium" | "high";
  suggestions: string[];
  followUp?: string;
}

export class HealthAI {
  private healthDatabase = {
    sleep: {
      keywords: [
        "sleep",
        "sleepy",
        "tired",
        "insomnia",
        "cannot sleep",
        "wake up",
      ],
      responses: {
        low: {
          response:
            "I understand you're having trouble sleeping. This is a common issue that can be caused by stress, caffeine, or irregular sleep patterns.",
          suggestions: [
            "Try establishing a regular bedtime routine",
            "Avoid caffeine 6 hours before bed",
            "Keep your bedroom cool and dark",
            "Try relaxation techniques like deep breathing",
            "Limit screen time 1 hour before bed",
          ],
        },
      },
    },
    dizziness: {
      keywords: ["dizzy", "dizziness", "vertigo", "lightheaded", "spinning"],
      responses: {
        medium: {
          response:
            "Dizziness can have various causes. It's important to pay attention to when and how often it occurs.",
          suggestions: [
            "Sit or lie down immediately when feeling dizzy",
            "Stay hydrated throughout the day",
            "Avoid sudden movements",
            "Check if you've eaten recently (low blood sugar)",
            "Monitor your blood pressure if you have a history of hypertension",
          ],
        },
      },
    },
    general: {
      keywords: ["hi", "hello", "help", "symptoms", "health"],
      responses: {
        low: {
          response:
            "Hello! I'm your AI Health Assistant. I can help you with symptom tracking, health guidance, and medication reminders. What specific health concern would you like to discuss?",
          suggestions: [
            "Describe your symptoms in detail",
            "Tell me about your current medications",
            "Ask about sleep, diet, or exercise",
            "Request health tips or reminders",
          ],
        },
      },
    },
  };

  private getSeverityLevel(input: string): "low" | "medium" | "high" {
    const urgentKeywords = [
      "emergency",
      "severe",
      "pain",
      "chest",
      "breathing",
      "unconscious",
    ];
    const urgentFound = urgentKeywords.some((keyword) =>
      input.toLowerCase().includes(keyword)
    );

    if (urgentFound) return "high";

    const moderateKeywords = ["dizzy", "fever", "nausea", "headache"];
    const moderateFound = moderateKeywords.some((keyword) =>
      input.toLowerCase().includes(keyword)
    );

    return moderateFound ? "medium" : "low";
  }

  private findBestMatch(input: string): string | null {
    const lowerInput = input.toLowerCase();

    for (const [category, data] of Object.entries(this.healthDatabase)) {
      const hasKeyword = data.keywords.some((keyword) =>
        lowerInput.includes(keyword)
      );
      if (hasKeyword) {
        return category;
      }
    }

    return null;
  }

  public async processHealthQuery(input: string): Promise<HealthResponse> {
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const severity = this.getSeverityLevel(input);
    const matchedCategory = this.findBestMatch(input);

    if (matchedCategory && matchedCategory !== "general") {
      const categoryData =
        this.healthDatabase[
          matchedCategory as keyof typeof this.healthDatabase
        ];
      const responseData =
        categoryData.responses[severity] || categoryData.responses.low;

      return {
        response: responseData.response,
        severity,
        suggestions: responseData.suggestions,
        followUp:
          severity === "high"
            ? "⚠️ If symptoms are severe or worsening, please seek immediate medical attention or call emergency services."
            : "Would you like me to help you track this symptom or set up a reminder to check with your doctor?",
      };
    }

    // General response
    return {
      response:
        "I'm here to help with your health concerns. Could you tell me more specifically about what you're experiencing? For example, are you having trouble sleeping, feeling dizzy, experiencing pain, or something else?",
      severity: "low",
      suggestions: [
        "Be specific about your symptoms",
        "Mention when symptoms started",
        "Describe any triggers or patterns",
        "Share relevant medical history if comfortable",
      ],
      followUp:
        "I can also help you track symptoms over time or set up medication reminders.",
    };
  }

  public getHealthTips(): string[] {
    return [
      "Stay hydrated by drinking 8 glasses of water daily",
      "Get 7-9 hours of quality sleep each night",
      "Eat a balanced diet with fruits and vegetables",
      "Exercise for at least 30 minutes most days",
      "Manage stress through meditation or deep breathing",
      "Wash your hands regularly to prevent illness",
      "Get regular health check-ups and screenings",
    ];
  }

  public generateHealthReminder(type: string, time: string): string {
    return `🔔 Health Reminder: ${type} at ${time}. Your health is important - don't skip this!`;
  }
}

export const healthAI = new HealthAI();
