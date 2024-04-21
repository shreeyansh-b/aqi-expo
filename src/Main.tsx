import { useEffect, useMemo, useRef, useState } from "react";

import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, type LatLng, type Region } from "react-native-maps";

import { AQI_COLORS_MAP } from "./constants";
import { useAQIStore } from "./hooks/useAQIStore";
import { useGetMapBoundsAQI } from "./hooks/useGetMapBoundsAQI";
import { nearestMultipleOf25 } from "./utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3e3e",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "80%",
  },
});

const Main = () => {
  const mapRef = useRef<MapView>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [location, setLocation] = useState<Region | undefined>(undefined);

  const [selectedStation, setSelectedStation] = useState<{
    uid: string;
    aqi: string;
    name: string;
    time: string;
  } | null>(null);

  const [mapBoundaries, setMapBoundaries] = useState<{
    northEast: LatLng;
    southWest: LatLng;
  } | null>(null);

  const latlng = useMemo(() => {
    if (!mapBoundaries) return "";
    const roundedNorthEast = {
      latitude: Math.round(mapBoundaries.northEast.latitude * 100) / 100,
      longitude: Math.round(mapBoundaries.northEast.longitude * 100) / 100,
    };
    const roundedSouthWest = {
      latitude: Math.round(mapBoundaries.southWest.latitude * 100) / 100,
      longitude: Math.round(mapBoundaries.southWest.longitude * 100) / 100,
    };
    return `${roundedNorthEast.latitude},${roundedNorthEast.longitude},${roundedSouthWest.latitude},${roundedSouthWest.longitude}`;
  }, [mapBoundaries]);

  const setAQIInStore = useAQIStore((state) => state.setAQI);

  const { data, isLoading } = useGetMapBoundsAQI({
    latlng,
  });

  useEffect(() => {
    if (!isLoading) {
      data?.forEach((item) => {
        setAQIInStore(String(item.uid), item);
      });
    }
  }, [data, isLoading, latlng, setAQIInStore]);

  const aqi = useAQIStore((state) => state.aqi);

  const aqiData = useMemo(() => Object.values(aqi), [aqi]);

  // get user location
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const initialLocation: Region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setLocation(initialLocation);
    })();
  }, []);

  const handleRegionChange = (region: Region) => {
    setLocation({
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta,
    });
  };

  const handleMapBoundaries = async () => {
    const data = await mapRef.current?.getMapBoundaries();
    if (data) {
      setMapBoundaries(data);
    }
  };

  useEffect(() => {
    if (location) {
      handleMapBoundaries();
    }
  }, [location]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MapView
        style={styles.map}
        region={location}
        onRegionChangeComplete={handleRegionChange}
        zoomControlEnabled
        showsUserLocation
        showsMyLocationButton
        showsPointsOfInterest={false}
        showsBuildings={false}
        pitchEnabled={false}
        ref={mapRef}
        rotateEnabled={false}
        provider="google"
        onPress={(e) => {
          // if not pressed on marker, close bottom sheet
          const coordinate = e.nativeEvent.coordinate;
          const isMarkerPressed = aqiData?.some(
            (item) =>
              item.lat === coordinate.latitude &&
              item.lon === coordinate.longitude,
          );
          if (!isMarkerPressed) {
            bottomSheetRef.current?.collapse();
          }
        }}
      >
        {aqiData?.map((item) => {
          const aqi = nearestMultipleOf25(Number(item.aqi));
          return (
            <Marker
              key={item.uid}
              coordinate={{
                latitude: item.lat,
                longitude: item.lon,
              }}
              onPress={() => {
                setSelectedStation({
                  uid: String(item.uid),
                  aqi: item.aqi,
                  name: item.station.name,
                  time: item.station.time,
                });
                bottomSheetRef.current?.expand();
              }}
              // title={item.station.name}
              // description={`AQI: ${item.aqi}`}
              // improves performance by not tracking view changes of custom marker
              tracksViewChanges={false}
            >
              <View
                style={{
                  backgroundColor: AQI_COLORS_MAP[aqi],
                  padding: 5,
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: "#fff" }}>{item.aqi}</Text>
              </View>
            </Marker>
          );
        })}
      </MapView>

      <BottomSheet ref={bottomSheetRef} snapPoints={[100, 300]}>
        <BottomSheetView
          style={{
            padding: 14,
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
    </View>
  );
};

export { Main };
