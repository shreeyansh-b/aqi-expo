import { useQuery } from "@tanstack/react-query";

type Attribution = {
  url: string;
  name: string;
};

type City = {
  geo: [number, number];
  name: string;
  url: string;
  location: string;
};

type IAQI = {
  co?: { v: number };
  h?: { v: number };
  no2?: { v: number };
  o3?: { v: number };
  p?: { v: number };
  pm10?: { v: number };
  pm25?: { v: number };
  so2?: { v: number };
  t?: { v: number };
  w?: { v: number };
};

type Time = {
  s: string;
  tz: string;
  v: number;
  iso: string;
};

type ForecastData = {
  avg: number;
  day: string;
  max: number;
  min: number;
};

type Forecast = {
  daily: {
    o3: ForecastData[];
    pm10: ForecastData[];
    pm25: ForecastData[];
    uvi?: ForecastData[];
  };
};

type Debug = {
  sync: string;
};

type AirQualityData = {
  aqi: number;
  idx: number;
  attributions: Attribution[];
  city: City;
  dominentpol: string;
  iaqi: IAQI;
  time: Time;
  forecast: Forecast;
  debug: Debug;
};

type AQI_BY_LAT_LON_API_Response = {
  status: "ok" | "error";
  data: AirQualityData;
};

// fetch lat lang bound
const fetchAQIByLatLng = async ({ lat, lon }: { lat: number; lon: number }) => {
  try {
    const response = await fetch(
      `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${process.env.EXPO_PUBLIC_API_KEY}`,
    );
    const data: AQI_BY_LAT_LON_API_Response = await response.json();
    if (data.status === "error") throw new Error("Failed to fetch data");
    return data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data");
  }
};

export const useGetAQIByLatLon = ({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}) => {
  return useQuery({
    queryKey: ["aqi", lat, lon],
    queryFn: () => fetchAQIByLatLng({ lat, lon }),
    enabled: lat !== 0 && lon !== 0,
  });
};
