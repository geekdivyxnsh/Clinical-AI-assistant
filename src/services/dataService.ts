// Comprehensive Data Service for HealthAI Clinical Platform
import {
  Patient,
  Appointment,
  MedicalRecord,
  Medication,
} from "../types/patient";

// Mock data with realistic medical information
const mockPatients: Patient[] = [
  {
    id: "1",
    personalInfo: {
      firstName: "John",
      lastName: "Doe",
      dateOfBirth: "1985-03-15",
      gender: "male",
      phone: "(555) 123-4567",
      email: "john.doe@email.com",
      address: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "10001",
      },
    },
    medicalInfo: {
      bloodType: "O+",
      allergies: ["Penicillin", "Shellfish"],
      chronicConditions: ["Hypertension", "Type 2 Diabetes"],
      medications: [
        {
          id: "1",
          name: "Metformin",
          dosage: "500mg",
          frequency: "Twice daily",
          startDate: "2023-01-15",
          prescribedBy: "Dr. Smith",
        },
        {
          id: "2",
          name: "Lisinopril",
          dosage: "10mg",
          frequency: "Daily",
          startDate: "2023-02-01",
          prescribedBy: "Dr. Smith",
        },
      ],
      emergencyContact: {
        name: "Jane Doe",
        relationship: "Spouse",
        phone: "(555) 123-4568",
      },
    },
    appointments: [
      {
        id: "1",
        patientId: "1",
        doctorId: "dr-smith",
        date: "2024-01-20",
        time: "10:00",
        type: "follow-up",
        status: "scheduled",
        notes: "Follow-up for diabetes management",
      },
    ],
    medicalHistory: [
      {
        id: "1",
        patientId: "1",
        date: "2024-01-15",
        type: "visit",
        title: "Annual Physical",
        description: "Comprehensive annual physical examination",
        doctor: "Dr. Smith",
        vitalSigns: {
          bloodPressure: "140/90",
          heartRate: 78,
          temperature: 98.6,
          weight: 180,
          height: 72,
        },
      },
    ],
    insurance: {
      provider: "Blue Cross Blue Shield",
      policyNumber: "BC123456789",
      groupNumber: "GRP001",
    },
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "2",
    personalInfo: {
      firstName: "Jane",
      lastName: "Smith",
      dateOfBirth: "1990-07-22",
      gender: "female",
      phone: "(555) 234-5678",
      email: "jane.smith@email.com",
      address: {
        street: "456 Oak Ave",
        city: "Boston",
        state: "MA",
        zipCode: "02101",
      },
    },
    medicalInfo: {
      bloodType: "A+",
      allergies: ["Latex"],
      chronicConditions: ["Asthma"],
      medications: [
        {
          id: "3",
          name: "Albuterol",
          dosage: "90mcg",
          frequency: "As needed",
          startDate: "2023-03-10",
          prescribedBy: "Dr. Johnson",
        },
      ],
      emergencyContact: {
        name: "Robert Smith",
        relationship: "Father",
        phone: "(555) 234-5679",
      },
    },
    appointments: [],
    medicalHistory: [],
    insurance: {
      provider: "Aetna",
      policyNumber: "AET987654321",
      groupNumber: "GRP002",
    },
    createdAt: "2023-03-01T00:00:00Z",
    updatedAt: "2023-03-10T00:00:00Z",
  },
];

// Analytics and insights data
export const analyticsData = {
  practiceMetrics: {
    totalPatients: 1247,
    activeAppointments: 156,
    medicationAdherence: 87,
    averageWaitTime: 12,
    monthlyGrowth: 12,
    revenue: {
      current: 125000,
      growth: 8.5,
    },
  },
  healthTrends: [
    { condition: "Hypertension", patients: 456, trend: "up", percentage: 16.0 },
    { condition: "Diabetes", patients: 234, trend: "stable", percentage: 8.2 },
    {
      condition: "Heart Disease",
      patients: 123,
      trend: "down",
      percentage: 4.3,
    },
    { condition: "Obesity", patients: 189, trend: "up", percentage: 6.6 },
    { condition: "Depression", patients: 98, trend: "stable", percentage: 3.4 },
  ],
  alerts: [
    {
      type: "warning",
      message: "15 patients overdue for annual checkups",
      count: 15,
      priority: "high",
    },
    {
      type: "info",
      message: "Lab results pending for 8 patients",
      count: 8,
      priority: "medium",
    },
    {
      type: "success",
      message: "Medication adherence improved this month",
      count: 0,
      priority: "low",
    },
    {
      type: "warning",
      message: "3 patients with elevated blood pressure",
      count: 3,
      priority: "high",
    },
  ],
};

