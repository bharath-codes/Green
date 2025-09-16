import { Card } from '@/components/ui/card';
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer } from 'lucide-react';
import { Language, translations } from '@/lib/translations';

interface WeatherWidgetProps {
  language?: Language;
}

const WeatherWidget = ({ language = 'en' }: WeatherWidgetProps) => {
  const t = translations[language];
  // Placeholder weather data - will be replaced with real API
  const weatherData = {
    location: 'Kochi, Kerala',
    temperature: 28,
    condition: 'Partly Cloudy',
    humidity: 78,
    windSpeed: 12,
    rainfall: 5,
    forecast: [
      { day: 'Today', icon: Sun, temp: '28°C', condition: 'Sunny' },
      { day: 'Tomorrow', icon: CloudRain, temp: '26°C', condition: 'Rain' },
      { day: 'Wed', icon: Cloud, temp: '27°C', condition: 'Cloudy' },
    ]
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-accent/50">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-primary">{weatherData.location}</h3>
          <p className="text-sm text-muted-foreground">Weather Update</p>
        </div>
        <Sun className="h-8 w-8 text-secondary animate-pulse" />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary">{weatherData.temperature}°C</div>
          <p className="text-sm text-muted-foreground">{weatherData.condition}</p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Droplets className="h-4 w-4 text-blue-500" />
            <span>Humidity: {weatherData.humidity}%</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Wind className="h-4 w-4 text-gray-500" />
            <span>Wind: {weatherData.windSpeed} km/h</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CloudRain className="h-4 w-4 text-blue-600" />
            <span>Rain: {weatherData.rainfall}mm</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {weatherData.forecast.map((day, index) => (
          <div key={index} className="text-center p-2 bg-card/50 rounded-lg">
            <p className="text-xs font-medium">{day.day}</p>
            <day.icon className="h-5 w-5 mx-auto my-1 text-primary" />
            <p className="text-xs font-semibold">{day.temp}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default WeatherWidget;
