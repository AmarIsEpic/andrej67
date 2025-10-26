import { useState } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen() {
    const [isCelsius, setIsCelsius] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleButton = (type) => {
        if (type === 'reset') Alet.alert('Postavke resetovane!');
    }
 

return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
        <Text style={[styles.title, isDarkMode && styles.darkText]}>Postavke</Text>

        <View style={styles.row}>
            <Text style={[styles.label, isDarkMode && styles.darkText]}>Koristiti °C</Text>
            <Switch value={isCelsius} onValueChange={() => setIsCelsius(!isCelsius)} />
        </View>

        <View style={styles.row}>
            <Text style={[styles.label, isDarkMode && styles.darkText]}>Tamni režim</Text>
            <Switch value={isDarkMode} onValueChange={() => setIsDarkMode(!isDarkMode)} />
        </View>

        <TouchableOpacity style={styles.optionButton} onPress={() => handleButton('reset')}>
            <Text styee={styles.optionText}>Resetuj postavke</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton}>
            <Text styee={styles.saveText}>Sacuvaj postavke</Text>
        </TouchableOpacity>
    </View>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    darkContainer: {
        backgroundColor: '#333',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    darkText: {
        color: '#fff',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    label: {
        fontSize: 18,
        color: '#444'
    },
    optionButton: {
        backgroundColor: '#ddd',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    optionText: {
        fontSize: 16,
        color: '#333'
    },
    saveButton: {
        marginTop: 25,
        backgroundColor: '#096ee2ff',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center'
    },
    saveText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
});