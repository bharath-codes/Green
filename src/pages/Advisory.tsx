import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useTranslation } from "@/hooks/useTranslation";
import { useToast } from "@/components/ui/use-toast";
import { 
  Leaf, 
  Mic, 
  MicOff, 
  Camera, 
  Send, 
  User, 
  Bot, 
  ArrowLeft,
  Upload,
  HelpCircle,
  Phone
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  type: "user" | "assistant";
  timestamp: Date;
  imageUrl?: string;
}

const Advisory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedLanguage, setSelectedLanguage] = useState(
    location.state?.selectedLanguage || "ml"
  );
  const { t } = useTranslation(selectedLanguage);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: t('advisory.welcomeMessage'),
      type: "assistant",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      type: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Thank you for your question about "${inputValue}". Based on your query in ${selectedLanguage}, I recommend consulting with local agricultural experts and checking current weather conditions. This is a demo response - in production, this would connect to a real AI service that provides context-aware agricultural advice.`,
        type: "assistant",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);

    toast({
      title: t('advisory.querySent'),
      description: t('advisory.processingQuery'),
    });
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    if (!isListening) {
      toast({
        title: t('advisory.voiceInput'),
        description: t('advisory.voiceInputDescription'),
      });
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: t('advisory.imageUpload'),
        description: t('advisory.imageAnalysisDescription'),
      });
    }
  };

  const handleExpertContact = () => {
    toast({
      title: t('advisory.expertContact'),
      description: t('advisory.connectingExpert'),
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-card/95 backdrop-blur-sm border-b border-border/50">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate("/")}
            className="hover:bg-primary/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-primary">
              <Leaf className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">{t('common.harithaSahayak')}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSelector 
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
            variant="header"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={handleExpertContact}
            className="gap-2"
          >
            <Phone className="h-4 w-4" />
            {t('common.expertHelp')}
          </Button>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex flex-col h-[calc(100vh-73px)]">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.type === "user" ? "justify-end" : "justify-start"
              } animate-fade-in`}
            >
              {message.type === "assistant" && (
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-primary shadow-soft flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              
              <Card className={`max-w-[80%] ${
                message.type === "user" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-card"
              }`}>
                <CardContent className="p-3">
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  {message.imageUrl && (
                    <img 
                      src={message.imageUrl} 
                      alt="Uploaded crop image" 
                      className="mt-2 rounded-md max-w-full h-auto"
                    />
                  )}
                  <div className={`text-xs mt-2 opacity-70 ${
                    message.type === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </CardContent>
              </Card>

              {message.type === "user" && (
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary shadow-soft flex-shrink-0">
                  <User className="h-4 w-4 text-secondary-foreground" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3 justify-start animate-fade-in">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-primary shadow-soft">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
              <Card className="bg-card">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{animationDelay: "0.1s"}}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{animationDelay: "0.2s"}}></div>
                    </div>
                    <span className="text-sm text-muted-foreground">{t('advisory.analyzing')}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-border/50 bg-card/50 backdrop-blur-sm p-4">
          <div className="max-w-4xl mx-auto space-y-3">
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="text-xs">
                <Leaf className="h-3 w-3" />
                {t('advisory.quickActions.cropDisease')}
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                <HelpCircle className="h-3 w-3" />
                {t('advisory.quickActions.weatherInfo')}
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                {t('advisory.quickActions.govSchemes')}
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                {t('advisory.quickActions.pestControl')}
              </Button>
            </div>

            {/* Input Controls */}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={t('advisory.placeholder')}
                  className="min-h-[50px] resize-none pr-12 transition-smooth focus:shadow-soft"
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1 h-8 w-8"
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex flex-col gap-2">
                <Button
                  variant={isListening ? "destructive" : "outline"}
                  size="icon"
                  onClick={handleVoiceInput}
                  className="transition-smooth"
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                
                <label htmlFor="image-upload">
                  <Button variant="outline" size="icon" asChild className="cursor-pointer">
                    <div>
                      <Camera className="h-4 w-4" />
                    </div>
                  </Button>
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advisory;