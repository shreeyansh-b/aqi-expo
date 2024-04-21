import { useQuery } from "@tanstack/react-query";

export type AQI_API_Response = {
  status: "ok" | "error";
  data: [
    {
      aqi: string;
      lat: number;
      lon: number;
      uid: number;
      station: {
        name: string;
        time: string;
      };
    },
  ];
};

// fetch lat lang bound
const fetchAQI = async (latlng: string) => {
  try {
    const response = await fetch(
      `https://api.waqi.info/map/bounds/?latlng=${latlng}&token=${process.env.EXPO_PUBLIC_API_KEY}`,
    );
    const data: AQI_API_Response = await response.json();
    if (data.status === "error") throw new Error("Failed to fetch data");
    return data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data");
  }
};

export const useGetMapBoundsAQI = ({ latlng }: { latlng: string }) => {
  return useQuery({
    queryKey: ["mapBoundaries", latlng],
    queryFn: () => fetchAQI(latlng),
    enabled: latlng !== "",
  });
};
