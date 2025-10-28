import { useContext, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { getForecast, getWeather, groupDaily } from '../api/weatherApi';
import CozyBackground from '../components/CozyBackground';
import CurrentWeatherCard from '../components/CurrentWeatherCard';
import HourlyForecast from '../components/HourlyForecast';
import WeatherDetails from '../components/WeatherDetails';
import WeatherHeader from '../components/WeatherHeader';
import WeeklyForecast from '../components/WeeklyForecast';
import { gradientForCondition } from '../theme/cozyTheme';
import { ThemeContext } from '../theme/ThemeContext';

export default function HomeScreen({ navigation }) {
  const { setAccentFromWeather } = useContext(ThemeContext);
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [forecast, setForecast] = useState(null);

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError('');
    const data = await getWeather(city);
    if (!data || (data.cod && Number(data.cod) !== 200)) {
      setError('Grad nije pronađen. Pokušaj ponovo.');
      setWeather(null);
      setLoading(false);
      return;
    }
    setWeather(data);
    setLoading(false);
    try {
      const condition = data?.weather?.[0]?.main || data?.weather?.[0]?.description;
      setAccentFromWeather(condition);
    } catch {}
    try {
      const f = await getForecast(city);
      setForecast(f);
    } catch {}
  };

  return (
    <View style={styles.container}>
      <CozyBackground colors={gradientForCondition(weather?.weather?.[0]?.main, true)} />
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }} style={{ width: '100%' }}>
        <WeatherHeader city={weather?.name || 'Grad'} />

        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Unesi grad..."
            placeholderTextColor="#8091A2"
            value={city}
            onChangeText={setCity}
          />

          <Pressable style={styles.primaryButton} onPress={fetchWeather}>
            <Text style={styles.primaryButtonText}>Prikaži vrijeme</Text>
          </Pressable>
        </View>

        {loading && <ActivityIndicator size="large" color="#5EE1FF" style={{ marginTop: 24 }} />}
        {!!error && (
          <View style={[styles.result, { borderColor: 'rgba(255,180,162,0.35)' }]}> 
            <Text style={{ color: '#FFB4A2' }}>{error}</Text>
          </View>
        )}

        {weather && weather.main && (
          <View>
            <CurrentWeatherCard isDark temp={weather.main.temp} condition={weather.weather[0].description} />
            <WeatherDetails isDark feelsLike={weather.main.feels_like} humidity={weather.main.humidity} wind={weather.wind.speed} />
          </View>
        )}

        {forecast?.list && (
          <>
            <HourlyForecast isDark list={forecast.list} />
            <WeeklyForecast isDark days={groupDaily(forecast.list)} />
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#0B0F14',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#E6EDF3',
  },
  card: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(94,225,255,0.15)',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    backdropFilter: 'blur(10px)',
  },
  input: {
    backgroundColor: '#0F1621',
    borderWidth: 1,
    borderColor: '#1B2837',
    borderRadius: 12,
    padding: 12,
    color: '#E6EDF3',
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: '#5EE1FF',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#0B0F14',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  result: {
    marginTop: 24,
    alignItems: 'center',
    padding: 16,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(125,92,255,0.15)'
  },
  city: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E6EDF3',
  },
  temp: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#5EE1FF',
    marginVertical: 4,
  },
  desc: {
    color: '#B8C4CF',
    textTransform: 'capitalize',
  },
  actionsRow: {
    flexDirection: 'row',
    marginTop: 16,
  },
  secondaryButton: {
    backgroundColor: '#0F1621',
    borderWidth: 1,
    borderColor: '#1B2837',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  secondaryButtonText: {
    color: '#E6EDF3',
    fontWeight: '600',
  },
});