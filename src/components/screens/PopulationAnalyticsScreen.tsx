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
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Activity,
  Heart,
  Pill,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  RefreshCw,
} from "lucide-react";
import { DataService } from "../../services/dataService";

export default function PopulationAnalyticsScreen() {
  const [practiceMetrics, setPracticeMetrics] = useState<any>(null);
  const [healthTrends, setHealthTrends] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalyticsData();
  }, []);

  const loadAnalyticsData = async () => {
    try {
      setLoading(true);
      const [metrics, trends, alertsData] = await Promise.all([
        DataService.getPracticeMetrics(),
        DataService.getHealthTrends(),
        DataService.getAlerts(),
      ]);

      setPracticeMetrics(metrics);
      setHealthTrends(trends);
      setAlerts(alertsData);
    } catch (error) {
      console.error("Error loading analytics data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "warning":
        return "border-blue-200 bg-blue-50";
      case "info":
        return "border-blue-200 bg-blue-50";
      case "success":
        return "border-green-200 bg-green-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-blue-600" />;
      case "info":
        return <Clock className="w-5 h-5 text-blue-600" />;
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <Activity className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="professional-card p-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center glow-effect" style={{ background: 'var(--gradient-primary)' }}>
              <BarChart3 className="w-8 h-8 text-white" style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.5))' }} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gradient">
                Population Analytics
              </h1>
              <p className="text-xl mt-2" style={{ color: 'var(--text-secondary)' }}>
                Advanced practice insights and population health trends
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="btn-outline flex items-center gap-3 px-6 py-3">
              <BarChart3 className="w-5 h-5" />
              Export Report
            </button>
            <button className="btn-primary flex items-center gap-3 px-6 py-3">
              <TrendingUp className="w-5 h-5" />
              Generate Insights
            </button>
          </div>
        </div>
      </div>

      {/* Practice Metrics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="professional-card p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium" style={{ color: 'var(--text-secondary)' }}>
                Total Patients
              </p>
              <p className="text-4xl font-bold text-gradient mt-2">
                {practiceMetrics?.totalPatients.toLocaleString() || '1,247'}
              </p>
              <div className="flex items-center gap-2 mt-3">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <span className="text-lg font-semibold text-emerald-400">
                  +{practiceMetrics?.monthlyGrowth || '12'}%
                </span>
                <span className="text-base" style={{ color: 'var(--text-muted)' }}>
                  vs last month
                </span>
              </div>
            </div>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center glow-effect" style={{ background: 'var(--gradient-primary)' }}>
              <Users className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <div className="professional-card p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium" style={{ color: 'var(--text-secondary)' }}>
                Active Appointments
              </p>
              <p className="text-4xl font-bold text-gradient mt-2">
                {practiceMetrics?.activeAppointments || '156'}
              </p>
              <div className="flex items-center gap-2 mt-3">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <span className="text-lg font-semibold text-emerald-400">
                  +8%
                </span>
                <span className="text-base" style={{ color: 'var(--text-muted)' }}>
                  vs last month
                </span>
              </div>
            </div>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center glow-effect" style={{ background: 'var(--gradient-secondary)' }}>
              <Calendar className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <div className="professional-card p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium" style={{ color: 'var(--text-secondary)' }}>
                Medication Adherence
              </p>
              <p className="text-4xl font-bold text-gradient mt-2">
                {practiceMetrics?.medicationAdherence || '87'}%
              </p>
              <div className="flex items-center gap-2 mt-3">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <span className="text-lg font-semibold text-emerald-400">
                  +3%
                </span>
                <span className="text-base" style={{ color: 'var(--text-muted)' }}>
                  vs last month
                </span>
              </div>
            </div>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center glow-effect" style={{ background: 'var(--gradient-accent)' }}>
              <Pill className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <div className="professional-card p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium" style={{ color: 'var(--text-secondary)' }}>
                Average Wait Time
              </p>
              <p className="text-4xl font-bold text-gradient mt-2">
                {practiceMetrics?.averageWaitTime || '12'} min
              </p>
              <div className="flex items-center gap-2 mt-3">
                <TrendingDown className="w-5 h-5 text-red-400" />
                <span className="text-lg font-semibold text-red-400">-15%</span>
                <span className="text-base" style={{ color: 'var(--text-muted)' }}>
                  vs last month
                </span>
              </div>
            </div>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #64748b 0%, #334155 100%)', boxShadow: '0 8px 32px rgba(100, 116, 139, 0.3)' }}>
              <Clock className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Health Trends and Alerts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Health Conditions Trends */}
        <div className="professional-card p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gradient">Health Conditions Overview</h3>
              <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>Most common conditions in your patient population</p>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { condition: 'Hypertension', patients: 456, percentage: 16, trend: 'up' },
              { condition: 'Diabetes', patients: 234, percentage: 8.2, trend: 'stable' },
              { condition: 'Heart Disease', patients: 123, percentage: 4.3, trend: 'down' },
              { condition: 'Obesity', patients: 189, percentage: 6.6, trend: 'up' },
              { condition: 'Depression', patients: 98, percentage: 3.4, trend: 'stable' }
            ].map((trend, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl" 
                style={{ background: 'var(--bg-elevated)' }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--gradient-secondary)' }}>
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {trend.condition}
                    </p>
                    <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
                      {trend.patients} patients ({trend.percentage}%)
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getTrendIcon(trend.trend)}
                  <span className="badge-info">
                    {trend.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Practice Alerts */}
        <div className="professional-card p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'var(--gradient-accent)' }}>
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gradient">Practice Alerts</h3>
              <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>Important notifications requiring attention</p>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { message: '15 patients overdue for annual checkups', count: 15, type: 'warning' },
              { message: 'Lab results pending for 8 patients', count: 8, type: 'info' },
              { message: 'Medication adherence improved this month', count: 0, type: 'success' },
              { message: '3 patients with elevated blood pressure', count: 3, type: 'warning' }
            ].map((alert, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border" 
                style={{ 
                  background: 'var(--bg-elevated)',
                  borderColor: alert.type === 'warning' ? 'var(--status-warning)' : 
                              alert.type === 'success' ? 'var(--status-success)' : 'var(--border-primary)'
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1">{getAlertIcon(alert.type)}</div>
                  <div className="flex-1">
                    <p className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>
                      {alert.message}
                    </p>
                    {alert.count > 0 && (
                      <span className="badge-warning mt-2">
                        {alert.count} patients
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Analytics Charts Placeholder */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="professional-card p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gradient">Patient Demographics</h3>
              <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>Age distribution and gender breakdown</p>
            </div>
          </div>
          <div className="h-64 rounded-2xl flex items-center justify-center" style={{ background: 'var(--bg-elevated)' }}>
            <div className="text-center">
              <BarChart3 className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
              <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
                Demographics chart will be implemented
              </p>
            </div>
          </div>
        </div>

        <div className="professional-card p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'var(--gradient-secondary)' }}>
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gradient">Appointment Trends</h3>
              <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>Monthly appointment volume and patterns</p>
            </div>
          </div>
          <div className="h-64 rounded-2xl flex items-center justify-center" style={{ background: 'var(--bg-elevated)' }}>
            <div className="text-center">
              <TrendingUp className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
              <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
                Trends chart will be implemented
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="professional-card p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'var(--gradient-accent)' }}>
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gradient">Analytics Actions</h3>
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>Quick access to common analytics tasks</p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <button className="btn-outline h-24 flex-col gap-3 text-lg">
            <Users className="w-8 h-8" />
            <span>Patient Segmentation</span>
          </button>
          <button className="btn-outline h-24 flex-col gap-3 text-lg">
            <Activity className="w-8 h-8" />
            <span>Outcome Analysis</span>
          </button>
          <button className="btn-outline h-24 flex-col gap-3 text-lg">
            <TrendingUp className="w-8 h-8" />
            <span>Predictive Analytics</span>
          </button>
        </div>
      </div>
    </div>
  );
}
