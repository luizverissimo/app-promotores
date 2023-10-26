import React, { useEffect, useRef, useState } from "react";
import { View, ScrollView, Text, ActivityIndicator } from "react-native";
import Header from "../../../components/headers/Header";

import { Form } from "@unform/mobile";
import Input from "../../../components/form/Input";

import ActionButton from "../../../components/form/ActionButton";
import ResaleEmployerValidator from "../../../validation/ResaleEmployerValidator";
import {
  successUpdatedAlert,
  emptyAlert,
  DeleteAlert,
} from "../../../utils/SystemMessages";
import api from "../../../services/api";
import { useNavigation } from "@react-navigation/native";

import mainStyle from "../../../../mainStyle";

import styles from "./styles";
import { useAuth } from "../../../contexts/auth";
import validationFunctions from "../../../validation/ValidationFunctions";

export default function EditResaleEmployer({ route }) {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [initLoading, setInitLoading] = useState(true);

  const formRef = useRef(null);
  const [iResaleEmployer, setIResaleEmployer] = useState(route.params.id);
  const [resaleEmployer, setResaleEmployer] = useState({});
  const [loading, setLoading] = useState(false);

  const schema = ResaleEmployerValidator;

  const onPress = () => formRef.current.submitForm();

  useEffect(() => {
    api
      .get(`/resale-employer/${iResaleEmployer}`)
      .then((response) => {
        setInitLoading(false);
        const { resaleEmployer } = response.data;
        setResaleEmployer(resaleEmployer);
        resaleEmployer.email =
          resaleEmployer.email === null ? "" : resaleEmployer.email;
        formRef.current.setData({
          name: resaleEmployer.name,
          phone: resaleEmployer.phone,
          email: resaleEmployer.email,
          position: resaleEmployer.position,
        });
      })
      .catch((error) => validationFunctions.errorsResponseDefault(error));
  }, []);

  async function handleDelete() {
    await DeleteAlert(
      navigation,
      "ResaleEmployers",
      `/resale-employer/${iResaleEmployer}`,
      user.i_user
    );
  }

  async function handleSubmit(data) {
    try {
      if (!loading) {
        setLoading(true);
        formRef.current.setErrors({});

        await schema.validate(data, {
          abortEarly: false,
        });

        const body = {};
        if (data.name !== resaleEmployer.name) body.name = data.name;
        if (data.phone !== resaleEmployer.phone) body.phone = data.phone;
        if (data.email !== resaleEmployer.email) body.email = data.email;
        if (data.position !== resaleEmployer.position)
          body.position = data.position;

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
          .put(`/resale-employer/${iResaleEmployer}`, body)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            setLoading(false);
            const errors = validationFunctions.errorsResponseDefault(error);
            formRef.current.setErrors(errors);
          });
        if (response_update > 0)
          successUpdatedAlert(navigation, "ResaleEmployers");
      }
    } catch (error) {
      setLoading(false);
      const errors = validationFunctions.errorsResponseDefault(error);
      formRef.current.setErrors(errors);
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
      <Header name="Editar Contato" />
      <ScrollView>
        <Form ref={formRef} onSubmit={handleSubmit} style={mainStyle.form}>
          <Text style={mainStyle.formText}>Nome</Text>
          <Input
            name="name"
            placeholder="Digite o nome do contato."
            style={mainStyle.formTextInput}
          />
          <Text style={mainStyle.formText}>Telefone</Text>
          <Input
            name="phone"
            keyboardType="numeric"
            placeholder="Digite o número de telefone."
            style={mainStyle.formTextInput}
          />

          <Text style={mainStyle.formText}>E-mail</Text>
          <Input
            name="email"
            placeholder="Digite o email ."
            autoCapitalize="none"
            style={mainStyle.formTextInput}
          />
          <Text style={mainStyle.formText}>Cargo</Text>
          <Input
            name="position"
            placeholder="Digite o cargo ."
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
      </ScrollView>
    </View>
  );
}
