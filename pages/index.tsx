import Head from "next/head";
import { ReactElement, useEffect, useState } from "react";
import { locationInitials } from "../components/models/Location";
import { fetchGeolocation } from "../components/LocationFetcher";
import { sleep } from "../components/utils/Utils";
import { WeatherCore, weatherCoreInitials } from "../components/WeatherCore";
import { getCityDetails, parsedCityInitials } from "../components/CityFetcher";
import {
  getWeatherDetails,
  ParsedWeather,
  parsedWeatherInitials,
  toggleTemperatureUnit
} from "../components/WeatherFetcher";
import Script from "next/script";
import CircularSpinner from "../components/spinners/CircularSpinner";

export default function Home(): ReactElement {
  const [weather, setWeather] = useState<ParsedWeather>(parsedWeatherInitials);
  const [weatherCore, setWeatherCore] = useState<WeatherCore>(weatherCoreInitials);

  useEffect(() => {
    async function startApp(): Promise<void> {
      fetchGeolocation();
      while (true) {
        if (locationInitials.Latitude !== 0 && locationInitials.Longitude !== 0) {
          break;
        }
        await sleep(500);
      }
      await getCityDetails({ setWeatherCore: setWeatherCore });
      if (parsedCityInitials.CityID !== "") {
        await getWeatherDetails({ setWeatherCore: setWeatherCore, setWeather: setWeather });
      }
    }

    startApp();
  }, []);

  return (
    <>
      <main className="h-screen flex flex-col justify-center items-center">
        {weatherCore.ExitCode !== 0 && (
          <div className="w-[70%] max-sm:w-[80%] font-sans font-semibold text-[1.6rem] max-sm:text-[1.5rem] text-center">
            <div>{weatherCore.ErrorText}</div>
            {weatherCore.IsLoading && (
              <div className="mt-7 max-sm:mt-6">
                <CircularSpinner />
              </div>
            )}
          </div>
        )}

        {weatherCore.ExitCode === 0 && (
          <>
            {weatherCore.IsLoading && weatherCore.HideWeatherDetails && (
              <div className="mt-40">
                <CircularSpinner />
              </div>
            )}

            <div className="font-sans font-semibold text-5xl max-sm:text-3xl h-[30vh] w-[55%] -mt-32 flex items-center justify-around text-center">
              <div hidden={weatherCore.HideWeatherDetails}>{weather.Place}</div>
            </div>

            <div hidden={weatherCore.HideWeatherDetails}>
              <canvas id="weatherIcon" className="mb-40 -mt-10" width={200} height={200}>
                Icon
              </canvas>
            </div>

            <div className="h-[30vh] w-[50%] -mt-32 flex flex-col items-center justify-around text-center">
              <div hidden={weatherCore.HideWeatherDetails}>
                <div
                  className="flex items-center cursor-pointer"
                  title="Change Unit"
                  onClick={() => toggleTemperatureUnit({ setWeather: setWeather })}
                >
                  <span className="m-3 text-[2.6rem] max-sm:text-[1.7rem] max-sm:m-2">{"???????"}</span>
                  <h2 className="font-mono font-bold text-[4.2rem] max-sm:text-[2.6rem]">{weather.Temp}</h2>
                  <span className="font-mono font-semibold m-3 text-[2.8rem] max-sm:text-[1.9rem] max-sm:m-2">
                    {weather.TempUnit}
                  </span>
                </div>
              </div>

              <div
                hidden={weatherCore.HideWeatherDetails}
                className="font-sans font-semibold text-[2.5rem] max-sm:text-[1.7rem] -mt-16"
              >
                <h3>{weather.Description}</h3>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}
