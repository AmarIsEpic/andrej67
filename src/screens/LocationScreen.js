import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, Text, View } from 'react-native';

export default function LocationScreen() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const apiKey= 'ed0604f6922da175d2395178306397bd';

    useEffect(() => {
        (async () => {
            let { status } =  await Location.requestForegroundPermissionAsync();
            if ( status !== 'granted') {
                Alert.alert('Greska', 'Dozvovla za pristup lokaciji je oobijena');
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
            console.error('Greska pri dohvacanju vremena:', error);
            Alert.alert('Greska', 'Neuspjesno dohvacanje vremenskih podataka.');
        } finally {
            setLoading(false);
        }
    })();
}, []);

if (loading) {
    return (
        <View style={styles.center}>
            <ActivityIndicator size="large" color="#07F"></ActivityIndicator>
            <Text style={{ marginTop: 10 }}>Dohvacam lokaciju</Text>
        </View>
    );
}

if (!weather || !weather.main){
    return(
        <View style={styles.center}>
            <Text>Neuspjesno dohvacanje podataka o vremenu</Text>
        </View>
    );
}

return (
    <View style={styles.container}>
        <Text style={styles.title}>Vriijeme na tvojoj lokaciji</Text>
        <Text style={styles.city}>{weather.name}</Text>

        <Image
        source={{uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}}
        style={{ width: 150, height: 150}}
        />

        <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
        <Text style={styles.desc}>{weather.weather[0].description}</Text>

        <View style={stlyes.infoBox}>
            <Text>Osjecaj: {Math.round(weather.main.feels_like)}°C</Text>
            <Text>Vlaznost: {weather.main.humidity}%</Text>
            <Text>Pritisak: {weather.main.pressure} hPa</Text>
            <Text>Vjetar: {weather.wind.speed} m/s</Text>
        </View>
    </View>
);
}
