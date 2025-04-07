import React, { useEffect, useState } from 'react';
import { getCityCoords, getWeatherData } from './api';
import Weather from './Weather';

function App() {
  const [city, setCity] = useState('Shanghai');
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (cityName: string) => {
    try {
      setLoading(true);
      const { latitude, longitude } = await getCityCoords(cityName);
      const data = await getWeatherData(latitude, longitude);
      setWeather(data);
    } catch (error) {
      console.error('Error fetching weather:', error);
      alert('城市名称有误或找不到数据');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeather(city);
  };

  return (
    <div className="App">
      <h1>天气预报</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="输入城市名称"
        />
        <button type="submit">查询</button>
      </form>

      {loading ? (
        <p>加载中...</p>
      ) : weather ? (
        <Weather data={weather} />
      ) : null}
    </div>
  );
}

export default App;
