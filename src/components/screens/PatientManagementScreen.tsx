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
  ClipboardList,
  Search,
  Filter,
  Download,
  Upload,
  Plus,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  MoreHorizontal,
  RefreshCw,
} from "lucide-react";
import { DataService } from "../../services/dataService";

export default function PatientManagementScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      setLoading(true);
      const patientsData = await DataService.getAllPatients();
      setPatients(patientsData);
    } catch (error) {
      console.error("Error loading patients:", error);
    } finally {
      setLoading(false);
    }
  };

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

  const getAdherenceColor = (adherence: string) => {
    switch (adherence) {
      case "excellent":
        return "bg-green-100 text-green-800";
      case "good":
        return "bg-blue-100 text-blue-800";
      case "fair":
        return "bg-blue-100 text-blue-800";
      case "poor":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getAdherenceIcon = (adherence: string) => {
    switch (adherence) {
      case "excellent":
        return <CheckCircle className="w-4 h-4" />;
      case "good":
        return <CheckCircle className="w-4 h-4" />;
      case "fair":
        return <Clock className="w-4 h-4" />;
      case "poor":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "at-risk":
        return "bg-red-100 text-red-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.personalInfo.firstName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      patient.personalInfo.lastName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      patient.personalInfo.email
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (patient.medicalInfo.chronicConditions[0] &&
        patient.medicalInfo.chronicConditions[0]
          .toLowerCase()
          .includes(searchQuery.toLowerCase()));

    // For now, we'll use a simple filter based on chronic conditions
    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "at-risk" &&
        patient.medicalInfo.chronicConditions.length > 1) ||
      (selectedFilter === "poor-adherence" &&
        patient.medicalInfo.medications.length === 0);

    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading patients...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl border border-slate-600">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 flex items-center gap-3">
            <div className="w-10 h-10 gradient-medical-primary rounded-lg flex items-center justify-center">
              <ClipboardList className="w-6 h-6 text-white" />
            </div>
            Patient Management
          </h1>
          <p className="text-slate-300 mt-2">
            Manage your patient database and track adherence
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 border-2 backdrop-blur-sm hover:scale-105" style={{
            background: 'rgba(34, 197, 94, 0.1)',
            borderColor: '#22c55e',
            color: '#22c55e'
          }}>
            <Download className="w-5 h-5" />
            <span className="font-semibold">Export</span>
          </button>
          <button className="flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 border-2 backdrop-blur-sm hover:scale-105" style={{
            background: 'rgba(34, 197, 94, 0.1)',
            borderColor: '#22c55e',
            color: '#22c55e'
          }}>
            <Upload className="w-5 h-5" />
            <span className="font-semibold">Import</span>
          </button>
          <Button className="gradient-medical-secondary hover:shadow-medical-glow">
            <Plus className="w-4 h-4 mr-2" />
            Add Patient
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="professional-card p-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6" style={{ color: 'var(--text-muted)' }} />
              <input
                placeholder="Search patients by name, condition, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-professional pl-14 pr-4 py-4 text-lg rounded-2xl w-full"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              className={selectedFilter === "all" ? "btn-primary px-6 py-3" : "btn-outline px-6 py-3"}
              onClick={() => setSelectedFilter("all")}
            >
              All Patients
            </button>
            <button
              className={selectedFilter === "at-risk" ? "btn-primary px-6 py-3" : "btn-outline px-6 py-3"}
              onClick={() => setSelectedFilter("at-risk")}
            >
              At Risk
            </button>
            <button
              className={selectedFilter === "poor-adherence" ? "btn-primary px-6 py-3" : "btn-outline px-6 py-3"}
              onClick={() => setSelectedFilter("poor-adherence")}
            >
              Poor Adherence
            </button>
          </div>
        </div>
      </div>

      {/* Patient List */}
      <div className="professional-card">
        <div className="p-8 border-b" style={{ borderColor: 'var(--border-primary)' }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
              <ClipboardList className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gradient">Patient Adherence List</h3>
              <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                {filteredPatients.length} patients found
              </p>
            </div>
          </div>
        </div>
        <div className="p-8">
          <div className="overflow-x-auto">
            <table className="table-professional">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-primary)' }}>
                  <th className="text-left py-4 px-6 font-semibold text-lg" style={{ color: 'var(--text-secondary)' }}>
                    Patient
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-lg" style={{ color: 'var(--text-secondary)' }}>
                    Condition
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-lg" style={{ color: 'var(--text-secondary)' }}>
                    Adherence
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-lg" style={{ color: 'var(--text-secondary)' }}>
                    Last Contact
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-lg" style={{ color: 'var(--text-secondary)' }}>
                    Next Appointment
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-lg" style={{ color: 'var(--text-secondary)' }}>
                    Status
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-lg" style={{ color: 'var(--text-secondary)' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="transition-colors hover:bg-slate-800/30"
                    style={{ borderBottom: '1px solid var(--border-primary)' }}
                  >
                    <td className="py-6 px-6">
                      <div>
                        <p className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>
                          {patient.personalInfo.firstName}{" "}
                          {patient.personalInfo.lastName}
                        </p>
                        <p className="text-base mt-1" style={{ color: 'var(--text-secondary)' }}>
                          {getAge(patient.personalInfo.dateOfBirth)} years old
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Phone className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                          <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                            {patient.personalInfo.phone}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Mail className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                          <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                            {patient.personalInfo.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-6">
                      <span className="badge-info">
                        {patient.medicalInfo.chronicConditions[0] ||
                          "No conditions"}
                      </span>
                    </td>
                    <td className="py-6 px-6">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                        <span className="badge-success">
                          Good
                        </span>
                      </div>
                    </td>
                    <td className="py-6 px-6">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
                        <span className="text-base" style={{ color: 'var(--text-primary)' }}>
                          {new Date(patient.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    <td className="py-6 px-6">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
                        <span className="text-base" style={{ color: 'var(--text-primary)' }}>
                          {patient.appointments.length > 0
                            ? new Date(
                                patient.appointments[0].date
                              ).toLocaleDateString()
                            : "No appointments"}
                        </span>
                      </div>
                    </td>
                    <td className="py-6 px-6">
                      <span className="badge-success">
                        Active
                      </span>
                    </td>
                    <td className="py-6 px-6">
                      <div className="flex items-center gap-2">
                        <button className="btn-outline p-2">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button className="btn-outline p-2">
                          <Edit className="w-5 h-5" />
                        </button>
                        <button className="btn-outline p-2">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid gap-6 md:grid-cols-4">
        <div className="professional-card p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium" style={{ color: 'var(--text-secondary)' }}>
                Total Patients
              </p>
              <p className="text-3xl font-bold text-gradient mt-2">
                {patients.length}
              </p>
            </div>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center glow-effect" style={{ background: 'var(--gradient-primary)' }}>
              <ClipboardList className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <div className="professional-card p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium" style={{ color: 'var(--text-secondary)' }}>
                With Medications
              </p>
              <p className="text-3xl font-bold text-gradient mt-2">
                {
                  patients.filter((p) => p.medicalInfo.medications.length > 0)
                    .length
                }
              </p>
            </div>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center glow-effect" style={{ background: 'var(--gradient-secondary)' }}>
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <div className="professional-card p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium" style={{ color: 'var(--text-secondary)' }}>
                Multiple Conditions
              </p>
              <p className="text-3xl font-bold text-gradient mt-2">
                {
                  patients.filter(
                    (p) => p.medicalInfo.chronicConditions.length > 1
                  ).length
                }
              </p>
            </div>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', boxShadow: '0 8px 32px rgba(239, 68, 68, 0.3)' }}>
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <div className="professional-card p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium" style={{ color: 'var(--text-secondary)' }}>
                With Allergies
              </p>
              <p className="text-3xl font-bold text-gradient mt-2">
                {
                  patients.filter((p) => p.medicalInfo.allergies.length > 0)
                    .length
                }
              </p>
            </div>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center glow-effect" style={{ background: 'var(--gradient-accent)' }}>
              <Clock className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
