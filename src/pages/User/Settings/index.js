import React, { useRef, useEffect, useState } from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Modal,
  Alert,
  TextInput,
} from "react-native";

import { Form } from "@unform/mobile";

import {
  emptyAlert,
  successUpdatedAlert,
  userDeleted,
} from "../../../utils/SystemMessages";
import validationFunctions from "../../../validation/ValidationFunctions";
import Input from "../../../components/form/Input";

import mainStyle from "../../../../mainStyle";
import styles from "./styles";
import api from "../../../services/api";

import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../contexts/auth";
import EditUserValidator from "../../../validation/EditUserValidator";
import ActionButton from "../../../components/form/ActionButton";

export default function Settings() {
  const formRef = useRef(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [userNameDelete, setUserNameDelete] = useState(false);
  const { user, signOut } = useAuth();

  const [userForm, setUserForm] = useState({});
  const [changePassword, setChangePassword] = useState(false);

  const schema = EditUserValidator;
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      await api
        .get(`/user/${user.i_user}`)
        .then(async (response) => {
          setInitLoading(false);
          setLoading(false);
          const responseEdit = response.data;

          setUserForm(responseEdit.user);
          formRef.current.setData({
            name: responseEdit.user.name,
            email: responseEdit.user.email,
            phone: responseEdit.user.phone,
            operationalArea: responseEdit.user.operational_area,
          });
          formRef.current.setErrors({});
        })
        .catch((error) => {
          setInitLoading(false);
          setLoading(false);
          validationFunctions.errorsResponseDefault(error);
        });
    });

    return unsubscribe;
  }, [navigation]);

  async function handleDeleteAcount() {
    setLoadingDelete(true);
    await api
      .delete(`/user/${user.i_user}`)
      .then(async (result) => {
        setLoadingDelete(false);
        await userDeleted();
        await signOut();
      })
      .catch((error) => {
        setLoadingDelete(false);
        validationFunctions.errorsResponseDefault(error);
      });
  }

  const onPress = () => formRef.current.submitForm();

  async function handleSubmit(data) {
    try {
      if (!loading) {
        setLoading(true);
        formRef.current.setErrors({});

        await schema.validate(data, {
          abortEarly: false,
        });

        const body = {};
        if (data.name !== userForm.name) body.name = data.name;
        if (data.email !== userForm.email) body.email = data.email;
        if (data.password) body.password = data.password;
        if (data.phone !== userForm.phone) body.phone = data.phone;
        if (data.operationalArea !== userForm.operational_area)
          body.operational_area = data.operationalArea;
        if (Object.entries(body).length === 0) {
          emptyAlert();
          setLoading(false);
          return;
        }

        if (data.phone)
          body.phone =
            data.phone.length === 11 || data.phone.length === 10
              ? parseInt("55" + data.phone)
              : parseInt(data.phone);

        const { response_update } = await api
          .put(`/user/${user.i_user}`, body)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            const errors = validationFunctions.errorsResponseDefault(error);
            formRef.current.setErrors(errors);
          });

        if (response_update > 0) successUpdatedAlert(navigation, "Home");
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
    <View style={mainStyle.containerDrawer}>
      <ScrollView>
        <View>
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
              placeholder="Digite o seu email inmes."
              style={mainStyle.formTextInput}
            />
            <Text style={mainStyle.formText}>Celular</Text>
            <Input
              name="phone"
              keyboardType="numeric"
              placeholder="Digite o número de celular."
              style={mainStyle.formTextInput}
            />

            <Text style={mainStyle.formText}>Área de Atuação</Text>
            <Input
              name="operationalArea"
              placeholder="Digite a sua area de atuação."
              style={mainStyle.formTextInput}
            />
            {changePassword && (
              <View>
                <Text style={mainStyle.formText}>Nova Senha</Text>
                <Input
                  name="password"
                  secureTextEntry={true}
                  autoCapitalize="none"
                  placeholder="Digite a sua nova senha."
                  style={mainStyle.formTextInput}
                />
                <TouchableOpacity
                  style={styles.buttonPassword}
                  onPress={() => setChangePassword(false)}
                >
                  <Text style={styles.buttonPasswordText}>
                    Não deseja mais trocar a senha.
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {!changePassword && (
              <TouchableOpacity
                style={styles.buttonPassword}
                onPress={() => setChangePassword(true)}
              >
                <Text style={styles.buttonPasswordText}>Trocar a senha</Text>
              </TouchableOpacity>
            )}
            <View style={mainStyle.actions}>
              <ActionButton
                onPress={() => onPress()}
                loading={loading}
                text="Salvar"
                style={mainStyle.action}
              />

              <View>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                  }}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <Text style={[styles.modalText, { fontWeight: "bold" }]}>
                        Você tem certeza que deseja excluir o usuário?
                      </Text>
                      <Text style={styles.modalText}>
                        Você não terá mais acesso ao aplicativo.
                      </Text>
                      <Text style={styles.modalText}>
                        Se você tem certeza que deseja excluir digite o email
                        {" ("}
                        <Text style={{ fontWeight: "bold" }}>{user.email}</Text>
                        {") "} abaixo:
                      </Text>

                      <TextInput
                        style={styles.formTextInput}
                        onChangeText={(text) => setUserNameDelete(text)}
                      />

                      <View style={styles.actionsModal}>
                        <TouchableOpacity
                          style={{
                            ...styles.openButton,
                            backgroundColor: "#2196F3",
                            width: 100,
                            marginRight: 20,
                          }}
                          onPress={() => {
                            setModalVisible(!modalVisible);
                          }}
                        >
                          <Text style={styles.textStyle}>Cancelar</Text>
                        </TouchableOpacity>
                        <ActionButton
                          text="Deletar"
                          loading={loadingDelete}
                          style={{
                            ...styles.openButton,
                            width: 100,
                            alignItems: "center",
                            backgroundColor:
                              user.email === userNameDelete
                                ? "#D3445B"
                                : "gray",
                          }}
                          onPress={() => {
                            if (user.email === userNameDelete) {
                              handleDeleteAcount();
                            }
                          }}
                        />
                      </View>
                    </View>
                  </View>
                </Modal>

                <ActionButton
                  onPress={() => setModalVisible(true)}
                  text="Inativar Conta"
                  style={styles.actionDelete}
                />
              </View>
            </View>
          </Form>
        </View>
      </ScrollView>
    </View>
  );
}
