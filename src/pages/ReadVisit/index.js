import React, { useState, useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import mainStyle from "../../../mainStyle";
import styles from "./styles";
import Header from "../../components/headers/Header";
import api from "../../services/api";
import validationFunctions from "../../validation/ValidationFunctions";
import moment from "moment";

export default function ReadVisit({ route }) {
  const { id } = route.params;
  const [visit, setVisits] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/visit/${id}`)
      .then((response) => {
        const { visit } = response.data;
        setVisits(visit);
        setLoading(false);
      })
      .catch((error) => {
        validationFunctions.errorsResponseDefault(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#666" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Header name="Ver Visita" />
      <Text style={styles.formText}>
        No dia{" "}
        <Text style={styles.formTextBold}>
          {moment(visit?.aud_created_date).format("DD/MM/YYYY [às] HH:mm")},{" "}
        </Text>{" "}
        você visitou o cliente:{" "}
        <Text style={styles.formTextBold}>{visit?.customer}.</Text>
      </Text>
      {!!visit?.customer_employers_visits &&
        Object.keys(visit?.customer_employers_visits).length > 0 && (
          <Text style={styles.formText}>
            Foi atendido por:{" "}
            <Text style={styles.formTextBold}>
              {visit?.customer_employers_visits?.map((e, i) => {
                if (visit?.customer_employers_visits.length === i + 1) {
                  return e.name + ".";
                } else {
                  return e.name + ", ";
                }
              })}
            </Text>
          </Text>
        )}
      {!!visit?.resale && (
        <Text style={styles.formText}>
          Junto com a revenda:{" "}
          <Text style={styles.formTextBold}>{visit?.resale}.</Text>
        </Text>
      )}
      {!!visit?.resale_employers_visits &&
        Object.keys(visit?.resale_employers_visits).length > 0 && (
          <Text style={styles.formText}>
            Junto com os representantes:{" "}
            <Text style={styles.formTextBold}>
              {visit?.resale_employers_visits?.map((e, i) => {
                if (visit?.resale_employers_visits.length === i + 1) {
                  return e.name + ".";
                } else {
                  return e.name + ", ";
                }
              })}
            </Text>
          </Text>
        )}
      {!!visit?.customers_models_visits &&
        Object.keys(visit?.customers_models_visits).length > 0 && (
          <Text style={styles.formText}>
            Ele tinha as seguintes máquinas:{" "}
            <Text style={styles.formTextBold}>
              {visit?.customers_models_visits?.map((e, i) => {
                if (visit?.customers_models_visits.length === i + 1) {
                  return e.name + ".";
                } else {
                  return e.name + ", ";
                }
              })}
            </Text>
          </Text>
        )}
      {!!visit?.models_desired &&
        Object.keys(visit?.models_desired).length > 0 && (
          <Text style={styles.formText}>
            Ele desejava ter as máquinas:{" "}
            <Text style={styles.formTextBold}>
              {visit?.models_desired?.map((e, i) => {
                if (visit?.models_desired.length === i + 1) {
                  return e.name + ".";
                } else {
                  return e.name + ", ";
                }
              })}
            </Text>
          </Text>
        )}
      {!!visit?.anotation && (
        <Text style={styles.formText}>
          E a sua anotação foi: {visit?.anotation}
        </Text>
      )}
    </View>
  );
}
