
import React, { useEffect, useState } from 'react';
import { WeatherData } from '../../types';
import { fetchWeather } from '../../services/weatherService';
import { Cloud, CloudRain, Sun, CloudSun, MapPin, Wind, Droplets, Thermometer, SunDim } from 'lucide-react';

export const WeatherWidget: React.FC = () => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWeather = async (lat?: number, lon?: number) => {
      setLoading(true);
      const weather = await fetchWeather(lat, lon);
      setData(weather);
      setLoading(false);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          loadWeather(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.warn("Geolocation denied/failed, using default", error);
          loadWeather(); // Fallback
        },
        { timeout: 5000 }
      );
    } else {
      loadWeather();
    }
  }, []);

  const getWeatherIcon = (condition: string, size = 24) => {
    const c = condition.toLowerCase();
    if (c.includes('rain')) return <CloudRain size={size} className="text-blue-300 drop-shadow-md" />;
    if (c.includes('cloud') && c.includes('sun')) return <CloudSun size={size} className="text-yellow-200 drop-shadow-md" />;
    if (c.includes('cloud')) return <Cloud size={size} className="text-gray-300 drop-shadow-md" />;
    if (c.includes('partly')) return <CloudSun size={size} className="text-yellow-200 drop-shadow-md" />;
    return <Sun size={size} className="text-yellow-400 drop-shadow-md" />;
  };

  if (loading || !data) {
    return <div className="w-full h-full flex items-center justify-center text-sm text-white/70 font-medium">Loading Weather...</div>;
  }

  return (
    <div className="w-full h-full p-6 flex flex-col justify-between relative overflow-hidden text-white">
        {/* Background gradient hint based on weather */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/30 via-transparent to-black/20 z-0 pointer-events-none" />

        {/* Header Info */}
        <div className="relative z-10 flex flex-col">
            <div className="flex items-center gap-1.5 text-sm text-white/90 mb-1 font-medium shadow-black/20 drop-shadow-sm">
                <MapPin size={14} />
                <span className="uppercase tracking-wide font-semibold">{data.city}</span>
            </div>
            <div className="flex flex-col">
                <h2 className="text-6xl font-extralight tracking-tighter drop-shadow-lg">{data.temp}°</h2>
                <p className="text-lg font-medium text-white/90 drop-shadow-md mt-1">{data.condition}</p>
                <p className="text-sm text-white/60 font-medium">H: {data.temp + 4}° L: {data.temp - 3}°</p>
            </div>
        </div>

        {/* Detailed Grid (New for large widget) */}
        <div className="relative z-10 grid grid-cols-2 gap-4 my-4">
            <div className="flex items-center gap-3 bg-white/5 p-2 rounded-lg backdrop-blur-sm border border-white/5">
                <Wind size={18} className="text-white/70"/>
                <div className="flex flex-col">
                    <span className="text-[10px] text-white/60 uppercase font-bold">Wind</span>
                    <span className="text-sm font-semibold">8 km/h</span>
                </div>
            </div>
            <div className="flex items-center gap-3 bg-white/5 p-2 rounded-lg backdrop-blur-sm border border-white/5">
                <Droplets size={18} className="text-white/70"/>
                <div className="flex flex-col">
                    <span className="text-[10px] text-white/60 uppercase font-bold">Humidity</span>
                    <span className="text-sm font-semibold">64%</span>
                </div>
            </div>
            <div className="flex items-center gap-3 bg-white/5 p-2 rounded-lg backdrop-blur-sm border border-white/5">
                <Thermometer size={18} className="text-white/70"/>
                <div className="flex flex-col">
                    <span className="text-[10px] text-white/60 uppercase font-bold">Feels Like</span>
                    <span className="text-sm font-semibold">{data.temp + 1}°</span>
                </div>
            </div>
             <div className="flex items-center gap-3 bg-white/5 p-2 rounded-lg backdrop-blur-sm border border-white/5">
                <SunDim size={18} className="text-white/70"/>
                <div className="flex flex-col">
                    <span className="text-[10px] text-white/60 uppercase font-bold">UV Index</span>
                    <span className="text-sm font-semibold">Low</span>
                </div>
            </div>
        </div>

        {/* Forecast Row */}
        <div className="relative z-10 flex justify-between mt-auto pt-4 border-t border-white/10">
            {data.forecast.map((f, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                    <span className="text-xs text-white/80 font-medium drop-shadow-sm">{f.time}</span>
                    {getWeatherIcon(f.icon, 20)}
                    <span className="text-sm font-bold drop-shadow-sm">{f.temp}°</span>
                </div>
            ))}
        </div>
    </div>
  );
};
