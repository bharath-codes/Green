import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languages = [
  { code: "ml", name: "മലയാളം", english: "Malayalam" },
  { code: "hi", name: "हिन्दी", english: "Hindi" },
  { code: "ta", name: "தமிழ்", english: "Tamil" },
  { code: "te", name: "తెలుగు", english: "Telugu" },
  { code: "kn", name: "ಕನ್ನಡ", english: "Kannada" },
  { code: "bn", name: "বাংলা", english: "Bengali" },
  { code: "mr", name: "मराठी", english: "Marathi" },
  { code: "gu", name: "ગુજરાતી", english: "Gujarati" },
  { code: "pa", name: "ਪੰਜਾਬੀ", english: "Punjabi" },
  { code: "or", name: "ଓଡ଼ିଆ", english: "Odia" },
  { code: "en", name: "English", english: "English" },
];

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  variant?: "default" | "header";
}

export const LanguageSelector = ({ 
  selectedLanguage, 
  onLanguageChange, 
  variant = "default" 
}: LanguageSelectorProps) => {
  const currentLanguage = languages.find(lang => lang.code === selectedLanguage) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={variant === "header" ? "ghost" : "outline"} 
          className={`${variant === "header" ? "h-10" : "h-12"} min-w-[180px] justify-between transition-smooth hover:shadow-soft`}
        >
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="font-medium">{currentLanguage.name}</span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px] bg-card/95 backdrop-blur-sm border-border/50">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => onLanguageChange(language.code)}
            className="cursor-pointer hover:bg-primary/5 focus:bg-primary/10 transition-smooth"
          >
            <div className="flex flex-col">
              <span className="font-medium">{language.name}</span>
              <span className="text-xs text-muted-foreground">{language.english}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};