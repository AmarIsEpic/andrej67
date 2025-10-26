const API_KEY = 'ed0604f6922da175d2395178306397bd';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function getWeather(city) {
  try {
    const response = await fetch(
      `${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}&lang=hr`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Greška prilikom dohvaćanja podataka:', error);
  }
}