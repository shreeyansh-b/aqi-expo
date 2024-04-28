import React, { RefObject, useMemo } from "react";

import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { H4, H6, Spinner } from "tamagui";

import { useGetAQIByLatLon } from "../../hooks/useGetAQIByLatLon";
import { getAQICategory } from "../../utils";
import { TodaysAQI } from "../TodaysAQI/TodaysAQI";

type Props = {
  selectedStation: {
    uid: string;
    aqi: string;
    name: string;
    time: string;
    lat: number;
    lon: number;
  } | null;
  bottomSheetRef: RefObject<BottomSheet>;
};

const BottomDrawer = ({ selectedStation, bottomSheetRef }: Props) => {
  const { data, isLoading } = useGetAQIByLatLon({
    lat: selectedStation?.lat ?? 0,
    lon: selectedStation?.lon ?? 0,
  });

  const aqiCategory = useMemo(() => {
    return getAQICategory(data?.aqi);
  }, [data?.aqi]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[100, 300]}
      backgroundStyle={{
        backgroundColor: aqiCategory.backgroundColor,
      }}
    >
      <BottomSheetView
        style={{
          paddingLeft: 16,
          paddingRight: 16,
        }}
      >
        {isLoading && <Spinner size="large" />}
        {!isLoading && (
          <>
            <H4
              userSelect="none"
              fontWeight="$16"
              letterSpacing={1}
              marginBottom={-4}
            >
              {/* split on first comma */}
              {selectedStation?.name.split(",")[0]}
            </H4>
            <H6 userSelect="none" fontWeight="$5" letterSpacing={1}>
              {selectedStation?.name.split(",").slice(1).join(",").trim()}
            </H6>
          </>
        )}
        <TodaysAQI aqi={data?.aqi} aqiCategory={aqiCategory} />
      </BottomSheetView>
    </BottomSheet>
  );
};

export { BottomDrawer };
