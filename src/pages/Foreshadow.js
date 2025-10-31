import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MdCloud, MdWbSunny, MdUmbrella, MdWarning, MdThermostat } from 'react-icons/md';
import './Foreshadow.css';

function Foreshadow() {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [location, setLocation] = useState('Kampala,UG');
  const [patterns, setPatterns] = useState([]);
  const [currentWeather, setCurrentWeather] = useState(null);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    setLoading(true);
    setError('');
    
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    
    if (!apiKey) {
      setError('Weather API key not configured. Please add REACT_APP_WEATHER_API_KEY to your .env file');
      setLoading(false);
      return;
    }

    try {
      // Parse location for coordinates (default to Kampala)
      const locationCoords = location === 'Kampala,UG' ? '0.3476,32.5825' : location;
      
      // Tomorrow.io API endpoint
      const url = `https://api.tomorrow.io/v4/weather/forecast?location=${locationCoords}&apikey=${apiKey}&units=metric`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch weather data. Check your location format or API key.');
      }
      
      const data = await response.json();
      
      // Set current weather from the first data point
      if (data.timelines && data.timelines.daily && data.timelines.daily.length > 0) {
        const current = data.timelines.daily[0].values;
        setCurrentWeather({
          name: location.split(',')[0],
          main: {
            temp: current.temperatureAvg || current.temperature || 0,
            feels_like: current.temperatureApparentAvg || current.temperatureAvg || 0,
            humidity: current.humidityAvg || 0
          },
          wind: {
            speed: current.windSpeedAvg || 0
          },
          weather: [{
            description: getWeatherDescription(current.weatherCodeMax || current.weatherCode || 0)
          }]
        });
      }
      
      // Process daily forecast data (up to 30 days available)
      const processedData = processTomorrowData(data.timelines.daily);
      setWeatherData(processedData);
      
      // Analyze patterns
      const detectedPatterns = analyzeWeatherPatterns(processedData);
      setPatterns(detectedPatterns);
      
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError(err.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const getWeatherDescription = (code) => {
    const weatherCodes = {
      0: 'Unknown',
      1000: 'Clear',
      1100: 'Mostly Clear',
      1101: 'Partly Cloudy',
      1102: 'Mostly Cloudy',
      1001: 'Cloudy',
      2000: 'Fog',
      2100: 'Light Fog',
      4000: 'Drizzle',
      4001: 'Rain',
      4200: 'Light Rain',
      4201: 'Heavy Rain',
      5000: 'Snow',
      5001: 'Flurries',
      5100: 'Light Snow',
      5101: 'Heavy Snow',
      6000: 'Freezing Drizzle',
      6001: 'Freezing Rain',
      6200: 'Light Freezing Rain',
      6201: 'Heavy Freezing Rain',
      7000: 'Ice Pellets',
      7101: 'Heavy Ice Pellets',
      7102: 'Light Ice Pellets',
      8000: 'Thunderstorm'
    };
    return weatherCodes[code] || 'Unknown';
  };

  const processTomorrowData = (dailyData) => {
    // Take first 30 days (or all available data)
    return dailyData.slice(0, 30).map(day => {
      const date = new Date(day.time);
      const dateKey = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const values = day.values;
      
      return {
        date: dateKey,
        temperature: Math.round(values.temperatureAvg || values.temperature || 0),
        humidity: Math.round(values.humidityAvg || 0),
        rainfall: parseFloat((values.precipitationIntensityAvg || 0).toFixed(2)),
        windSpeed: parseFloat((values.windSpeedAvg || 0).toFixed(1)),
        weather: getWeatherDescription(values.weatherCodeMax || values.weatherCode || 0)
      };
    });
  };

  const analyzeWeatherPatterns = (data) => {
    const patterns = [];
    
    if (data.length === 0) return patterns;

    // Check for temperature extremes
    const temps = data.map(d => d.temperature);
    const maxTemp = Math.max(...temps);
    const minTemp = Math.min(...temps);
    const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length;
    
    if (maxTemp > avgTemp + 5) {
      patterns.push({
        type: 'warning',
        title: 'Heat Wave Expected',
        description: `Temperature may reach ${maxTemp}°C, significantly above average (${Math.round(avgTemp)}°C)`,
        icon: 'sun'
      });
    }
    
    if (minTemp < avgTemp - 5) {
      patterns.push({
        type: 'info',
        title: 'Cool Period Coming',
        description: `Temperature may drop to ${minTemp}°C, below average (${Math.round(avgTemp)}°C)`,
        icon: 'cloud'
      });
    }

    // Check for heavy rainfall
    const totalRainfall = data.reduce((sum, d) => sum + d.rainfall, 0);
    const rainyDays = data.filter(d => d.rainfall > 2).length;
    
    if (totalRainfall > 20) {
      patterns.push({
        type: 'warning',
        title: 'Heavy Rainfall Expected',
        description: `Total rainfall of ${totalRainfall.toFixed(1)}mm expected over ${rainyDays} days. Consider crop protection measures.`,
        icon: 'rain'
      });
    } else if (totalRainfall < 5 && data.length > 3) {
      patterns.push({
        type: 'warning',
        title: 'Dry Period Ahead',
        description: `Limited rainfall (${totalRainfall.toFixed(1)}mm) expected. Plan irrigation accordingly.`,
        icon: 'sun'
      });
    }

    // Check for high winds
    const avgWind = data.reduce((sum, d) => sum + d.windSpeed, 0) / data.length;
    if (avgWind > 8) {
      patterns.push({
        type: 'warning',
        title: 'Strong Winds Expected',
        description: `Average wind speed of ${avgWind.toFixed(1)} m/s. Secure crops and structures.`,
        icon: 'warning'
      });
    }

    // Check for high humidity (disease risk)
    const avgHumidity = data.reduce((sum, d) => sum + d.humidity, 0) / data.length;
    if (avgHumidity > 80) {
      patterns.push({
        type: 'info',
        title: 'High Humidity Period',
        description: `Average humidity ${Math.round(avgHumidity)}%. Monitor for fungal diseases.`,
        icon: 'warning'
      });
    }

    return patterns;
  };

  const getPatternIcon = (iconType) => {
    switch (iconType) {
      case 'sun': return <MdWbSunny />;
      case 'rain': return <MdUmbrella />;
      case 'cloud': return <MdCloud />;
      case 'warning': return <MdWarning />;
      default: return <MdThermostat />;
    }
  };

  const handleLocationChange = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  if (loading) {
    return (
      <div className="foreshadow-page">
        <div className="container">
          <div className="loading">Loading weather forecast...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="foreshadow-page page-transition">
      <div className="page-header">
        <h1>Weather Foreshadow</h1>
        <p className="page-subtitle">30-day weather forecast and agricultural insights</p>
      </div>

      {/* Location Selector */}
      <div className="location-selector">
        <form onSubmit={handleLocationChange}>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter coordinates (e.g., 0.3476,32.5825) or Kampala,UG"
            className="location-input"
          />
          <button type="submit" className="btn btn-primary">Update Location</button>
        </form>
        <p className="location-hint">💡 Use latitude,longitude format for best results</p>
      </div>

      {error && (
        <div className="error-message">
          <MdWarning /> {error}
        </div>
      )}

      {/* Current Weather */}
      {currentWeather && (
        <div className="current-weather-card">
          <div className="current-weather-main">
            <div className="current-temp">
              <MdThermostat className="temp-icon" />
              <span className="temp-value">{Math.round(currentWeather.main.temp)}°C</span>
            </div>
            <div className="current-details">
              <h3>{currentWeather.name}, {currentWeather.sys.country}</h3>
              <p className="weather-description">{currentWeather.weather[0].description}</p>
              <div className="current-stats">
                <div className="stat">
                  <span className="label">Feels Like:</span>
                  <span className="value">{Math.round(currentWeather.main.feels_like)}°C</span>
                </div>
                <div className="stat">
                  <span className="label">Humidity:</span>
                  <span className="value">{currentWeather.main.humidity}%</span>
                </div>
                <div className="stat">
                  <span className="label">Wind:</span>
                  <span className="value">{currentWeather.wind.speed} m/s</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Weather Patterns */}
      {patterns.length > 0 && (
        <div className="patterns-section">
          <h2>Significant Weather Patterns</h2>
          <div className="patterns-grid">
            {patterns.map((pattern, index) => (
              <div key={index} className={`pattern-card ${pattern.type}`}>
                <div className="pattern-icon">
                  {getPatternIcon(pattern.icon)}
                </div>
                <div className="pattern-content">
                  <h3>{pattern.title}</h3>
                  <p>{pattern.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weather Charts */}
      {weatherData.length > 0 && (
        <>
          {/* Temperature Chart */}
          <div className="chart-section">
            <h2>Temperature Forecast</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={weatherData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="temperature" 
                  stroke="#22C55E" 
                  fill="#22C55E" 
                  fillOpacity={0.3}
                  name="Temperature (°C)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Rainfall Chart */}
          <div className="chart-section">
            <h2>Rainfall Forecast</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={weatherData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="rainfall" 
                  stroke="#3B82F6" 
                  fill="#3B82F6" 
                  fillOpacity={0.3}
                  name="Rainfall (mm)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Combined Chart */}
          <div className="chart-section">
            <h2>Multi-Factor Forecast</h2>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={weatherData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="temperature" 
                  stroke="#22C55E" 
                  strokeWidth={2}
                  name="Temperature (°C)"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="humidity" 
                  stroke="#F59E0B" 
                  strokeWidth={2}
                  name="Humidity (%)"
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="windSpeed" 
                  stroke="#8B5CF6" 
                  strokeWidth={2}
                  name="Wind Speed (m/s)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Forecast Table */}
          <div className="forecast-table-section">
            <h2>Detailed Forecast</h2>
            <div className="forecast-table">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Temperature</th>
                    <th>Humidity</th>
                    <th>Rainfall</th>
                    <th>Wind Speed</th>
                    <th>Conditions</th>
                  </tr>
                </thead>
                <tbody>
                  {weatherData.map((day, index) => (
                    <tr key={index}>
                      <td>{day.date}</td>
                      <td>{day.temperature}°C</td>
                      <td>{day.humidity}%</td>
                      <td>{day.rainfall}mm</td>
                      <td>{day.windSpeed} m/s</td>
                      <td>{day.weather}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Foreshadow;
