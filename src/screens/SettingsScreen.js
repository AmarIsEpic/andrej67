import { useContext, useState } from 'react';
import { Alert, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../theme/ThemeContext';

export default function SettingsScreen() {
    const [isCelsius, setIsCelsius] = useState(true);
    const { mode, setMode, isDark, toggleDark } = useContext(ThemeContext);

    const handleButton = (type) => {
        if (type === 'reset') Alert.alert('Postavke', 'Postavke resetovane!');
    }
 

return (
    <View style={[styles.container, isDark && styles.darkContainer]}>
        <Text style={[styles.title, isDark && styles.darkText]}>Postavke</Text>

        <View style={styles.row}>
            <Text style={[styles.label, isDark && styles.darkText]}>Koristiti °C</Text>
            <Switch value={isCelsius} onValueChange={() => setIsCelsius(!isCelsius)} />
        </View>

        <View style={styles.row}>
            <Text style={[styles.label, isDark && styles.darkText]}>Tamni režim</Text>
            <Switch value={isDark} onValueChange={toggleDark} disabled={mode === 'system'} />
        </View>

        <View style={styles.row}>
            <Text style={[styles.label, isDark && styles.darkText]}>Prati sistem</Text>
            <Switch
                value={mode === 'system'}
                onValueChange={(v) => setMode(v ? 'system' : (isDark ? 'dark' : 'light'))}
            />
        </View>

        <TouchableOpacity style={styles.optionButton} onPress={() => handleButton('reset')}>
            <Text style={styles.optionText}>Resetuj postavke</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} onPress={() => Alert.alert('Sačuvano', 'Postavke su sačuvane.') }>
            <Text style={styles.saveText}>Sačuvaj postavke</Text>
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