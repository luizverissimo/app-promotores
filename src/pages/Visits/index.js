import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import mainStyle from "../../../mainStyle";
import DatePicker from "react-native-datepicker";
import { Feather } from "@expo/vector-icons";
import moment from "moment";

import styles from "./styles";

import List from "../../components/search/List";
import api from "../../services/api";
import { useAuth } from "../../contexts/auth";
import validationFunctions from "../../validation/ValidationFunctions";

export default function Visits() {
  let requestVisits;
  const navigation = useNavigation();
  const { user } = useAuth();
  const [filterDate, setFilterDate] = useState(new Date());
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const [datePickerView, setDatePickerView] = useState(
    <TouchableOpacity
      tyle={styles.buttonText}
      onPress={() => setdatePickerOpened(true)}
    >
      <Text style={styles.buttonTextText}>Filtrar por data</Text>
    </TouchableOpacity>
  );
  const [datePickerOpened, setdatePickerOpened] = useState(false);

  async function getLastFive() {
    await api
      .get(`/visits/${user.i_user}/lastFive`)
      .then(async (response) => {
        setData(response.data);
      })
      .catch((error) => validationFunctions.errorsResponseDefault(error));
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getLastFive();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (!!filterDate) {
      const startDate = moment(filterDate).format("YYYY-MM-DDT00:00:00Z");
      const endDate = moment(filterDate).format("YYYY-MM-DDT23:59:59Z");
      requestVisits = `/visits/${user.i_user}/search?name=${text}&startDate=${startDate}&endDate=${endDate}`;
    } else {
      requestVisits = `/visits/${user.i_user}/search?name=${text}`;
    }

    api.get(requestVisits).then(async (response) => {
      setData(response.data);
    });
  }, [filterDate]);

  useEffect(() => {
    if (text && text != "") {
      api
        .get(`/visits/${user.i_user}/search?name=${text}`)
        .then(async (response) => {
          setData(response.data);
        })
        .catch((error) => validationFunctions.errorsResponseDefault(error));
    } else if (text === "") {
      getLastFive();
    }
  }, [text]);

  useEffect(() => {
    if (datePickerOpened) {
      setDatePickerView(
        <View>
          <SafeAreaView style={styles.filterView}>
            <Text style={styles.header}>Data</Text>

            <DatePicker
              style={{ width: "85%", marginTop: 10, marginBottom: 10 }}
              date={filterDate}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate="1900-05-01"
              maxDate="2030-06-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: "absolute",
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                },
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => {
                setFilterDate(date);
              }}
            />
          </SafeAreaView>
          <TouchableOpacity
            style={styles.buttonText}
            onPress={() => setdatePickerOpened(false)}
          >
            <Text style={styles.buttonTextText}>Remover Filtro por data</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      setDatePickerView(
        <TouchableOpacity
          style={styles.buttonText}
          onPress={() => setdatePickerOpened(true)}
        >
          <Text style={styles.buttonTextText}>Filtrar por data</Text>
        </TouchableOpacity>
      );
      setFilterDate(null);
    }
  }, [datePickerOpened]);

  return (
    <View style={mainStyle.containerDrawer}>
      <View style={styles.searchView}>
        <Text style={styles.header}>Minhas Visitas</Text>
      </View>
      <View style={styles.search}>
        <View style={styles.iconSearch}>
          <Feather name="search" size={20} color="#000" />
        </View>
        <View style={styles.textSearch}>
          <TextInput
            placeholder="cliente"
            onChangeText={(text) => setText(text)}
            style={{ paddingLeft: 35, paddingTop: 4 }}
          />
        </View>
      </View>
      {datePickerView}
      <View style={styles.list}>
        <List
          data={data}
          editable={false}
          readable={true}
          headers={["Cliente", "Data da Visita"]}
          screenRead={"ReadVisit"}
        />
      </View>
    </View>
  );
}
