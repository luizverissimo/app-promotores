import React, { useRef, useState } from "react";
import { View, Text, ScrollView, Picker, TouchableOpacity } from "react-native";
import { Form } from "@unform/mobile";
import ActionButton from "../../../components/form/ActionButton";

import mainStyle from "../../../../mainStyle";
import Input from "../../../components/form/Input";
import api from "../../../services/api";
import Header from "../../../components/headers/Header";
import NewUserValidator from "../../../validation/NewUserValidator";
import validationFunctions from "../../../validation/ValidationFunctions";
import { useAuth } from "../../../contexts/auth";
import { userCreateError } from "../../../utils/SystemMessages";

export default function NewUser() {
  const { signed, signIn } = useAuth();
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const schema = NewUserValidator;

  async function handleSubmit(data) {
    try {
      if (!loading) {
        setLoading(true);
        formRef.current.setErrors({});

        await schema.validate(data, {
          abortEarly: false,
        });
        if (data?.phone)
          data.phone =
            data.phone.length === 11 || data.phone.length === 10
              ? parseInt("55" + data.phone)
              : parseInt(data.phone);

        await api
          .post("/user", {
            name: data.name,
            email: data.email,
            password: data.password,
            phone: data.phone,
            operational_area: data.operationalArea,
          })
          .then(async (response) => {
            const responseLogin = await signIn(data);

            setLoading(false);
            if (!responseLogin.token) {
              userCreateError();
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
      <Header name="Cadastro de Usuário" />
      <ScrollView>
        <Form ref={formRef} onSubmit={handleSubmit} style={mainStyle.form}>
          <Text style={mainStyle.formText}>Nome</Text>
          <Input
            name="name"
            placeholder="Digite o seu nome."
            style={mainStyle.formTextInput}
          />

          <Text style={mainStyle.formText}>E-mail</Text>
          <Input
            name="email"
            placeholder="Digite o seu email Inmes."
            autoCapitalize="none"
            style={mainStyle.formTextInput}
          />
          <Text style={mainStyle.formText}>Celular</Text>
          <Input
            name="phone"
            keyboardType="numeric"
            placeholder="Digite o número de celular."
            style={mainStyle.formTextInput}
          />

          <Text style={mainStyle.formText}>Senha</Text>
          <Input
            name="password"
            secureTextEntry={true}
            autoCapitalize="none"
            placeholder="Digite sua senha."
            style={mainStyle.formTextInput}
          />

          <Text style={mainStyle.formText}>Confirmar Senha</Text>
          <Input
            name="confirmpassword"
            secureTextEntry={true}
            autoCapitalize="none"
            placeholder="Digite a senha novamente."
            style={mainStyle.formTextInput}
          />

          <Text style={mainStyle.formText}>Área de Atuação</Text>
          <Input
            name="operationalArea"
            placeholder="Digite a sua área de atuação."
            style={mainStyle.formTextInput}
          />

          <View style={mainStyle.actions}>
            <ActionButton
              onPress={() => formRef.current.submitForm()}
              loading={loading}
              text="Cadastrar-se"
              style={mainStyle.action}
            />
          </View>
        </Form>
      </ScrollView>
    </View>
  );
}
