import React, { useRef, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { Form } from "@unform/mobile";
import { Feather } from "@expo/vector-icons";

import {
  successInsertAlert,
  coudntFindPlace,
} from "../../../utils/SystemMessages";
import Header from "../../../components/headers/Header";
import Input from "../../../components/form/Input";
import InputClear from "../../../components/form/InputClear";
import api from "../../../services/api";
import ActionButton from "../../../components/form/ActionButton";
import mainStyle from "../../../../mainStyle";
import styles from "./styles";
import ResaleCreateEditValidator from "../../../validation/ResaleCreateEditValidator";
import { useAuth } from "../../../contexts/auth";
import validationFunctions from "../../../validation/ValidationFunctions";

export default function NewResale({ route }) {
  const { user } = useAuth();
  const navigation = useNavigation();
  const formRef = useRef(null);
  const { returnScreen, returnData } = route.params;
  const [loading, setLoading] = useState(false);
  const [latDelta, setLatDelta] = useState(0.008);
  const [errors, setErrors] = useState({});
  const [lngDelta, setLngDelta] = useState(0.0034);
  const [latitude, setLatitude] = useState(-28.297807);
  const [longitude, setLongitude] = useState(-49.150838);
  const [formatted_address, setFormattedAddress] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [region, setRegion] = useState({
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: latDelta,
    longitudeDelta: lngDelta,
  });

  const onPress = () => formRef.current.submitForm();

  const schema = ResaleCreateEditValidator;

  async function handleSubmit(data) {
    try {
      if (!loading) {
        setLoading(true);
        formRef.current.setErrors({});

        await schema.validate(
          { ...data, formatted_address },
          {
            abortEarly: false,
          }
        );

        if (data.phone)
          data.phone =
            data.phone.length === 11 || data.phone.length === 10
              ? parseInt("55" + data.phone)
              : parseInt(data.phone);

        await api
          .post("/resale", {
            i_user: user.i_user,
            name: data.name,
            phone: data.phone,
            latitude,
            longitude,
            city,
            state,
            country,
            postal_code: postalCode,
            latitudeDelta: latDelta,
            longitudeDelta: lngDelta,
            formatted_address,
          })
          .then((response) => {
            const { i_resale } = response.data;
            const option = returnData
              ? { name: data.name, id: i_resale, lastScreen: "NewResale" }
              : {};

            successInsertAlert(navigation, returnScreen, option);
          })
          .catch((error) => {
            setLoading(false);
            const errors = validationFunctions.errorsResponseDefault(error);
            formRef.current.setErrors(errors);
            setErrors(errors);
          });
      }
    } catch (error) {
      setLoading(false);
      const errors = validationFunctions.errorsResponseDefault(error);
      formRef.current.setErrors(errors);
      setErrors(errors);
    }
  }

  async function getPlace(data) {
    if (!searchLoading) {
      setSearchLoading(true);
      const searchPlace = `https://maps.googleapis.com/maps/api/geocode/json?address=${
        formRef.current.getData().location
      }&key=${process.env.googleApiKey}`;

      await api
        .get(searchPlace)
        .then(async (result) => {
          try {
            if (Object.keys(result.data.results).length === 0) {
              coudntFindPlace();
              setSearchLoading(false);
              return;
            }

            const city =
              await result.data.results[0]?.address_components?.filter(
                (ac) => ~ac.types.indexOf("administrative_area_level_2")
              )[0]?.long_name;
            const state =
              await result.data.results[0]?.address_components?.filter(
                (ac) => ~ac.types.indexOf("administrative_area_level_1")
              )[0]?.long_name;
            const country =
              await result.data.results[0]?.address_components?.filter(
                (ac) => ~ac.types.indexOf("country")
              )[0]?.long_name;
            const postal_code =
              await result.data.results[0]?.address_components?.filter(
                (ac) => ~ac.types.indexOf("postal_code")
              )[0]?.long_name;

            const { lat, lng } = result.data.results[0].geometry.location;

            setFormattedAddress(result.data.results[0].formatted_address);
            setLatitude(lat);
            setLongitude(lng);
            setRegion({
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.008,
              longitudeDelta: 0.0034,
            });
            setCity(city);
            setState(state);
            setCountry(country);
            setPostalCode(postal_code);
            setSearchLoading(false);
          } catch (error) {
            setSearchLoading(false);
            validationFunctions.errorsResponseDefault(error);
          }
        })
        .catch((error) => {
          setSearchLoading(false);
          validationFunctions.errorsResponseDefault(error);
        });
    }
  }

  return (
    <View style={mainStyle.container}>
      <Header name="Nova Revenda" />
      <ScrollView>
        <Form ref={formRef} onSubmit={handleSubmit} style={mainStyle.form}>
          <Text style={mainStyle.formText}>Razão Social</Text>
          <Input
            name="name"
            placeholder="Digite sua razão social."
            style={mainStyle.formTextInput}
          />
          <Text style={mainStyle.formText}>Telefone</Text>
          <Input
            name="phone"
            keyboardType="numeric"
            placeholder="Digite o número de telefone."
            style={mainStyle.formTextInput}
          />
          <Text style={mainStyle.formText}>Localização</Text>
          <View style={styles.locationView}>
            <View style={styles.locationInputView}>
              <InputClear
                name="location"
                placeholder="Digite o local da empresa."
                formRef={formRef}
                value=""
              />
              {errors?.formatted_address && (
                <Text style={styles.inputErrorText}>
                  {errors?.formatted_address}
                </Text>
              )}
            </View>
            <View style={styles.locationButtonView}>
              {searchLoading && (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ActivityIndicator size="large" color="#666" />
                </View>
              )}
              {!searchLoading && (
                <TouchableOpacity
                  style={styles.locationButton}
                  onPress={() => getPlace()}
                >
                  <Feather name="search" size={20} color="#000" />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <Text style={styles.mapAddress}>{formatted_address}</Text>
          <View style={styles.mapView}>
            <MapView
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              region={region}
            />
          </View>

          <View style={mainStyle.actions}>
            <ActionButton
              onPress={() => onPress()}
              loading={loading}
              text="Salvar"
              style={mainStyle.action}
            />
          </View>
        </Form>
      </ScrollView>
    </View>
  );
}
