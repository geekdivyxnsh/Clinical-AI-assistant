import { useState } from "react";
import MainNavigation from "./MainNavigation";
import AIAssistantBar from "./AIAssistantBar";
import AIChatModal from "../chat/AIChatModal";
import { Mail, Github, Linkedin, Heart } from "lucide-react";
import "../../styles/professional-theme.css";

interface MainLayoutProps {
  children: React.ReactNode;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function MainLayout({
  children,
  activeSection,
  onSectionChange,
}: MainLayoutProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [initialQuery, setInitialQuery] = useState<string>("");

  const handleOpenChat = (query?: string) => {
    setInitialQuery(query || "");
    setIsChatOpen(true);
  };

  const handleToggleListening = () => {
    setIsListening(!isListening);
    // Here you would typically start/stop voice recording
    console.log("Voice listening:", !isListening);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
    setInitialQuery("");
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--gradient-dark)' }}>
      {/* Professional Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-500/3 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/2 rounded-full blur-2xl"></div>
      </div>

      {/* AI Assistant Bar - Always at the top */}
      <AIAssistantBar
        onOpenChat={handleOpenChat}
        isListening={isListening}
        onToggleListening={handleToggleListening}
      />

      {/* Main Navigation */}
      <MainNavigation
        activeSection={activeSection}
        onSectionChange={onSectionChange}
      />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10">
        <div className="container mx-auto px-6 py-8">{children}</div>
      </main>

      {/* Professional Footer */}
      <footer className="relative z-10 border-t" style={{ borderColor: 'var(--border-primary)', background: 'rgba(30, 41, 59, 0.95)', backdropFilter: 'blur(20px)' }}>
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Developer Credits */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                  Made with
                </span>
                <Heart className="w-4 h-4 text-red-400" />
                <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                  by
                </span>
                <span className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Divyanshu
                </span>
              </div>
            </div>

            {/* Contact Links */}
            <div className="flex items-center gap-4">
              <a
                href="mailto:geekdivyxnsh@gmail.com"
                className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105"
                style={{
                  background: 'rgba(51, 65, 85, 0.3)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(51, 65, 85, 0.5)'
                }}
              >
                <Mail className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                  Email
                </span>
              </a>

              <a
                href="https://github.com/geekdivyxnsh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105"
                style={{
                  background: 'rgba(51, 65, 85, 0.3)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(51, 65, 85, 0.5)'
                }}
              >
                <Github className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                  GitHub
                </span>
              </a>

              <a
                href="https://www.linkedin.com/in/k-divyanshu/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105"
                style={{
                  background: 'rgba(51, 65, 85, 0.3)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(51, 65, 85, 0.5)'
                }}
              >
                <Linkedin className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                  LinkedIn
                </span>
              </a>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                © 2024 HealthAI Pro. All rights reserved.
              </p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                Professional Clinical AI Assistant Platform
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Chat Modal */}
      <AIChatModal
        isOpen={isChatOpen}
        onClose={handleCloseChat}
        initialQuery={initialQuery}
      />
    </div>
  );
}
