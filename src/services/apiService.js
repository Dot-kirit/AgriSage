// Default coordinates (e.g. Agricultural zone in Central India / adaptable per country)
export const DEFAULT_COORDINATES = {
  lat: 20.5937,
  lon: 78.9629,
};

/**
 * Fetches real-time weather telemetry from Open-Meteo satellite models
 */
export async function fetchLiveWeatherData(lat = DEFAULT_COORDINATES.lat, lon = DEFAULT_COORDINATES.lon) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&timezone=auto`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Weather API error: ${response.status}`);
    
    const data = await response.json();
    const current = data.current;

    return {
      title: 'Weather Analysis',
      subtitle: `Live Telemetry (${data.timezone_abbreviation || 'Local'})`,
      temperature: `${Math.round(current.temperature_2m)}°C`,
      humidity: `${Math.round(current.relative_humidity_2m)}%`,
      rainfall: `${current.precipitation} mm`,
      windSpeed: `${Math.round(current.wind_speed_10m)} km/h`,
      isLive: true,
    };
  } catch (error) {
    console.warn('Falling back to cached weather data:', error);
    return null;
  }
}