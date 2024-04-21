import { create } from "zustand";

import { AQI_API_Response } from "./useGetMapBoundsAQI";

type AQIStore = {
  aqi: {
    [uid: string]: AQI_API_Response["data"][0];
  };
  setAQI: (latlng: string, data: AQIStore["aqi"][string]) => void;
};

export const useAQIStore = create<AQIStore>((set) => ({
  aqi: {},
  setAQI: (uid, data) =>
    set((state) => ({ aqi: { ...state.aqi, [uid]: data } })),
}));
