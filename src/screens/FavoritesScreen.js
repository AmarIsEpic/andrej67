import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function FavoritesScreen({ navigation }) {
    const [ city, setCity ] = useState('');
    const [ favorites, setFavorites ] = useState([]);
    const [ popularCities ] = useState(['London', 'New York', 'Paris', 'Tokyo', 'Zagreb', 'Sarajevo']);

    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        const data = await AsyncStorage.getItem('favorites');
        if (data) setFavorites(JSON.parse(data));
    };

    const addFavorite = async () => {
        if (!city) return;
        const newList = [...favorites, city];
        setFavorites(newList);
        await AsyncStorage.setItem('favorites', JSON.stringify(newList));
        setCity('');
    };

    const removeFavorite = async (name) => {
        const newList = favorites.filter((item) => item !== name);
        setFavorites(newList);
        await AsyncStorage.setItem('favorites', JSON.stringify(newList));
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Omiljeni gradovi</Text>

            <TextInput
                style={styles.input}
                placeholder="Dodaj grad..."
                value={city}
                onChangeText={setCity}
            />
            <Button title="Dodaj" onPress={addFavorite} />

            <FlatList
                data={favorites}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item}</Text>
                        <TouchableOpacity onPress={() => removeFavorite(item)}>
                            <Text style={styles.remove}>Ukloni</Text>
                        </TouchableOpacity>
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
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    item:  {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    remove: {
        color: 'red',
    },
    popularItem: {
        backgroundColor: '#08F',
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
    },
    popularText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});