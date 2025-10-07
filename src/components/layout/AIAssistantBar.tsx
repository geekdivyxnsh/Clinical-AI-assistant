import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  Search,
  Sparkles,
  Mic,
  MicOff,
  X,
  MessageSquare,
} from "lucide-react";

interface AIAssistantBarProps {
  onOpenChat: (query?: string) => void;
  isListening?: boolean;
  onToggleListening?: () => void;
}

export default function AIAssistantBar({
  onOpenChat,
  isListening = false,
  onToggleListening,
}: AIAssistantBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onOpenChat(searchQuery);
    }
  };

  const handleVoiceToggle = () => {
    if (onToggleListening) {
      onToggleListening();
    }
  };

  return (
    <div className="w-full glass-effect border-b" style={{ borderColor: 'var(--border-primary)' }}>
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Enhanced AI Assistant Branding */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-5">
              <div className="relative group">
                <div className="absolute inset-0 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' }}></div>
                <div className="relative w-18 h-18 rounded-3xl flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110" style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' }}>
                  <Bot className="w-10 h-10 text-white" style={{ filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.7))' }} />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-300 rounded-full animate-pulse border-3 border-white shadow-lg">
                  <div className="absolute inset-1.5 bg-white rounded-full animate-ping"></div>
                </div>
                <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-blue-400 rounded-full border-2 border-white animate-bounce"></div>
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
                  Clinical AI Assistant
                </h3>
                <p className="text-base font-semibold" style={{ color: 'var(--text-secondary)' }}>
                  Powered by Advanced Medical AI
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="w-1 h-1 bg-emerald-200 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  </div>
                  <span className="text-sm font-bold text-emerald-400">AI Online & Ready</span>
                  <div className="px-2 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#22c55e', border: '1px solid #22c55e' }}>
                    v2.1
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-300 hover:scale-105" style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-400">Active</span>
              </div>
              <div className="px-3 py-1 rounded-lg text-xs font-bold" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                99.9% Uptime
              </div>
            </div>
          </div>

          {/* Center: Search/Command Bar */}
          <div className="flex-1 max-w-4xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <div
                className={`relative transition-all duration-300 rounded-2xl ${
                  isFocused ? "glow-effect scale-105" : ""
                }`}
                style={{
                  background: 'var(--bg-card)',
                  border: `2px solid ${isFocused ? 'var(--medical-blue)' : 'var(--border-primary)'}`,
                  boxShadow: isFocused ? 'var(--shadow-glow)' : 'var(--shadow-md)'
                }}
              >
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Ask about patient symptoms, medications, or clinical guidelines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="input-professional pl-14 pr-28 py-5 text-lg font-medium rounded-2xl border-0"
                  style={{
                    background: 'transparent',
                    color: 'var(--text-primary)'
                  }}
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                  {/* Voice Input Button */}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleVoiceToggle}
                    className={`h-8 w-8 p-0 transition-colors ${
                      isListening
                        ? "text-accent bg-accent/10 hover:bg-accent/20"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {isListening ? (
                      <Mic className="w-4 h-4 animate-pulse" />
                    ) : (
                      <MicOff className="w-4 h-4" />
                    )}
                  </Button>

                  {/* Clear Button */}
                  {searchQuery && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setSearchQuery("")}
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </form>

            {/* Quick Suggestions */}
            {isFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md border border-border rounded-xl shadow-2xl z-50">
                <div className="p-4">
                  <p className="text-sm font-medium text-muted-foreground mb-3">
                    Quick suggestions:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Show patient vitals",
                      "Check medication interactions",
                      "Analyze lab results",
                      "Generate treatment plan",
                    ].map((suggestion) => (
                      <Button
                        key={suggestion}
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSearchQuery(suggestion);
                          onOpenChat(suggestion);
                        }}
                        className="text-sm h-8 px-3 text-muted-foreground hover:text-foreground hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => onOpenChat()}
              className="flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 border-2 backdrop-blur-sm hover:scale-105"
              style={{
                background: 'rgba(34, 197, 94, 0.1)',
                borderColor: '#22c55e',
                color: '#22c55e'
              }}
            >
              <MessageSquare className="w-5 h-5" />
              <span className="font-semibold">Open Chat</span>
            </button>

            <button
              onClick={() => onOpenChat()}
              className="flex items-center gap-3 px-8 py-3 text-lg font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                color: 'white',
                boxShadow: '0 8px 32px rgba(34, 197, 94, 0.4)'
              }}
            >
              <Sparkles className="w-6 h-6" style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.5))' }} />
              Ask AI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
