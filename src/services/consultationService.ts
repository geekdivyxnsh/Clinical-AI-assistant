// Consultation Service - Handles audio recording, transcription, and AI analysis

export interface ConsultationData {
  id: string;
  date: string;
  doctor: string;
  specialty: string;
  duration: number;
  audioBlob?: Blob;
  transcript: string;
  summary: {
    diagnoses: string[];
    prescriptions: string[];
    actionItems: string[];
    followUp: string;
    keyPoints: string[];
    vitalSigns?: {
      bloodPressure?: string;
      heartRate?: string;
      temperature?: string;
      weight?: string;
    };
  };
  status: "recording" | "processing" | "completed" | "error";
  createdAt: Date;
  updatedAt: Date;
}

export interface TranscriptionResult {
  text: string;
  confidence: number;
  segments: Array<{
    start: number;
    end: number;
    text: string;
    speaker?: string;
  }>;
}

export interface AIAnalysisResult {
  diagnoses: string[];
  prescriptions: string[];
  actionItems: string[];
  followUp: string;
  keyPoints: string[];
  vitalSigns?: {
    bloodPressure?: string;
    heartRate?: string;
    temperature?: string;
    weight?: string;
  };
  urgency: "low" | "medium" | "high";
  confidence: number;
}

class ConsultationService {
  private consultations: ConsultationData[] = [];

  /**
   * Simulate audio transcription using a mock service
   * In production, this would integrate with services like AssemblyAI, Whisper, or Google Speech-to-Text
   */
  async transcribeAudio(audioBlob: Blob): Promise<TranscriptionResult> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock transcription - in production, this would call a real transcription API
    const mockTranscript = this.generateMockTranscript();

