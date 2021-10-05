import './TodayCard.css';
import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCity } from '../../features/weather/weatherSlice';


const makeDay = (d) => {
    let days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
    let day = days[d.getDay()];
    let hours = d.getHours();
    let minutes = d.getMinutes();
    if (minutes < 10) minutes = ("0" + minutes);
    return `${day} ${hours}:${minutes}`
}

const makeSign = (v) => {
    let sign = "";
    if (v > 0)
        sign = "+";
    if (v < 0)
        sign = "-";
    return sign;
}

function TodayCard ({currentDay, location, onChangeCity}) {
    console.log(currentDay);
    const city = useSelector(selectCity);
    const handleChange = evt => {
        if (evt.key === "Enter") {
            onChangeCity(evt.target.value);
        }
    }
    return (
        <div className="wrapperToday">
            <div className="topContainer">
                <div className="location">{city}</div>
                <input
                    className="cityInput"
                    type="text"
                    placeholder="Введите название города"
                    onKeyPress={handleChange}
                />
            </div>
            <div className="todayDate">{makeDay(new Date(currentDay?.dt * 1000))}</div>
            <div className="todayDescription">{currentDay?.weather?.[0].description}</div>
            <div className="todayWeather">
                <div className="avgTemp">{makeSign(currentDay.temp)}{Math.abs(Math.round(currentDay.temp))}</div>
                <img src={`http://openweathermap.org/img/wn/${currentDay?.weather?.[0].icon}@2x.png`} alt={currentDay?.weather?.main}/>
                <div className="todayDesc">
                    <div>Влажность:<div>{currentDay?.humidity}%</div></div>
                    <div>Ветер:<div>{currentDay?.wind_speed}м/с</div></div>
                    <div>Давление:<div>{currentDay?.pressure * 0.75}мм.рт.с</div></div>
                </div>
            </div>
        </div>
        
    )
}

export default TodayCard;
