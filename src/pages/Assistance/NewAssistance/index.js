import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import mainStyle from "../../../../mainStyle";
import Header from "../../../components/headers/Header";
import SearchBarWithList from "../../../components/search/SearchBarWithList";

import api from "../../../services/api";
import { successInsertAlert } from "../../../utils/SystemMessages";

import { Form } from "@unform/mobile";
import styles from "./styles";
import ActionButton from "../../../components/form/ActionButton";
import Input from "../../../components/form/Input";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../contexts/auth";
import AssistanceCreateValidator from "../../../validation/AssistanceCreateValidator";
import validationFunctions from "../../../validation/ValidationFunctions";

export default function NewAssistance() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [idSelectedCustomer, setIdSelectedCustomer] = useState(0);
  const [tileSelectedCustomer, setTileSelectedCustomer] = useState(null);
  const [idSelectedModel, setIdSelectedModel] = useState(0);
  const [tileSelectedModel, setTileSelectedModel] = useState(null);
  const [description, setDescription] = useState("");
  const [contactName, setContactName] = useState("");
  const [serieNumber, setSerieNumber] = useState("");

  const handleSetSelectedCustomer = (id, title) => {
    setIdSelectedCustomer(id);
    setTileSelectedCustomer(title);
  };

  const handleSetSelectedModel = (id, title) => {
    setIdSelectedModel(id);
    setTileSelectedModel(title);
  };

  const schema = AssistanceCreateValidator;

  async function sendEmailInmes() {
    await api
      .get(`/customer/${idSelectedCustomer}`)
      .then(async (response) => {
        try {
          const { customer } = response.data;

          await api
            .post("/send-mail", {
              sender: `"${user.name}" <${user.email}>`,
              receivers:
                "assistencia6@inmes.com.br, gerente.comercial@inmes.com.br, vendas4@inmes.com.br",
              subject: `Assistência em ${tileSelectedCustomer}`,
              text: `O cliente ${tileSelectedCustomer} está com um problema no equipamento ${tileSelectedModel} \(Numero de série: ${serieNumber}\),\n${description}\n\nFalar com: ${contactName}\nTelefone para contato: +${customer.phone}`,
              html: "",
            })
            .then((response) => {})
            .catch((error) => validationFunctions.errorsResponseDefault(error));
        } catch (error) {
          validationFunctions.errorsResponseDefault(error);
        }
      })
      .catch((error) => validationFunctions.errorsResponseDefault(error));
  }

  const onPress = () => formRef.current.submitForm();

  async function handleSubmit(data) {
    try {
      if (!loading) {
        setLoading(true);
        formRef.current.setErrors({});

        await schema.validate(
          {
            idSelectedCustomer,
            idSelectedModel,
            title: data.title,
            description: description,
          },
          {
            abortEarly: false,
          }
        );

        const body = {
          i_user: user.i_user,
          i_customer: idSelectedCustomer,
          i_model: idSelectedModel,
          title: data.title,
          description,
        };

        await api.post("/assistance", body).then(async (response) => {
          await sendEmailInmes();
          successInsertAlert(navigation, "Assistances", {});
        });
      }
    } catch (error) {
      setLoading(false);
      const errors = validationFunctions.errorsResponseDefault(error);
      formRef.current.setErrors(errors);
      setErrors(errors);
    }
  }

  return (
    <View style={mainStyle.container}>
      <Header name="Nova Assistência" />
      <ScrollView style={styles.content}>
        <Form ref={formRef} onSubmit={handleSubmit} style={mainStyle.form}>
          <View style={styles.fixLayout}>
            <Text style={styles.formText}>Cliente</Text>
            <SearchBarWithList
              requestUrl="/customers/search?"
              setItemForPatern={handleSetSelectedCustomer}
              error={errors?.idSelectedCustomer}
            />
            <Text style={styles.formText}>Modelo</Text>
            <SearchBarWithList
              requestUrl="/models-total/search?"
              setItemForPatern={handleSetSelectedModel}
              error={errors?.idSelectedModel}
            />
          </View>
          <Text style={styles.formTextSimple}>Número de Série</Text>
          <TextInput
            style={styles.formTextInput}
            onChangeText={(text) => setSerieNumber(text)}
          />
          <Text style={styles.formTextFix}>Titulo</Text>
          <Input
            name="title"
            placeholder="Digite o título da assistência."
            style={styles.formTextInputLine}
          />
          <Text style={styles.formTextSimple}>Nome para contato</Text>
          <TextInput
            style={styles.formTextInput}
            onChangeText={(text) => setContactName(text)}
          />

          <Text style={styles.formTextFix}>Qual o problema?</Text>
          <View style={styles.formTextInputView}>
            <TextInput
              multiline
              numberOfLines={10}
              style={styles.formTextInput}
              onChangeText={(text) => setDescription(text)}
            />
            <Text style={mainStyle.inputErrorText}>
              {formRef.current?.getErrors()?.description}
            </Text>
          </View>
          <View style={styles.fixLayout}>
            <View style={styles.actions}>
              <ActionButton
                onPress={() => onPress()}
                loading={loading}
                text="Salvar"
                style={styles.action}
              />
            </View>
          </View>
        </Form>
      </ScrollView>
    </View>
  );
}
