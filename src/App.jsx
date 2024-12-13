import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [location , setLocation] = useState("");
  const [weatherData , setWeatherData] = useState(null);


  useEffect(()=>{
    const fetchData = async ()=>
    {
      try {
        const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API}&q=${location}&days=7&aqi=yes&alerts=yes`);
        setWeatherData(response.data);
      } catch (error) {
        console.log(error)
      }
    };
    if(location){
      fetchData();
    }
  },[location])

  const handeLocatinoChange = (event)=>{
    setLocation(event.target.value)
  }

  return (
    <div className='app-container'>
      <h1 className='app-title'>7 Günlük Hava Durumu</h1>
      <div className='input-container'>
        <input className='input-location' type="text" placeholder='Şehir giriniz' value={location} onChange={handeLocatinoChange}/>
      </div>
    {weatherData && (
      <div className='weather-card'>
        {weatherData.forecast.forecastday.map((day)=>(
          <div className='day-container' key={day.date}>
            <h1 className='day'></h1>
            <h2 className='date'>{day.date}</h2>
            <img className='weather-image' src={day.day.condition.icon} alt={day.day.condition.text} />
            <p className='weather-temperature'>{day.day.avgtemp_c} °C</p>
            <p className='weather'>{day.day.condition.text}</p>
          </div>
        ))}
      </div>
    )}
    </div>
  )
}

export default App
