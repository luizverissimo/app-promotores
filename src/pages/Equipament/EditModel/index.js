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
import {
  emptyAlert,
  successUpdatedAlert,
  DeleteAlert,
} from "../../../utils/SystemMessages";
import { useAuth } from "../../../contexts/auth";
import { ScrollView } from "react-native-gesture-handler";

import validationFunctions from "../../../validation/ValidationFunctions";
import ModelEditValidator from "../../../validation/ModelEditValidator";

export default function EditModel({ route }) {
  const formRef = useRef(null);
  const { user } = useAuth();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState({});
  const { id } = route.params;

  const schema = ModelEditValidator;

  const onPress = () => formRef.current.submitForm();

  async function handleDelete() {
    await DeleteAlert(navigation, "Equipaments", `/model/${id}`, user.i_user);
  }
  useEffect(() => {
    api
      .get(`/model/${id}`)
      .then((response) => {
        try {
          const modelReturn = response.data;
          formRef.current.setData({
            name: modelReturn.name,
            brand: modelReturn.brand_name,
            equipament: modelReturn.equipament_name,
          });

          setModel(modelReturn);
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
        formRef.current.setErrors({});

        await schema.validate(data, {
          abortEarly: false,
        });
        const body = {};
        if (data.name !== model.name) body.name = data.name;
        if (Object.entries(body).length === 0) {
          emptyAlert();
          setLoading(false);
          return;
        }
        body.i_user = user.i_user;
        body.i_brand = model.i_brand;
        body.i_equipament = model.i_equipament;

        const { response_update } = await api
          .put(`/model/${id}`, body)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            setLoading(false);
            const errors = validationFunctions.errorsResponseDefault(error);
            formRef.current.setErrors(errors);
          });
        if (response_update > 0) successUpdatedAlert(navigation, "Equipaments");
      }
    } catch (error) {
      setLoading(false);
      const errors = validationFunctions.errorsResponseDefault(error);
      formRef.current.setErrors(errors);
    }
  }

  return (
    <View style={mainStyle.container}>
      <Header name="Novo Modelo" />
      <ScrollView>
        <Form ref={formRef} onSubmit={handleSubmit} style={mainStyle.form}>
          <Text style={mainStyle.formText}>Marca</Text>
          <Input
            name="brand"
            style={mainStyle.formTextInput}
            editable={false}
          />
          <Text style={mainStyle.formText}>Equipamento</Text>
          <Input
            name="equipament"
            style={mainStyle.formTextInput}
            editable={false}
          />
          <View style={styles.form}>
            <Text style={mainStyle.formText}>Modelo</Text>
            <Input name="name" style={mainStyle.formTextInput} />
            <View style={mainStyle.actions}>
              <ActionButton
                onPress={() => onPress()}
                loading={loading}
                text="Salvar"
                style={mainStyle.action}
              />

              <ActionButton
                onPress={() => handleDelete()}
                text="Deletar"
                style={styles.actionDelete}
              />
            </View>
          </View>
        </Form>
      </ScrollView>
    </View>
  );
}
