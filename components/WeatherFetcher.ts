import React from "react";
import { parsedCityInitials } from "./CityFetcher";
import { Weather } from "./models/Weather";
import { endAppProcess, endAppProcessWithError, WeatherCore, weatherCoreInitials } from "./WeatherCore";
import { setWeatherIcon, WeatherIconParser } from "./WeatherIconParser";

interface ParsedWeather {
  Icon: number;
  Description: string;
  Temp: string;
  TempUnit: string;
  Place: string;
}

var parsedWeatherInitials: ParsedWeather = {
  Icon: 0,
  Description: "",
  Temp: "",
  TempUnit: "",
  Place: ""
};

interface getWeatherDetailsProps {
  setWeatherCore: React.Dispatch<React.SetStateAction<WeatherCore>>;
  setWeather: React.Dispatch<React.SetStateAction<ParsedWeather>>;
}

async function getWeatherDetails(props: getWeatherDetailsProps) {
  const weatherURL: string = `https://dataservice.accuweather.com/currentconditions/v1/${parsedCityInitials.CityID}?apikey=${weatherCoreInitials.ApiKey}`;
  try {
    const response: Response = await fetch(weatherURL);
    if (response.ok) {
      const jsonWeatherArray: Weather[] = await response.json();
      const jsonWeather: Weather = jsonWeatherArray[0];
      parsedWeatherInitials = {
        Icon: jsonWeather.WeatherIcon,
        Description: jsonWeather.WeatherText,
        Temp: Math.round(jsonWeather.Temperature.Metric.Value).toString(),
        TempUnit: "°C/F",
        Place: `${parsedCityInitials.Town}, ${parsedCityInitials.State}`
      };
      props.setWeather(parsedWeatherInitials);
      await endAppProcess({ setWeatherCore: props.setWeatherCore });
    } else {
      throw new Error();
    }
  } catch (error) {
    let errorText =
      "There was a network problem, kindly refresh the app. If the problem persists, then that means the daily limit of API Calls has been exhausted, so then please wait till Subham renews the API";
    endAppProcessWithError({ setWeatherCore: props.setWeatherCore, ErrorText: errorText });
  }
}

interface toggleTemperatureUnitProps {
  setWeather: React.Dispatch<React.SetStateAction<ParsedWeather>>;
}

function toggleTemperatureUnit(props: toggleTemperatureUnitProps): void {
  if (parsedWeatherInitials.TempUnit === "°C/F") {
    let tempC: number = Number(parsedWeatherInitials.Temp);
    let tempF: number = Math.round((tempC / 5) * 9 + 32);
    parsedWeatherInitials = {
      ...parsedWeatherInitials,
      Temp: tempF.toString(),
      TempUnit: "°F/C"
    };
    props.setWeather(parsedWeatherInitials);
  } else {
    let tempF: number = Number(parsedWeatherInitials.Temp);
    let tempC: number = Math.round(((tempF - 32) / 9) * 5);
    parsedWeatherInitials = {
      ...parsedWeatherInitials,
      Temp: tempC.toString(),
      TempUnit: "°C/F"
    };
    props.setWeather(parsedWeatherInitials);
  }
}

export type { ParsedWeather };
export { parsedWeatherInitials };
export { getWeatherDetails, toggleTemperatureUnit };
