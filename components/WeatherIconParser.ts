import { sleep } from "./utils/Utils";

const WeatherIconParser: Record<number, string> = {
  1: "CLEAR_DAY",
  2: "PARTLY_CLOUDY_DAY",
  3: "PARTLY_CLOUDY_DAY",
  4: "PARTLY_CLOUDY_DAY",
  5: "PARTLY_CLOUDY_DAY",
  6: "CLOUDY",
  7: "CLOUDY",
  8: "CLOUDY",
  11: "FOG",
  12: "RAIN",
  13: "SHOWERS_DAY",
  14: "SHOWERS_DAY",
  15: "THUNDER_RAIN",
  16: "THUNDER_SHOWERS_DAY",
  17: "THUNDER_SHOWERS_DAY",
  18: "RAIN",
  19: "PARTLY_CLOUDY_DAY",
  20: "PARTLY_CLOUDY_DAY",
  21: "PARTLY_CLOUDY_DAY",
  22: "SNOW",
  23: "SNOW_SHOWERS_DAY",
  24: "HAIL",
  25: "SLEET",
  26: "RAIN_SNOW",
  29: "RAIN_SNOW",
  30: "CLEAR_DAY",
  31: "CLOUDY",
  32: "WIND",
  33: "CLEAR_NIGHT",
  34: "PARTLY_CLOUDY_NIGHT",
  35: "PARTLY_CLOUDY_NIGHT",
  36: "PARTLY_CLOUDY_NIGHT",
  37: "PARTLY_CLOUDY_NIGHT",
  38: "CLOUDY",
  39: "SHOWERS_NIGHT",
  40: "SHOWERS_NIGHT",
  41: "THUNDER_SHOWERS_NIGHT",
  42: "THUNDER_SHOWERS_NIGHT",
  43: "PARTLY_CLOUDY_NIGHT",
  44: "SNOW_SHOWERS_NIGHT"
};

async function setWeatherIcon(iconText: string): Promise<void> {
  var temperatureIcon: Element | null = document.querySelector("#weatherIcon");
  while (true) {
    if (temperatureIcon !== null) {
      break;
    }
    await sleep(500);
    temperatureIcon = document.querySelector("#weatherIcon");
  }
  // @ts-expect-error
  const skycons = new Skycons({ monochrome: false });
  skycons.play();
  // @ts-expect-error
  skycons.set(temperatureIcon, Skycons[iconText]);
}

export { WeatherIconParser };
export { setWeatherIcon };
