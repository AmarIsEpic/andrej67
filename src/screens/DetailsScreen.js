import { StyleSheet, Text, View } from 'react-native';

export default function DetailsScreen({ route }) {
  const { weather } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalji za {weather.name}</Text>
      <View style={styles.grid}>
        <View style={styles.card}><Text style={styles.label}>Temp</Text><Text style={styles.value}>{Math.round(weather.main.temp)}°C</Text></View>
        <View style={styles.card}><Text style={styles.label}>Osjećaj</Text><Text style={styles.value}>{Math.round(weather.main.feels_like)}°C</Text></View>
        <View style={styles.card}><Text style={styles.label}>Vlažnost</Text><Text style={styles.value}>{weather.main.humidity}%</Text></View>
        <View style={styles.card}><Text style={styles.label}>Pritisak</Text><Text style={styles.value}>{weather.main.pressure} hPa</Text></View>
        <View style={styles.card}><Text style={styles.label}>Vjetar</Text><Text style={styles.value}>{weather.wind.speed} m/s</Text></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#0B0F14',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#E6EDF3',
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(125,92,255,0.15)',
    padding: 14,
    marginBottom: 12,
  },
  label: {
    color: '#B8C4CF',
    marginBottom: 6,
  },
  value: {
    color: '#5EE1FF',
    fontWeight: '700',
    fontSize: 18,
  },
});