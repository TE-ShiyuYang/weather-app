import React from 'react';
import './Weather.css';

interface WeatherProps {
  data: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weathercode: number[];
  };
}

const weatherCodeMap: Record<number, string> = {
  0: '晴天',
  1: '主要晴天',
  2: '局部多云',
  3: '多云',
  45: '有雾',
  48: '雾凇',
  51: '小毛毛雨',
  53: '毛毛雨',
  55: '大毛毛雨',
  56: '小冻毛毛雨',
  57: '冻毛毛雨',
  61: '小雨',
  63: '中雨',
  65: '大雨',
  66: '小冻雨',
  67: '冻雨',
  71: '小雪',
  73: '中雪',
  75: '大雪',
  77: '雪粒',
  80: '小阵雨',
  81: '阵雨',
  82: '大阵雨',
  85: '小阵雪',
  86: '阵雪',
  95: '雷阵雨',
  96: '小雷阵雨带冰雹',
  99: '雷阵雨带冰雹'
};

const Weather: React.FC<WeatherProps> = ({ data }) => {
  return (
    <div className="weather-container">
      {data.time.map((date, index) => (
        <div className="weather-card" key={date}>
          <h3>{date}</h3>
          <div className="weather-icon">{getWeatherIcon(data.weathercode[index])}</div>
          <p>{weatherCodeMap[data.weathercode[index]] || '未知天气'}</p>
          <p>最高温: {data.temperature_2m_max[index]}°C</p>
          <p>最低温: {data.temperature_2m_min[index]}°C</p>
        </div>
      ))}
    </div>
  );
};

function getWeatherIcon(code: number): React.ReactElement {
  // 晴天相关
  if (code === 0) return <span>☀️</span>;
  if (code === 1) return <span>🌤️</span>;
  if (code === 2) return <span>⛅</span>;
  if (code === 3) return <span>☁️</span>;
  
  // 雾相关
  if (code === 45 || code === 48) return <span>🌫️</span>;
  
  // 毛毛雨相关
  if (code >= 51 && code <= 55) return <span>🌧️</span>;
  if (code === 56 || code === 57) return <span>🌨️</span>;
  
  // 雨相关
  if (code >= 61 && code <= 65) return <span>🌧️</span>;
  if (code === 66 || code === 67) return <span>🌨️</span>;
  
  // 雪相关
  if (code >= 71 && code <= 75) return <span>❄️</span>;
  if (code === 77) return <span>🌨️</span>;
  
  // 阵雨相关
  if (code >= 80 && code <= 82) return <span>🌦️</span>;
  
  // 阵雪相关
  if (code === 85 || code === 86) return <span>🌨️</span>;
  
  // 雷阵雨相关
  if (code === 95) return <span>⛈️</span>;
  if (code === 96 || code === 99) return <span>🌩️</span>;
  
  return <span>❓</span>;
}

export default Weather;
