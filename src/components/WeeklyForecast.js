import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

export default function WeeklyForecast({ days = [], isDark }) {
  return (
    <View style={{ marginTop: 16 }}>
      <Text style={[styles.title, isDark && { color: '#E8E6E3' }]}>5 dana</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={days}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <View style={[styles.card, isDark && styles.cardDark]}>
            <Text style={[styles.day, isDark && { color: '#B8C0CC' }]}>{new Date(item.date).toLocaleDateString(undefined, { weekday: 'short' })}</Text>
            <Image source={{ uri: `https://openweathermap.org/img/wn/${item.icon}.png` }} style={{ width: 36, height: 36 }} />
            <Text style={[styles.temp, isDark && { color: '#E8E6E3' }]}>{item.temp}°</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: { color: '#2B3A55', marginBottom: 8, fontFamily: 'Nunito_700Bold' },
  card: { backgroundColor: '#FFFFFF', padding: 10, borderRadius: 14, marginRight: 10, alignItems: 'center', width: 80 },
  cardDark: { backgroundColor: '#151B2D' },
  day: { color: '#6B7280', marginBottom: 6, fontFamily: 'Nunito_400Regular' },
  temp: { color: '#2B3A55', marginTop: 6, fontFamily: 'Nunito_700Bold' },
});


