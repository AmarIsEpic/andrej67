import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function WeatherHeader({ city }) {
  const date = new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
  return (
    <View style={styles.container}>
      <Text style={styles.city} numberOfLines={1}>{city}</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', alignItems: 'center', marginBottom: 12 },
  city: { fontSize: 28, color: '#2B3A55', fontFamily: 'Nunito_800ExtraBold' },
  date: { color: '#6B7280', marginTop: 4, fontFamily: 'Nunito_400Regular' },
});


