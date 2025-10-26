import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

export default function ForecastScreen({ route }) {
  const { city, apiKey } = route.params;
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}&lang=hr`
        );
        const data = await response.json();
        setForecast(data.list.slice(0, 5));
      } catch (error) {
        console.error('Greška prilikom dohvaćanja prognoze:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>5-dnevna prognoza za {city}</Text>
      <FlatList
        data={forecast}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.time}>{item.dt_txt}</Text>
            <Text>{Math.round(item.main.temp)}°C</Text>
            <Text>{item.weather[0].description}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    },
  item: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  time: {
    fontWeight: 'bold',
  },
});