import * as Location from 'expo-location';
import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, StyleSheet, Text, View } from 'react-native';
import { ThemeContext } from '../theme/ThemeContext';

export default function LocationScreen() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiKey = 'ed0604f6922da175d2395178306397bd';
  const { setAccentFromWeather } = useContext(ThemeContext);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Greška', 'Dozvola za pristup lokaciji je odbijena.');
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}&lang=hr`
        );
        const data = await response.json();
        setWeather(data);
        try {
          const condition = data?.weather?.[0]?.main || data?.weather?.[0]?.description;
          setAccentFromWeather(condition);
        } catch {}
      } catch (error) {
        console.error('Greška pri dohvaćanju vremena:', error);
        Alert.alert('Greška', 'Neuspješno dohvaćanje vremenskih podataka.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#5EE1FF" />
        <Text style={styles.loadingText}>Dohvaćam lokaciju...</Text>
      </View>
    );
  }

  if (!weather || !weather.main) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Neuspješno dohvaćanje podataka o vremenu.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vrijeme na tvojoj lokaciji</Text>
      <Text style={styles.city}>{weather.name}</Text>

      <View style={styles.hero}>
        <Image
          source={{ uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png` }}
          style={{ width: 150, height: 150 }}
        />
        <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
        <Text style={styles.desc}>{weather.weather[0].description}</Text>
      </View>

      <View style={styles.infoBox}>
        <View style={styles.row}><Text style={styles.label}>Osjećaj</Text><Text style={styles.value}>{Math.round(weather.main.feels_like)}°C</Text></View>
        <View style={styles.row}><Text style={styles.label}>Vlažnost</Text><Text style={styles.value}>{weather.main.humidity}%</Text></View>
        <View style={styles.row}><Text style={styles.label}>Pritisak</Text><Text style={styles.value}>{weather.main.pressure} hPa</Text></View>
        <View style={styles.row}><Text style={styles.label}>Vjetar</Text><Text style={styles.value}>{weather.wind.speed} m/s</Text></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#0B0F14',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0B0F14',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#E6EDF3',
  },
  city: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E6EDF3',
  },
  hero: {
    marginTop: 8,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(94,225,255,0.12)'
  },
  temp: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#5EE1FF',
  },
  desc: {
    fontSize: 18,
    marginBottom: 10,
    textTransform: 'capitalize',
    color: '#B8C4CF',
  },
  infoBox: {
    width: '100%',
    marginTop: 16,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(125,92,255,0.15)'
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  label: { color: '#B8C4CF' },
  value: { color: '#E6EDF3', fontWeight: '600' },
  loadingText: { color: '#B8C4CF', marginTop: 10 },
  errorText: { color: '#FF7D7D' },
});