import React, { useEffect, useState, useRef } from "react";
import {
  View,
  ScrollView,
  TextInput,
  Text,
  ActivityIndicator,
} from "react-native";
import moment from "moment";

import mainStyle from "../../../mainStyle";
import styles from "./styles";
import SearchBarWithShipper from "../../components/search/SearchBarWithShipper";

import { successInsertAlert } from "../../utils/SystemMessages";
import ActionButton from "../../components/form/ActionButton";
import api from "../../services/api";
import { useNavigation } from "@react-navigation/native";

import PickerNotification from "../../components/form/PickerNotification";
import SearchBarWithList from "../../components/search/SearchBarWithList";
import { useAuth } from "../../contexts/auth";

import CheckinCreateValidator from "../../validation/CheckinCreateValidator";
import { Form } from "@unform/mobile";
import validationFunctions from "../../validation/ValidationFunctions";

export default function Checkin({ route }) {
  const navigation = useNavigation();
  const formRef = useRef(null);
  const { user } = useAuth();
  const [anotation, setAnotation] = useState("");
  const [idSelectedCustomer, setIdSelectedCustomer] = useState(0);
  const [getDataLoading, setGetDataLoading] = useState(false);
  const [tileSelectedCustomer, setTileSelectedCustomer] = useState("");
  const [idSelectedResale, setIdSelectedResale] = useState(0);
  const [tileSelectedResale, setTileSelectedResale] = useState("");
  const [customersEmployersSelected, setCustomersEmployersSelected] = useState(
    []
  );
  const [resaleEmployersSelected, setResaleEmployersSelected] = useState([]);
  const [equipamentsSelected, setEquipamentsSelected] = useState([]);
  const [equipamentsDesiredSelected, setEquipamentsDesiredSelected] = useState(
    []
  );
  const [loading, setLoading] = useState(false);
  const [daysNotification, setDaysNotification] = useState("30");
  const [errors, setErrors] = useState({});

  const handleSetSelectedCustomer = (id, title) => {
    setIdSelectedCustomer(id);
    setTileSelectedCustomer(title);
  };

  const handleSetSelectedResale = (id, title) => {
    setIdSelectedResale(id);
    setTileSelectedResale(title);
  };

  const handleSetCustomerEmployersSelected = (employers) => {
    setCustomersEmployersSelected(employers);
  };

  const handleSetResaleEmployersSelected = (employers) => {
    setResaleEmployersSelected(employers);
  };

  const handleSetEquipamentsSelected = (employers) => {
    setEquipamentsSelected(employers);
  };

  const handleSetEquipamentsDesiredSelected = (employers) => {
    setEquipamentsDesiredSelected(employers);
  };

  const handleSetDaysNotification = (days) => {
    setDaysNotification(days);
  };

  const schema = CheckinCreateValidator;

  useEffect(() => {
    if (route.params) {
      switch (route.params.lastScreen) {
        case "NewCustomer":
          setTileSelectedCustomer(route.params.name);
          setIdSelectedCustomer(route.params.id);
          break;
        case "NewCustomerEmployer":
          setCustomersEmployersSelected([
            ...customersEmployersSelected,
            { id: route.params.id, title: route.params.name },
          ]);

          break;
        case "NewResale":
          setTileSelectedResale(route.params.name);
          setIdSelectedResale(route.params.id);
          break;
        case "NewResaleEmployer":
          setResaleEmployersSelected([
            ...resaleEmployersSelected,
            { id: route.params.id, title: route.params.name },
          ]);
          break;
        case "NewEquipament":
          setEquipamentsSelected([
            ...equipamentsSelected,
            { id: route.params.id, title: route.params.name },
          ]);
          break;
        case "NewEquipamentDesired":
          setEquipamentsDesiredSelected([
            ...equipamentsDesiredSelected,
            { id: route.params.id, title: route.params.name },
          ]);
          break;
      }
    }
  }, [route]);

  async function getLastVisit() {
    await api
      .get(`/visit/${user.i_user}/${idSelectedCustomer}/last`)
      .then((response) => {
        const visitResponse = response.data;

        if (Object.keys(visitResponse).length > 0) {
          handleSetEquipamentsSelected(visitResponse.customers_models);
          handleSetEquipamentsDesiredSelected(visitResponse.models_desired);
          setAnotation(visitResponse.anotation);
        } else {
          handleSetSelectedResale(0, "");

          handleSetCustomerEmployersSelected([]);

          handleSetResaleEmployersSelected([]);

          handleSetEquipamentsSelected([]);

          handleSetEquipamentsDesiredSelected([]);
          setAnotation("");
          setLoading(false);
          setDaysNotification("30");
        }
        setGetDataLoading(false);
      })
      .catch((error) => {
        setGetDataLoading(false);
        validationFunctions.errorsResponseDefault(error);
      });
  }

  useEffect(() => {
    if (idSelectedCustomer > 0) {
      setGetDataLoading(true);
      getLastVisit();
    }
  }, [idSelectedCustomer]);

  async function sendEmailInmes() {
    let message = `Promotor: ${user.name}\n\nCliente: ${tileSelectedCustomer}`;
    if (customersEmployersSelected.length > 0) {
      message += "\n\nContatos do cliente: ";
      customersEmployersSelected.forEach((e, i) => {
        if (customersEmployersSelected.length === i + 1) {
          message += e.title + ".";
        } else {
          message += e.title + ", ";
        }
      });
    }
    if (idSelectedResale) {
      message += `\n\nRevenda: ${tileSelectedResale},`;
    }
    if (resaleEmployersSelected.length > 0) {
      message += "\n\nContatos da revenda: ";
      resaleEmployersSelected.forEach((e, i) => {
        if (resaleEmployersSelected.length === i + 1) {
          message += e.title + ".";
        } else {
          message += e.title + ", ";
        }
      });
    }
    if (equipamentsSelected.length > 0) {
      message += "\n\nEquipamentos do cliente: ";
      equipamentsSelected.forEach((e, i) => {
        if (equipamentsSelected.length === i + 1) {
          message += e.title + ".";
        } else {
          message += e.title + ", ";
        }
      });
    }
    if (equipamentsDesiredSelected.length > 0) {
      message += "\n\nEquipamentos que o cliente deseja: ";
      equipamentsDesiredSelected.forEach((e, i) => {
        if (equipamentsDesiredSelected.length === i + 1) {
          message += e.title + ".";
        } else {
          message += e.title + ", ";
        }
      });
    }
    message += `\n\nAnotações do promotor: ${anotation}`;

    await api
      .post("/send-mail", {
        sender: `"${user.name}" <${user.email}>`,
        receivers:
          "vendas@inmes.com.br, vendas2@inmes.com.br, gerente.comercial@inmes.com.br, vendas4@inmes.com.br",
        subject: `${user.name} fez um checkin em ${tileSelectedCustomer}`,
        text: message,
        html: "",
      })
      .then((response) => {})
      .catch((error) => validationFunctions.errorsResponseDefault(error));
  }
  async function createNotification() {
    await api
      .post("/notification", {
        title: "Alerta de retorno",
        description: `Fazem ${daysNotification} dias que você visitou a empresa ${tileSelectedCustomer}.`,
        sent_date: moment(Date.now())
          .add(daysNotification, "days")
          .format("YYYY-MM-DDThh:mm:ssZ"),
        i_user: user.i_user,
      })
      .then((response) => {})
      .catch((error) => validationFunctions.errorsResponseDefault(error));
  }

  async function cleanForm() {
    handleSetSelectedCustomer(0, "");

    handleSetSelectedResale(0, "");

    handleSetCustomerEmployersSelected([]);

    handleSetResaleEmployersSelected([]);

    handleSetEquipamentsSelected([]);

    handleSetEquipamentsDesiredSelected([]);
    setAnotation("");
    setLoading(false);
    setErrors({});
  }

  const onPress = () => formRef.current.submitForm();

  async function handleSubmit() {
    try {
      if (!loading) {
        setLoading(true);
        formRef.current.setErrors({});

        await schema.validate(
          { idSelectedCustomer },
          {
            abortEarly: false,
          }
        );
        const body = {
          anotation,
          i_customer: idSelectedCustomer,
          customer_employers: customersEmployersSelected,
          i_resale: idSelectedResale,
          resale_employers: resaleEmployersSelected,
          i_user: user.i_user,
          equipaments_customers: equipamentsSelected,
          equipaments_desired: equipamentsDesiredSelected,
          days_return: daysNotification,
        };

        await api
          .post("/visit", body)
          .then(async (response) => {
            await sendEmailInmes();
            await createNotification();
            successInsertAlert(navigation, "Home", {});
            await cleanForm();
          })
          .catch((error) => {
            setLoading(false);
            validationFunctions.errorsResponseDefault(error);
          });
      }
    } catch (error) {
      setLoading(false);
      const errors = validationFunctions.errorsResponseDefault(error);
      formRef.current.setErrors(errors);
      setErrors(errors);
    }
  }
  if (getDataLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#666" />
      </View>
    );
  }
  return (
    <View style={mainStyle.containerDrawer}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <View style={styles.searchView}>
            <Text style={styles.searchHeader}>
              Qual empresa que está visitando?
            </Text>
            <SearchBarWithList
              requestUrl="/customers/search?"
              setItemForPatern={handleSetSelectedCustomer}
              textItemSelected={tileSelectedCustomer}
              editable={false}
              screenEdit="EditCustomer"
              screenCreate="NewCustomer"
              buttonLabel="Criar Cliente"
              paramsCreate={{
                returnScreen: "Checkin",
                returnData: true,
                idParent: idSelectedCustomer,
              }}
              error={errors?.idSelectedCustomer}
            />
          </View>

          <SearchBarWithShipper
            requestUrl={`/customer-employers/${idSelectedCustomer}/search?`}
            header="Quem que está atendendo?"
            entitySelected={handleSetCustomerEmployersSelected}
            screenCreate="NewCustomerEmployer"
            paramsCreate={{
              returnScreen: "Checkin",
              returnData: true,
              idParent: idSelectedCustomer,
            }}
            buttonLabel="Criar Contato do Cliente"
            value={customersEmployersSelected}
            dataPeding={idSelectedCustomer < 1}
            messagePending="Você precisar selecionar o cliente para listar os funcionários."
          />
          <View style={styles.searchView}>
            <Text style={styles.searchHeader}>
              Qual revenda que está acompanhando a visita?
            </Text>
            <SearchBarWithList
              requestUrl="/resales/search?"
              setItemForPatern={handleSetSelectedResale}
              textItemSelected={tileSelectedResale}
              editable={false}
              screenEdit="EditResale"
              screenCreate="NewResale"
              buttonLabel="Criar Revenda"
              paramsCreate={{
                returnScreen: "Checkin",
                returnData: true,
                idParent: idSelectedResale,
              }}
            />
          </View>

          <SearchBarWithShipper
            requestUrl={`/resale-employers/${idSelectedResale}/search?`}
            header="Quais pessoas da revenda estão acompanhando a visita?"
            entitySelected={handleSetResaleEmployersSelected}
            screenCreate="NewResaleEmployer"
            paramsCreate={{
              returnScreen: "Checkin",
              returnData: true,
              idParent: idSelectedResale,
            }}
            buttonLabel="Criar Contato da Revenda"
            value={resaleEmployersSelected}
            dataPeding={idSelectedResale < 1}
            messagePending="Você precisar selecionar o a revenda para listar os funcionários."
          />
          <SearchBarWithShipper
            requestUrl="/models-total/search?"
            header="Quais equipamentos o cliente tem?"
            entitySelected={handleSetEquipamentsSelected}
            screenCreate="EquipamentsCheckin"
            paramsCreate={{
              returnScreen: "Checkin",
              returnData: true,
              lastScreen: "NewEquipament",
              selectMode: true,
            }}
            buttonLabel="Novo Equipamento"
            value={equipamentsSelected}
          />
          <SearchBarWithShipper
            requestUrl="/models-total/search?"
            header="Quais equipamentos o cliente deseja ter?"
            entitySelected={handleSetEquipamentsDesiredSelected}
            screenCreate="EquipamentsCheckin"
            paramsCreate={{
              returnScreen: "Checkin",
              returnData: true,
              lastScreen: "NewEquipamentDesired",
              selectMode: true,
            }}
            buttonLabel="Novo Equipamento"
            value={equipamentsDesiredSelected}
          />

          <Text style={styles.formText}>Anotações</Text>
          <TextInput
            multiline
            numberOfLines={10}
            style={styles.formTextInput}
            onChangeText={(text) => setAnotation(text)}
            value={anotation}
          />
          <View style={styles.textNotificationView}>
            <Text style={styles.formText}>
              Adicionar Lembrete para voltar a essa empresa:
            </Text>
          </View>
          <PickerNotification
            data={[{ days: "30" }, { days: "60" }, { days: "90" }]}
            selected={daysNotification}
            setDaysSelected={handleSetDaysNotification}
          ></PickerNotification>
          <View style={styles.actions}>
            <ActionButton
              onPress={() => onPress()}
              loading={loading}
              text="Salvar"
              style={styles.action}
            />
          </View>
        </Form>
      </ScrollView>
    </View>
  );
}
