import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Weather from './components/Weather';
import SearchBar from './components/SearchBar';

const API_KEY= "46a9246bebba16d42b36aac3ba8af";

export default function App() {

  const [weatherData, setWeatherData] = useState(null);
  const [loaded, setLoaded] = useState(true);

  async function fetchWeatherData(cityName) {
    setLoaded(false);
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
    try{
      const response = await fetch(API);
      if(response.status == 200) {
        const data = await response.json();
        setWeatherData(data);
      }else{
        setWeatherData(null);
      }
      setLoaded(true);
    } catch(error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchWeatherData('Mumbai');
  }, [])

  if(!loaded) {
    return (
      <View style={StyleSheet.container}>
        <ActivityIndicator color='gray' size={36} />
      </View>
    )
  }

  else if(weatherData == null) {
    return (
      <View style={StyleSheet.container}>
        <SearchBar fetchWeatherData={fetchWeatherData}/>
        <Text style={StyleSheet.primaryText}>City NOt Found! Try Different City</Text>
      </View>
    )
  }

  return (
    <View style={StyleSheet.container}>
      <weather weatherData={weatherData} fetchWeatherData={fetchWeatherData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    margin: 20,
    fontSize: 28
  }
});