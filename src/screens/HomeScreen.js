import { Ionicons } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { getForecast, getWeather, groupDaily } from '../api/weatherApi';
import CozyBackground from '../components/CozyBackground';
import CurrentWeatherCard from '../components/CurrentWeatherCard';
import HourlyForecast from '../components/HourlyForecast';
import WeatherDetails from '../components/WeatherDetails';
import WeatherHeader from '../components/WeatherHeader';
import WeeklyForecast from '../components/WeeklyForecast';
import { FavoritesContext } from '../context/FavoritesContext';
import { gradientForCondition } from '../theme/cozyTheme';
import { ThemeContext } from '../theme/ThemeContext';

export default function HomeScreen({ navigation }) {
  const { setAccentFromWeather, units, isDark } = useContext(ThemeContext);
  const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext);
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [forecast, setForecast] = useState(null);

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError('');
    const data = await getWeather(city, units);
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
      const f = await getForecast(city, units);
      setForecast(f);
    } catch {}
  };

  return (
    <View style={[styles.container, isDark ? styles.containerDark : styles.containerLight]}>
      {!isDark && <CozyBackground colors={gradientForCondition(weather?.weather?.[0]?.main, false)} />}
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }} style={{ width: '100%' }}>
        <WeatherHeader city={weather?.name || 'Grad'} isDark={isDark} />

        <View style={[styles.card, isDark ? styles.cardDark : styles.cardLight]}>
          <TextInput
            style={[styles.input, isDark ? styles.inputDark : styles.inputLight]}
            placeholder="Unesi grad..."
            placeholderTextColor={isDark ? '#8091A2' : '#6B7280'}
            value={city}
            onChangeText={setCity}
          />

          <Pressable style={styles.primaryButton} onPress={fetchWeather}>
            <Text style={styles.primaryButtonText}>Prikaži vrijeme</Text>
          </Pressable>
        </View>

        {loading && <ActivityIndicator size="large" color="#5EE1FF" style={{ marginTop: 24 }} />}
        {!!error && (
          <View style={[styles.result, isDark ? styles.resultDark : styles.resultLight]}> 
            <Text style={{ color: '#FFB4A2' }}>{error}</Text>
          </View>
        )}

        {weather && weather.main && (
          <View>
            <View style={styles.favoriteContainer}>
              <Text style={[styles.cityName, isDark ? styles.textDark : styles.textLight]}>
                {weather.name}
              </Text>
              <Pressable
                onPress={() => {
                  if (isFavorite(weather.name)) {
                    removeFavorite(weather.name);
                  } else {
                    addFavorite(weather.name);
                  }
                }}
                style={styles.favoriteButton}
              >
                <Ionicons
                  name={isFavorite(weather.name) ? 'heart' : 'heart-outline'}
                  size={24}
                  color={isFavorite(weather.name) ? '#FF7D7D' : (isDark ? '#8091A2' : '#6B7280')}
                />
              </Pressable>
            </View>
            <CurrentWeatherCard isDark temp={weather.main.temp} condition={weather.weather[0].description} units={units} />
            <WeatherDetails isDark feelsLike={weather.main.feels_like} humidity={weather.main.humidity} wind={weather.wind.speed} units={units} />
          </View>
        )}

        {forecast?.list && (
          <>
            <HourlyForecast isDark list={forecast.list} units={units} />
            <WeeklyForecast isDark days={groupDaily(forecast.list)} units={units} />
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
  },
  containerDark: {
    backgroundColor: '#0B0F14',
  },
  containerLight: {
    backgroundColor: '#F7F9FC',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#E6EDF3',
  },
  card: {
    width: '100%',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
  },
  cardDark: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderColor: 'rgba(94,225,255,0.15)',
  },
  cardLight: {
    backgroundColor: '#FFFFFF',
    borderColor: 'rgba(94,225,255,0.3)',
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  inputDark: {
    backgroundColor: '#0F1621',
    borderColor: '#1B2837',
    color: '#E6EDF3',
  },
  inputLight: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E0E0E0',
    color: '#0B0F14',
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
    borderRadius: 16,
    borderWidth: 1,
  },
  resultDark: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderColor: 'rgba(255,180,162,0.35)',
  },
  resultLight: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderColor: 'rgba(255,180,162,0.5)',
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
  favoriteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingHorizontal: 4,
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Nunito_700Bold',
  },
  textDark: {
    color: '#E6EDF3',
  },
  textLight: {
    color: '#0B0F14',
  },
  favoriteButton: {
    padding: 8,
  },
});