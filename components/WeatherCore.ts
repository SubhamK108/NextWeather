import { sleep } from "./utils/Utils";
import { parsedWeatherInitials } from "./WeatherFetcher";
import { setWeatherIcon, WeatherIconParser } from "./WeatherIconParser";

interface WeatherCore {
  ApiKey: string;
  ErrorText: string;
  ExitCode: number;
  HideWeatherDetails: boolean;
  IsLoading: boolean;
}

var weatherCoreInitials: WeatherCore = {
  ApiKey: "Cm0P5hbUD5j9rCkzebTYIrSd2kRXxhjd",
  ErrorText: "Fetching weather data of your current location...",
  ExitCode: -1,
  HideWeatherDetails: true,
  IsLoading: true
};

interface endProcessProps {
  setWeatherCore: React.Dispatch<React.SetStateAction<WeatherCore>>;
}

async function endAppProcess(props: endProcessProps) {
  weatherCoreInitials = {
    ...weatherCoreInitials,
    ExitCode: 0
  };
  props.setWeatherCore(weatherCoreInitials);
  await setWeatherIcon(WeatherIconParser[parsedWeatherInitials.Icon]);
  weatherCoreInitials = {
    ...weatherCoreInitials,
    HideWeatherDetails: false,
    IsLoading: false
  };
  props.setWeatherCore(weatherCoreInitials);
}

interface endProcessWithErrorProps {
  setWeatherCore: React.Dispatch<React.SetStateAction<WeatherCore>>;
  ErrorText: string;
}

function endAppProcessWithError(props: endProcessWithErrorProps) {
  weatherCoreInitials = {
    ...weatherCoreInitials,
    ErrorText: props.ErrorText,
    ExitCode: 1,
    IsLoading: false
  };
  props.setWeatherCore(weatherCoreInitials);
}

export type { WeatherCore };
export { weatherCoreInitials };
export { endAppProcess, endAppProcessWithError };
