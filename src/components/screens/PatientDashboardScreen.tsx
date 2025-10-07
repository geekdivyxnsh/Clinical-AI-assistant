import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  User,
  Activity,
  Heart,
  Pill,
  Calendar,
  TrendingUp,
  AlertTriangle,
  Clock,
  Search,
  Plus,
  Edit,
  Eye,
} from "lucide-react";
import { DataService } from "../../services/dataService";
import MedicalBanner from "../ui/medical-banner";

export default function PatientDashboardScreen() {
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [patients, setPatients] = useState<any[]>([]);
  const [vitals, setVitals] = useState<any>(null);
  const [medications, setMedications] = useState<any>(null);
  const [appointments, setAppointments] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [patientsData, vitalsData, medicationData, appointmentData] =
        await Promise.all([
          DataService.getAllPatients(),
          DataService.getVitalsData(),
          DataService.getMedicationData(),
          DataService.getAppointmentData(),
        ]);

      setPatients(patientsData);
      setVitals(vitalsData);
      setMedications(medicationData);
      setAppointments(appointmentData);

      // Set first patient as default
      if (patientsData.length > 0) {
        setSelectedPatient(patientsData[0]);
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.personalInfo.firstName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      patient.personalInfo.lastName
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const getAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-green-100 text-green-800";
      case "warning":
        return "bg-slate-800 text-slate-100";
      case "danger":
        return "bg-red-100 text-red-800";
      default:
        return "bg-slate-900 text-slate-100";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="w-4 h-4" />;
      case "info":
        return <Clock className="w-4 h-4" />;
      case "success":
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading patient dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Medical Banner */}
      <MedicalBanner 
        userName="Dr. Kumar"
        totalPatients={patients.length}
        activeAlerts={3}
        lastLogin="Today at 9:15 AM"
      />
      
      {/* Patient Selection */}
      <div className="professional-card">
        <div className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center glow-effect" style={{ background: 'var(--gradient-primary)' }}>
              <User className="w-8 h-8 text-white" style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.5))' }} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gradient">Patient Selection</h2>
              <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>Choose patient to view comprehensive details</p>
            </div>
          </div>
          <div className="flex gap-6 items-center mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6" style={{ color: 'var(--text-muted)' }} />
              <input
                placeholder="Search patients by name, condition, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-professional pl-14 pr-4 py-4 text-lg rounded-2xl w-full"
              />
            </div>
            <button className="btn-primary flex items-center gap-3 px-8 py-4 text-lg">
              <Plus className="w-6 h-6" />
              Add Patient
            </button>
          </div>

          {filteredPatients.length > 0 && (
            <div className="grid gap-3 mt-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  className={`professional-card cursor-pointer p-6 transition-all duration-300 ${
                    selectedPatient?.id === patient.id
                      ? "glow-effect"
                      : ""
                  }`}
                  onClick={() => setSelectedPatient(patient)}
                  style={{
                    background: selectedPatient?.id === patient.id 
                      ? 'var(--gradient-card)' 
                      : 'var(--bg-card)',
                    border: selectedPatient?.id === patient.id 
                      ? '2px solid var(--medical-blue)' 
                      : '1px solid var(--border-primary)'
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
                        <User className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full border-2 border-white animate-pulse"></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                        {patient.personalInfo.firstName}{" "}
                        {patient.personalInfo.lastName}
                      </h3>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {getAge(patient.personalInfo.dateOfBirth)} years •{" "}
                        {patient.medicalInfo.chronicConditions[0] ||
                          "No conditions"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button className="btn-outline p-2">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="btn-outline p-2">
                        <Edit className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedPatient && (
        <>
          {/* Patient Header */}
          <div className="professional-card p-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div className="relative">
                  <div className="w-24 h-24 rounded-3xl flex items-center justify-center glow-effect" style={{ background: 'var(--gradient-primary)' }}>
                    <User className="w-12 h-12 text-white" style={{ filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.6))' }} />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-400 rounded-full border-4 border-white animate-pulse flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gradient">
                    {selectedPatient.personalInfo.firstName}{" "}
                    {selectedPatient.personalInfo.lastName}
                  </h1>
                  <div className="flex items-center gap-6 mt-3" style={{ color: 'var(--text-secondary)' }}>
                    <span className="text-lg">
                      {getAge(selectedPatient.personalInfo.dateOfBirth)} years old
                    </span>
                    <span>•</span>
                    <span className="text-lg">
                      Primary:{" "}
                      {selectedPatient.medicalInfo.chronicConditions[0] ||
                        "No conditions"}
                    </span>
                    <span>•</span>
                    <span className="text-lg">
                      Last visit:{" "}
                      {new Date(selectedPatient.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="btn-outline flex items-center gap-3 px-6 py-3">
                  <Calendar className="w-5 h-5" />
                  Schedule Visit
                </button>
                <button className="btn-primary flex items-center gap-3 px-6 py-3">
                  <Activity className="w-5 h-5" />
                  View Full Record
                </button>
              </div>
            </div>
          </div>

          {/* Alerts Section */}
          {selectedPatient.medicalInfo.allergies.length > 0 && (
            <div className="professional-card p-8 border-2" style={{ borderColor: '#ef4444' }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' }}>
                  <AlertTriangle className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-red-400">Clinical Alerts</h3>
                  <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>Critical patient information</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-xl" style={{ background: 'var(--bg-elevated)', border: '1px solid #ef4444' }}>
                  <div className="mt-1">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                      Patient has known allergies:{" "}
                      {selectedPatient.medicalInfo.allergies.join(", ")}
                    </p>
                    <p className="text-base mt-1" style={{ color: 'var(--text-secondary)' }}>
                      Review before prescribing medications
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Dashboard Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Vitals Widget */}
            <div className="professional-card">
              <div className="p-8 border-b" style={{ borderColor: 'var(--border-primary)' }}>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center glow-effect" style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' }}>
                    <Heart className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gradient">Vital Signs</h3>
                    <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>Real-time monitoring</p>
                  </div>
                </div>
                <p className="text-base mt-3" style={{ color: 'var(--text-muted)' }}>
                  Last updated: {vitals?.lastUpdated || 'Just now'}
                </p>
              </div>
              <div className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'var(--bg-elevated)' }}>
                    <div>
                      <p className="text-lg font-medium" style={{ color: 'var(--text-secondary)' }}>
                        Blood Pressure
                      </p>
                      <p className="text-3xl font-bold text-gradient mt-1">
                        {vitals?.current.bloodPressure || '140/90'}
                      </p>
                    </div>
                    <span className="badge-warning">Elevated</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'var(--bg-elevated)' }}>
                    <div>
                      <p className="text-lg font-medium" style={{ color: 'var(--text-secondary)' }}>
                        Heart Rate
                      </p>
                      <p className="text-3xl font-bold text-gradient mt-1">
                        {vitals?.current.heartRate || '78'} BPM
                      </p>
                    </div>
                    <span className="badge-success">Normal</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'var(--bg-elevated)' }}>
                    <div>
                      <p className="text-lg font-medium" style={{ color: 'var(--text-secondary)' }}>
                        Temperature
                      </p>
                      <p className="text-3xl font-bold text-gradient mt-1">
                        {vitals?.current.temperature || '98.6'}°F
                      </p>
                    </div>
                    <span className="badge-success">Normal</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'var(--bg-elevated)' }}>
                    <div>
                      <p className="text-lg font-medium" style={{ color: 'var(--text-secondary)' }}>
                        Oxygen Saturation
                      </p>
                      <p className="text-3xl font-bold text-gradient mt-1">
                        {vitals?.current.oxygenSaturation || '98'}%
                      </p>
                    </div>
                    <span className="badge-success">Normal</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Medications Widget */}
            <div className="professional-card">
              <div className="p-8 border-b" style={{ borderColor: 'var(--border-primary)' }}>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center glow-effect" style={{ background: 'var(--gradient-secondary)' }}>
                    <Pill className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gradient">Current Medications</h3>
                    <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>Active prescriptions</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="space-y-4">
                  {(selectedPatient.medicalInfo.medications.length > 0 ? selectedPatient.medicalInfo.medications : [
                    { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', prescribedBy: 'Dr. Smith' },
                    { name: 'Lisinopril', dosage: '10mg', frequency: 'Daily', prescribedBy: 'Dr. Smith' }
                  ]).map(
                    (med: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'var(--bg-elevated)' }}
                      >
                        <div>
                          <p className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                            {med.name}
                          </p>
                          <p className="text-base mt-1" style={{ color: 'var(--text-secondary)' }}>
                            {med.dosage} • {med.frequency}
                          </p>
                          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                            Prescribed by: {med.prescribedBy}
                          </p>
                        </div>
                        <span className="badge-success">
                          Active
                        </span>
                      </div>
                    )
                  )}
                </div>
                <button className="btn-outline w-full mt-6 flex items-center justify-center gap-3 py-3">
                  <Pill className="w-5 h-5" />
                  Manage Medications
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="professional-card">
              <div className="p-8 border-b" style={{ borderColor: 'var(--border-primary)' }}>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center glow-effect" style={{ background: 'var(--gradient-accent)' }}>
                    <Activity className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gradient">Quick Actions</h3>
                    <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>Common clinical tasks</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="space-y-4">
                  <button className="btn-outline w-full justify-start flex items-center gap-3 py-3 px-4">
                    <Calendar className="w-5 h-5" />
                    Schedule Follow-up
                  </button>
                  <button className="btn-outline w-full justify-start flex items-center gap-3 py-3 px-4">
                    <Heart className="w-5 h-5" />
                    Record Vitals
                  </button>
                  <button className="btn-outline w-full justify-start flex items-center gap-3 py-3 px-4">
                    <Pill className="w-5 h-5" />
                    Prescribe Medication
                  </button>
                  <button className="btn-outline w-full justify-start flex items-center gap-3 py-3 px-4">
                    <Activity className="w-5 h-5" />
                    Order Lab Work
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="professional-card">
            <div className="p-8 border-b" style={{ borderColor: 'var(--border-primary)' }}>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center glow-effect" style={{ background: 'var(--gradient-accent)' }}>
                  <Activity className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gradient">Recent Activity</h3>
                  <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>Latest patient interactions and updates</p>
                </div>
              </div>
            </div>
            <div className="p-8">
              <div className="space-y-4">
                {(selectedPatient.medicalHistory.length > 0 ? selectedPatient.medicalHistory : [
                  { title: 'Annual Physical', description: 'follow-up appointment', date: new Date().toISOString() }
                ]).map(
                  (record: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 hover:scale-105" style={{ background: 'var(--bg-elevated)' }}
                    >
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' }}>
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                          {record.title}
                        </p>
                        <p className="text-base mt-1" style={{ color: 'var(--text-secondary)' }}>
                          {record.description}
                        </p>
                      </div>
                      <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                        {new Date(record.date).toLocaleDateString()}
                      </span>
                    </div>
                  )
                )}
                {(selectedPatient.appointments.length > 0 ? selectedPatient.appointments : []).map(
                  (appointment: any, index: number) => (
                    <div
                      key={`appt-${index}`}
                      className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 hover:scale-105" style={{ background: 'var(--bg-elevated)' }}
                    >
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'var(--gradient-secondary)' }}>
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                          {appointment.type} appointment
                        </p>
                        <p className="text-base mt-1" style={{ color: 'var(--text-secondary)' }}>
                          {appointment.notes || "No additional notes"}
                        </p>
                      </div>
                      <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                        {new Date(appointment.date).toLocaleDateString()}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
