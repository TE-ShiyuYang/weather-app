import axios from 'axios';

export async function getCityCoords(city: string) {
  const res = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
  const { latitude, longitude } = res.data.results[0];
  return { latitude, longitude };
}


// for Chinese language support, but blocked in mainland network
export async function getCoordinatesFromCity(city: string) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1`;

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Weather-app/1.0 (weather@email.com)',
      'Accept-Language': 'en',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch coordinates');
  }

  const data = await response.json();

  if (data.length === 0) {
    throw new Error('City not found');
  }

  const { lat, lon, display_name } = data[0];

  return {
    latitude: parseFloat(lat),
    longitude: parseFloat(lon),
    name: display_name,
  };
}

export async function getWeatherData(lat: number, lon: number) {
  const res = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
  );
  return res.data.daily;
}