    return {
      text: mockTranscript,
      confidence: 0.95,
      segments: [
        {
          start: 0,
          end: 30,
          text: "Good morning, how are you feeling today?",
          speaker: "Doctor",
        },
        {
          start: 30,
          end: 60,
          text: "I've been having some chest pain for the past few days.",
          speaker: "Patient",
        },
      ],
    };
  }

  /**
   * AI-powered analysis of consultation transcript
   * Extracts key medical information using natural language processing
   */
  async analyzeTranscript(transcript: string): Promise<AIAnalysisResult> {
    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock AI analysis - in production, this would use OpenAI, Claude, or a medical AI model
    return this.generateMockAnalysis(transcript);
  }

  /**
   * Process a complete consultation from audio to final analysis
   */
  async processConsultation(
    audioBlob: Blob,
    metadata: Partial<ConsultationData>
  ): Promise<ConsultationData> {
    try {
      // Step 1: Transcribe audio
      const transcription = await this.transcribeAudio(audioBlob);

      // Step 2: Analyze transcript with AI
      const analysis = await this.analyzeTranscript(transcription.text);

      // Step 3: Create consultation record
      const consultation: ConsultationData = {
        id: metadata.id || Date.now().toString(),
        date: metadata.date || new Date().toISOString().split("T")[0],
        doctor: metadata.doctor || "Dr. [To be filled]",
        specialty: metadata.specialty || "General Consultation",
        duration: metadata.duration || 0,
        audioBlob,
        transcript: transcription.text,
        summary: {
          diagnoses: analysis.diagnoses,
          prescriptions: analysis.prescriptions,
          actionItems: analysis.actionItems,
          followUp: analysis.followUp,
          keyPoints: analysis.keyPoints,
          vitalSigns: analysis.vitalSigns,
        },
        status: "completed",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      this.consultations.unshift(consultation);
      return consultation;
    } catch (error) {
      console.error("Error processing consultation:", error);
      throw error;
    }
  }

  /**
   * Get all consultations
   */
  getConsultations(): ConsultationData[] {
    return this.consultations;
  }

  /**
   * Get consultation by ID
   */
  getConsultation(id: string): ConsultationData | undefined {
    return this.consultations.find((c) => c.id === id);
  }

  /**
   * Update consultation metadata
   */
  updateConsultation(
    id: string,
    updates: Partial<ConsultationData>
  ): ConsultationData | null {
    const index = this.consultations.findIndex((c) => c.id === id);
    if (index === -1) return null;

    this.consultations[index] = {
      ...this.consultations[index],
      ...updates,
      updatedAt: new Date(),
    };

    return this.consultations[index];
  }

  /**
   * Delete consultation
   */
  deleteConsultation(id: string): boolean {
    const index = this.consultations.findIndex((c) => c.id === id);
    if (index === -1) return false;

    this.consultations.splice(index, 1);
    return true;
  }

  /**
   * Export consultation data
   */
  exportConsultation(
    id: string,
    format: "json" | "txt" | "pdf" = "json"
  ): string {
    const consultation = this.getConsultation(id);
    if (!consultation) throw new Error("Consultation not found");

    switch (format) {
      case "json":
        return JSON.stringify(consultation, null, 2);
      case "txt":
        return this.formatConsultationAsText(consultation);
      case "pdf":
        // In production, this would generate a PDF
        return "PDF generation not implemented in demo";
      default:
        throw new Error("Unsupported export format");
    }
  }

  /**
   * Generate mock transcript for demo purposes
   */
  private generateMockTranscript(): string {
    const mockTranscripts = [
      `Doctor: Good morning, how are you feeling today?
Patient: I've been having some chest pain for the past few days. It's sharp and comes and goes.
Doctor: Can you describe the pain more? When does it occur?
Patient: It's worse when I take deep breaths or move around. Sometimes it wakes me up at night.
Doctor: Any shortness of breath or nausea?
Patient: No, but I feel tired all the time.
Doctor: Let me check your blood pressure and heart rate. BP is 140/90, heart rate is 88 and regular.
Doctor: I'm going to order an EKG and some blood work. For now, I'm prescribing nitroglycerin for the chest pain and lisinopril for your blood pressure.
Patient: What should I do if the pain gets worse?
Doctor: If the pain becomes severe or you have difficulty breathing, go to the emergency room immediately. Otherwise, follow up with me in two weeks.
Patient: Thank you, doctor.`,

      `Doctor: Welcome back! How has your blood pressure been?
Patient: I've been checking it at home, and it's been running high, around 150/95.
Doctor: Are you taking your medication regularly?
Patient: I've been forgetting some doses. Work has been stressful lately.
Doctor: I understand. Let's increase your amlodipine to 10mg daily and add some lifestyle modifications.
Patient: What kind of modifications?
Doctor: Try to reduce sodium intake, exercise 30 minutes daily, and practice stress management techniques like meditation.
Patient: I'll try my best.
Doctor: I'm also going to order some blood work to check your kidney function and cholesterol levels.
Patient: When should I come back?
Doctor: Let's see you in 4 weeks to monitor your progress.`,

      `Doctor: I see you're here for your annual physical. Any concerns today?
Patient: I feel pretty good overall, just want to make sure everything is okay.
Doctor: Great! Let me check your vitals. BP is 128/82, heart rate 72, weight is stable at 165 lbs.
Doctor: Your lab results look good overall. Cholesterol is slightly elevated at 220, but your HDL is good at 45.
Patient: Should I be worried about that?
Doctor: Not worried, but we should address it. I recommend starting a statin and improving your diet.
Patient: What kind of diet changes?
Doctor: More fruits, vegetables, and whole grains. Less processed foods and saturated fats.
Doctor: I'm prescribing atorvastatin 20mg daily. We'll recheck your cholesterol in 3 months.
Patient: Sounds good. When should I come back?
Doctor: Let's schedule your next physical in 6 months, but we can do a cholesterol check in 3 months.`,
    ];

    return mockTranscripts[Math.floor(Math.random() * mockTranscripts.length)];
  }

  /**
   * Generate mock AI analysis for demo purposes
   */
  private generateMockAnalysis(transcript: string): AIAnalysisResult {
    // Simple keyword-based analysis for demo
    const lowerTranscript = transcript.toLowerCase();

    // Extract diagnoses based on keywords
    const diagnoses: string[] = [];
    if (
      lowerTranscript.includes("chest pain") ||
      lowerTranscript.includes("cardiac")
    ) {
      diagnoses.push("Chest Pain - Rule out cardiac etiology");
    }
    if (
      lowerTranscript.includes("hypertension") ||
      lowerTranscript.includes("high blood pressure")
    ) {
      diagnoses.push("Hypertension");
    }
    if (
      lowerTranscript.includes("hyperlipidemia") ||
      lowerTranscript.includes("cholesterol")
    ) {
      diagnoses.push("Hyperlipidemia");
    }

    // Extract prescriptions
    const prescriptions: string[] = [];
    if (lowerTranscript.includes("nitroglycerin")) {
      prescriptions.push("Nitroglycerin 0.4mg sublingual PRN");
    }
    if (lowerTranscript.includes("lisinopril")) {
      prescriptions.push("Lisinopril 10mg daily");
    }
    if (lowerTranscript.includes("amlodipine")) {
      prescriptions.push("Amlodipine 10mg daily");
    }
    if (lowerTranscript.includes("atorvastatin")) {
      prescriptions.push("Atorvastatin 20mg daily");
    }

    // Extract action items
    const actionItems: string[] = [];
    if (lowerTranscript.includes("ekg")) {
      actionItems.push("EKG performed");
    }
    if (
      lowerTranscript.includes("blood work") ||
      lowerTranscript.includes("lab")
    ) {
      actionItems.push("Laboratory tests ordered");
    }
    if (
      lowerTranscript.includes("blood pressure") &&
      lowerTranscript.includes("monitor")
    ) {
      actionItems.push("Blood pressure monitoring");
    }

    // Extract vital signs
    const vitalSigns: any = {};
    const bpMatch = transcript.match(/(\d{3,4}\/\d{2,3})/);
    if (bpMatch) {
      vitalSigns.bloodPressure = bpMatch[1];
    }
    const hrMatch = transcript.match(/heart rate.*?(\d{2,3})/);
    if (hrMatch) {
      vitalSigns.heartRate = hrMatch[1] + " bpm";
    }

    // Determine urgency
    let urgency: "low" | "medium" | "high" = "low";
    if (
      lowerTranscript.includes("emergency") ||
      lowerTranscript.includes("severe")
    ) {
      urgency = "high";
    } else if (
      lowerTranscript.includes("follow up") ||
      lowerTranscript.includes("recheck")
    ) {
      urgency = "medium";
    }

    return {
      diagnoses,
      prescriptions,
      actionItems,
      followUp: this.generateFollowUp(transcript),
      keyPoints: this.extractKeyPoints(transcript),
      vitalSigns: Object.keys(vitalSigns).length > 0 ? vitalSigns : undefined,
      urgency,
      confidence: 0.85,
    };
  }

  /**
   * Generate follow-up instructions
   */
  private generateFollowUp(transcript: string): string {
    const lowerTranscript = transcript.toLowerCase();

    if (
      lowerTranscript.includes("emergency") ||
      lowerTranscript.includes("immediately")
    ) {
      return "Return immediately if symptoms worsen or new symptoms develop.";
    } else if (
      lowerTranscript.includes("2 weeks") ||
      lowerTranscript.includes("two weeks")
    ) {
      return "Follow up in 2 weeks for re-evaluation.";
    } else if (lowerTranscript.includes("3 months")) {
      return "Follow up in 3 months for routine care and lab recheck.";
    } else if (lowerTranscript.includes("6 months")) {
      return "Follow up in 6 months for annual physical.";
    }

    return "Follow up as needed.";
  }

  /**
   * Extract key points from transcript
   */
  private extractKeyPoints(transcript: string): string[] {
    const keyPoints: string[] = [];
    const lowerTranscript = transcript.toLowerCase();

    if (lowerTranscript.includes("chest pain")) {
      keyPoints.push("Patient reports chest pain");
    }
    if (lowerTranscript.includes("blood pressure")) {
      keyPoints.push("Blood pressure monitoring required");
    }
    if (lowerTranscript.includes("medication")) {
      keyPoints.push("Medication management discussed");
    }
    if (lowerTranscript.includes("lifestyle")) {
      keyPoints.push("Lifestyle modifications recommended");
    }

    return keyPoints;
  }

  /**
   * Format consultation as text for export
   */
  private formatConsultationAsText(consultation: ConsultationData): string {
    let text = `CONSULTATION SUMMARY\n`;
    text += `Date: ${consultation.date}\n`;
    text += `Doctor: ${consultation.doctor}\n`;
    text += `Specialty: ${consultation.specialty}\n`;
    text += `Duration: ${consultation.duration} minutes\n\n`;

    text += `DIAGNOSES:\n`;
    consultation.summary.diagnoses.forEach((diagnosis, index) => {
      text += `${index + 1}. ${diagnosis}\n`;
    });

    text += `\nPRESCRIPTIONS:\n`;
    consultation.summary.prescriptions.forEach((prescription, index) => {
      text += `${index + 1}. ${prescription}\n`;
    });

    text += `\nACTION ITEMS:\n`;
    consultation.summary.actionItems.forEach((item, index) => {
      text += `${index + 1}. ${item}\n`;
    });

    text += `\nFOLLOW-UP:\n${consultation.summary.followUp}\n\n`;

    text += `FULL TRANSCRIPT:\n${consultation.transcript}`;

    return text;
  }
}

// Export singleton instance
export const consultationService = new ConsultationService();
