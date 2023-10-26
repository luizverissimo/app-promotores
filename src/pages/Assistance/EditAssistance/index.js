import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import mainStyle from "../../../../mainStyle";
import Header from "../../../components/headers/Header";
import { Form } from "@unform/mobile";

import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import SearchBarWithList from "../../../components/search/SearchBarWithList";
import Input from "../../../components/form/Input";
import ActionButton from "../../../components/form/ActionButton";
import api from "../../../services/api";

import {
  emptyAlert,
  successUpdatedAlert,
  DeleteAlert,
} from "../../../utils/SystemMessages";
import { useAuth } from "../../../contexts/auth";
import AssistanceCreateValidator from "../../../validation/AssistanceCreateValidator";
import validationFunctions from "../../../validation/ValidationFunctions";

export default function EditAssistance({ route }) {
  const navigation = useNavigation();
  const formRef = useRef(null);
  const { user } = useAuth();
  const [initLoading, setInitLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [iAssistance, setIAssistance] = useState(route.params.id);
  const [assistance, setAssistance] = useState(route.params.id);
  const [loading, setLoading] = useState(false);
  const [idSelectedCustomer, setIdSelectedCustomer] = useState(null);
  const [tileSelectedCustomer, setTileSelectedCustomer] = useState(null);
  const [idSelectedModel, setIdSelectedModel] = useState(null);
  const [tileSelectedModel, setTileSelectedModel] = useState(null);
  const [description, setDescription] = useState(null);
  const [title, setTitle] = useState(null);

  const handleSetSelectedCustomer = (id, title) => {
    setIdSelectedCustomer(id);
    setTileSelectedCustomer(title);
  };

  const handleSetSelectedModel = (id, title) => {
    setIdSelectedModel(id);
    setTileSelectedModel(title);
  };

  const schema = AssistanceCreateValidator;

  async function handleDelete() {
    await DeleteAlert(
      navigation,
      "Assistances",
      `/assistance/${iAssistance}`,
      user.i_user
    );
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
        const body = {};
        if (idSelectedCustomer !== assistance.i_customer)
          body.i_customer = idSelectedCustomer;
        if (idSelectedModel !== assistance.i_model)
          body.i_model = idSelectedModel;
        if (data.title !== assistance.title) body.title = data.title;
        if (description !== assistance.description)
          body.description = description;

        if (Object.entries(body).length === 0) {
          emptyAlert();
          setLoading(false);
          return;
        }
        body.i_user = user.i_user;

        const { response_update } = await api
          .put(`/assistance/${iAssistance}`, body)
          .then((response) => {
            return response.data;
          });
        if (response_update > 0) successUpdatedAlert(navigation, "Assistances");
      }
    } catch (error) {
      setLoading(false);
      const errors = validationFunctions.errorsResponseDefault(error);
      formRef.current.setErrors(errors);
      setErrors(errors);
    }
  }

  useEffect(() => {
    api
      .get(`/assistance/${iAssistance}`)
      .then((response) => {
        try {
          setInitLoading(false);
          const { assistance } = response.data;
          setAssistance(assistance);
          setTileSelectedCustomer(assistance.customer_name);
          setTileSelectedModel(assistance.model_name);
          setIdSelectedCustomer(assistance.i_customer);
          setIdSelectedModel(assistance.i_model);
          setDescription(assistance.description);
          formRef.current.setData({ title: assistance.title });
        } catch (error) {
          validationFunctions.errorsResponseDefault(error);
        }
      })
      .catch((error) => {
        setInitLoading(false);
        validationFunctions.errorsResponseDefault(error);
      });
  }, []);

  if (initLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#666" />
      </View>
    );
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
              textItemSelected={tileSelectedCustomer}
              error={errors?.idSelectedCustomer}
            />
            <Text style={styles.formText}>Modelo</Text>
            <SearchBarWithList
              requestUrl="/models-total/search?"
              setItemForPatern={handleSetSelectedModel}
              textItemSelected={tileSelectedModel}
              error={errors?.idSelectedModel}
            />
          </View>
          <Text style={styles.formTextFix}>Titulo</Text>
          <Input
            name="title"
            placeholder="Digite o título da assistência."
            style={styles.formTextInputLine}
          />
          <Text style={styles.formTextFix}>Qual o problemas?</Text>
          <View style={styles.formTextInputView}>
            <TextInput
              multiline
              numberOfLines={10}
              style={styles.formTextInput}
              onChangeText={(text) => setDescription(text)}
              value={description}
            />
            <Text style={mainStyle.inputErrorText}>{errors?.description}</Text>
          </View>
          <View style={styles.fixLayout}>
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
          </View>
        </Form>
      </ScrollView>
    </View>
  );
}
