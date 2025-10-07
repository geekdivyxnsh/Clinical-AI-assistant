import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  User,
  BarChart3,
  ClipboardList,
  Settings,
  Bell,
  Search,
  Menu,
  X,
} from "lucide-react";

interface MainNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function MainNavigation({
  activeSection,
  onSectionChange,
}: MainNavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      id: "patient-dashboard",
      label: "Patient Dashboard",
      icon: User,
      description: "Individual patient care",
      badge: null,
    },
    {
      id: "population-analytics",
      label: "Population Analytics",
      icon: BarChart3,
      description: "Practice insights & trends",
      badge: "New",
    },
    {
      id: "patient-management",
      label: "Patient Management",
      icon: ClipboardList,
      description: "Patient database & records",
      badge: null,
    },
  ];

  const handleSectionChange = (sectionId: string) => {
    onSectionChange(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex" style={{ background: 'rgba(30, 41, 59, 0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border-primary)' }}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-18">
            {/* Compact Logo & Brand */}
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute inset-0 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300" style={{ background: 'var(--gradient-primary)' }}></div>
                <div className="relative w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-110" style={{ background: 'var(--gradient-primary)' }}>
                  <User className="w-7 h-7 text-white" style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.5))' }} />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-pulse border-2 border-white">
                  <div className="absolute inset-1 bg-white rounded-full animate-ping"></div>
                </div>
              </div>
              <div>
                <h1 className="font-bold text-2xl bg-gradient-to-r from-blue-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
                  HealthAI Pro
                </h1>
                <div className="flex items-center gap-4">
                  <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                    Advanced Clinical Platform
                  </p>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-emerald-400">System Online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Compact Main Navigation Items */}
            <div className="flex items-center gap-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;

                return (
                  <div key={item.id} className="relative">
                    <button
                      onClick={() => handleSectionChange(item.id)}
                      className={`flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                        isActive ? "shadow-xl" : "hover:shadow-lg"
                      }`}
                      style={{
                        background: isActive 
                          ? 'var(--gradient-primary)' 
                          : 'rgba(51, 65, 85, 0.3)',
                        color: isActive ? 'white' : 'var(--text-secondary)',
                        boxShadow: isActive 
                          ? '0 0 30px rgba(59, 130, 246, 0.4)' 
                          : '0 2px 8px rgba(0, 0, 0, 0.1)',
                        backdropFilter: 'blur(10px)',
                        border: isActive 
                          ? '1px solid rgba(59, 130, 246, 0.3)' 
                          : '1px solid rgba(51, 65, 85, 0.5)'
                      }}
                    >
                      <Icon className="w-5 h-5 transition-all duration-300" style={{ 
                        filter: isActive 
                          ? 'drop-shadow(0 0 8px rgba(255,255,255,0.5))' 
                          : 'none'
                      }} />
                      <div className="text-left">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-base">{item.label}</span>
                          {item.badge && (
                            <span className="px-1.5 py-0.5 text-xs font-bold rounded-full" style={{
                              background: isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(34, 197, 94, 0.2)',
                              color: isActive ? 'white' : '#22c55e',
                              border: `1px solid ${isActive ? 'rgba(255, 255, 255, 0.3)' : '#22c55e'}`
                            }}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs opacity-75">{item.description}</p>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Compact Right Actions */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <button className="p-3 rounded-xl transition-all duration-300 hover:scale-110" style={{
                  background: 'rgba(51, 65, 85, 0.3)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(51, 65, 85, 0.5)'
                }}>
                  <Bell className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
                </button>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
                  3
                </div>
              </div>

              <button className="p-3 rounded-xl transition-all duration-300 hover:scale-110" style={{
                background: 'rgba(51, 65, 85, 0.3)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(51, 65, 85, 0.5)'
              }}>
                <Search className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
              </button>

              <button className="p-3 rounded-xl transition-all duration-300 hover:scale-110" style={{
                background: 'rgba(51, 65, 85, 0.3)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(51, 65, 85, 0.5)'
              }}>
                <Settings className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
              </button>

              {/* Compact User Avatar */}
              <div className="flex items-center gap-3 ml-4 pl-4" style={{ borderLeft: '1px solid var(--border-primary)' }}>
                <div className="relative cursor-pointer">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-transform duration-300 hover:scale-110" style={{ background: 'var(--gradient-secondary)' }}>
                    <span className="text-white text-lg font-bold">DK</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white animate-pulse"></div>
                </div>
                <div className="hidden xl:block">
                  <p className="text-base font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                    Dr. Kumar
                  </p>
                  <div className="flex items-center gap-4">
                    <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                      Chief Medical Officer
                    </p>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium text-emerald-400">Online</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Mobile Navigation */}
      <nav className="lg:hidden" style={{ background: 'rgba(30, 41, 59, 0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border-primary)' }}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Enhanced Mobile Logo */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl" style={{ background: 'var(--gradient-primary)' }}>
                  <User className="w-7 h-7 text-white" style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.5))' }} />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-pulse border-2 border-white"></div>
              </div>
              <div>
                <h1 className="font-bold text-2xl bg-gradient-to-r from-blue-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">HealthAI Pro</h1>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-emerald-400">Online</span>
                </div>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 w-4 h-4 text-xs p-0 flex items-center justify-center"
                >
                  3
                </Badge>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="border-t border-border bg-white">
              <div className="py-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;

                  return (
                    <Button
                      key={item.id}
                      variant="ghost"
                      onClick={() => handleSectionChange(item.id)}
                      className={`w-full justify-start gap-3 px-4 py-3 h-auto ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <div className="text-left">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.label}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs opacity-75">{item.description}</p>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
