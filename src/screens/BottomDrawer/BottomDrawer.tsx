import React, { RefObject } from "react";

import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Text } from "react-native";

import { useGetAQIByLatLon } from "../../hooks/useGetAQIByLatLon";

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
  return (
    <BottomSheet ref={bottomSheetRef} snapPoints={[100, 300]}>
      <BottomSheetView
        style={{
          paddingLeft: 16,
          paddingRight: 16,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 4,
          }}
        >
          {/* split on first comma */}
          {selectedStation?.name.split(",")[0]}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "normal",
          }}
        >
          {selectedStation?.name.split(",").slice(1).join(",").trim()}
        </Text>
      </BottomSheetView>
    </BottomSheet>
  );
};

export { BottomDrawer };
