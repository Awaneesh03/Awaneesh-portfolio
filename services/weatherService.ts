
import { WeatherData } from '../types';
import { OPENWEATHER_API_KEY, DEFAULT_CITY } from '../constants';

export const fetchWeather = async (lat?: number, lon?: number): Promise<WeatherData> => {
  // Simulation / Fallback data
  const isLocal = !!(lat && lon);
  
  // Generate somewhat random data for variety if local
  const baseTemp = isLocal ? 22 : 24;
  
  const mockData: WeatherData = {
    temp: baseTemp,
    city: isLocal ? 'My Location' : DEFAULT_CITY,
    condition: isLocal ? 'Sunny' : 'Partly Cloudy',
    forecast: [
      { time: 'Now', icon: isLocal ? 'sun' : 'sun', temp: baseTemp },
      { time: '1 PM', icon: 'cloud-sun', temp: baseTemp + 1 },
      { time: '2 PM', icon: 'cloud', temp: baseTemp + 2 },
      { time: '3 PM', icon: 'rain', temp: baseTemp - 1 },
      { time: '4 PM', icon: 'cloud', temp: baseTemp - 2 },
    ]
  };

  if (!OPENWEATHER_API_KEY) {
    // Simulate network delay for realism
    return new Promise(resolve => setTimeout(() => resolve(mockData), 800));
  }

  try {
    let url = `https://api.openweathermap.org/data/2.5/weather?appid=${OPENWEATHER_API_KEY}&units=metric`;
    if (lat && lon) {
      url += `&lat=${lat}&lon=${lon}`;
    } else {
      url += `&q=${DEFAULT_CITY}`;
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error('Weather fetch failed');
    const data = await res.json();

    return {
      temp: Math.round(data.main.temp),
      city: data.name,
      condition: data.weather[0].main,
      forecast: mockData.forecast // API requires separate call for forecast, keeping mock for now
    };
  } catch (e) {
    console.error("Weather service error:", e);
    return mockData;
  }
};
