import './DailyCard.css';
import React from "react";


const makeDate = (d) => {

    let months = ["января", "фервраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    let month = months[d.getMonth()];
    
    let date = d.getDate();
    return `${date} ${month}`
}

const makeDay = (d) => {
    let days = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];
    let day = days[d.getDay()];
    return `${day}`
}

const makeSign = (v) => {
    let sign = "";
    if (v > 0)
        sign = "+";
    if (v < 0)
        sign = "-";
    return sign;
}

function DailyCard({ today, item }) {
    const date = new Date(item.dt * 1000)
    return (
        <div className="dayli">
            {(!today) ? (
                <div className="day">{makeDay(date)}</div>
            ): (<div className="day">Сегодня</div>)}
            <div className="date">{makeDate(date)}</div>
            <img src={`http://openweathermap.org/img/wn/${item?.weather[0].icon}@2x.png`} alt={item.weather.main}/>
            <div className="dayliTemp">
                <div className="tempMax">{makeSign(item.temp.max)}{Math.round(Math.abs(item.temp.max))}°</div>
                <div className="tempMin">{makeSign(item.temp.min)}{Math.round(Math.abs(item.temp.min))}°</div>
            </div>
            <div className="description">{item.weather[0].description}</div>
        </div>
    )
}

export default DailyCard;
