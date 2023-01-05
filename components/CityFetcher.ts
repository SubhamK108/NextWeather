import React from "react";
import { City } from "./models/City";
import { locationInitials } from "./models/Location";
import { endAppProcessWithError, WeatherCore, weatherCoreInitials } from "./WeatherCore";

interface ParsedCity {
  CityID: string;
  Town: string;
  State: string;
}

var parsedCityInitials: ParsedCity = {
  CityID: "",
  Town: "",
  State: ""
};

interface getCityDetailsProps {
  setWeatherCore: React.Dispatch<React.SetStateAction<WeatherCore>>;
}

async function getCityDetails(props: getCityDetailsProps): Promise<void> {
  if (locationInitials.Latitude === 1 || locationInitials.Longitude === 1) {
    let errorText = "Please turn on your device's location services and refresh the app.";
    endAppProcessWithError({ setWeatherCore: props.setWeatherCore, ErrorText: errorText });
    return;
  }

  const cityURL: string = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${weatherCoreInitials.ApiKey}&q=${locationInitials.Latitude},${locationInitials.Longitude}&toplevel=false`;
  try {
    const response: Response = await fetch(cityURL);
    if (response.ok) {
      const jsonCity: City = await response.json();
      parsedCityInitials = {
        CityID: jsonCity.Key,
        Town: jsonCity.EnglishName,
        State: jsonCity.AdministrativeArea.EnglishName
      };
      props.setWeatherCore((prevState) => ({
        ...prevState,
        ErrorText: "Fetching weather data of your current location..."
      }));
    } else {
      throw new Error();
    }
  } catch (error) {
    let errorText =
      "There was a network problem, kindly refresh the app. If the problem persists, then that means the daily limit of API Calls has been exhausted, so then please wait till Subham renews the API";
    endAppProcessWithError({ setWeatherCore: props.setWeatherCore, ErrorText: errorText });
  }
}

export type { ParsedCity };
export { parsedCityInitials };
export { getCityDetails };
