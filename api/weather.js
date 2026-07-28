function symbolToWMO(symbol) {
  if (!symbol) return 3;
  const base = symbol.split('_')[0];
  if (base.includes('clear')) return 0;
  if (base.includes('fair')) return 1;
  if (base.includes('partlycloudy')) return 2;
  if (base.includes('cloudy')) return 3;
  if (base.includes('fog')) return 45;
  if (base.includes('lightrain')) return 61;
  if (base.includes('heavyrain')) return 65;
  if (base.includes('rain')) return 63;
  if (base.includes('lightsnow')) return 71;
  if (base.includes('heavysnow')) return 75;
  if (base.includes('snow')) return 73;
  if (base.includes('sleet')) return 61;
  return 3;
}

module.exports = async function handler(req, res) {
  const lat = req.query.lat || '55.6415';
  const lon = req.query.lon || '12.0803';

  try {
    const yrRes = await fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`, {
      headers: { 'User-Agent': 'WeatherApp-Vercel-deepthakkar/1.0' }
    });
    
    if (!yrRes.ok) {
      throw new Error('Yr.no API error: ' + yrRes.status);
    }

    const yrData = await yrRes.json();
    const ts = yrData.properties.timeseries;

    const out = {
      current: {},
      hourly: {
        time: [], temperature_2m: [], precipitation: [], precipitation_probability: [],
        weather_code: [], is_day: [], uv_index: [], wind_speed_10m: [], wind_gusts_10m: [],
        wind_direction_10m: [], relative_humidity_2m: [], apparent_temperature: [],
        cloud_cover: [], pressure_msl: [], visibility: []
      },
      daily: {
        time: [], weather_code: [], temperature_2m_max: [], temperature_2m_min: [],
        precipitation_sum: [], precipitation_probability_max: [], sunrise: [], sunset: []
      }
    };

    const dailyMap = {};

    ts.forEach((t, index) => {
      const timeStr = t.time.slice(0, 16);
      const dayStr = t.time.slice(0, 10);
      const details = t.data.instant.details;
      const next1 = t.data.next_1_hours || t.data.next_6_hours || {};
      const symbol = next1.summary?.symbol_code || '';
      
      const wmo = symbolToWMO(symbol);
      const temp = details.air_temperature || 0;
      const is_day = symbol.includes('night') ? 0 : 1;

      if (index === 0) {
        out.current = {
          temperature_2m: temp,
          relative_humidity_2m: details.relative_humidity || 0,
          apparent_temperature: temp,
          is_day: is_day,
          precipitation: next1.details?.precipitation_amount || 0,
          weather_code: wmo,
          cloud_cover: details.cloud_area_fraction || 0,
          pressure_msl: details.air_pressure_at_sea_level || 0,
          wind_speed_10m: details.wind_speed || 0,
          wind_direction_10m: details.wind_from_direction || 0,
          wind_gusts_10m: details.wind_speed_of_gust || 0,
          visibility: 10000,
          time: timeStr
        };
      }

      out.hourly.time.push(timeStr);
      out.hourly.temperature_2m.push(temp);
      out.hourly.precipitation.push(next1.details?.precipitation_amount || 0);
      out.hourly.precipitation_probability.push(next1.details?.probability_of_precipitation || 0);
      out.hourly.weather_code.push(wmo);
      out.hourly.is_day.push(is_day);
      out.hourly.uv_index.push(details.ultraviolet_index_clear_sky || 0);
      out.hourly.wind_speed_10m.push(details.wind_speed || 0);
      out.hourly.wind_gusts_10m.push(details.wind_speed_of_gust || 0);
      out.hourly.wind_direction_10m.push(details.wind_from_direction || 0);
      out.hourly.relative_humidity_2m.push(details.relative_humidity || 0);
      out.hourly.apparent_temperature.push(temp);
      out.hourly.cloud_cover.push(details.cloud_area_fraction || 0);
      out.hourly.pressure_msl.push(details.air_pressure_at_sea_level || 0);
      out.hourly.visibility.push(10000);

      if (!dailyMap[dayStr]) {
        dailyMap[dayStr] = { min: temp, max: temp, precip: 0, prob: 0, codes: [] };
      } else {
        dailyMap[dayStr].min = Math.min(dailyMap[dayStr].min, temp);
        dailyMap[dayStr].max = Math.max(dailyMap[dayStr].max, temp);
      }
      dailyMap[dayStr].precip += (next1.details?.precipitation_amount || 0);
      dailyMap[dayStr].prob = Math.max(dailyMap[dayStr].prob, next1.details?.probability_of_precipitation || 0);
      dailyMap[dayStr].codes.push(wmo);
    });

    for (const [day, stats] of Object.entries(dailyMap)) {
      out.daily.time.push(day);
      out.daily.temperature_2m_max.push(stats.max);
      out.daily.temperature_2m_min.push(stats.min);
      out.daily.precipitation_sum.push(stats.precip);
      out.daily.precipitation_probability_max.push(stats.prob);
      out.daily.weather_code.push(stats.codes[Math.floor(stats.codes.length / 2)] || 3);
      out.daily.sunrise.push(day + "T06:00");
      out.daily.sunset.push(day + "T18:00");
    }

    res.status(200).json(out);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
