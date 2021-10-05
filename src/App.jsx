import './App.css';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DailyCard from './Components/DailyCard/DailyCard';
import TodayCard from './Components/TodayCard/TodayCard';
import {
  setCity,
  selectWeather,
  selectCity,
  fetchWeather,
} from './features/weather/weatherSlice';

function App() {
  const dispatch = useDispatch();
  const weather = useSelector(selectWeather);
  const city = useSelector(selectCity);
  useEffect(() => {
    dispatch(fetchWeather(city));
  }, []);


  console.log(weather);
  const currentDay = weather.current || {};
  const handleChangeCity = (city) => {
    dispatch(setCity(city));
    dispatch(fetchWeather(city));
  };
  return (
    <div className="App">
        <div className="wrapper">
          <div>
            <TodayCard currentDay={currentDay} location={city} onChangeCity={handleChangeCity} />
            <div className="dayliContainer">
              <h2 className="h2">Прогноз на 8 дней</h2>
              <div className="dayliWrapper">
                {(weather.daily || []).map((item, i) => (
                  <DailyCard key={item.dt} item={item} today={i === 0} />
                ))}
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default App;
