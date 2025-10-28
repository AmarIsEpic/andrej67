import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useContext, useEffect } from 'react';
import { ThemeContext } from '../theme/ThemeContext';
import { getWeather } from '../api/weatherApi';

export default function HomeScreen({ navigation }) {
  const { setAccentFromWeather } = useContext(ThemeContext);
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    const data = await getWeather(city);
    setWeather(data);
    setLoading(false);
    try {
      const condition = data?.weather?.[0]?.main || data?.weather?.[0]?.description;
      setAccentFromWeather(condition);
    } catch {}
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vremenska prognoza</Text>

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

      {weather && weather.main && (
        <View style={styles.result}>
          <Text style={styles.city}>{weather.name}</Text>
          <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
          <Text style={styles.desc}>{weather.weather[0].description}</Text>

          <View style={styles.actionsRow}>
            <Pressable
              style={[styles.secondaryButton, { marginRight: 12 }]}
              onPress={() => navigation.navigate('detalji', { weather })}
            >
              <Text style={styles.secondaryButtonText}>Detalji</Text>
            </Pressable>
            <Pressable
              style={styles.secondaryButton}
              onPress={() =>
                navigation.navigate('prognoza', {
                  city: weather.name,
                  apiKey: 'ed0604f6922da175d2395178306397bd',
                })
              }
            >
              <Text style={styles.secondaryButtonText}>5-dnevna</Text>
            </Pressable>
          </View>
        </View>
      )}
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