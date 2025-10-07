import { Button } from "@/components/ui/button";
import ChatInterface from "@/components/ChatInterface";
import SymptomTracker from "@/components/SymptomTracker";
import MedicationReminder from "@/components/MedicationReminder";
import HealthTips from "@/components/HealthTips";
import { MessageSquare, Activity, Bell, Brain } from "lucide-react";
import heroImage from "@/assets/hero-health.jpg";

export default function Index() {
  const scrollToChat = () => {
    document.getElementById("chat")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <img
          src={heroImage}
          alt="Healthcare technology"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
        />
        
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm rounded-full mb-6 shadow-soft">
              <Brain className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                AI-Powered Health Assistant
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary-foreground">
              Your Personal Health
              <br />
              <span className="text-primary-glow">Chat Bot</span>
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Track symptoms, manage medications, and get instant health guidance
              powered by advanced AI. Your wellness journey starts here.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={scrollToChat}
                className="bg-card text-foreground hover:bg-card/90 shadow-medium"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Start Chatting
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 backdrop-blur-sm"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-glow/20 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-float" style={{ animationDelay: "1s" }} />
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Comprehensive Health Management
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to stay on top of your health in one place
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 rounded-2xl bg-gradient-calm shadow-soft">
            <div className="w-16 h-16 bg-gradient-health rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow">
              <MessageSquare className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">AI Chat Assistant</h3>
            <p className="text-muted-foreground">
              Get instant answers to health questions with our intelligent chatbot
            </p>
          </div>

          <div className="text-center p-6 rounded-2xl bg-gradient-calm shadow-soft">
            <div className="w-16 h-16 bg-gradient-health rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow">
              <Activity className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Symptom Tracking</h3>
            <p className="text-muted-foreground">
              Monitor your health with our intuitive emoji-based tracker
            </p>
          </div>

          <div className="text-center p-6 rounded-2xl bg-gradient-calm shadow-soft">
            <div className="w-16 h-16 bg-gradient-health rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow">
              <Bell className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Smart Reminders</h3>
            <p className="text-muted-foreground">
              Never miss a medication with personalized alerts
            </p>
          </div>
        </div>
      </section>

      {/* Chat Interface Section */}
      <section id="chat" className="container mx-auto px-4 py-16 bg-gradient-calm">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
            Chat with Your Health Assistant
          </h2>
          <ChatInterface />
        </div>
      </section>

      {/* Symptom & Medication Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <SymptomTracker />
          <MedicationReminder />
        </div>
      </section>

      {/* Health Tips Section */}
      <section className="container mx-auto px-4 py-20 bg-gradient-calm">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
          Daily Health Tips
        </h2>
        <div className="max-w-6xl mx-auto">
          <HealthTips />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground mb-4">
            Health Chat Bot - Your AI-Powered Wellness Companion
          </p>
          <p className="text-sm text-muted-foreground">
            Built with ❤️ for better health outcomes
          </p>
        </div>
      </footer>
    </div>
  );
}
