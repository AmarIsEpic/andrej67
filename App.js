import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsScreen from './src/screens/DetailsScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import ForecastScreen from './src/screens/ForecastScreen';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="pocetna" component={HomeScreen} />
        <Stack.Screen name="detalji" component={DetailsScreen} />
        <Stack.Screen name="prognoza" component={ForecastScreen} />
        <Stack.Screen name="postavke" component={SettingsScreen} />
        <Stack.Screen name="omiljeni" component={FavoritesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}