// Vitals data for dashboard
export const vitalsData = {
  current: {
    bloodPressure: "140/90",
    heartRate: 78,
    temperature: 98.6,
    oxygenSaturation: 98,
    weight: 180,
    lastUpdated: "2024-01-15 10:30 AM",
  },
  trends: [
    { date: "2024-01-10", bp: "135/85", hr: 75, temp: 98.4 },
    { date: "2024-01-12", bp: "138/88", hr: 76, temp: 98.5 },
    { date: "2024-01-15", bp: "140/90", hr: 78, temp: 98.6 },
  ],
};

// Medication data
export const medicationData = {
  current: [
    {
      id: "1",
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      adherence: "poor",
      lastTaken: "2024-01-14 08:00",
      nextDose: "2024-01-15 20:00",
    },
    {
      id: "2",
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Daily",
      adherence: "good",
      lastTaken: "2024-01-15 08:00",
      nextDose: "2024-01-16 08:00",
    },
  ],
  adherence: {
    overall: 87,
    byMedication: [
      { name: "Metformin", adherence: 95, patients: 45 },
      { name: "Lisinopril", adherence: 89, patients: 32 },
      { name: "Atorvastatin", adherence: 78, patients: 28 },
    ],
  },
};

// Appointment data
export const appointmentData = {
  today: 12,
  thisWeek: 45,
  nextAvailable: "2024-01-20 10:00 AM",
  upcoming: [
    {
      id: "1",
      patient: "Alice Brown",
      time: "2:00 PM",
      type: "Follow-up",
      doctor: "Dr. Smith",
      status: "confirmed",
    },
    {
      id: "2",
      patient: "Michael Davis",
      time: "3:30 PM",
      type: "New Patient",
      doctor: "Dr. Johnson",
      status: "confirmed",
    },
  ],
};

// Data Service Class
export class DataService {
  // Patient Management
  static async getAllPatients(): Promise<Patient[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockPatients), 500);
    });
  }

  static async getPatientById(id: string): Promise<Patient | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const patient = mockPatients.find((p) => p.id === id);
        resolve(patient || null);
      }, 300);
    });
  }

  static async searchPatients(query: string): Promise<Patient[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = mockPatients.filter(
          (patient) =>
            patient.personalInfo.firstName
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            patient.personalInfo.lastName
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            patient.personalInfo.email
              .toLowerCase()
              .includes(query.toLowerCase())
        );
        resolve(filtered);
      }, 300);
    });
  }

  static async createPatient(
    patientData: Omit<Patient, "id" | "createdAt" | "updatedAt">
  ): Promise<Patient> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPatient: Patient = {
          ...patientData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        mockPatients.push(newPatient);
        resolve(newPatient);
      }, 500);
    });
  }

  static async updatePatient(
    id: string,
    updates: Partial<Patient>
  ): Promise<Patient | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const patientIndex = mockPatients.findIndex((p) => p.id === id);
        if (patientIndex === -1) {
          resolve(null);
          return;
        }

        mockPatients[patientIndex] = {
          ...mockPatients[patientIndex],
          ...updates,
          updatedAt: new Date().toISOString(),
        };
        resolve(mockPatients[patientIndex]);
      }, 500);
    });
  }

  static async deletePatient(id: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const initialLength = mockPatients.length;
        const filtered = mockPatients.filter((p) => p.id !== id);
        mockPatients.length = 0;
        mockPatients.push(...filtered);
        resolve(mockPatients.length < initialLength);
      }, 300);
    });
  }

  // Analytics
  static async getPracticeMetrics() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(analyticsData.practiceMetrics), 300);
    });
  }

  static async getHealthTrends() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(analyticsData.healthTrends), 300);
    });
  }

  static async getAlerts() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(analyticsData.alerts), 300);
    });
  }

  // Vitals
  static async getVitalsData() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(vitalsData), 300);
    });
  }

  // Medications
  static async getMedicationData() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(medicationData), 300);
    });
  }

  // Appointments
  static async getAppointmentData() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(appointmentData), 300);
    });
  }

  // AI Chat Data
  static async getAIChatData(query: string) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const lowerQuery = query.toLowerCase();

        if (lowerQuery.includes("vitals")) {
          resolve({
            type: "vitals",
            data: vitalsData,
          });
        } else if (lowerQuery.includes("medication")) {
          resolve({
            type: "medication",
            data: medicationData,
          });
        } else if (lowerQuery.includes("appointment")) {
          resolve({
            type: "appointment",
            data: appointmentData,
          });
        } else if (lowerQuery.includes("analytics")) {
          resolve({
            type: "analytics",
            data: analyticsData,
          });
        } else {
          resolve({
            type: "general",
            data: {
              message:
                "I can help you with patient data, medications, appointments, and analytics.",
            },
          });
        }
      }, 500);
    });
  }
}

export default DataService;
