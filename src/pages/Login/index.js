import React, { useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import styles from "./styles";
import mainStyle from "../../../mainStyle";

import { Form } from "@unform/mobile";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import Input from "../../components/form/Input";
import LogoImg from "../../assets/LogoPreLogin/inmes.png";
import validationFunctions from "../../validation/ValidationFunctions";

import ActionButton from "../../components/form/ActionButton";
import loginValidator from "../../validation/LoginValidator";
import { useAuth } from "../../contexts/auth";

export default function Login() {
  const { signed, signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const schema = loginValidator;

  function navigateToNewUser() {
    navigation.navigate("NewUser");
  }

  function navigateToNewPassword() {
    navigation.navigate("NewPassword");
  }

  function navigateBack() {
    navigation.goBack();
  }

  const formRef = useRef(null);

  const onPress = () => formRef.current.submitForm();

  async function handleSubmit(data) {
    try {
      setLoading(true);

      formRef.current.setErrors({});

      await schema.validate(data, {
        abortEarly: false,
      });

      const response = await signIn(data);

      if (!response.token) {
        const error = validationFunctions.errorsResponseDefault(response);
        formRef.current.setErrors(error);
      }
    } catch (error) {
      const errors = validationFunctions.errorsResponseDefault(error);
      formRef.current.setErrors(errors);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateBack}>
        <Text style={styles.headerBackText}>
          <Feather name="arrow-left" size={18} color="#696969" /> Voltar
        </Text>
      </TouchableOpacity>
      <View style={styles.header}>
        <Image source={LogoImg} />
      </View>

      <Form ref={formRef} onSubmit={handleSubmit} style={mainStyle.form}>
        <Text style={mainStyle.formText}>E-mail</Text>
        <Input
          name="email"
          placeholder="Digite o seu email Inmes."
          autoCapitalize="none"
          style={mainStyle.formTextInput}
        />

        <Text style={mainStyle.formText}>Senha</Text>
        <Input
          name="password"
          secureTextEntry={true}
          autoCapitalize="none"
          placeholder="Digite a sua senha."
          style={mainStyle.formTextInput}
        />
        <View style={mainStyle.actions}>
          <ActionButton
            onPress={() => onPress()}
            loading={loading}
            text="Entrar"
            style={mainStyle.action}
          />
        </View>
      </Form>
      <View style={styles.footerActions}>
        <TouchableOpacity onPress={() => navigateToNewUser()}>
          <Text style={styles.footerActionText}>Criar Conta</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToNewPassword()}>
          <Text style={styles.footerActionText}>Esqueceu sua senha?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
