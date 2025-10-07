// Patient data types for EHR system
export interface Patient {
  id: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: "male" | "female" | "other";
    phone: string;
    email: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
  };
  medicalInfo: {
    bloodType: string;
    allergies: string[];
    chronicConditions: string[];
    medications: Medication[];
    emergencyContact: {
      name: string;
      relationship: string;
      phone: string;
    };
  };
  appointments: Appointment[];
  medicalHistory: MedicalRecord[];
  insurance: {
    provider: string;
    policyNumber: string;
    groupNumber: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  prescribedBy: string;
  notes?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  type: "consultation" | "follow-up" | "emergency" | "routine";
  status: "scheduled" | "completed" | "cancelled" | "no-show";
  notes?: string;
  diagnosis?: string;
  treatment?: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  date: string;
  type: "visit" | "lab" | "imaging" | "procedure";
  title: string;
  description: string;
  doctor: string;
  attachments?: string[];
  vitalSigns?: {
    bloodPressure: string;
    heartRate: number;
    temperature: number;
    weight: number;
    height: number;
  };
}
