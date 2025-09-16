import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useTranslation } from "@/hooks/useTranslation";
import { Leaf, MessageCircle, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-farming.jpg";

const Landing = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("ml");
  const navigate = useNavigate();
  const { t } = useTranslation(selectedLanguage);

  const handleStartQuery = () => {
    navigate("/advisory", { state: { selectedLanguage } });
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6 bg-background/10 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-primary shadow-medium">
            <Leaf className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">{t('common.harithaSahayak')}</span>
        </div>
        <LanguageSelector 
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
          variant="header"
        />
      </header>

      {/* Hero Section */}
      <main className="relative flex flex-col items-center justify-center min-h-[calc(100vh-88px)] px-6 text-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Beautiful farming landscape with green fields" 
            className="w-full h-full object-cover opacity-20" 
          />
          <div className="absolute inset-0 bg-background/40" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          {/* Title with Malayalam */}
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-6xl md:text-7xl font-bold text-foreground leading-tight">
              {t('landing.title')}
            </h1>
            <div className="text-3xl md:text-4xl text-muted-foreground font-medium opacity-70">
              {selectedLanguage !== 'en' && t('common.harithaSahayak')}
            </div>
            <p className="text-xl md:text-2xl text-accent font-semibold animate-fade-in-delayed">
              {t('landing.subtitle')}
            </p>
          </div>

          {/* Description */}
          <div className="space-y-6 animate-slide-up-delayed">
            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
              {t('landing.description')}
            </p>
            
            {/* Features */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span>{t('common.voiceTextSupport')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="h-4 w-4" />
                <span>{t('common.cropAnalysis')}</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4" />
                <span>{t('common.expertGuidance')}</span>
              </div>
            </div>
          </div>

          {/* Language Selection */}
          <div className="space-y-4 animate-slide-up-delayed">
            <p className="text-base text-muted-foreground">{t('common.selectLanguage')}</p>
            <LanguageSelector 
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
            />
          </div>

          {/* CTA Button */}
          <div className="space-y-4 animate-scale-in pt-4">
            <Button 
              variant="hero" 
              size="xl" 
              onClick={handleStartQuery}
              className="animate-float"
            >
              <MessageCircle className="h-5 w-5" />
              {t('common.startQuery')}
              <ArrowRight className="h-5 w-5" />
            </Button>
            <p className="text-sm text-muted-foreground">
              {t('landing.instantGuidance')}
            </p>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-primary/10 rounded-full animate-float opacity-60" />
        <div className="absolute bottom-32 right-20 w-12 h-12 bg-accent/10 rounded-full animate-float opacity-40" style={{ animationDelay: "1s" }} />
        <div className="absolute top-40 right-16 w-8 h-8 bg-nature/20 rounded-full animate-float opacity-50" style={{ animationDelay: "2s" }} />
      </main>
    </div>
  );
};

export default Landing;