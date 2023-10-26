const { Alert } = require("react-native");
import { useAuth } from "../../contexts/auth";
import api from "../../services/api";
import validationFunctions from "../../validation/ValidationFunctions";

const genericAlert = (header, message) =>
  Alert.alert(header, message, [{ text: "OK", onPress: () => {} }]);

const serverConnetionError = () =>
  Alert.alert(
    "Erro",
    "Problema ao conectar com o servidor, tente novamente em alguns minutos.",
    [{ text: "OK", onPress: () => {} }]
  );

const serverConnetionMessage = (message) =>
  Alert.alert("Erro", message, [{ text: "OK", onPress: () => {} }]);

const unhandedErrorAlert = () =>
  Alert.alert(
    "Erro",
    "Algum erro ocorreu, entre em contato com o desenvolvimento.",
    [{ text: "OK", onPress: () => {} }]
  );

const emptyAlert = () =>
  Alert.alert("Aviso", "Você não alterou nenhum dado no formulário.", [
    { text: "OK", onPress: () => {} },
  ]);

const successUpdatedAlert = (navigation, path, params) =>
  Alert.alert("Aviso", "Atualização realizada sucesso!", [
    {
      text: "OK",
      onPress: () => navigation.navigate(path, params),
    },
  ]);

const successInsertAlert = (navigation, path, option) => {
  Alert.alert("Aviso", "Cadastramento realizado sucesso!", [
    {
      text: "OK",
      onPress: () => {
        navigation.navigate(path, option);
      },
    },
  ]);
};

const successSentMail = (navigation, path) =>
  Alert.alert("Aviso", "Email enviado com sucesso!", [
    {
      text: "OK",
      onPress: () => navigation.navigate(path),
    },
  ]);

const DeleteAlert = (navigation, path, urlDeletion, i_user, params) =>
  Alert.alert("Aviso", "Você tem certeza que deseja deletar?", [
    {
      text: "Cancelar",
      onPress: () => {},
    },
    {
      text: "OK",
      onPress: async () => {
        await api
          .delete(urlDeletion, { i_user })
          .then((response) => {
            navigation.navigate(path, params);
          })
          .catch((error) => {
            validationFunctions.errorsResponseDefault(error);
          });
      },
    },
  ]);

const LogoutAlert = (logout, cancel) =>
  Alert.alert("Alerta", "Você deseja realmente sair do aplicativo?", [
    { text: "OK", onPress: logout },
    {
      text: "Cancelar",
      onPress: cancel,
    },
  ]);

const coudntFindPlace = () =>
  Alert.alert("Alerta", "Lugar não encontrado.", [
    { text: "OK", onPress: () => {} },
  ]);

const userCreateError = () =>
  Alert.alert(
    "Alerta",
    "Ao cadastrar o cliente algum erro ocorreu, entre em contato com o desenvolvimento.",
    [{ text: "OK", onPress: () => {} }]
  );

const userDeleted = () =>
  Alert.alert(
    "Aviso!",
    "O usuário foi inativado, você não pode mais acesar sua no aplicativo.",
    [{ text: "OK", onPress: () => {} }]
  );

module.exports = {
  serverConnetionError,
  unhandedErrorAlert,
  emptyAlert,
  successUpdatedAlert,
  successInsertAlert,
  DeleteAlert,
  successSentMail,
  LogoutAlert,
  coudntFindPlace,
  userCreateError,
  genericAlert,
  serverConnetionMessage,
  userDeleted,
};
