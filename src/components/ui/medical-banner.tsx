import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Stethoscope, 
  Activity, 
  Users, 
  TrendingUp,
  Clock,
  Shield
} from 'lucide-react';

interface MedicalBannerProps {
  userName?: string;
  totalPatients?: number;
  activeAlerts?: number;
  lastLogin?: string;
}

export default function MedicalBanner({ 
  userName = "Dr. Kumar",
  totalPatients = 247,
  activeAlerts = 3,
  lastLogin = "Today at 9:15 AM"
}: MedicalBannerProps) {
  return (
    <div className="professional-card mb-8 relative overflow-hidden">
      {/* Professional Medical Background */}
      <div className="absolute inset-0" style={{ background: 'var(--gradient-primary)' }}></div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <div className="relative p-10">
        <div className="flex items-center justify-between">
          {/* Welcome Section */}
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border border-white/30">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">
                Welcome back, {userName}
              </h1>
              <p className="text-blue-100 text-lg font-medium">
                Ready to provide exceptional patient care today
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Clock className="w-4 h-4 text-blue-200" />
                <span className="text-blue-200 text-sm">Last login: {lastLogin}</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Users className="w-5 h-5 text-white" />
                <span className="text-2xl font-bold text-white">{totalPatients}</span>
              </div>
              <p className="text-blue-100 text-sm font-medium">Total Patients</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Activity className="w-5 h-5 text-white" />
                <span className="text-2xl font-bold text-white">98.5%</span>
              </div>
              <p className="text-blue-100 text-sm font-medium">System Health</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <TrendingUp className="w-5 h-5 text-white" />
                <span className="text-2xl font-bold text-white">+12%</span>
              </div>
              <p className="text-blue-100 text-sm font-medium">This Month</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {activeAlerts > 0 && (
              <Badge className="bg-red-500/90 text-white px-3 py-1 shadow-lg">
                {activeAlerts} Alerts
              </Badge>
            )}
            <Button 
              variant="secondary" 
              className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30 shadow-lg"
            >
              <Shield className="w-4 h-4 mr-2" />
              Security Status
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
