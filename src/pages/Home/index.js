import React, { useEffect, useState } from "react";
import { View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import validationFunctions from "../../validation/ValidationFunctions";
import mainStyle from "../../../mainStyle";
import styles from "./styles";
import api from "../../services/api";
import { useAuth } from "../../contexts/auth";

export default function Home() {
  const { user, locationAllowed } = useAuth();

  const navigation = useNavigation();
  const [visits, setVisits] = useState([]);
  const [visitsMarker, setVisitsMarker] = useState([]);
  const [region, setRegion] = useState({
    latitude: -28.297807,
    longitude: -49.150838,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  async function getVisistMap() {
    await api
      .get(`/visits/${user.i_user}/map`)
      .then((response) => {
        setVisits(response.data);
      })
      .catch((error) => validationFunctions.errorsResponseDefault(error));
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      getVisistMap();
    });
    return unsubscribe;
  }, [navigation]);

  async function requestLocation() {
    if (locationAllowed) {
      if (Constants.isDevice) await findCoordinates();
    }
  }

  useEffect(() => {
    requestLocation();
  }, [locationAllowed]);

  useEffect(() => {
    if (visits.length) {
      const allVisitsMarker = visits.map((visit, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: parseFloat(visit.latitude),
            longitude: parseFloat(visit.longitude),
          }}
          title={visit.customer}
        ></Marker>
      ));
      setVisitsMarker(allVisitsMarker);
    }
  }, [visits]);

  const findCoordinates = async () => {
    try {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") {
        this.setState({
          errorMessage: "Permission to access location was denied",
        });
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });

      const { latitude, longitude } = location.coords;
      setRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View styles={mainStyle.containerDrawer}>
      <MapView style={styles.map} provider={PROVIDER_GOOGLE} region={region}>
        {visitsMarker}
      </MapView>
    </View>
  );
}
