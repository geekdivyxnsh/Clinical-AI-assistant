// EHR Service - Business logic for Electronic Health Records
import {
  Patient,
  Appointment,
  MedicalRecord,
  Medication,
} from "../types/patient";

// Mock data for demonstration
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
      ],
      emergencyContact: {
        name: "Jane Doe",
        relationship: "Spouse",
        phone: "(555) 123-4568",
      },
    },
    appointments: [],
    medicalHistory: [],
    insurance: {
      provider: "Blue Cross Blue Shield",
      policyNumber: "BC123456789",
      groupNumber: "GRP001",
    },
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  },
];

export class EHRService {
  // Patient Management
  static async getAllPatients(): Promise<Patient[]> {
    // Simulate API call
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
      }, 400);
    });
  }

  // Appointment Management
  static async getAppointmentsByPatient(
    patientId: string
  ): Promise<Appointment[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const patient = mockPatients.find((p) => p.id === patientId);
        resolve(patient?.appointments || []);
      }, 300);
    });
  }

  static async createAppointment(
    appointment: Omit<Appointment, "id">
  ): Promise<Appointment> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newAppointment: Appointment = {
          ...appointment,
          id: Date.now().toString(),
        };

        const patient = mockPatients.find(
          (p) => p.id === appointment.patientId
        );
        if (patient) {
          patient.appointments.push(newAppointment);
        }

        resolve(newAppointment);
      }, 400);
    });
  }

  // Medical Records
  static async getMedicalHistory(patientId: string): Promise<MedicalRecord[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const patient = mockPatients.find((p) => p.id === patientId);
        resolve(patient?.medicalHistory || []);
      }, 300);
    });
  }

  static async addMedicalRecord(
    record: Omit<MedicalRecord, "id">
  ): Promise<MedicalRecord> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newRecord: MedicalRecord = {
          ...record,
          id: Date.now().toString(),
        };

        const patient = mockPatients.find((p) => p.id === record.patientId);
        if (patient) {
          patient.medicalHistory.push(newRecord);
        }

        resolve(newRecord);
      }, 400);
    });
  }

  // Medication Management
  static async getMedications(patientId: string): Promise<Medication[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const patient = mockPatients.find((p) => p.id === patientId);
        resolve(patient?.medicalInfo.medications || []);
      }, 300);
    });
  }

  static async addMedication(
    patientId: string,
    medication: Omit<Medication, "id">
  ): Promise<Medication> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newMedication: Medication = {
          ...medication,
          id: Date.now().toString(),
        };

        const patient = mockPatients.find((p) => p.id === patientId);
        if (patient) {
          patient.medicalInfo.medications.push(newMedication);
        }

        resolve(newMedication);
      }, 400);
    });
  }

  // Search and Filter
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

  // Business Rules
  static validatePatientData(patient: Partial<Patient>): string[] {
    const errors: string[] = [];

    if (!patient.personalInfo?.firstName) {
      errors.push("First name is required");
    }

    if (!patient.personalInfo?.lastName) {
      errors.push("Last name is required");
    }

    if (!patient.personalInfo?.dateOfBirth) {
      errors.push("Date of birth is required");
    }

    if (!patient.personalInfo?.email) {
      errors.push("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(patient.personalInfo.email)) {
      errors.push("Valid email is required");
    }

    return errors;
  }

  static canBookAppointment(
    patientId: string,
    appointmentDate: string
  ): { canBook: boolean; reason?: string } {
    // Business rule: Patient can't book appointment if they have outstanding bill
    // This would integrate with billing system
    const hasOutstandingBill = false; // Mock check

    if (hasOutstandingBill) {
      return {
        canBook: false,
        reason: "Outstanding bill must be paid before booking new appointments",
      };
    }

    // Check if appointment date is in the future
    const appointmentDateTime = new Date(appointmentDate);
    const now = new Date();

    if (appointmentDateTime <= now) {
      return {
        canBook: false,
        reason: "Appointment must be scheduled for a future date",
      };
    }

    return { canBook: true };
  }
}
