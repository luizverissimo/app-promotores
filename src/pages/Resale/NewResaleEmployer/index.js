import React, { useRef, useState, useEffect } from "react";
import { View, ScrollView, Text } from "react-native";
import Header from "../../../components/headers/Header";
import { Form } from "@unform/mobile";
import Input from "../../../components/form/Input";
import mainStyle from "../../../../mainStyle";
import ActionButton from "../../../components/form/ActionButton";
import ResaleEmployerValidator from "../../../validation/ResaleEmployerValidator";

import { successInsertAlert } from "../../../utils/SystemMessages";
import api from "../../../services/api";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../contexts/auth";
import validationFunctions from "../../../validation/ValidationFunctions";

export default function NewResaleEmployer({ route }) {
  const navigation = useNavigation();
  const formRef = useRef(null);
  const [iResale, setIResale] = useState(route.params.id);
  const { returnScreen, returnData, idParent } = route.params;
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const onPress = () => formRef.current.submitForm();

  useEffect(() => {
    if (idParent) setIResale(idParent);
  }, []);

  const schema = ResaleEmployerValidator;

  async function handleSubmit(data) {
    try {
      if (!loading) {
        setLoading(true);
        formRef.current.setErrors({});

        await schema.validate(data, {
          abortEarly: false,
        });

        if (data.phone)
          data.phone =
            data.phone.length === 11 || data.phone.length === 10
              ? parseInt("55" + data.phone)
              : parseInt(data.phone);

        await api
          .post("/resale-employer", {
            i_user: user.i_user,
            i_resale: iResale,
            name: data.name,
            phone: data.phone,
            email: data.email,
            position: data.position,
          })
          .then((response) => {
            const { i_resale_employer } = response.data;

            const option = returnData
              ? {
                  name: data.name,
                  id: i_resale_employer,
                  lastScreen: "NewResaleEmployer",
                }
              : {};

            successInsertAlert(navigation, returnScreen, option);
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
      <Header name="Novo Contato" />
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
            style={mainStyle.formTextInput}
          />
          <Text style={mainStyle.formText}>Cargo</Text>
          <Input
            name="position"
            placeholder="Digite o cargo ."
            style={mainStyle.formTextInput}
          />
          <View style={mainStyle.actions}>
            <ActionButton
              onPress={() => onPress()}
              loading={loading}
              text="Salvar"
              style={mainStyle.action}
            />
          </View>
        </Form>
      </ScrollView>
    </View>
  );
}
