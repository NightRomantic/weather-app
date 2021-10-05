import { createSlice } from "@reduxjs/toolkit";

export const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        value: {},
        city: 'Тольятти',
    },
    reducers: {
        setWeather : (state, action) => {
            state.value = action.payload;
        },
        setCity: (state, action) => {
            state.city = action.payload;
        }
    }
})

export const { setWeather, setCity } = weatherSlice.actions;

export const selectWeather = state => state.weather.value;

export const selectCity = state => state.weather.city;

export const fetchWeather = currentCity => async dispatch => {
    const cityData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&units=metric&lang=ru&appid=fba1c83429c28d78792ce583239e626b`)
    .then(res => res.json());
    const data = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityData?.coord?.lat}&lon=${cityData?.coord?.lon}&exclude=hourly,minutely,alerts&units=metric&lang=ru&appid=fba1c83429c28d78792ce583239e626b`)
    .then(res => res.json());
    dispatch(setWeather(data));
  };

export default weatherSlice.reducer