import React, { useEffect, useRef, useState } from "react";
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

import Header from "../../../components/headers/Header";
import Input from "../../../components/form/Input";
import InputClear from "../../../components/form/InputClear";

import api from "../../../services/api";
import ActionButton from "../../../components/form/ActionButton";

import {
  emptyAlert,
  successUpdatedAlert,
  DeleteAlert,
  coudntFindPlace,
} from "../../../utils/SystemMessages";

import mainStyle from "../../../../mainStyle";
import styles from "./styles";

import ResaleCreateEditValidator from "../../../validation/ResaleCreateEditValidator";
import validationFunctions from "../../../validation/ValidationFunctions";
import { useAuth } from "../../../contexts/auth";

export default function EditResale({ route }) {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [iResale, setIResale] = useState(route.params.id);
  const [resale, setResale] = useState(route.params.id);
  const [initLoading, setInitLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [latDelta, setLatDelta] = useState(0.008);
  const [lngDelta, setLngDelta] = useState(0.0034);
  const [latitude, setLatitude] = useState(-28.297807);
  const [longitude, setLongitude] = useState(-49.150838);
  const [formatted_address, setFormattedAddress] = useState("");
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

  async function handleDelete() {
    await DeleteAlert(navigation, "Resales", `/resale/${iResale}`, user.i_user);
  }

  useEffect(() => {
    api
      .get(`/resale/${iResale}`)
      .then((response) => {
        setInitLoading(false);
        const { resale } = response.data;
        setResale(resale);
        formRef.current.setData({
          name: resale.name,
          phone: resale.phone,
          location: resale.formatted_address,
        });
        setFormattedAddress(resale.formatted_address);
        setCity(resale.city);
        setCountry(resale.country);
        setPostalCode(resale.postalCode);
        setState(resale.state);
        setLatitude(parseFloat(resale.latitude));
        setLongitude(parseFloat(resale.longitude));
        setLatDelta(parseFloat(resale.latitudeDelta));
        setLngDelta(parseFloat(resale.longitudeDelta));
        setRegion({
          latitude: parseFloat(resale.latitude),
          longitude: parseFloat(resale.longitude),
          latitudeDelta: parseFloat(resale.latitudeDelta),
          longitudeDelta: parseFloat(resale.longitudeDelta),
        });
      })
      .catch((error) => {
        validationFunctions.errorsResponseDefault(error);
      });
  }, []);

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

        const body = {};
        if (data.name !== resale.name) body.name = data.name;
        if (data.phone !== resale.phone) body.phone = data.phone;
        if (formatted_address !== resale.formatted_address)
          body.formatted_address = formatted_address;
        if (city !== resale.city) body.city = city;
        if (state !== resale.state) body.state = state;
        if (country !== resale.country) body.country = country;
        if (postalCode !== resale.postalCode) body.postal_code = postalCode;
        if (latitude !== parseFloat(resale.latitude)) body.latitude = latitude;
        if (longitude !== parseFloat(resale.longitude))
          body.longitude = longitude;
        if (latDelta !== parseFloat(resale.latitudeDelta))
          body.latitudeDelta = latDelta;
        if (lngDelta !== parseFloat(resale.longitudeDelta))
          body.longitudeDelta = lngDelta;

        if (Object.entries(body).length === 0) {
          emptyAlert();
          setLoading(false);
          return;
        }
        body.i_user = user.i_user;

        if (data.phone)
          data.phone =
            data.phone.length === 11 || data.phone.length === 10
              ? parseInt("55" + data.phone)
              : parseInt(data.phone);

        const { response_update } = await api
          .put(`/resale/${iResale}`, body)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            setLoading(false);
            const errors = validationFunctions.errorsResponseDefault(error);
            formRef.current.setErrors(errors);
            setErrors(errors);
          });
        if (response_update > 0) successUpdatedAlert(navigation, "Resales");
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

  if (initLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#666" />
      </View>
    );
  }

  return (
    <View style={mainStyle.container}>
      <Header name="Editar Revenda" />
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
                iResale
                placeholder="Digite o local da empresa."
                formRef={formRef}
                value={resale.location}
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

          <TouchableOpacity
            style={styles.buttonListEmployee}
            onPress={() =>
              navigation.navigate("ResaleEmployers", { id: route.params.id })
            }
          >
            <Text style={styles.buttonListEmployeeText}>Cadastrar Contato</Text>
          </TouchableOpacity>

          <View style={styles.actions}>
            <ActionButton
              onPress={() => onPress()}
              loading={loading}
              text="Salvar"
              style={styles.action}
            />
            <ActionButton
              onPress={() => handleDelete()}
              text="Deletar"
              style={styles.actionDelete}
            />
          </View>
        </Form>
      </ScrollView>
    </View>
  );
}
