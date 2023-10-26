import React, { useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import mainStyle from "../../../mainStyle";
import * as Yup from "yup";
import Input from "../../components/form/Input";
import Header from "../../components/headers/Header";
import { Form } from "@unform/mobile";
import { useNavigation } from "@react-navigation/native";
import api from "../../services/api";
import styles from "./styles";
import validationFunctions from "../../validation/ValidationFunctions";

export default function NewPassword() {
  const formRef = useRef(null);
  const navigation = useNavigation();

  const schema = Yup.object().shape({
    email: Yup.string()
      .email("E-mail invalido")
      .required("E-mail é obrigatório."),
  });

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});

      await schema.validate(data, {
        abortEarly: false,
      });

      await api
        .post(`/reset-password`, { email: data.email })
        .then((response) => {
          navigation.goBack();
        })
        .catch((error) => {
          const errors = validationFunctions.errorsResponseDefault(error);
          formRef.current.setErrors(errors);
        });
    } catch (error) {
      const errors = validationFunctions.errorsResponseDefault(error);
      formRef.current.setErrors(errors);
    }
  }

  return (
    <View style={mainStyle.container}>
      <Header name="Nova Senha" />
      <View>
        <Form ref={formRef} onSubmit={handleSubmit} style={mainStyle.form}>
          <Text style={styles.formText}>
            Digite seu E-mail para trocar sua senha.
          </Text>
          <Input
            name="email"
            placeholder="Digite o email para trocar a senhas ."
            style={mainStyle.formTextInput}
          />
          <View style={mainStyle.actions}>
            <TouchableOpacity
              style={mainStyle.action}
              onPress={() => formRef.current.submitForm()}
            >
              <Text style={mainStyle.actionText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </Form>
      </View>
    </View>
  );
}
