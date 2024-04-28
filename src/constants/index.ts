export const AQI_COLORS_MAP = {
  25: "#00787e",
  50: "#059a65",
  75: "#85bd4b",
  100: "#ffdd33",
  125: "#ffba33",
  150: "#fe9633",
  175: "#e44933",
  200: "#ca0035",
  300: "#970068",
  400: "#78003f",
  401: "#4e0016",
};

export const AQI_TO_CATEGORY_MAP = {
  0: "GOOD",
  50: "MODERATE",
  100: "SENSITIVE",
  150: "UNHEALTHY",
  200: "VERY_UNHEALTHY",
  300: "HAZARDOUS",
};

export const AQI_TEXT_MAP = {
  GOOD: {
    title: "Good",
    range: "0 - 50",
    description:
      "Air quality is considered satisfactory, and air pollution poses little or no risk.",
    backgroundColor: "#AFE26B",
  },
  MODERATE: {
    title: "Moderate",
    range: "51 - 100",
    description:
      "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.",
    backgroundColor: "#FABD22",
  },
  SENSITIVE: {
    title: "Sensitive",
    range: "101 - 150",
    description:
      "Members of sensitive groups may experience health effects. The general public is not likely to be affected.",

    backgroundColor: "#FC9A65",
  },
  UNHEALTHY: {
    title: "Unhealthy",
    range: "151 - 200",
    description:
      "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.",
    backgroundColor: "#D06070",
  },
  VERY_UNHEALTHY: {
    title: "Very Unhealthy",
    range: "201 - 300",
    description:
      "Health alert: everyone may experience more serious health effects.",
    backgroundColor: "#9A65FC",
  },
  HAZARDOUS: {
    title: "Hazardous",
    range: "301+",
    description:
      "Health warnings of emergency conditions. The entire population is more likely to be affected.",
    backgroundColor: "#FA6673",
  },
};
