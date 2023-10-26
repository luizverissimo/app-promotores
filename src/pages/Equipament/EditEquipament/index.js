import React, { useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
import mainStyle from "../../../../mainStyle";
import { Form } from "@unform/mobile";
import Header from "../../../components/headers/Header";
import Input from "../../../components/form/Input";
import styles from "./styles";
import ActionButton from "../../../components/form/ActionButton";
import {
  emptyAlert,
  successUpdatedAlert,
  DeleteAlert,
} from "../../../utils/SystemMessages";
import api from "../../../services/api";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../contexts/auth";
import validationFunctions from "../../../validation/ValidationFunctions";

export default function EditEquipament({ route }) {
  const formRef = useRef(null);
  const { user } = useAuth();
  const navigation = useNavigation();
  const { id, title } = route.params;
  const [loading, setLoading] = useState(false);
  const [equipament, setEquipament] = useState(null);

  const onPress = () => formRef.current.submitForm();

  async function handleDelete() {
    await DeleteAlert(
      navigation,
      "Equipaments",
      `/equipament/${id}`,
      user.i_user
    );
  }

  useEffect(() => {
    api
      .get(`/equipament/${id}`)
      .then((response) => {
        try {
          const equipamentReturn = response.data;
          formRef.current.setData({
            name: equipamentReturn.name,
          });
          console.log(response.data);
          setEquipament(equipamentReturn);
        } catch (error) {
          validationFunctions.errorsResponseDefault(error);
        }
      })
      .catch((error) => validationFunctions.errorsResponseDefault(error));
  }, []);

  async function handleSubmit(data) {
    try {
      if (!loading) {
        setLoading(true);
        const body = {};
        if (data.name !== equipament.name) body.name = data.name;

        if (Object.entries(body).length === 0) {
          emptyAlert();
          setLoading(false);
          return;
        }
        const { response_update } = await api
          .put(`/equipament/${id}`, {
            i_user: user.i_user,
            name: data.name,
          })
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            setLoading(false);
            const errors = validationFunctions.errorsResponseDefault(error);
            formRef.current.setErrors(errors);
          });

        if (response_update > 0)
          successUpdatedAlert(navigation, "Equipaments", {
            returnData: {
              id,
              title: data.name,
            },
            lastScreen: "ScreenEquipament",
            modified: true,
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
      <Header name="Editar Equipamento" />
      <Form ref={formRef} onSubmit={handleSubmit} style={mainStyle.form}>
        <Text style={mainStyle.formText}>Nome</Text>
        <Input
          name="name"
          placeholder="Digite o nome da equipamento."
          style={mainStyle.formTextInput}
        />
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
    </View>
  );
}
