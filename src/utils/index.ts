import { AQI_TEXT_MAP } from "../constants";

type possibleValues =
  | 25
  | 50
  | 75
  | 100
  | 125
  | 150
  | 175
  | 200
  | 300
  | 400
  | 401;
export const nearestMultipleOf25 = (num: number): possibleValues => {
  // If num is 0, return 25
  if (num === 0) {
    return 25;
  }

  // If num is greater than 400, return 401
  if (num > 400) {
    return 401;
  }

  // Calculate the nearest multiple of 25 within the specified range
  if (num <= 200) {
    return (Math.ceil(num / 25) * 25) as possibleValues;
  } else if (num <= 300) {
    return 200;
  } else {
    return 300;
  }
};

export const getAQICategory = (aqi: number | undefined) => {
  if (aqi === undefined) {
    return {
      title: "Unknown",
      range: "Unknown",
      description: "Unknown",
      backgroundColor: "white",
    };
  }
  if (aqi >= 0 && aqi <= 50) {
    return AQI_TEXT_MAP.GOOD;
  } else if (aqi >= 51 && aqi <= 100) {
    return AQI_TEXT_MAP.MODERATE;
  }
  if (aqi >= 101 && aqi <= 150) {
    return AQI_TEXT_MAP.SENSITIVE;
  }
  if (aqi >= 151 && aqi <= 200) {
    return AQI_TEXT_MAP.UNHEALTHY;
  }
  if (aqi >= 201 && aqi <= 300) {
    return AQI_TEXT_MAP.VERY_UNHEALTHY;
  }
  if (aqi >= 301) {
    return AQI_TEXT_MAP.HAZARDOUS;
  }
  return {
    title: "Unknown",
    range: "Unknown",
    description: "Unknown",
    backgroundColor: "white",
  };
};
