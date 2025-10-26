import { useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { getWeather } from '../api/weatherApi';

export default function HomeScreen({ navigation }) {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    const data = await getWeather(city);
    setWeather(data);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌤️ Vremenska prognoza</Text>
      <TextInput
        style={styles.input}
        placeholder="Unesi grad..."
        value={city}
        onChangeText={setCity}
      />
      <Button title="Prikaži vrijeme" onPress={fetchWeather} />

      {loading && <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />}

      {weather && weather.main && (
        <View style={styles.result}>
          <Text style={styles.city}>{weather.name}</Text>
          <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
          <Text>{weather.weather[0].description}</Text>
          <Button
            title="Detalji"
            onPress={() => navigation.navigate('Detalji', { weather })}
          />
        </View>
      )}
    </View>
  );
}

<Button
  title="5-dnevna prognoza"
  onPress={() =>
    navigation.navigate('Prognoza', {
      city: weather.name,
      apiKey: 'ed0604f6922da175d2395178306397bd',
    })
  }
/>


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    width: '80%',
    marginBottom: 10,
  },
  result: {
    marginTop: 20,
    alignItems: 'center',
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
});
