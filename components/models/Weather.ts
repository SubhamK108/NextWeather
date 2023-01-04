interface Weather {
  WeatherIcon: number;
  WeatherText: string;
  Temperature: {
    Metric: {
      Value: number;
    };
  };
}

export type { Weather };
