import { useState } from "react";
import MainNavigation from "./MainNavigation";
import AIAssistantBar from "./AIAssistantBar";
import AIChatModal from "../chat/AIChatModal";
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
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/3 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
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

      {/* AI Chat Modal */}
      <AIChatModal
        isOpen={isChatOpen}
        onClose={handleCloseChat}
        initialQuery={initialQuery}
      />
    </div>
  );
}
