# Weather Foreshadow Setup Guide

## Overview
The Foreshadow page provides weather forecasting with agricultural insights, helping farmers make informed decisions based on upcoming weather patterns.

## Features
- **30-Day Weather Forecast**: Temperature, humidity, rainfall, and wind speed predictions
- **Current Weather**: Real-time weather conditions for your location
- **Pattern Detection**: Automatic identification of significant weather patterns such as:
  - Heat waves
  - Cool periods
  - Heavy rainfall
  - Dry spells
  - High winds
  - High humidity (disease risk)
- **Interactive Charts**: Visual representation of weather data using multiple chart types
- **Location Support**: Search weather for any city worldwide
- **Agricultural Insights**: Weather patterns are analyzed specifically for farming needs

## Setup Instructions

### 1. API Key Already Configured! ✅

Your API key is already set up in the `.env` file:
```
REACT_APP_WEATHER_API_KEY=OINVc792ou8WjUogXGxu8A49sqnsXW6N
```

**API Provider**: Tomorrow.io
**Features Available**:
- 30-day daily forecast
- Current weather conditions
- Hourly forecasts
- Multiple weather parameters
- Global coverage

**Note**: If you need your own API key:
1. Go to [Tomorrow.io](https://www.tomorrow.io/)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Replace the key in `.env`

### 2. No Additional Setup Required

The API key is already configured and ready to use!

### 3. Restart Your Development Server

**IMPORTANT**: React requires a full restart to load new environment variables.

1. Stop your current dev server (Ctrl+C)
2. Run: `npm start`
3. Wait for the server to start

### 4. Access the Foreshadow Page

1. Log in to your account
2. Click "Weather Forecast" in the sidebar (cloud icon)
3. The default location is Kampala, Uganda (0.3476,32.5825)
4. Change location using coordinates or city name

## Using the Foreshadow Page

### Location Search
- **Best Format**: `Latitude,Longitude` (coordinates)
- **Alternative**: City name (e.g., `Kampala,UG`)
- **Examples**:
  - `0.3476,32.5825` (Kampala, Uganda)
  - `-1.2864,36.8172` (Nairobi, Kenya)
  - `51.5074,-0.1278` (London, UK)
  - `40.7128,-74.0060` (New York, USA)

### Understanding the Charts

1. **Temperature Chart**: Shows temperature trends over 30 days
2. **Rainfall Chart**: Displays expected rainfall amounts
3. **Multi-Factor Chart**: Combines temperature, humidity, and wind speed

### Pattern Alerts

The system automatically detects and highlights:

- **⚠️ Warning Patterns** (Yellow):
  - Heat waves
  - Heavy rainfall
  - Dry periods
  - Strong winds

- **ℹ️ Info Patterns** (Blue):
  - Cool periods
  - High humidity (fungal disease risk)

### Agricultural Insights

Each pattern includes specific recommendations for farmers:
- Crop protection measures
- Irrigation planning
- Disease monitoring
- Structure securing

## Troubleshooting

### "Weather API key not configured"
- Make sure you added your API key to `.env`
- Restart your dev server after adding the key
- Check that the variable name is exactly: `REACT_APP_WEATHER_API_KEY`

### "Failed to fetch weather data"
- Check your internet connection
- Verify your API key is correct
- Make sure you haven't exceeded your API plan limits
- Check the location format (use coordinates: lat,lon)

### No data showing
- Wait a few minutes - new API keys may take time to activate
- Try a different location
- Check the browser console for errors (F12)

## API Details (Tomorrow.io)

- **Forecast Period**: Up to 30 days
- **Update Frequency**: Daily forecasts
- **API Calls**: As per Tomorrow.io plan limits
- **Data Points**: Temperature, humidity, precipitation, wind speed, weather codes

**Features**:
- ✅ 30-day daily forecasts
- ✅ Current weather conditions
- ✅ Multiple weather parameters
- ✅ Global coverage
- ✅ Weather pattern codes for accurate descriptions

## Technical Details

### API Endpoint Used
- Tomorrow.io Forecast API: `api.tomorrow.io/v4/weather/forecast`

### Data Processing
- Forecasts are grouped by day
- Daily averages are calculated from 3-hour intervals
- Pattern detection uses statistical analysis
- Charts are rendered using Recharts library

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the [Tomorrow.io API documentation](https://docs.tomorrow.io/)
3. Ensure your API key is active and valid
4. Verify location coordinates are correct

## Future Enhancements

Potential improvements:
- Historical weather data comparison
- Crop-specific recommendations based on weather
- Weather alerts/notifications via email
- Hourly forecast view (already available in API)
- Multiple location tracking
- Export weather reports to PDF
- Integration with planting calendar
