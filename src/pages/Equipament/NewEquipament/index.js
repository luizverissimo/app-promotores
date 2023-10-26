import React, { useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
import mainStyle from "../../../../mainStyle";
import { Form } from "@unform/mobile";
import Header from "../../../components/headers/Header";

import Input from "../../../components/form/Input";
import styles from "./styles";
import ActionButton from "../../../components/form/ActionButton";
import api from "../../../services/api";
import { useNavigation } from "@react-navigation/native";
import { successInsertAlert } from "../../../utils/SystemMessages";
import { useAuth } from "../../../contexts/auth";
import validationFunctions from "../../../validation/ValidationFunctions";

export default function NewEquipament({ route }) {
  const formRef = useRef(null);
  const navigation = useNavigation();

  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const { returnScreen, returnData, lastScreen } = !!route.params
    ? route.params
    : {};
  const onPress = () => formRef.current.submitForm();

  async function handleSubmit(data) {
    try {
      if (!loading) {
        setLoading(true);
        await api
          .post("/equipament", {
            i_user: user.i_user,
            name: data.name,
          })
          .then((response) => {
            const { i_equipament } = response.data;

            if (returnData) {
              successInsertAlert(navigation, returnScreen, {
                returnData: {
                  id: i_equipament,
                  title: data.name,
                },
                lastScreen: "ScreenEquipament",
                modified: true,
              });
            } else {
              successInsertAlert(navigation, "Equipaments", {
                returnData: {
                  id: i_equipament,
                  title: data.name,
                },
                lastScreen: "ScreenEquipament",
                modified: true,
              });
            }
          })
          .catch((error) => {
            setLoading(false);
            const errors = validationFunctions.errorsResponseDefault(error);
            formRef.current.setErrors(errors);
          });
      }
    } catch (error) {
      setLoading(false);
      const errors = validationFunctions.errorsResponseDefault(error);
      formRef.current.setErrors(errors);
    }
  }

  return (
    <View style={mainStyle.container}>
      <Header name="Criar Equipamento" />
      <Form ref={formRef} onSubmit={handleSubmit} style={mainStyle.form}>
        <Text style={mainStyle.formText}>Nome</Text>
        <Input
          name="name"
          placeholder="Digite o nome do equipamento."
          style={mainStyle.formTextInput}
        />
        <View style={styles.actions}>
          <ActionButton
            onPress={() => onPress()}
            loading={loading}
            text="Salvar"
            style={styles.action}
          />
        </View>
      </Form>
    </View>
  );
}
