import React, { useEffect, useRef, useState } from "react";
import { View, ScrollView, Text, ActivityIndicator } from "react-native";
import Header from "../../../components/headers/Header";

import { Form } from "@unform/mobile";
import Input from "../../../components/form/Input";

import ActionButton from "../../../components/form/ActionButton";
import CustomerEmployerValidator from "../../../validation/CustomerEmployerValidator";
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

export default function EditCustomerEmployer({ route }) {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [initLoading, setInitLoading] = useState(true);
  const formRef = useRef(null);
  const [iCustomerEmployer, setICustomerEmployer] = useState(route.params.id);
  const [customerEmployer, setCustomerEmployer] = useState({});
  const [loading, setLoading] = useState(false);

  const schema = CustomerEmployerValidator;

  const onPress = () => formRef.current.submitForm();

  useEffect(() => {
    api
      .get(`/customer-employer/${iCustomerEmployer}`)
      .then((response) => {
        try {
          setInitLoading(false);
          const { customerEmployer } = response.data;
          setCustomerEmployer(customerEmployer);
          customerEmployer.email =
            customerEmployer.email === null ? "" : customerEmployer.email;
          formRef.current.setData({
            name: customerEmployer.name,
            phone: customerEmployer.phone,
            email: customerEmployer.email,
            position: customerEmployer.position,
          });
        } catch (error) {
          validationFunctions.errorsResponseDefault(error);
        }
      })
      .catch((error) => validationFunctions.errorsResponseDefault(error));
  }, []);

  async function handleDelete() {
    await DeleteAlert(
      navigation,
      "CustomerEmployers",
      `/customer-employer/${iCustomerEmployer}`,
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
        if (data.name !== customerEmployer.name) body.name = data.name;
        if (data.phone !== customerEmployer.phone) body.phone = data.phone;
        if (data.email !== customerEmployer.email) body.email = data.email;
        if (data.position !== customerEmployer.position)
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
          .put(`/customer-employer/${iCustomerEmployer}`, body)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            setLoading(false);
            const errors = validationFunctions.errorsResponseDefault(error);
            formRef.current.setErrors(errors);
          });
        if (response_update > 0)
          successUpdatedAlert(navigation, "CustomerEmployers");
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
