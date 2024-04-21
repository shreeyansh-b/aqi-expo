import { useEffect, useRef, useState } from "react";

import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import MapView, { type LatLng, type Region } from "react-native-maps";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  const [location, setLocation] = useState<Region | undefined>(undefined);

  const [mapBoundaries, setMapBoundaries] = useState<{
    northEast: LatLng;
    southWest: LatLng;
  } | null>(null);

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

  // fetch lat lang bound
  const fetchAQI = async (latlng: string) => {
    const response = await fetch(
      `https://api.waqi.info/map/bounds/?latlng=${latlng}&token=${process.env.EXPO_PUBLIC_API_KEY}`,
    );
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    if (location) {
      handleMapBoundaries();
    }
  }, [location]);

  useEffect(() => {
    if (mapBoundaries) {
      fetchAQI(
        `${mapBoundaries.northEast.latitude},${mapBoundaries.northEast.longitude},${mapBoundaries.southWest.latitude},${mapBoundaries.southWest.longitude}`,
      );
    }
  }, [mapBoundaries]);

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
      />
    </View>
  );
};

export { Main };
