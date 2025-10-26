import { StyleSheet, Text, View } from 'react-native';

export default function DetailsScreen({ route }) {
  const { weather } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalji za {weather.name}</Text>
      <Text>Temperatura: {Math.round(weather.main.temp)}°C</Text>
      <Text>Osjećaj: {Math.round(weather.main.feels_like)}°C</Text>
      <Text>Vlažnost: {weather.main.humidity}%</Text>
      <Text>Pritisak: {weather.main.pressure} hPa</Text>
      <Text>Vjetar: {weather.wind.speed} m/s</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});