import { Card } from '@/components/ui/card';
import { Sun, CloudRain, Cloud, Snowflake, Wind, Droplets } from 'lucide-react';

const weatherCases = [
  {
    location: 'Kochi, Kerala',
    temperature: 28,
    condition: 'Partly Cloudy',
    humidity: 78,
    windSpeed: 12,
    rainfall: 5,
    icon: Cloud,
  },
  {
    location: 'Jaipur, Rajasthan',
    temperature: 35,
    condition: 'Sunny',
    humidity: 30,
    windSpeed: 18,
    rainfall: 0,
    icon: Sun,
  },
  {
    location: 'Shillong, Meghalaya',
    temperature: 22,
    condition: 'Rainy',
    humidity: 90,
    windSpeed: 10,
    rainfall: 12,
    icon: CloudRain,
  },
  {
    location: 'Leh, Ladakh',
    temperature: -2,
    condition: 'Snowy',
    humidity: 60,
    windSpeed: 8,
    rainfall: 0,
    icon: Snowflake,
  },
];

export default function LiveWeatherPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-10 space-y-8">
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-primary">🌤️ Live Weather Cases</h1>
        <p className="text-muted-foreground text-sm">
          Explore different weather conditions across India.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {weatherCases.map((weather, index) => (
          <Card key={index} className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-accent/50">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-primary">{weather.location}</h3>
                <p className="text-sm text-muted-foreground">{weather.condition}</p>
              </div>
              <weather.icon className="h-8 w-8 text-secondary animate-pulse" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{weather.temperature}°C</div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <span>Humidity: {weather.humidity}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="h-4 w-4 text-gray-500" />
                  <span>Wind: {weather.windSpeed} km/h</span>
                </div>
                <div className="flex items-center gap-2">
                  <CloudRain className="h-4 w-4 text-blue-600" />
                  <span>Rain: {weather.rainfall}mm</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </section>
    </main>
  );
}
