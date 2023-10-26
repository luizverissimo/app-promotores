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
import { successInsertAlert } from "../../../utils/SystemMessages";
import { useAuth } from "../../../contexts/auth";
import { ScrollView } from "react-native-gesture-handler";
import SearchBarWithList from "../../../components/search/SearchBarWithList";

import validationFunctions from "../../../validation/ValidationFunctions";
import ModelCreateValidator from "../../../validation/ModelCreateValidator";

export default function NewModel({ route }) {
  const formRef = useRef(null);
  const { user } = useAuth();
  const navigation = useNavigation();
  const {
    titleBrand,
    titleEquipament,
    idBrand,
    idEquipament,
    returnScreen,
    returnData,
    lastScreen,
  } = route?.params;
  const [loading, setLoading] = useState(false);
  const [idSelectedBrand, setIdSelectedBrand] = useState(idBrand);

  const [errors, setErros] = useState({});

  const [idSelectedEquipament, setIdSelectedEquipament] = useState(
    idEquipament
  );
  const [titleSelectedBrand, setTitleSelectedBrand] = useState(titleBrand);
  const [titleSelectedEquipament, setTitleSelectedEquipament] = useState(
    titleEquipament
  );

  const schema = ModelCreateValidator;

  const onPress = () => formRef.current.submitForm();

  const handleSetSelectedBrand = (id, title) => {
    setIdSelectedBrand(id);
    setTitleSelectedBrand(title);
  };

  const handleSetSelectedEquipament = (id, title) => {
    setIdSelectedEquipament(id);
    setTitleSelectedEquipament(title);
  };

  async function handleSubmit(data) {
    try {
      if (!loading) {
        setLoading(true);
        formRef.current.setErrors({});

        await schema.validate(
          { idSelectedBrand, idSelectedEquipament, name: data.name },
          {
            abortEarly: false,
          }
        );

        await api
          .post("/model/", {
            i_user: user.i_user,
            name: data.name,
            i_brand: idSelectedBrand,
            i_equipament: idSelectedEquipament,
          })
          .then((response) => {
            if (returnData) {
              const { i_model } = response.data;
              successInsertAlert(navigation, returnScreen, {
                name: titleSelectedEquipament + " " + data.name,
                id: i_model,
                lastScreen: lastScreen,
              });
            } else {
              successInsertAlert(navigation, "Equipaments", {});
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
      setErros(errors);
    }
  }

  return (
    <View style={mainStyle.container}>
      <Header name="Novo Modelo" />
      <ScrollView>
        <Form ref={formRef} onSubmit={handleSubmit} style={mainStyle.form}>
          <View style={styles.searchs}>
            <SearchBarWithList
              requestUrl="/brands/search?"
              header="Marca"
              setItemForPatern={handleSetSelectedBrand}
              textItemSelected={titleSelectedBrand}
              editable={true}
              screenEdit="EditBrand"
              screenCreate="NewBrand"
              buttonLabel="Criar Marca"
              error={errors?.idSelectedBrand}
            />
          </View>
          <View style={styles.searchs}>
            <SearchBarWithList
              requestUrl="/equipaments/search?"
              header="Equipamentos"
              setItemForPatern={handleSetSelectedEquipament}
              textItemSelected={titleSelectedEquipament}
              editable={true}
              screenEdit="EditEquipament"
              screenCreate="NewEquipament"
              buttonLabel="Criar Equipamento"
              error={errors?.idSelectedEquipament}
            />
          </View>
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
            </View>
          </View>
        </Form>
      </ScrollView>
    </View>
  );
}
