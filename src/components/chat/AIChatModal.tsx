import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  X,
  Send,
  Mic,
  MicOff,
  Bot,
  User,
  Sparkles,
  FileText,
  Heart,
  Pill,
  Calendar,
  TrendingUp,
} from "lucide-react";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  metadata?: {
    type: "text" | "vitals" | "medication" | "appointment" | "analytics";
    data?: any;
  };
}

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export default function AIChatModal({
  isOpen,
  onClose,
  initialQuery,
}: AIChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hello! I'm your Clinical AI Assistant. I can help you with patient data, medication analysis, appointment scheduling, and practice insights. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState(initialQuery || "");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialQuery) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const generateAIResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();

    // Patient vitals analysis
    if (
      lowerMessage.includes("vitals") ||
      lowerMessage.includes("blood pressure") ||
      lowerMessage.includes("heart rate")
    ) {
      return {
        id: Date.now().toString(),
        type: "ai",
        content: "Here are the latest vital signs for your patients:",
        timestamp: new Date(),
        metadata: {
          type: "vitals",
          data: {
            patients: [
              {
                name: "John Doe",
                bp: "140/90",
                hr: 78,
                temp: 98.6,
                status: "warning",
              },
              {
                name: "Jane Smith",
                bp: "120/80",
                hr: 72,
                temp: 98.4,
                status: "normal",
              },
              {
                name: "Robert Johnson",
                bp: "135/85",
                hr: 85,
                temp: 99.1,
                status: "elevated",
              },
            ],
          },
        },
      };
    }

    // Medication analysis
    if (
      lowerMessage.includes("medication") ||
      lowerMessage.includes("drug") ||
      lowerMessage.includes("prescription")
    ) {
      return {
        id: Date.now().toString(),
        type: "ai",
        content: "Medication adherence and interaction analysis:",
        timestamp: new Date(),
        metadata: {
          type: "medication",
          data: {
            adherence: 87,
            interactions: 2,
            medications: [
              { name: "Metformin", adherence: 95, patients: 45 },
              { name: "Lisinopril", adherence: 89, patients: 32 },
              { name: "Atorvastatin", adherence: 78, patients: 28 },
            ],
          },
        },
      };
    }

    // Appointment scheduling
    if (
      lowerMessage.includes("appointment") ||
      lowerMessage.includes("schedule") ||
      lowerMessage.includes("booking")
    ) {
      return {
        id: Date.now().toString(),
        type: "ai",
        content: "Appointment scheduling and availability:",
        timestamp: new Date(),
        metadata: {
          type: "appointment",
          data: {
            today: 12,
            thisWeek: 45,
            nextAvailable: "2024-01-20 10:00 AM",
            upcoming: [
              { patient: "Alice Brown", time: "2:00 PM", type: "Follow-up" },
              {
                patient: "Michael Davis",
                time: "3:30 PM",
                type: "New Patient",
              },
            ],
          },
        },
      };
    }

    // Analytics and insights
    if (
      lowerMessage.includes("analytics") ||
      lowerMessage.includes("insights") ||
      lowerMessage.includes("trends")
    ) {
      return {
        id: Date.now().toString(),
        type: "ai",
        content: "Practice analytics and insights:",
        timestamp: new Date(),
        metadata: {
          type: "analytics",
          data: {
            totalPatients: 1247,
            monthlyGrowth: 12,
            topConditions: ["Hypertension", "Diabetes", "Asthma"],
            revenue: { current: 125000, growth: 8.5 },
          },
        },
      };
    }

    // General clinical queries
    if (
      lowerMessage.includes("patient") ||
      lowerMessage.includes("diagnosis") ||
      lowerMessage.includes("treatment")
    ) {
      return {
        id: Date.now().toString(),
        type: "ai",
        content:
          "Based on the clinical data, I can help you with patient management. Here are some key insights:\n\n• 15 patients are due for follow-up appointments\n• 3 patients have elevated blood pressure readings\n• Medication adherence is at 87% across the practice\n• Next available appointment slot is tomorrow at 10:00 AM\n\nWould you like me to provide more specific information about any of these areas?",
        timestamp: new Date(),
      };
    }

    // Default response
    return {
      id: Date.now().toString(),
      type: "ai",
      content:
        "I understand you're asking about: \"" +
        userMessage +
        "\". I can help you with:\n\n• Patient vitals and health monitoring\n• Medication management and interactions\n• Appointment scheduling and availability\n• Practice analytics and insights\n• Clinical decision support\n\nPlease be more specific about what you'd like to know, and I'll provide detailed information.",
      timestamp: new Date(),
    };
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: message,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse = generateAIResponse(message);
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        const voiceText = "Show me patient vitals for today";
        setInputValue(voiceText);
        setIsListening(false);
      }, 2000);
    }
  };

  const renderMessageContent = (message: Message) => {
    if (message.metadata?.type === "vitals") {
      return (
        <div className="space-y-4">
          <p className="text-white font-medium">{message.content}</p>
          <div className="grid gap-3">
            {message.metadata.data.patients.map(
              (patient: any, index: number) => (
                <div key={index} className="p-4 rounded-xl" style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-white text-lg">{patient.name}</h4>
                      <div className="flex gap-4 text-sm text-emerald-100 mt-1">
                        <span>BP: {patient.bp}</span>
                        <span>HR: {patient.hr} BPM</span>
                        <span>Temp: {patient.temp}°F</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      patient.status === "normal" 
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
                        : patient.status === "warning"
                        ? "bg-orange-500/20 text-orange-300 border border-orange-400/30"
                        : "bg-blue-500/20 text-blue-300 border border-blue-400/30"
                    }`}>
                      {patient.status}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      );
    }

    if (message.metadata?.type === "medication") {
      return (
        <div className="space-y-4">
          <p className="text-white font-medium">{message.content}</p>
          <div className="grid gap-3">
            <div className="flex justify-between items-center p-4 rounded-xl" style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
              <span className="text-white font-semibold">Overall Adherence Rate</span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                {message.metadata.data.adherence}%
              </span>
            </div>
            {message.metadata.data.medications.map(
              (med: any, index: number) => (
                <div key={index} className="p-4 rounded-xl" style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-white text-lg">{med.name}</h4>
                      <p className="text-sm text-emerald-100">
                        {med.patients} patients
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                      {med.adherence}% adherence
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      );
    }

    if (message.metadata?.type === "appointment") {
      return (
        <div className="space-y-4">
          <p className="text-white font-medium">{message.content}</p>
          <div className="grid gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 text-center rounded-xl" style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                <div className="text-3xl font-bold text-emerald-300">
                  {message.metadata.data.today}
                </div>
                <div className="text-sm text-emerald-100 mt-1">
                  Today's Appointments
                </div>
              </div>
              <div className="p-4 text-center rounded-xl" style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                <div className="text-3xl font-bold text-blue-300">
                  {message.metadata.data.thisWeek}
                </div>
                <div className="text-sm text-blue-100 mt-1">This Week</div>
              </div>
            </div>
            <div className="p-4 rounded-xl" style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
              <p className="text-white">
                <strong className="text-emerald-300">Next Available:</strong>{" "}
                <span className="text-emerald-100">{message.metadata.data.nextAvailable}</span>
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (message.metadata?.type === "analytics") {
      return (
        <div className="space-y-4">
          <p className="text-white font-medium">{message.content}</p>
          <div className="grid gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 text-center rounded-xl" style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                <div className="text-3xl font-bold text-emerald-300">
                  {message.metadata.data.totalPatients.toLocaleString()}
                </div>
                <div className="text-sm text-emerald-100 mt-1">
                  Total Patients
                </div>
              </div>
              <div className="p-4 text-center rounded-xl" style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                <div className="text-3xl font-bold text-green-300">
                  +{message.metadata.data.monthlyGrowth}%
                </div>
                <div className="text-sm text-green-100 mt-1">
                  Monthly Growth
                </div>
              </div>
            </div>
            <div className="p-4 rounded-xl" style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
              <p className="text-white font-semibold mb-3">Top Conditions:</p>
              <div className="flex gap-2 flex-wrap">
                {message.metadata.data.topConditions.map(
                  (condition: string, index: number) => (
                    <span key={index} className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                      {condition}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return <p className="whitespace-pre-wrap text-white font-medium">{message.content}</p>;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(8px)' }}>
      <div className="professional-card max-w-5xl w-full max-h-[85vh] flex flex-col shadow-2xl relative">
        {/* Sticky Header - Always Visible */}
        <div className="sticky top-0 z-50 flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--border-primary)', background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', backdropFilter: 'blur(20px)' }}>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl" style={{ background: 'rgba(255, 255, 255, 0.25)', backdropFilter: 'blur(10px)' }}>
                <Bot className="w-6 h-6 text-white" style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.6))' }} />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-300 rounded-full border-2 border-white">
                <div className="absolute inset-1 bg-white rounded-full"></div>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Clinical AI Assistant
              </h2>
              <div className="flex items-center gap-3">
                <p className="text-sm text-emerald-100 font-medium">
                  Powered by Advanced Medical AI
                </p>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full"></div>
                  <span className="text-xs font-medium text-emerald-200">Online</span>
                </div>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="relative p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:rotate-90 group z-50" 
            style={{ 
              background: 'rgba(255, 255, 255, 0.2)', 
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
            }}
          >
            <X className="w-6 h-6 text-white transition-all duration-300 group-hover:drop-shadow-lg" style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.5))' }} />
            <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Enhanced Messages */}
        <div className="flex-1 p-6 overflow-y-auto" style={{ background: 'var(--bg-primary)', minHeight: '60vh' }}>
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.type === "ai" && (
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' }}>
                      <Bot className="w-6 h-6 text-white" style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.5))' }} />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white"></div>
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl p-6 shadow-lg ${
                    message.type === "user"
                      ? "text-white"
                      : "text-white"
                  }`}
                  style={{
                    background: message.type === "user" 
                      ? 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)'
                      : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <div style={{ color: 'white' }}>
                    {renderMessageContent(message)}
                  </div>
                  <p className="text-xs opacity-80 mt-3 font-medium">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                {message.type === "user" && (
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)' }}>
                    <User className="w-6 h-6 text-white" style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.5))' }} />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-4 justify-start">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' }}>
                    <Bot className="w-6 h-6 text-white" style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.5))' }} />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white"></div>
                </div>
                <div className="rounded-2xl p-6 shadow-lg" style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' }}>
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                    <span className="text-lg font-medium text-white">
                      AI is analyzing...
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Compact Input */}
        <div className="p-4 border-t" style={{ borderColor: 'var(--border-primary)', background: 'var(--bg-secondary)' }}>
          <div className="flex gap-3">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about patients, medications, appointments..."
              onKeyPress={(e) =>
                e.key === "Enter" && handleSendMessage(inputValue)
              }
              className="flex-1 p-3 rounded-xl text-base border-2 transition-all duration-300"
              style={{
                background: 'var(--bg-elevated)',
                borderColor: 'var(--border-primary)',
                color: 'var(--text-primary)'
              }}
            />
            <button
              onClick={handleVoiceInput}
              className="p-3 rounded-xl transition-all duration-300 hover:scale-110"
              style={{
                background: isListening ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' : 'var(--bg-elevated)',
                color: isListening ? 'white' : 'var(--text-secondary)',
                border: `2px solid ${isListening ? '#22c55e' : 'var(--border-primary)'}`
              }}
            >
              {isListening ? (
                <MicOff className="w-5 h-5" />
              ) : (
                <Mic className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim() || isLoading}
              className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                color: 'white',
                boxShadow: '0 4px 16px rgba(34, 197, 94, 0.3)'
              }}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="flex gap-2 mt-3">
            {[
              "Show patient vitals",
              "Check medication adherence",
              "Schedule appointment",
              "Practice analytics",
            ].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSendMessage(suggestion)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 hover:scale-105"
                style={{
                  background: 'rgba(34, 197, 94, 0.1)',
                  color: '#22c55e',
                  border: '1px solid #22c55e'
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
