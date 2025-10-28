import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, StyleSheet, Text, View } from 'react-native';

export default function LocationScreen() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiKey = 'ed0604f6922da175d2395178306397bd';

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
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 10 }}>Dohvaćam lokaciju...</Text>
      </View>
    );
  }

  if (!weather || !weather.main) {
    return (
      <View style={styles.center}>
        <Text>Neuspješno dohvaćanje podataka o vremenu.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vrijeme na tvojoj lokaciji</Text>
      <Text style={styles.city}>{weather.name}</Text>

      <Image
        source={{ uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png` }}
        style={{ width: 150, height: 150 }}
      />

      <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
      <Text style={styles.desc}>{weather.weather[0].description}</Text>

      <View style={styles.infoBox}>
        <Text>Osjećaj: {Math.round(weather.main.feels_like)}°C</Text>
        <Text>Vlažnost: {weather.main.humidity}%</Text>
        <Text>Pritisak: {weather.main.pressure} hPa</Text>
        <Text>Vjetar: {weather.wind.speed} m/s</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  city: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  temp: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  desc: {
    fontSize: 18,
    marginBottom: 10,
    textTransform: 'capitalize',
  },
  infoBox: {
    marginTop: 10,
    alignItems: 'center',
  },
});